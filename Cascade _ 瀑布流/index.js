var WaterFall = (function() {
  var $ct;	    
  var $item;
  function render(arg){
    $ct = arg;
    $item = $ct.children();
    var $itemWidth = $item.outerWidth(true),					
      $ctLen = parseInt($(window).width() / $itemWidth),				
      cascadeArray = [];									

    for(var i = 0; i < $ctLen ; i++){
      cascadeArray[i] = 0;								
    }

    $item.each(function(){
      var minDiv = Math.min.apply(Math,cascadeArray)		
      var minDivDix = cascadeArray.indexOf(minDiv)	
      $(this).css({										
        top: cascadeArray[minDivDix],					
        left: $(this).outerWidth(true) * minDivDix,		
      })
      cascadeArray[minDivDix] += $(this).outerHeight(true)
    })
  }

  $(window).resize(function(){
    render($ct)	
  })

  return {			
    init : render
  }
})()

WaterFall.init($('.content'))	


// encBox($('.content'))




// var packBox = (function() {
//   function init() {	
//     encBox()		//调用主函数
//     $(window).resize(function(){
//       encBox()	//窗口触发调用
//     })
//   }

//   var encBox = (function(){

//     var $ct = $('.content'),									//容器
//       $item = $('.content .item'),							//item
//       $ctWidth = $ct.width(),									//容器宽度
//       $itemWidth = $item.outerWidth(true),					//item元素宽度
//       $ctLen =  parseInt($ctWidth / $itemWidth),				//每行几个[2次～坑点：如忘了取整，会导致屏幕宽度会撑开0.0]
//       cascadeArray = [];										//来个数组

//     for(var i=0; i<$ctLen ;i++){
//       cascadeArray[i] = 0;								//初始～
//     }

//     $.each($item,function(){
//       console.log(arguments)
//       var minDiv = Math.min.apply(Math,cascadeArray)		//获取数组里最小的元素～-。-
//       var minDivDix = cascadeArray.indexOf(minDiv)		//获取其下标
//       console.log(minDivDix)
//       $(this).css({										//循环到的元素将一一放到每次的最小值的后面.
//         top: cascadeArray[minDivDix],					//最小值的下标	【坑点:如无围绕数组，会无法换行0.0,】
//         left: $(this).outerWidth(true) * minDivDix,		//宽度 * 下标等于距离左边多远～
//         // opacity: 0
//       })
//       cascadeArray[minDivDix] += $(this).outerHeight(true)

//     })

//   })

//   return {			//这个函数最后返回出来的
//     返回值 : init	  //init就上面的init函数..可调用
//   }
// })()

// packBox.返回值()	//调用这个封装好的函数里面的方法0.0




