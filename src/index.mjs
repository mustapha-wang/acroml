/**
 * 命名规则：首字母，类别大写，实例小写
 */
import resources from "./acroML.Resources.mjs";
import utils from "./acroML.Utils.mjs";
import culture from "./acroML.Culture.mjs";
import DD from "./acroML.DD.mjs";
import Engine from "./acroML.Engine.mjs";

import CSVText from "./dd/acroML.CSVText.mjs";
import CSVTextDD from "./dd/acroML.DD.CSVText.mjs";
import TreeGridDD from "./dd/acroML.DD.TreeGrid.mjs";
import PlainTableDD from "./dd/acroML.DD.PlainTable.mjs";

import htmlTagMethod from "./html/acroML.HTML.TagMethod.mjs";
import htmlRegister from "./html/acroML.HTML.TagMethod.Register.mjs";
import htmlTranslator from "./html/acroML.HTML.Translator.mjs";

import BrowserEngine from "./engine/acroML.Engine.Browser.mjs";
import NodeJsEngine from "./engine/acroML.Engine.NodeJs.mjs";

import tool from "./tool/acroML.Tool.mjs";
import ddKeyCatcher from "./tool/acroML.Tool.DDKeyCatcher.mjs";
import chinese from "./tool/acroML.Tool.Chinese.mjs";
import csvEditor from "./tool/acroML.Tool.Editor.CSV.mjs";
import plainTableEditor from "./tool/acroML.Tool.Editor.PlainTable.mjs";
import treeGridEditor from "./tool/acroML.Tool.Editor.TreeGrid.mjs";

import easyUI from "./easyui/acroML.EasyUI.mjs";
import buildHTMLSelector from "./selector/acroML.Selector.HTML.mjs";
import ReactSelector from "./selector/acroML.Selector.React.mjs";
import VueSelector from "./selector/acroML.Selector.Vue.mjs";

let t=function(DDKey){return Engine.instance.getDisplayValue(DDKey);}
let AcroML={
    resources,
    utils,
    culture,
    DD,
    Engine,

    CSVText,
    CSVTextDD,
    PlainTableDD,
    TreeGridDD,

    BrowserEngine,
    NodeJsEngine,

    htmlTagMethod,
    htmlTranslator,

    tool,
    ddKeyCatcher,
    chinese,
    csvEditor,
    plainTableEditor,
    treeGridEditor,

    easyUI,
    ReactSelector,
    VueSelector,
    buildHTMLSelector,
    t
}
export default AcroML;
export {
    resources,
    utils,
    culture,
    DD,
    Engine,

    CSVText,
    CSVTextDD,
    PlainTableDD,
    TreeGridDD,
    
    BrowserEngine,
    NodeJsEngine,

    htmlTagMethod,
    htmlTranslator,

    tool,
    ddKeyCatcher,
    chinese,
    csvEditor,
    plainTableEditor,
    treeGridEditor,

    easyUI,
    ReactSelector,
    VueSelector,
    buildHTMLSelector,
    t
};