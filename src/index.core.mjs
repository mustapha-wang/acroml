/**
 * 命名规则：首字母，类别大写，实例小写。
 * acroml_require是为了addon方便访问acroml-core，外部可以不遵循nodejs自己的require的node_modules查找规则
 * 
 */
if (typeof global!='undefined' && typeof global.acroml_require=='undefined'){
    //在nodejs下global.require是未定义，require才有定义。
    //如果不先给global.acroml_require赋值，直接对acroml_require赋值，会报错说acroml_require未定义
    //console.log('global:',typeof global.require, typeof require);
    global.acroml_require=global.require;
}
if (typeof globalThis!='undefined' && typeof globalThis.acroml_require=='undefined'){
    //console.log('globalThis:',typeof globalThis.require,typeof require);
    globalThis.acroml_require=globalThis.require;
}
if (typeof window!='undefined' && typeof window.acroml_require=='undefined'){
    //console.log('window:',typeof window.require,typeof require);
    window.acroml_require=window.require;
}
if (typeof acroml_require=='undefined' && typeof require!='undefined'){
    acroml_require=require;
}

import resources from "./acroML.Resources.mjs";
import utils from "./acroML.Utils.mjs";
import culture from "./acroML.Culture.mjs";
import DD from "./acroML.DD.mjs";
import Engine from "./acroML.Engine.mjs";
let t=function(DDKey){return Engine.instance.getDisplayValue(DDKey);}
let AcroML={
    resources,
    utils,
    culture,
    DD,
    Engine,
    t
}
export default AcroML;
export {
    resources,
    utils,
    culture,
    DD,
    Engine,
    t
};