function Tab($node) {
  this.$node = $node
  this.getDiv()
  this.divEvent()
}

Tab.prototype = {
  getDiv : function(){
    var _this = this
    this.$oneUl = this.$node.find('.tab-header >li')
    this.$twoUl = this.$node.find('.tab-container>li')  //用class或id找到，
  },                                                      //如用后代选择器会导致所有li显示0.0

  divEvent : function(){
    var _this = this
    this.$oneUl.on('click',function(e){
      var target  = e.target,
        index = _this.$oneUl.index(target)
      $(target).addClass('active').siblings().removeClass('active')
      $(_this.$twoUl[index]).addClass('active').siblings().removeClass('active')
    })
  }
}

var tab = new Tab($('.tab:first'))      
var tab = new Tab($('.tab').eq(1))
