carousel = (function(){

  function Carousel($node){
    this.$node = $node
    this.init()
    this.bind()
  }

  Carousel.prototype = {

    init : function() {
      var $ct = this.$ct = this.$node.find('.img-ct'),
        $img = this.$img = this.$node.find('.img-ct >li'),
        $turnLeft = this.$turnLeft = this.$node.find('.turnLeft'),
        $turnRight = this.$turnRight = this.$node.find('.turnRight'),
        $indexBtn = this.$indexBtn = this.$node.find('.bullet li');
      $deleventA = this.$deleventA = this.$node.find('a')
      this.imgLen = $img.length;
      this.imgWidth = $img.width();
      this.pageIndex = 0;
      this.lock = false;
      this.clock = true;
      $ct.append($img.first().clone())
      $ct.prepend($img.last().clone())
      $ct.width((this.imgLen + 2) * this.imgWidth)
      $ct.css({left : -this.imgWidth})
    },

    bind : function() {
      var _this = this
      this.$turnLeft.on('click', function(e) {
        _this.turnLeft(1)
      })

      this.$turnRight.on('click', function(e) {
        _this.turnRight(1)
      })

      this.$indexBtn.on('click', function(e) {
        var index = $(this).index();
        if (index > _this.pageIndex) {
          _this.turnRight(index - _this.pageIndex)
        } else if (_this.pageIndex > index){
          _this.turnLeft(_this.pageIndex - index)
        }
      })

      $deleventA.click(function(e){
        e.preventDefault();
      })

      _this.$node.hover(
        function(){
          _this.clock = false
        },
        function(){
          _this.clock = true;
        })

      setInterval(function(){
        if(_this.clock){

          _this.turnRight(1)
        }
      },3000)
    },

    turnRight : function(idx) {
      var _this = this
      if (this.lock) return;
      this.lock = true
      this.$ct.animate( {
        left : '-=' + idx * this.imgWidth
      }, function() {
        _this.pageIndex += idx
        if (_this.pageIndex === _this.imgLen) {
          _this.pageIndex = 0
          _this.$ct.css({ left : -_this.imgWidth })
        }
        _this.setBtnStyle()
        _this.lock = false
      })
    },

    turnLeft : function(idx) {
      var _this = this
      if (this.lock) return;
      this.lock = true;
      this.$ct.animate( {
        left: "+=" + idx * _this.imgWidth
      }, function() {
        _this.pageIndex -= idx
        if (_this.pageIndex < 0) {
          _this.pageIndex = _this.imgLen -1
          _this.$ct.css({ left : -_this.imgLen * _this.imgWidth})
        }
        _this.setBtnStyle()
        _this.lock = false;
      })
    },

    setBtnStyle : function() {
      _this = this
      this.$indexBtn
        .removeClass('active')
        .eq(_this.pageIndex)
        .addClass('active')
    }
  }
  return {
    autoGo : function(node) {
      new Carousel(node)
    }
  }
})()
carousel.autoGo($('.carousel'))