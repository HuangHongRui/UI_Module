function HideNav(tagnode) {
    this.tagnode = tagnode;
    this.start();
}

HideNav.prototype = {
    start : function(){
        var _this = this;
        var befor = 0;
        var now = 1;
        $(window).on('scroll', function() {
            var scrollTop = $(window).scrollTop();
                if (now > befor) {
                    _this.tagnode.fadeOut(500);
                    var clock = true;
                    befor = now;
                    now = scrollTop;
                    // console.log('b = '+ befor);
                    // console.log('n = '+ now);
                } else if (now <= befor){
                    _this.tagnode.fadeIn(500);
                    befor = now;
                    now = scrollTop;
                    // console.log('-b = '+ befor);
                    // console.log('-n = '+ now);
                }
        })
    }
};

new HideNav($('#nav'));