/**
 *  滚动条距离底部100时触发
 *  @param {String} className
 *  @param {Function} handle
 */

function getScrollTop(className) {
    let scrollTop;
    if (className) {
        scrollTop = document.querySelector(className).scrollTop;
    } else {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

function getWindowHeight(className) {
    let windowHeight;
    if (className) {
        windowHeight = document.querySelector(className).clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

function getScrollHeight(className) {
    let scrollHeight;
    if (className) {
        scrollHeight = document.querySelector(className).scrollHeight;
    } else {
        scrollHeight = document.body.scrollHeight;
    }
    return scrollHeight;
}

function onLazyLoad(className, handle) {
    const scrollTopWindowHeight = getScrollTop(className) + getWindowHeight(className);
    const scrollHeight = getScrollHeight(className) - 100;
    if (scrollTopWindowHeight >= scrollHeight) {
        handle();
    }
}

export { onLazyLoad };