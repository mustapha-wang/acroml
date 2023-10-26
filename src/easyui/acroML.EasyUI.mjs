import acroMLCulture from '../acroML.Culture.mjs';
import AcroMLEngine from '../acroML.Engine.mjs';
let acroMLEasyUI={
  loadLocaleDD(rootPath,LCID){
    //使用easyui官方的翻译字典
    //console.log('LCID:',AcroMLEngine.instance.LCID);
    let tag=acroMLCulture.LCID2Tag(LCID);
    if (!tag) tag=window.navigator.language;
    //console.log('tag:',tag);
    //把zh-CN修改为zh_CN
    tag=tag.replace('-','_');
    if (tag=='en_US') tag='en';
    return new Promise(function(resolve,reject){
      let easyUIDDFile=rootPath+'easyui-lang-'+tag+'.js';
      //console.log(easyUIDDFile);
      //easyui的locale**.js是es6文件，有export语法
      //要么用支持es6的import函数，要么转成es5
      //但是用import()和require()都会被webpack打包时会翻译成require内部的模组，导致找不到此模组
      /*
      _import(easyUIDDFile).then(function(r){
        //console.log(r);
        let easyUIDD=r.default||r;
        //console.log(easyUIDD);
        //window.Locale.use(easyUIDD);//vue版本才有
        resolve(easyUIDD);
      },function(e){
        //console.log(e);
        reject(e);
      });
      */
      try{
        let easyUIDD=acroml_require(easyUIDDFile,{esVersion:6});
        resolve(easyUIDD);
      }
      catch(e){
        reject(e);
      }
    });
  },
  loadLocaleDD_acroprise:function(rootDir){
    //使用aroprise的方案，用自己的翻译字典
    let easyUIDDFile=rootDir+'easyui-lang-en.js';
    //console.log(easyUIDDFile);
    return new Promise(function(resolve,reject){
      try{
        let easyUIDD=acroml_require(easyUIDDFile,{esVersion:6});
        for(let catalog in easyUIDD){
          let dd=easyUIDD[catalog];
          for(let key in dd){
            let value=dd[key];
            if (Array.isArray(value)){
              for(let i=0;i<value.length;i++){
                value[i]=AcroMLEngine.instance.getDisplayValue(value[i]);
              }
            }
            else{
              dd[key]=AcroMLEngine.instance.getDisplayValue(value);
            }
          }
        }
        //console.log(easyUIDD);
        //window.Locale.use(easyUIDD);//vue版本才有
        resolve(easyUIDD);
      }
      catch(e){
        reject(e);
      }
    });
  }
}
export default acroMLEasyUI;
export {acroMLEasyUI as easyUI};