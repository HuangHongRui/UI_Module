function GoTop() {              //置顶
    this.createNode();
    this.bindEvent();
    this.hoverShow();
}
GoTop.prototype = {
    createNode : function() {
        this.target = $('<div class="goTop">T\nO\nP</div>');
        this.target.css({
            position: 'fixed',
            top: '50%' ,
            right: 0,
            transform:'translateY(-50%)',
            cursor: 'pointer',
            height:'100px',
            width: '4px',
            'line-height': '33px',
            padding: '10px',
            'border-radius': '5px 0 0 5px',
            opacity: 0.5,
            border: 'solid 2px #000',
            'border-right': 'none',
            'background-color': 'rgba(200,200,200,0.6)',
            'font-weight': 800,
            'display': 'none',
            'user-select': 'none'
    });
        $('body').append(this.target)
    },
    bindEvent : function() {
        var _this = this;
        $(window).on('scroll',function() {
            var scrollTop = $(window).scrollTop();
            if(scrollTop >= 50){
                _this.target.fadeIn(1000)
            } else {
                _this.target.fadeOut(500)
            }
        });
        _this.target.click(function() {

            $('html, body').animate({
                scrollTop:0
            }, 'slow')
        })
    },

    hoverShow : function() {
        this.target.mouseenter(()=>{
            $('#header').fadeIn(500);
        }).mouseleave(() => {
            setTimeout(()=>{
                $('#header').fadeOut(500);
            },5000)
        })
    }
};

new GoTop();





/* 无样式版

        function GoTop() {              //置顶
            this.createNode()
            this.bindEvent()
        }
        GoTop.prototype = {
            createNode : function() {
                this.target = $('<div class="goTop">Top</div>')
                $('body').append(this.target)
            },
            bindEvent : function() {
                var _this = this
                $(window).on('scroll',function() {
                    var scrollTop = $(window).scrollTop()
                    if(scrollTop > 500){
                        _this.target.fadeIn(1000)
                    } else {
                        _this.target.fadeOut(500)
                    }               
                })
                _this.target.click(function() {
                    $(window).scrollTop(0);
                })
            }
        }

        return GoTop
    })



*/