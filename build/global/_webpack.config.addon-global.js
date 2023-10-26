/**
 * https://it.sohu.com/a/588163322_121124374
 * 外部组件如果用require，nodejs的require模组查找规则是寻找node_modules，不够灵活。
 * 而nodejs的require函数，加载的文件内部的require实现又不同，因此从外面hook require，但是不能hook内部的。
 * 所以打包用acroml_require，外部使用者需要提供这个函数
 */
console.log('打包acroml addon-global...');
console.log('当前路径：',__dirname);
let path=require('path');
let npm_global=process.env.Node_PATH;
let path_src=path.resolve(__dirname,'../../src');
let path_dist=path.resolve(__dirname,'../../dist');
let _mode=['development','production'][0];
module.exports = {
  entry: {
    "acroml-dd-plaintable":path.resolve(path_src,"dd/acroML.DD.PlainTable.mjs"),
    "acroml-dd-treegrid":path.resolve(path_src,"dd/acroML.DD.TreeGrid.mjs"),
    "acroml-csvtext":path.resolve(path_src,"dd/acroML.CSVText.mjs"),
    "acroml-dd-csvtext":path.resolve(path_src,"dd/acroML.DD.CSVText.mjs"),
    "acroml-engine-browser":path.resolve(path_src,"engine/acroML.Engine.Browser.mjs"),
    "acroml-engine-nodejs":path.resolve(path_src,"engine/acroML.Engine.NodeJs.mjs"),
    "acroml-tool":[path.resolve(path_src,"tool/tool.mjs")],
    "acroml-selector-html":path.resolve(path_src,"selector/acroML.Selector.HTML.mjs"),
    "acroml-selector-react":path.resolve(path_src,"selector/acroML.Selector.React.mjs"),
    "acroml-selector-vue":path.resolve(path_src,"selector/acroML.Selector.Vue.mjs"),
    "acroml-html":path.resolve(path_src,"html/html.mjs"),
    "acroml-easyui":path.resolve(path_src,"easyui/acroML.EasyUI.mjs"),
  },
  output: {
    path:path.resolve(path_dist,'global/'+(_mode=='development'?'':'min')),
    filename:'[name].js',
    globalObject:'this',
    library:{
      name:"AcroML",
      type:["window","amd","umd","commonjs","assign-properties"][4],
      //export:'default'
    },
  },
  resolve: {
    modules: []
  },
  //externalsType: 'commonjs',
  externalsType: 'var',
  externals:{
    "fs":"require('fs')",
    '../acroML.DD.mjs':"AcroML.DD",
    '../acroML.Resources.mjs':"AcroML.resources",
    '../acroML.Utils.mjs':"AcroML.utils",
    "../acroML.Culture.mjs":"AcroML.culture",
    "../acroML.Engine.mjs":"AcroML.Engine",
    './acroML.CSVText.mjs':"AcroML.CSVText",
    '../dd/acroML.CSVText.mjs':"AcroML.CSVText",
    '../engine/acroML.Engine.Browser.mjs':"AcroML.browserEngine",
    '../engine/acroML.Engine.NodeJs.mjs':"AcroML.nodeJsEngine",
  },
  mode:_mode
}