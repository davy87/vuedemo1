<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item,index) in goods">
            <span class="text" @click.stop="goanchor('#anchor-'+index,'#foodList')">
              <span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
              {{ item.name }}
            </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper" :id="foodList">
      <ul>
        <li v-for="(item,index) in goods" class="food-list food-list-hook">
          <h1 class="title" :id="'anchor-'+index">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click.stop="xqy(food)">
              <div class="icon">
                <img :src=" food.icon " width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="description">{{ food.description }}</p>
                <div class="sell-info">
                  <span class="sellCount">月售 {{ food.sellCount }} 份</span>
                  <span class="rating">好评率{{ food.rating }}</span>
                  <div class="price">
                    <span class="newPrice">¥{{ food.price }}</span>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol :food="food"></cartcontrol>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :food="food" :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice"></shopcart>
    <fooddetail ref="fdt" :foodData="foodData"></fooddetail>

  </div>
</template>
<script>
  import icon from './mods/icon'
  import Scroll from 'better-scroll'
  import shopcart from './mods/shopcart.vue'
  import cartcontrol from './mods/cartontrol.vue'
  import fooddetail from './mods/fooddetail.vue'

  export default{
    props: ['datas'],
    data () {
      return {
        icon: icon.icon,
        goods: this.datas.goods,
        foodData: {}
      }
    },
    computed: {
      food () {
        let arr = []
        //  回调里的参数  1.val  2.index
        this.datas.goods.forEach(goods => {
          goods.foods.forEach(foods => {
            if (foods.count > 0) {
              arr.push(foods)
            }
          })
        })
        return arr
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll()
      })
    },
    methods: {
      scroll () {
        /* eslint-disable no-new */
        new Scroll(this.$refs['foodsWrapper'], {
          click: true
        })
        new Scroll(this.$refs['menuWrapper'], {
          click: true
        })
      },
      xqy (value) {
        this.foodData = value
        this.$refs['fdt'].foodshow()
      },
      goanchor (index, foodL) {
        let anchor = this.$el.querySelector(index)
        let foodList = this.$el.querySelector(foodL)
        let vtop = anchor.offsetTop
//        foodList. style. transform = `translate(0px, - ${vtop} px)`
        console.log(foodList,vtop)
        document.documentElement.scrollTop = anchor.offsetTop // firefox
      }
    },
    components: {
      shopcart,
      cartcontrol,
      fooddetail
    }
  }
</script>
