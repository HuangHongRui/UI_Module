function Wooden($node){             
  this.$node = $node
  this.imgNum = 20
  this.ctheight = 250
  this.emptyArray = []
  this.loadImage()
}

Wooden.prototype = {

  loadImage : function() {
    var _this = this;
    var imgUrl = this.getImgUrl(this.imgNum)
    $.each(imgUrl,function(idx,url) {
      var img = new Image();
      img.src = url;
      img.onload = function() {
        var originWidth = img.width,
          originHeight = img.height,
          ratio = originWidth/originHeight

        var imgInfo = {
          target : $(img),
          width : _this.ctheight * ratio,
          height : _this.ctheight
        }
        _this.render(imgInfo)
      }
    })
  },

  render : function(imgInfo) {
    var _this = this;
    var empty = this.emptyArray,
      rowWidth = 0,
      rowHeight = 0,
      ctWidth = this.$node.width(),
      lastImg = imgInfo
    empty.push(imgInfo)

    $.each(empty,function(idx,imgInfo) {
      rowWidth += imgInfo.width
      if (rowWidth > ctWidth) {
        empty.pop()
        rowWidth = rowWidth - lastImg.width
        rowHeight = ctWidth * _this.ctheight/rowWidth
        _this.createRow(rowHeight)
        _this.emptyArray = []
        _this.emptyArray.push(lastImg)
      }
    })
  },

  createRow : function(rowHeight) {
    var $imgrow = $('<div class="row"></div>')
    $.each(this.emptyArray,function(idx,imgInfo) {
      var $imgbox = $('<div class="box"></div>')
      $img = imgInfo.target
      $img.height(rowHeight)
      $imgbox.append($img)
      $imgrow.append($imgbox)
    })
    this.$node.append($imgrow)  

  },

  getImgUrl : function(num){
    var i, width, height, urls = [];
    for (i=0;i<num;i++) {
      width = Math.floor(Math.random()*400+400)
      height = Math.floor(Math.random()*300+300)
      urls.push('https://unsplash.it/' + width + '/' + height + '/?random')
    }
    return urls;

  }
}

function GoTop(node) {              //置顶
  this.node = node
  this.target = $('<div class="top">Top</div>')
  this.createNode()
  this.bindEvent()
}

GoTop.prototype = {
  createNode : function() {
    this.target.appendTo(this.node)
  },
  bindEvent : function() {
    _this = this
    $(window).scroll(function() {
      scrollTop = $(window).scrollTop()
      if(scrollTop >= 50){
        console.log(1)
        _this.target.fadeIn(500)
      } else {
        _this.target.fadeOut(500)
      }
    })
    _this.target.click(function() {
      // $(window).scrollTop(0);
      $('html, body').animate({
        scrollTop:0
      }, 'slow')
    })
  }
}

var auto = (function(){         //封装小弟
  function init() {
    start()
    top()
    $(window).scroll(function(){    
      if(isgetDown()){
        start()
      }
    })

    function start(){
      var wooden = new Wooden($('#ct'))
    }   
    function top(){
      var gotop = new GoTop('#ct')
    }

    function isgetDown() {          //加载
      var doH = $(document).height(),
        scrollBottom = $(window).height() + $(window).scrollTop();
      if (scrollBottom === doH){
        return true
      } else {
        return false
      }
    }
  }

  return {
    callme : init
  }
})()

auto.callme()
