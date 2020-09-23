<template>
  <div>
      <p>{{ displayMessage }}</p>
      <Button v-show="isButton1Show" type="primary" @click="modal1 = true">開啟</Button>
      <Button v-show="isButton2Show" type="primary" @click="tryAgain(config1)">再試一次</Button>
      <Modal
          v-model="modal1"
          title="警告"
          okText="開啟它"
          cancelText="我考慮一下"
          :loading="loading"
          :closable="false"
          :mask-closable="false"
          @on-cancel="checkOpenBox(false)"
          @on-ok="checkOpenBox(true)">
          <p>確定要開啟嗎?</p>
          <p slot="header">
            <icon type="ios-alert" size="20"></icon>
            <span>系統警告</span>
        </p>
      </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modal1: false,
      loading: true,
      displayMessage: '你發現了一個寶箱，請問要打開它嗎？',
      isButton1Show: true,
      isButton2Show: false,
      isBoxOpen: false,
      config1: {
        content: '確定要再試一次嗎?',
        okText: '確定',
        cancelText: '還是算了',
        onOk: () => {
          this.checkTryAgain(true)
        },
        onCancel: () => {
          this.checkTryAgain(false)
        },
        render: (h, params) => {
          return h('div', { style: 'padding: 0;' }, [
            h('icon', {
              props: {
                type: 'ios-alert',
                size: '20'
              }
            }),
            h('span', { style: 'font-size: 25;' }, '系統警告'),
            h('Divider'),
            h('div', '確定要再試一次嗎?'),
            h('Divider')
          ])
        }
      }
    }
  },
  methods: {
    checkOpenBox (check) {
      const delayTime = check ? 2000 : 0
      setTimeout(() => {
        this.displayMessage = check ? '恭喜你獲得「暴風之劍(+9)」' : '機會只有一次，寶箱消失了，你什麼都沒得到。'
        this.isBoxOpen = check
        this.modal1 = false
        this.isButton1Show = false
        this.isButton2Show = true
      }, delayTime)
    },
    tryAgain (config) {
      this.$Modal.confirm(config)
    },
    checkTryAgain (check) {
      this.displayMessage = !check ? '都再給你一次機會了還猶豫，你沒機會了88' : this.isBoxOpen ? '你以為寶箱是大白菜逆？別太貪心了！' : '你發現了一個寶箱，請問要打開它嗎？'
      this.isButton1Show = check ? !this.isBoxOpen : false
      this.isButton2Show = false
    }
  }
}
</script>
