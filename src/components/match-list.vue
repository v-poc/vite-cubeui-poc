<template>
  <div class="match-list">
    <cube-scroll
      ref="scroll"
      :data="matchList"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <ul class="match-inner">
        <li
          v-for="(item, index) in matchList"
          :key="index"
          class="match-item"
          @click="clickItem(item)"
        >
          <div class="left-team">
            <img
              :src="item.hostLogoUrl"
              alt=""
              class="logo"
            >
            <p class="name">{{item.hostTeamName}}</p>
          </div>
          <div class="center">
            <p
              v-if="item.live"
              class="guest"
              :class="{end : item.isEnd}"
            >{{item.live}}</p>
            <p
              v-if="item.order"
              class="order"
              @click="subscribe"
            >{{item.order}}</p>
            <p
              class="score"
              :class="{last: item.isEnd}"
            >
              {{item.hostScore}} - {{item.guestScore}}
            </p>
            <p
              v-if="!item.isEnd"
              class="time"
            >{{item.endTime}}</p>

          </div>
          <div class="right-team">
            <img
              :src="item.guestLogoUrl"
              alt=""
              class="logo"
            >
            <p class="name">{{item.guestTeamName}}</p>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import Vue from 'vue'
import createAPI from 'cube-ui/src/common/helpers/create-api'
import CubeScroll from 'cube-ui/src/components/scroll/scroll.vue'
import SubscribeDialog from './subscribe-dialog.vue'
import listData from '../assets/mock/match-list'
import { ENDED, LIVE, CONCERN } from '../constants/index'

createAPI(Vue, SubscribeDialog, [], true)

const UP = 'up'
const DOWN = 'down'
const typesMap = {
  [ENDED]: 0,
  [LIVE]: 1,
  [CONCERN]: 2
}

// get match data
const getMatchList = (source, type) => {
  return listData[source][typesMap[type]]
}

export default {
  name: 'match-list',
  props: {
    source: {
      type: String,
      default: 'soccer'
    },
    type: {
      type: String,
      default: LIVE
    }
  },
  components: {
    CubeScroll
  },
  data() {
    return {
      matchList: getMatchList(this.source, this.type),
      options: {
        scrollbar: {
          fade: true
        },
        pullDownRefresh: {
          threshold: 90,
          stop: 50,
          txt: 'Refreshed'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: 'Load more',
            noMore: 'No more result'
          }
        },
        click: false
      }
    }
  },
  watch: {
    source() {
      this.matchList = getMatchList(this.source, this.type)
    }
  },
  created() {
    this.subscribeDialog = this.$createSubscribeDialog()
  },
  methods: {
    clickItem(item) {
      console.log(`click: ${item.hostTeamName} vs ${item.guestTeamName}`)
    },
    subscribe() {
      this.subscribeDialog.show()
    },
    onPullingDown() {
      this.loadMatch('down')
    },
    onPullingUp() {
      this.loadMatch('up')
    },
    loadMatch(type) {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          let match = []
          for (let index = 5; index > 0; index--) {
            match.push(this.matchList[index])
          }
          if (type === DOWN) {
            this.matchList.unshift(...match)
          } else if (type === UP) {
            this.matchList = this.matchList.concat(match)
          }
        } else {
          this.$refs.scroll.forceUpdate()
          if (type === UP) {
            setTimeout(() => {
              this.$refs.scroll.scroll.scrollBy(0, 64, 800)
            }, 1000)
          }
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.match-list {
  height: 100%;
  background-color: #e2e5ea;
  .match-inner {
    background-color: #ffffff;
    .match-item {
      border-bottom: 1px solid #e4e4e4;
      padding: 10px 0;
      display: flex;
      justify-content: space-around;
      .left-team,
      .right-team {
        text-align: center;
        width: 80px;
        img {
          display: inline-block;
          height: 38px;
          margin-bottom: 7px;
        }
        .name {
          font-size: 14px;
        }
      }
      .center {
        font-size: 12px;
        width: 80px;
        .guest {
          display: inline-block;
          background-color: #3d8f29;
          color: white;
          line-height: 16px;
          padding: 3px 10px;
          border-radius: 25px;
          margin-bottom: 7px;
        }
        .order {
          display: inline-block;
          border: 1px #007100 solid;
          color: #49873d;
          border-radius: 25px;
          line-height: 16px;
          padding: 3px 20px;
          margin-bottom: 7px;
        }
        .end {
          background-color: #e86f5d;
        }
        .score {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 7px;
          position: relative;
          .order {
            display: inline-block;
            border-radius: 25px;
            border: 1px #2f6220 solid;
            padding: 3px 20px;
            font-size: 100%;
            position: absolute;
            right: -100px;
            transform: translateY(-50%);
          }
        }
        .last {
          font-size: 22px;
          margin-top: 5px;
          color: #878f98;
        }
        .time {
          color: #92929a;
        }
      }
    }
  }
}

.before-trigger,
.cube-pulldown-wrapper {
  color: #7d7d7d;
  font-size: 12px;
  line-height: 20px;
}
</style>
