<template>
  <div id="app">
    <div class="header">
      <h1
        class="title"
        @click="showPicker"
      >
        <span>{{source}} match</span>
        <i
          class="cubeic-select"
          :class="{down: toDown}"
        ></i>
      </h1>
      <div class="navigator">
        <ul class="nav-list">
          <li
            v-for="(item, index) in tabList"
            :key="index"
            @click="switchTab(index)"
            :class="{active: currentPage === index}"
          >
            {{ item.txt }}
          </li>
        </ul>
        <i
          class="triangle-up"
          :class="{left: currentPage === 0, right: currentPage === 2}"
        ></i>
      </div>
    </div>
    <div class="content">
      <cube-slide
        :data="tabList"
        :initialIndex="currentPage"
        :loop="false"
        :autoPlay="false"
        :threshold="0.1"
        @change="slideChange"
      >
        <cube-slide-item
          v-for="(item, index) in tabList"
          :key="index"
        >
          <div class="match-list-wrapper">
            <match-list
              :source="source"
              :type="item.type"
            ></match-list>
          </div>
        </cube-slide-item>
        <div slot="dots"></div>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import createAPI from 'cube-ui/src/common/helpers/create-api'
import Picker from 'cube-ui/src/components/picker/picker.vue'
import CubeSlide from 'cube-ui/src/components/slide/slide.vue'
import CubeSlideItem from 'cube-ui/src/components/slide/slide-item.vue'
import MatchList from './components/match-list.vue'
import { ENDED, LIVE, CONCERN } from './constants/index'

createAPI(Vue, Picker, [], true)

export default {
  name: 'app',
  components: {
    CubeSlide,
    CubeSlideItem,
    MatchList
  },  
  data() {
    return {
      currentPage: 1,
      tabList: [
        {
          txt: 'Ended',
          type: ENDED
        },
        {
          txt: 'Concern',
          type: CONCERN
        },
        {
          txt: 'Live',
          type: LIVE
        }
      ],
      toDown: false,
      pickerList: [
        { text: 'NBA', value: 'NBA' },
        { text: 'DOTA', value: 'dota' },
        { text: 'SOCCER', value: 'soccer' }
      ],
      source: 'soccer'
    }
  },
  mounted() {
    this.picker = this.$createPicker({
      title: 'Match',
      cancelTxt: 'Cancel',
      confirmTxt: 'Confirm',
      data: [this.pickerList],
      selectedIndex: [2],
      $events: {
        select: () => {
          this.toDown = false
        },
        cancel: () => {
          this.toDown = false
        },
        'value-change': (selectedVal) => {
          this.source = selectedVal[0]
        }
      }
    })
  },
  methods: {
    switchTab(index) {
      this.currentPage = index
    },
    slideChange(index) {
      this.currentPage = index
    },
    showPicker() {
      this.toDown = true
      this.picker.show()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './assets/styles/common.scss';

html,
body,
#app {
  height: 100vh;
  text-align: center;
}

#app {
  background-color: $color_grey;

  .header {
    color: white;
    background-color: #15191d;

    .title {
      padding: 20px 0;
      font-size: 16px;
      color: white;
      display: inline-block;

      .down {
        display: inline-block;
        transform: rotate(180deg);
      }
    }

    .navigator {
      position: relative;
      padding-bottom: 12px;
      font-size: 12px;

      .nav-list {
        display: flex;
        justify-content: space-around;

        li {
          width: 60px;
          color: #e0e4e8;

          &.active {
            color: white;
          }
        }
      }
    }

    .triangle-up {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 0;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 8px solid $color_grey;
      transition: all 0.4s;

      &.left {
        left: 16.67%;
      }

      &.right {
        left: 83.34%;
      }
    }
  }

  .content {
    height: calc(100% - 80px);
    overflow: hidden;

    .match-list-wrapper {
      height: 100%;
      background-color: #e2e5ea;
    }
  }
}
</style>
