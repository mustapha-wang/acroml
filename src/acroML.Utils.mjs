let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
let acroMLUtils={
    base64ToBuf:function(base64Data) {
        // base64Data.
        let equalCount = base64Data.match(/=/g) || 0;
        base64Data = base64Data.replace(/=/g, '');
        let len = base64Data.length;
        let mod = len % 4;
        let sum = Math.floor(len / 4);
        let idx = 0;
        let moreLen = 0;
        if (equalCount && equalCount.length == 1) moreLen = 2;
        if (equalCount && equalCount.length == 2) moreLen = 1;
        let buf = new Uint8Array(sum * 3 + moreLen);
        for (let i = 0; i < sum * 4; i += 4) {
            let char0 = base64Data[i];
            let char1 = base64Data[i + 1];
            let char2 = base64Data[i + 2];
            let char3 = base64Data[i + 3];
            let charIdx0 = base.indexOf(char0);
            let charIdx1 = base.indexOf(char1);
            let charIdx2 = base.indexOf(char2);
            let charIdx3 = base.indexOf(char3);
            if (charIdx0 == -1 || charIdx1 == -1 || charIdx2 == -1 || charIdx3 == -1) {
                continue;
            }
            // byte1 = 
            // 后6 前2
            buf[idx++] = (charIdx0 << 2) | (charIdx1 >> 4 & 0x03);
            buf[idx++] = (charIdx1 << 4) | (charIdx2 >> 2 & 0x0f);
            buf[idx++] = (charIdx2 << 6) | (charIdx3 & 0x3f);
        }
        if (equalCount && equalCount.length > 0) {
            if (equalCount.length == 1) {
                let charIdx0 = base.indexOf(base64Data[base64Data.length - 3]);
                let charIdx1 = base.indexOf(base64Data[base64Data.length - 2]);
                let charIdx2 = base.indexOf(base64Data[base64Data.length - 1]);
                // 一个等号说明有三位码，18bit(实16bit) 可以合成2位 
                buf[buf.length - 2] = (charIdx0 << 2) | (charIdx1 >> 4);
                buf[buf.length - 1] = (charIdx1 << 4) | (charIdx2 >> 2);
            } else if (equalCount.length == 2) {
                // 一个等号说明有二位码，可以合成1位
                let charIdx0 = base.indexOf(base64Data[base64Data.length - 2]);
                let charIdx1 = base.indexOf(base64Data[base64Data.length - 1]);
                buf[buf.length - 1] = (charIdx0 << 2) | (charIdx1 >> 4);
            }
        }
        return buf;
    },
    encodeBase64(str){
        function padEnd(str, len, prefix) {
            return (str + (new Array(len + 1)).join(prefix)).slice(0, len);
        }
        function padStart(str, len, prefix) {
            return ((new Array(len + 1).join(prefix)) + str).slice(-len);
        }
        let byteStr = ''
        for(let ch of encodeUtf8(str)){ 
            byteStr = byteStr + padStart(ch.toString(2),8,0);
        }
        let rest = byteStr.length % 6 // 余2 就是剩下了一个字节，余 4 就是剩下两个字节
        let restStr = rest === prefixTwo ? '==' :'=';
        let prefixzero = rest === prefixTwo ? prefixfour: prefixTwo;
        byteStr = padEnd(byteStr , byteStr.length + prefixzero,'0');
        return byteStr.match(/(\d{6})/g).map(val=>parseInt(val,2)).map(val=>CHARTS[val]).join('') + restStr;
    },
    decodeBase64(str) {
            let [...restStr] = str.replace(/=/g,'')
            restStr = restStr.map((item)=> {
            let value = CHARTS.indexOf(item);
            return padStart(value.toString(2),6,0);
            }).join('').match(/(\d{8})/g).map((item)=>parseInt(item,2).toString(16)).join();
            console.log(restStr);
            return restStr;
    },
    //https://qa.1r1g.com/sf/ask/1021465511/
    ucs2_str_8:function(uint8Array) {
        let uint16Array = new Uint16Array(uint8Array.length/2);
        for( let i = 0; i < uint8Array.length; i+=2) {
            uint16Array[i/2]=(uint8Array[i] | ( uint8Array[i+1] << 8 ));
        }
        return this.ucs2_str_16(uint16Array); 
    },
    ucs2_str_16:function(uint16Array) {
        let a=new Array(uint16Array.length);
        for(let i=0;i<uint16Array.length;i++) a[i]=String.fromCharCode(uint16Array[i]);
        return a.join('');
        //用apply时，如果数组超过200k，会报错RangeError: Maximum call stack size exceeded
        //return String.fromCharCode.apply(String,cp);
    },
    ucs2_str_buffer:function(arrayBuffer) {
        let uint16Array=new Uint16Array(arrayBuffer);
        return this.ucs2_str_16(uint16Array);
    },
    /**
     * 把js字符串（UTF-8）转成UCS-2格式（UTF-16LE，兼容Delphi的WideString）
     * @param {*} str 
     * @returns 
     */
    str_ucs2:function(str,isAddBOM=true){
        let len=str.length*2;
        if (isAddBOM) len=len+2;
        let buf = new ArrayBuffer(len); // 每个字符占用2个字节
        let bufView = new Uint16Array(buf);
        let index=0;
        if (isAddBOM){
            bufView[0]=0xFEFF;//BOM
            index=index+1;
        }
        for (let i=0, strLen=str.length; i<strLen; i++) {
            bufView[index+i] = str.charCodeAt(i);
        }
        return bufView;
    },
    /**
     * 把字符串转成utf-8编码。
     * 兼容ECS5，用charCodeAt函数，不能处理某些特定的4字节的字符，比如：🀢🀣🀤🀥🀦🀧🀨🀩
     * @param {*} str 字符串
     * @returns Array类型数组
     */
    str_utf8_1:function(str) {
        let utf8Arr = [];
        let byteSize = 0;
        for (let i = 0; i < str.length; i++) {
            //获取字符Unicode码值
            let code = str.charCodeAt(i);
            //如果码值是1个字节的范围，则直接写入
            if (code >= 0x00 && code <= 0x7f) {
                byteSize += 1;
                utf8Arr.push(code);
                //如果码值是2个字节以上的范围，则按规则进行填充补码转换
            } else if (code >= 0x80 && code <= 0x7ff) {
                byteSize += 2;
                utf8Arr.push((192 | (31 & (code >> 6))));
                utf8Arr.push((128 | (63 & code)))
            } else if ((code >= 0x800 && code <= 0xd7ff)
                || (code >= 0xe000 && code <= 0xffff)) {
                byteSize += 3;
                utf8Arr.push((224 | (15 & (code >> 12))));
                utf8Arr.push((128 | (63 & (code >> 6))));
                utf8Arr.push((128 | (63 & code)))
            } else if(code >= 0x10000 && code <= 0x10ffff ){
                byteSize += 4;
                utf8Arr.push((240 | (7 & (code >> 18))));
                utf8Arr.push((128 | (63 & (code >> 12))));
                utf8Arr.push((128 | (63 & (code >> 6))));
                utf8Arr.push((128 | (63 & code)))
            }
            else{
                throw new Error('can`t deal code:'+code);
            }
        }
        return utf8Arr;
    },
    /**
     * 把字符串转成utf-8编码。利用浏览器自带的TextEncoder元件。
     * 能处理全部特定4字节的字符，比如：🀢🀣🀤🀥🀦🀧🀨🀩
     * @param {*} str 字符串
     * @returns Uint8Array类型数组
     */
    str_utf8_2(str){
        let encoder = new TextEncoder();
        let uint8Array = encoder.encode(str);
        return uint8Array;
    },
    utf8_str_2(uint8Array){
        let decoder = new TextDecoder();
        let str = decoder.decode(uint8Array,{
            fatal:true,
            ignoreBOM:false
        });
        return str;
    },
    /**
     * 把字符串转成utf-8编码。兼容ECS6，用codePointAt函数。
     * 能处理全部特定4字节的字符，比如：🀢🀣🀤🀥🀦🀧🀨🀩
     * @param {*} str 字符串
     * @returns Array类型数组
     */
    str_utf8_3(str) {
        let bytes = [];
        for (let ch of str) {
            // for...of循环，能正确识别 32 位的 UTF-16 字符
            let code = ch.codePointAt(0);
            if (code >= 0x10000 && code <= 0x10ffff) {// 位运算， 补齐8位
                bytes.push((code >> 18) | 0xf0);
                bytes.push(((code >> 12) & 0x3f) | 0x80);
                bytes.push(((code >> 6) & 0x3f) | 0x80);
                bytes.push((code & 0x3f) | 0x80);
            } else if (code >= 0x800 && code <= 0xffff) {
                bytes.push((code >> 12) | 0xe0);
                bytes.push(((code >> 6) & 0x3f) | 0x80);
                bytes.push((code & 0x3f) | 0x80);
            } else if (code >= 0x80 && code <= 0x7ff) {
                bytes.push((code >> 6) | 0xc0);
                bytes.push((code & 0x3f) | 0x80);
            } else {
                bytes.push(code);
            }
        }
        return bytes;
    },
    utf8_str_3(bytes) {
        function padStart(str, len, prefix) {
            return ((new Array(len + 1).join(prefix)) + str).slice(-len); //也可用 new Array(len+1).fill(0)
        }
        let strValue = ''
        for (let i = 0; i < bytes.length; ) {
            let code = bytes[i];
            let code1, code2, code3, code4, hex;
            if ((code & 0xf0) == 0xf0) {
                code1 = (code & 0x03).toString(2);
                code2 = padStart((bytes[i + 1] & 0x3f).toString(2),6, '0');
                code3 = padStart((bytes[i + 2] & 0x3f).toString(2),6, '0');
                code4 = padStart((bytes[i + 3] & 0x3f).toString(2),6, '0');
                hex = parseInt((code1 + code2 + code3 + code4),2);
                strValue = strValue + String.fromCodePoint(hex);
                i = i + 4;
            } else if ((code & 0xe0) == 0xe0) {
                code1 = (code & 0x07).toString(2);
                code2 = padStart((bytes[i + 1] & 0x3f).toString(2),6, '0');
                code3 = padStart((bytes[i + 2]& 0x3f).toString(2),6, '0');
                hex = parseInt((code1 + code2 + code3),2);
                strValue = strValue + String.fromCodePoint(hex);
                i = i + 3;
            } else if ((code & 0xc0) == 0xc0) {
                code1 = (code & 0x0f).toString(2);
                code2 = padStart((bytes[i + 1] & 0x3f).toString(2),6, '0');
                hex = parseInt((bytes + code2),2);
                strValue = strValue + String.fromCodePoint(hex);
                i = i + 2;
            } else {
                hex = code;
                strValue = strValue + String.fromCodePoint(code);
                i = i + 1;
            }
        }
        return strValue;
    },
    /**类似c#的format，格式化字符串，如：'DDKey "{0}" already exists.' */
    format:function(template) {
        let args = Array.prototype.slice.call(arguments, 1);
        return template.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
            ? args[number] 
            : match
            ;
        });
    },
    /**
    *  类似c语言的printf，delphi的format，nodejs的util.format
    *  格式化字符串，如：printf('I am a %s at %s.','student','shanghai')
    *  http://www.webtoolkit.info/
    **/
    printf : function () {
        function convert(match, nosign){
            if (nosign) {
                match.sign = '';               
            } else {                
                match.sign = match.negative ? '-' : match.sign;               
            }                
            var l = match.min - match.argument.length + 1 - match.sign.length;         
            var pad = new Array(l < 0 ? 0 : l).join(match.pad);        
            if (!match.left) {       
                if (match.pad == "0" || nosign) {  
                    return match.sign + pad + match.argument;
                } else { 
                    return pad + match.sign + match.argument; 
                }
            } else {
                if (match.pad == "0" || nosign) {
                    return match.sign + match.argument + pad.replace(/0/g, ' ');
                } else {
                    return match.sign + match.argument + pad;
                }
            }
        }
        if (typeof arguments == "undefined") { return null; }
        if (arguments.length < 1) { return null; }
        if (typeof arguments[0] != "string") { return null; }
        if (typeof RegExp == "undefined") { return null; }
        var string = arguments[0];
        var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
        var matches = new Array();
        var strings = new Array();
        var convCount = 0;
        var stringPosStart = 0;
        var stringPosEnd = 0;
        var matchPosEnd = 0;
        var newString = '';
        var match = null;
        while (match = exp.exec(string)) {
            if (match[9]) { convCount += 1; }
            stringPosStart = matchPosEnd;
            stringPosEnd = exp.lastIndex - match[0].length;
            strings[strings.length] = string.substring(stringPosStart, stringPosEnd);
            matchPosEnd = exp.lastIndex;
            matches[matches.length] = {
                match: match[0],
                left: match[3] ? true : false,
                sign: match[4] || '',
                pad: match[5] || ' ',
                min: match[6] || 0,
                precision: match[8],
                code: match[9] || '%',
                negative: parseInt(arguments[convCount]) < 0 ? true : false,
                argument: String(arguments[convCount])
            };
        }
        strings[strings.length] = string.substring(matchPosEnd);
        if (matches.length == 0) { return string; }
        if ((arguments.length - 1) < convCount) { return null; }
        var code = null;
        var match = null;
        var i = null;
        for (i=0; i<matches.length; i++) {
            let substitution;
            if (matches[i].code == '%') { substitution = '%' }
            else if (matches[i].code == 'b') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
                substitution = convert(matches[i], true);
            }
            else if (matches[i].code == 'c') {
                matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
                substitution = convert(matches[i], true);
            }
            else if (matches[i].code == 'd') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
                substitution = convert(matches[i]);
            }
            else if (matches[i].code == 'f') {
                matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
                substitution = convert(matches[i]);
            }
            else if (matches[i].code == 'o') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
                substitution = convert(matches[i]);
            }
            else if (matches[i].code == 's') {
                matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
                substitution = convert(matches[i], true);
            }
            else if (matches[i].code == 'x') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                substitution = convert(matches[i]);
            }
            else if (matches[i].code == 'X') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                substitution = convert(matches[i]).toUpperCase();
            }
            else {
                substitution = matches[i].match;
            }
            newString += strings[i];
            newString += substitution;
        }
        newString += strings[i];
        return newString;
    }
}
acroMLUtils.str_utf8=acroMLUtils.str_utf8_3;
acroMLUtils.utf8_str=acroMLUtils.utf8_str_3;

export default acroMLUtils;
export {acroMLUtils as utils};