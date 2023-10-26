/**
 * webpack的require函数都是同步，无法处理core&add-on的esm模式
 */
console.log('打包acroml core-esm...');
console.log('当前路径：',__dirname);
let _mode=['development','production'][0];
let path=require('path');
let npm_global=process.env.Node_PATH;
let path_src=path.resolve(__dirname,'../../src');
let path_dist=path.resolve(__dirname,'../../dist');
module.exports = {
  entry: {
    //"acroml-core":path.resolve(path_src,"index.core.mjs"),
    "acroml":path.resolve(path_src,"index.mjs"),
  },
  experiments: {
    outputModule: true,
  },
  output: {
    path:path.resolve(path_dist,'esm/'+(_mode=='development'?'':'min')),
    filename:'[name].mjs',
    globalObject:'this',
    library:{
      //name:"AcroML",
      type:["window","amd","umd","commonjs","module"][4],
      //export:'default'
    },
  },
  resolve: {
    modules: []
  },
  externals:{
    "fs":'commonjs fs'
  },
  mode:_mode
}