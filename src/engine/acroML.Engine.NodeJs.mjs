/**
 * AcroMLNodeJsEngine在nodejs后台工作，多用户并发，自身没有固定的LCID
 */
import AcroMLDD from "../acroML.DD.mjs";
import AcroMLEngine from '../acroML.Engine.mjs'; 

class AcroMLNodeJsEngine extends AcroMLEngine{
    readDD(ddFile){
        super.readDD(ddFile);
        return new Promise(function(resolve, reject){
            let fs = require("fs");
            //注意：readFileSync0.10.x之前版本，第二个参数是字串类型"utf16le"；之后版本，是object类型{encoding:"utf16le"}
            let buf = fs.readFileSync(ddFile);
            //console.log(buf[0],buf[1]);
            let encoding='utf8';
            let bomLen=0;
            let ddInfo=AcroMLDD.getDDByFileExt(ddFile);
            if (ddInfo){
                encoding=ddInfo.encoding;
                bomLen=ddInfo.bom.length;
            }
            else{
                if (buf.length>1 && buf[0]==0xFF && buf[1]==0xFE){
                    //utf16le格式
                    encoding='utf16le';
                    bomLen=2;
                }
                else if (buf.length>1 && buf[0]==0xFE && buf[1]==0xFF){
                    //utf16be格式
                    encoding='utf16be';
                    bomLen=2;
                }
                else if (buf.length>2 && buf[0]==0xEF && buf[1]==0xBB && buf[2]==0xBF){
                    encoding='utf8';
                    bomLen=3;
                }
            }
            let str=buf.toString(encoding,bomLen);
            //console.log(content);
            resolve({str,buf});
        });
    }
}
export default AcroMLNodeJsEngine;
export {AcroMLNodeJsEngine as NodeJsEngine}