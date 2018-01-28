export default {
  vxaddCart (state, val) {
    state.vxfood.push(val)
  },
  vxdecreaseCart (state,food) {
    state.vxfood.forEach((value, index) => {
      if(value.name === food.name){
      state.vxfood.splice(index,1)
      }
    })
  }
}
