/**
 * 
 */
console.log('打包acroml core-global-min...');
console.log('当前路径：',__dirname);
let _mode=['development','production'][1];
let path=require('path');
let npm_global=process.env.Node_PATH;
let path_src=path.resolve(__dirname,'../../src');
let path_dist=path.resolve(__dirname,'../../dist');
module.exports = {
  entry: {
    "acroml-core":path.resolve(path_src,"index.core.mjs"),
    "acroml":path.resolve(path_src,"index.mjs"),
  },
  output: {
    path:path.resolve(path_dist,'global/'+(_mode=='development'?'':'min')),
    filename:'[name].js',
    globalObject:'this',
    library:{
      name:"AcroML",
      type:["window","amd","umd","commonjs"][2],
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