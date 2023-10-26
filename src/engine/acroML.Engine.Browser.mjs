/**
 * babel bug?:webpack打包后，AcroMLBrowserEngine实例访问不到祖先AcroMLEngine的静态函数buildDD
 */
import acroMLUtils from '../acroML.Utils.mjs';
import AcroMLEngine from '../acroML.Engine.mjs'; 
import acroMLCulture from '../acroML.Culture.mjs';
class AcroMLBrowserEngine extends AcroMLEngine{
  constructor(){
    super();
  }
  readDD(ddFile){
    super.readDD(ddFile);
    const async=true;
    return new Promise(function(resolve, reject){
      if (async){
        fetch(ddFile).then(function(res){
          //console.log(res);
          if (res.status!=200){
            let e=new Error(ddFile+",fetch error:" + res.statusText);
            reject(e);
          }
          else{
            //fetch的res.text()不能自动转换ucs2编码
            //let s=res.text();blob();arrayBuffer()
            /*
            res.text().then(function(str){
            resolve({str,buf:{}});
            },reject);
            */
            res.arrayBuffer().then(function(buf){
            //console.log(buf);
            let str;
            let uint8Array=new Uint8Array(buf);
            //console.log(uint8Array);
            if (uint8Array.length>1 && uint8Array[0]==0xFF && uint8Array[1]==0xFE){
              //ucs-16LE编码，去掉BOM:FEFF
              uint8Array=uint8Array.slice(2);
              str=acroMLUtils.ucs2_str_8(uint8Array);
              //console.log(str);
            }
            else{
              str=acroMLUtils.utf8_str_2(uint8Array);
            }
            //console.log(str);
            resolve({str,buf});
          },reject);
        }
      },reject);
    }
    else{
      //XMLHttpRequest能自动转换ucs2编码
      //同步不能获取到原始文件大小
      let xhr = new XMLHttpRequest();
      xhr.open("GET", ddFile, false);
      //同步不能设置responseType
      //xhr.responseType = 'arraybuffer';
      xhr.send();
      //console.log(xhr);
      if(xhr.status != 200) {
        let e=new Error(ddFile+",request error:" + xhr.statusText);
        reject(e);
      }
      else{
        let str=xhr.responseText;
        //console.log(content);
        resolve({buf:{},str});
      }
    }
  });
}
start(ops){
  if (!this.LCID){
    this.LCID=acroMLCulture.tag2LCID(window.navigator.language);
  }
return super.start(ops);
}
getDisplayValue(DDKey,LCID){
  if (LCID==undefined) LCID=this.LCID;
    return super.getDisplayValue(DDKey,LCID);
  }
}
export default AcroMLBrowserEngine;
export {AcroMLBrowserEngine as BrowserEngine}