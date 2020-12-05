<template>
  <div class="subscribe-dialog-view">
    <cube-popup
      ref="popup"
      @mask-click="hide"
    >
      <div class="subscribe-dialog-wrapper">
        <span
          class="close"
          @click="hide"
        ><i class="cubeic-close"></i></span>
        <div class="title">Turn on push notifications</div>
        <img src="../assets/images/subscribe.png">
        <p class="desc">Get the news, game, consulting data and video.</p>
        <cube-button
          class="button"
          @click="start"
        >Enable it</cube-button>
      </div>
    </cube-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import createAPI from 'cube-ui/src/common/helpers/create-api'
import Toast from 'cube-ui/src/components/toast/toast.vue'
import CubeButton from 'cube-ui/src/components/button/button.vue'
import CubePopup from 'cube-ui/src/components/popup/popup.vue'

createAPI(Vue, Toast, [], true)

export default {
  name: 'subscribe-dialog',
  components: {
    CubeButton,
    CubePopup
  },
  methods: {
    show() {
      this.$refs.popup.show()
      this.$emit('show')
    },
    hide() {
      this.$refs.popup.hide()
      this.$emit('hide')
    },
    start() {
      this.$refs.popup.hide()
      this.$createToast({
        type: 'correct',
        txt: 'Enabled successfully',
        time: 1000
      }).show()
    }
  }
}
</script>

<style lang="scss" scoped>
.subscribe-dialog-wrapper {
  position: relative;
  box-sizing: border-box;
  max-width: 360px;
  margin: 0 25px;
  padding: 38px 20px 20px 20px;
  background-color: #f6f6f6;
  border-radius: 4px;
  text-align: center;
  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 28px;
    color: #a2a8af;
  }
  .title {
    font-size: 17px;
    color: #222c36;
  }
  img {
    height: 180px;
    margin: 8px 0 5px 0;
  }
  .desc {
    line-height: 20px;
    font-size: 13px;
    color: #c0c8d1;
  }
  .button {
    // display: inline-block;
    // width: 230px;
    margin-top: 20px;
    padding: 14px;
    border-radius: 4px;
    font-size: 15px;
    background-color: #5b8fdc;
  }
}
</style>
