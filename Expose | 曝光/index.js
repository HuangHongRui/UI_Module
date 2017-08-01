

var Lazy = (function(){

    function Exposure($target, callback) {
        this.$target = $target;
        this.callback = callback;
        this.bind();
        this.check();
    }

    Exposure.prototype = {

        bind : function(){
            var _this = this;
            var lock;
            $(window).on('scroll', function(){
                if(lock) {
                    clearTimeout(lock)
                }
                lock = setTimeout(function(){
                    _this.check();
                },1000)
            })
        },
    
        check : function() {
            if(this.isShow(this.$target)){
                this.callback(this.$target);
            }
        },

        isShow : function(){
        var windowHeight = $(window).height(),
            scrollTop = $(window).scrollTop(),
            offsetTop = this.$target.offset().top,
            nodeHeight = this.$target.height();
        if(windowHeight + scrollTop > offsetTop && scrollTop < offsetTop + nodeHeight){
            return true;
        }else{
            return false;
        }
        }
    }
    
    return {
        init: function($targets, callback){
            $targets.each(function(index, target){
                new Exposure($(target), callback);
            })
        }
    }
    })();

    function showImg($img){
        var imgUrl = $img.attr('data-src');
        $img.attr('src', imgUrl);
    }

    Lazy.init($('.container img'), function($node){
        showImg($node);
    });
    
    Lazy.init($('#load'), function($node){
        $node.text( $node.text() + '被发现～');
    });

