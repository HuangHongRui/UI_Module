/**
 *  
 *  统一字符长度（中文|全角|半角）
 *  @author Leo <464362353@qq.com>
 *  @param  {String} str
 *  @param  {Number} len
 *  @returns {String | Boolean} 超限制:字符串 | 没超限制:True
 */
export default function charsLen(str, len) {

    const 中文 = new RegExp('[\u4e00-\u9fa5]');
    const 半角 = new RegExp('[\u0000-\u00ff]');
    const 全角 = (item) => item && item.charCodeAt() > 128;
    let strCharsLength = 0;
    let splitLen = false;

    for (let i = 1; i <= str.length; i++) {

        const tagChars = str[i];

        if (全角(tagChars)) {

            strCharsLength += 2;

        } else if (中文.test(tagChars)) {

            strCharsLength += 2;

        } else if (半角.test(tagChars)) {

            strCharsLength += 1;

        } else {

            strCharsLength += 1;

        }

        if (strCharsLength === len) {

            splitLen = i;
            break;

        } else if (strCharsLength > len) {

            splitLen = i - 1;
            break;

        }

    }

    if (!splitLen) return true;
    return (str.slice(0, splitLen) + '...');

}