carousel = (function(){

  function Carousel($node){
    this.$node = $node
    this.init()
    this.bind()
  }

  Carousel.prototype = {

    init : function() {
      var $ct = this.$node.find('.img-ct'),	
        $img = this.$img = this.$node.find('.img-ct >li'), 
        $leftBtn = this.$leftBtn = this.$node.find('.turnLeft'),
        $rightBtn = this.$rightBtn = this.$node.find('.turnRight'),
        $bottomBtn = this.$bottomBtn = this.$node.find('.bullet li');
      this.imgWidth = $img.width();
      this.imgLen = $img.length;
      this.pageIndex = 0;
      this.lock = false;
      this.clock = true;
    },

    bind : function() {
      var _this = this
      this.$rightBtn.on('click',function(e) {
        e.preventDefault()
        _this.rightBtn()
      })

      this.$leftBtn.on('click', function(e) {
        e.preventDefault()
        _this.leftBtn()
      })

      this.$bottomBtn.on('click',function(e) {
        e.preventDefault;
        var idx = $(this).index()
        _this.show(idx)
      })

      $(this.$node).hover(
        function(){
          _this.clock = false
        },
        function(){
          _this.clock = true;
        })

      setInterval(function(){
        if(_this.clock){
          _this.rightBtn()
        }
      },2000)  
    },

    show : function(idxArg) {
      var _this = this
      if (_this.lock) return;
      this.lock = true;
      this.$img.eq(_this.pageIndex).fadeOut(500);
      this.$img.eq(idxArg).fadeIn(1000,function(){
        _this.lock = false;
      })
      this.pageIndex = idxArg
      this.checked()
    },

    checked : function () {
      var _this = this
      this.$bottomBtn.removeClass('active')
        .eq(_this.pageIndex).addClass('active')
    },

    leftBtn : function () {
      var _this = this
      this.show((_this.imgLen + _this.pageIndex-1)%_this.imgLen)
    },

    rightBtn : function () {
      var _this = this
      this.show((_this.pageIndex+1)%_this.imgLen)
    }
  }

  return {
    autoGo : function(node) {
      new Carousel(node)
    }
  }
})()

carousel.autoGo($('.carousel'))
