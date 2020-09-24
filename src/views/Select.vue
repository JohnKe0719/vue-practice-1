<template>
  <div>
    <Select clearable v-model="model1" style="width:200px" @on-change="selectColor(model1)">
      <Option v-for="item in cardColor" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select clearable v-model="model2" style="width:200px" @on-change="selectNumber(model2)">
      <Option v-for="item in cardNumber" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Button @click="playCard()">
      打出
    </Button>
    <br>
    <h3>您選擇的牌為: {{ nowSelectColor }}{{nowSelectNumber}}</h3>
    <br><br>
    <Row justify="center" align="middle">
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

export default {
  data () {
    return {
      cardColor: [
        {
          value: '黑桃',
          label: '黑桃'
        },
        {
          value: '紅心',
          label: '紅心'
        },
        {
          value: '方塊',
          label: '方塊'
        },
        {
          value: '梅花',
          label: '梅花'
        }
      ],
      cardNumber: [
        {
          value: 'A',
          label: 'A'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '9',
          label: '9'
        },
        {
          value: '10',
          label: '10'
        },
        {
          value: 'J',
          label: 'J'
        },
        {
          value: 'Q',
          label: 'Q'
        },
        {
          value: 'K',
          label: 'K'
        }
      ],
      cardNumberCovert: {
        A: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        J: 11,
        Q: 12,
        K: 13
      },
      board: [],
      boardColumns: [
        {
          title: '卡牌',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: '花色',
          key: 'color',
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
      nowSelectColor: '',
      nowSelectNumber: '',
      model1: '',
      model2: ''
    }
  },
  methods: {
    playCard () {
      const boardCheck = this.board.find((item, index, array) => item.name === `${this.nowSelectColor}${this.nowSelectNumber}`)
      if (boardCheck) {
        alert('你已經出過這張牌了！')
      } else {
        this.board.push({
          name: this.nowSelectColor + this.nowSelectNumber,
          color: this.nowSelectColor,
          number: this.cardNumberCovert[this.nowSelectNumber]
        })
      }
    },
    selectColor (color) {
      this.nowSelectColor = color
    },
    selectNumber (number) {
      this.nowSelectNumber = number
    },
    removeCard (index) {
      this.board.splice(index, 1)
    }
  }
}
</script>
