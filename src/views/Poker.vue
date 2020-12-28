<template>
  <div class="poker">
    <Tabs type="card" v-model="cardTab">
      <TabPane v-for="card in cardColors" :key="card.name" :label="card.name">
        <CardTable :color="card.color" :cards="cardNumbers" @click="playCard"/>
      </TabPane>
    </Tabs>
    <Row justify="center" align="middle">
      <Col span="16" offset="4">
        <h2>牌型：</h2>
        <h3 v-for="item in deck" :key="item.name">
          {{ item.name }}({{ item.score }}分): {{item.count}}
        </h3>
      </Col>
      <Col span="4" offset="4">
        <h3>總分: {{ totalScore }} 分</h3>
        <h3>目標分數：{{ targetScore }} 分</h3>
      </Col>
    </Row>
    <br>
    <Row justify="center">
      <Col>
        <h2>牌桌：</h2>
      </Col>
      <Col span="16" offset="4">
        <Table border :columns="boardColumns" :data="board"></Table>
      </Col>
    </Row>
  </div>
</template>

<script>
import CardTable from '@/components/CardTable.vue'

export default {
  data () {
    return {
      boardColumns: [
        {
          title: '卡牌',
          key: 'cardName',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('strong', params.row.cardName)
            ])
          }
        },
        {
          title: '花色',
          key: 'colorName',
          align: 'center'
        },
        {
          title: '點數',
          key: 'number',
          align: 'center'
        },
        {
          title: '行動',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeCard(params.index)
                  }
                }
              }, '刪除')
            ])
          }
        }
      ],
      cardColors: [
        {
          name: '黑桃',
          color: 'black'
        },
        {
          name: '紅心',
          color: 'red'
        },
        {
          name: '方塊',
          color: 'red'
        },
        {
          name: '梅花',
          color: 'black'
        }
      ],
      cardNumbers: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
      board: [],
      deck: [
        {
          name: '一對',
          count: 0,
          score: 10
        },
        {
          name: '三條',
          count: 0,
          score: 30
        },
        {
          name: '鐵支',
          count: 0,
          score: 50
        }
      ],
      cardTab: 0,
      targetScore: 50
    }
  },
  components: {
    CardTable
  },
  mounted () {
    this.targetScore = this.getTargetScore()
  },
  computed: {
    totalScore () {
      let score = 0
      this.deck.forEach(element => {
        score += element.score * element.count
      })
      return score
    }
  },
  watch: {
    totalScore: {
      handler (newValue) {
        if (newValue > this.targetScore) {
          alert(`總分${newValue}分 > 目標分數${this.targetScore}分, 爆掉了！`)
          this.reset()
        } else if (newValue === this.targetScore) {
          alert(`總分${newValue}分 = 目標分數${this.targetScore}分, 恭喜你贏了！`)
          this.reset()
        }
      }
    }
  },
  methods: {
    playCard (cardNumber) {
      const colorName = this.cardColors[this.cardTab].name
      const color = this.cardColors[this.cardTab].color
      const card = this.cardColors[this.cardTab].name + cardNumber
      const boardCheck = this.board.find((item, index, array) => item.cardName === card)
      if (boardCheck) {
        alert('你已經出過這張牌了！')
      } else {
        this.board.push(
          {
            cardName: card,
            colorName: colorName,
            number: cardNumber,
            color: color
          }
        )
        this.setPokerDeck(colorName, cardNumber)
      }
    },
    removeCard (index) {
      const colorName = this.board[index].colorName
      const cardNumber = this.board[index].number
      this.setPokerDeck(colorName, cardNumber, 'Remove')
      this.board.splice(index, 1)
    },
    // simple poker card set function
    setPokerDeck (cardNumber, action = 'Add') {
      const actionCheck = action === 'Add'
      const setCount = this.board.filter(item => item.number === cardNumber).length
      const setMapping = {
        2: 'pair',
        3: 'trips',
        4: 'squads'
      }
      actionCheck ? this.deck[setMapping[setCount]]++ : this.deck[setMapping[setCount]]--
      actionCheck && this.deck[setMapping[setCount] - 1] ? this.deck[setMapping[setCount] - 1]-- : this.deck[setMapping[setCount] - 1]++
    },
    getTargetScore () {
      let score = 0
      const scoreRandomLimit = [5, 4, 3]
      this.deck.forEach((element, index) => {
        score += element.score * this.getRandomInt(scoreRandomLimit[index])
      })
      return score
    },
    getRandomInt (maxNumber) {
      return Math.floor(Math.random() * Math.floor(maxNumber))
    },
    reset () {
      window.location.reload()
    }
  }
}
</script>
