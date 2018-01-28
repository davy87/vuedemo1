<template>
  <transition name="move">
    <div class="detailWrapper" v-show="details" ref="detailWrapper">
      <div class="foodDetail">
        <div class="back" @click="details = !details">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="foodData.image" width="100%">
        <div class="info">
          <div class="title">{{ foodData.name }}</div>
          <div class="desc">
            <span>月售{{ foodData.sellCount }}</span>
            <span>好评率{{ foodData.rating }}%</span>
          </div>
          <div class="price">¥{{ foodData.price }}</div>
          <transition name="fade">
            <div class="shopCart" @click="add($event)" v-show="foodData.count === 0 || foodData.count === undefined ">
              <div class="text">加入购物车</div>
            </div>
          </transition>

          <cartcontrol ref="cartcontrol" :food="foodData"></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{ foodData.info }}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">商品评价</div>
          <div class="classify">
            <span v-for="(item,index) in classify" class="item"
                  :class="{'active':item.active,'bad':index ==2,'badActive':index==2 && item.active}"
                  @click="classifyClick(item)">
              {{ item.name }}
<span class="count">{{item.count}}</span>
            </span>
          </div>
          <div class="switch">
            <span class="icon-check_circle" :class="{'on':flag}" @click="flag = !flag"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="item in commontss">
                <div class="userInfo">
                  <div class="time">{{item.rateTime}}</div>
                  <div class="user">
                    <span>{{item.username}}</span>
                    <img :src="item.avatar" alt="" width="12" height="12">
                  </div>
                </div>
                <div class="content">
                  <span class="icon" :class="item.rateType? 'icon-thumb_down':'icon-thumb_up'"></span>
                  <span class="text">{{ item.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>
<script>
  import Scroll from 'better-scroll'
  import cartcontrol from './cartontrol.vue'


  export default{
    data () {
      return {
        details: false,
        classify: [
          {name: '全部', count: 0, active: true, commont: []},
          {name: '推荐', count: 0, active: false, commont: []},
          {name: '吐槽', count: 0, active: false, commont: []}
        ],
        commonts: [],
        flag: true
      }
    },
    props: ['foodData'],
    mounted () {
      this.$nextTick(() => {
        if (!this.cs) {
          this.cs = new Scroll(this.$refs['detailWrapper'], {
            click: true
          })
        } else {
          this.cs.refresh()
        }
      })
    },
    methods: {
      add (event) {
        this.$refs['cartcontrol'].addCart(event)
      },
      classifyClick (item) {
        this.commonts = item.commont
        this.classify.forEach(val => {
          val.active = false
        })
        item.active = true
      },
      foodshow () {
        this.$nextTick(() => {
          this.foodData.ratings.forEach(val => {
            this.classify[0].count++
            this.classify[0].commont.push(val)
            if (val.rataType) {
              console.log(val)
              this.classify[2].count++
              this.classify[2].commont.push(val)
            } else {
              this.classify[1].count++
              this.classify[1].commont.push(val)
            }
          })
        })
        this.details = true
        this.$nextTick(() => {
          if (!this.cs) {
            this.cs = new Scroll(this.$refs['detailWrapper'], {
              click: true
            })
          } else {
            this.cs.refresh()
          }
        })
      },
      updatecs () {
        this.$nextTick(() => {
          this.cs.refresh()
        })
      }
    },
    computed: {
      commontss () {
        this.updatecs()
        let arr = []
        if (this.flag) {
          this.commonts.forEach(val => {
            if (val.text.length > 0) {
              arr.push(val)
            }
          })
          return arr
        } else {
          return this.commonts
        }
      }
    },
    components: {
      cartcontrol
    }
  }
</script>
