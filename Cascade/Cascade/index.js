
var autoGo = (function(){


  function _Cascade($ct) {
    this.$ct = $ct
    this.init()
    this.bind()
  }

  _Cascade.prototype = {
    init : function () {
      var _this = this
      this.pageIndex = 1;
      this.messageNum = 5;
      this.item = this.$ct.find('.item');
      this.eleWidth = this.item.outerWidth(true);
      this.picCt = this.$ct.find('#pic-ct');
      this.rowEleCount = parseInt(this.picCt.width() / this.eleWidth);
      this.cascadeArray = [];
      this.lock = false;	
      for(var i=0; i<this.rowEleCount; i++) {
        this.cascadeArray[i] = 0
      }	
    },

    bind : function() {
      var _this = this

      this.scrollAuto()

      $(window).scroll(function(){
        if (_this.lock) return
        if (_this.isVisible(_this.$ct.find('#load'))){
          _this.scrollAuto()
        }
      })
    },

    scrollAuto :function (){
      var _this = this
      this.getData(function(newsList){					//获取数据——数据为新闻数组～
        _this.lock = false							
        $.each(newsList,function(idx,news){				//遍历每一个
          var $node = _this.transformNode(news)		//给我一个，我转一个，转换数据为节点————赋给$node
          $node.find('img').load(function(){			//等加载完img后...
            _this.picCt.append($node)				//插入文档～
            _this.cascadeType($node)				//再使用瀑布式排列0.0
          })
        })
      })
      this.lock = true; 									//锁上
    },

    getData : function(callback) {
      var _this = this
      $.ajax({
        url: 'https://platform.sina.com.cn/slide/album_tech',
        jsonp: 'jsoncallback',
        dataType: 'jsonp',
        data: {
          app_key: '1271687855',
          num: _this.messageNum,
          page: _this.pageIndex
        }
      }).done(function(ret){
        _this.pageIndex++;
        if( ret && ret.status && ret.status.code === '0') {
          callback(ret.data)
        } else {
          alert('Sorry>B-Bye~')
        }
      })
    },

    transformNode : function(datas) {
      var nodes = '';
      nodes += '<li class="item">';
      nodes += '<a href="' + datas.url + '" class="link"><img src="' + datas.img_url + '" alt=""></a>';
      nodes += '<h4 class="header">' + datas.short_name + '</h4>';
      nodes += '<p class="desp">' + datas.short_intro + '</p>';
      nodes += '</li>'    		
      return $(nodes)			//踩坑了～需要转为JQ对象..否则上面无法使用find到img
    },

    cascadeType : function(datas) {
      var _this = this
      var minEle = Math.min.apply(Math,this.cascadeArray)	//最小值-。-
      var minIdx = this.cascadeArray.indexOf(minEle)		//最小值坐标
      $(datas).css({
        opacity: 1,
        top: _this.cascadeArray[minIdx],
        left: $(datas).outerWidth(true) * minIdx
      })
      this.cascadeArray[minIdx] += $(datas).outerHeight(true)
      _this.picCt.height(Math.max.apply(Math,this.cascadeArray))		
      //这是把容器的高度撑开的关键，如无此部，会导致隐藏的标志置顶
    },
    isVisible : function($node) {
      var scrollTop = $(window).scrollTop(),
        windowHeight = $(window).height()
      offsetTop = $node.offset().top

      if (offsetTop < scrollTop + windowHeight){
        return true
      } else {
        return false;
      }
    }
  }

  return {
    autoGo : function(node){
      new _Cascade(node)
    }
  }
})()

autoGo.autoGo($('.wrap'))
