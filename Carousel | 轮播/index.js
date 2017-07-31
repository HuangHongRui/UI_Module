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




// 	var $ct = $('.carousel .img-ct')	//容器
// 	var $img = $('.img-ct >li')			//li图片
// 	var imgLen = $img.length			//图片数量
// 	var imgWidth = $img.width()		 	//图片宽度
// 	var $turnLeft = $('.turnLeft')		//左按钮
// 	var $turnRight = $('.turnRight')	//右按钮
// 	var $indexBtn = $('.bullet li')		//下表按钮
// 	$ct.append($img.first().clone());	//增一元素在兄弟后
// 	$ct.prepend($img.last().clone());	//增一元素于兄弟最前
// 	$ct.width(imgWidth * (imgLen + 2))//让容器加多2个li的宽度,此时显示第一个li，也就是新增的.需要做一个处理
// 	$ct.css({left:-imgWidth})			//此时又回到第一张pic
// 	var pageIndex = 0;					//基点
// 	var lock = false;
//     var clock = true;

// 	$indexBtn.click(function(e) {
//   e.preventDefault;
// 		var index = $(this).index();	//所点击的下标
// 		console.log(index)
// 		if(index > pageIndex) {
// 			turnRight(index-pageIndex)
// 		} else if(pageIndex > index) {
// 			turnLeft(pageIndex-index)
// 		}
// 	})

// 	$turnLeft.on('click', function(e) {	
//   e.preventDefault;
// 		turnLeft(1)
// 	})

// 	$turnRight.on('click', function(e) {
//   e.preventDefault;
// 		turnRight(1)
// 	})

// 	function turnRight(idx) {
// 		if (lock) return;
// 		lock = true;
// 		$ct.animate ( {
// 			left:"-="+ idx * imgWidth
// 		},function(){
// 			pageIndex += idx;
// 			if (pageIndex === imgLen){
// 				pageIndex = 0;
// 				$ct.css({left:-imgWidth})
// 			}
// 			setBtnStyle()
// 			lock = false;
// 		})
// 	}

// 	function turnLeft(idx)	{
// 		//触发，(包含在ct)图片往左滚.右边显示到窗口，那么减一个li(img)的宽,
// 		//如果 基点 = -1 那么重置基点为0， 而且把下表和图调到length -1 
// 		// $ct.animate({
// 		// 	left: '-=' + $imgwidth
// 		// })
// 		if (lock) return;
// 		lock = true;
// 		$ct.animate( {
// 			left:"+=" + idx * imgWidth
// 		},function() {
// 			pageIndex -= idx;
// 			if (pageIndex < 0) {
// 				pageIndex = imgLen-1
// 				$ct.css({left: -imgLen * imgWidth})	
// 			}
// 			setBtnStyle()
// 			lock = false;
// 		})
// 	}
// 	function setBtnStyle() {
// 		$indexBtn.removeClass('active')
// 			.eq(pageIndex)
// 			.addClass('active')
// 	}	
// 		$('.carousel').hover(
// 			function(){
// 				clock = false
// 			},
// 			function(){
// 				clock = true;
// 		})

// 		setInterval(function(){
// 			if(clock){
// 				turnRight(1)
// 			}
// 		},3000)
