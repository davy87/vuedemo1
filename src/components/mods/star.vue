<template>
  <div class="star star-48" :class="'star-'+ size">
      <span class="star-item" :class="item " v-for="item in yimao"></span>
  </div>
</template>

<script>
 export default{
    props: ['score','size'],
   computed: {
        yimao () {
            let arr = []
            // 1.整数
          let taiyang = Math.floor(this.score)
          // 2.小数
          let xiaoshu = (this.score - taiyang) >= 0.5

           for (let i=0; i < taiyang; i++) {
              arr.push('on')
           }
           if (xiaoshu) {
               arr.push('half')
           }
           while (arr.length < 5) {
               arr.push('off')
           }
           return arr
        }
   }
 }
</script>


<style>
</style>
