import acroMLResources from "./acroML.Resources.mjs";
import acroMLUtils from "./acroML.Utils.mjs";
import AcroMLDD from "./acroML.DD.mjs";
let onDisplayValueLostEvents=[];
class AcroMLEngine{
    readDD(ddFile){
    }
    getDisplayValue(DDKey,LCID){
        if (!this.dd) return DDKey;
        let isFound={value:false};
        let text=this.dd.getDisplayValue(DDKey,LCID,'0',isFound);
        //console.log(DDKey,isFound);
        if (!isFound.value){
            for(let i=0;i<onDisplayValueLostEvents.length;i++){
                onDisplayValueLostEvents[i](DDKey,LCID,'0');
            }
        }
        return text;
    }
    start(ops){
        //console.log(ops);
        let self=this;
        return new Promise(function(resolve, reject){
            self.ddFile=ops.ddFile;
            if (ops.ddContentStr){
                try{
                    self.dd=AcroMLEngine.buildDD(ops.ddFile,ddContentStr);
                    resolve();
                }
                catch(e){
                    reject(e);
                }
            }
            else{
                self.readDD(ops.ddFile).then(function(ddContent){
                    //console.log('dd readed');    
                    self.dd=AcroMLEngine.buildDD(ops.ddFile,ddContent.str);
                    resolve();
                },reject);
            }
        });
    }
    static buildDD(ddFile,ddStr){
        //console.log(content);
        let ddInfo=AcroMLDD.getDDByFileExt(ddFile);
        //console.log(DDClass);
        if (!ddInfo) throw new Error(acroMLUtils.printf(acroMLResources.S_UnknownFileExt,ddFile));
        let dd=new ddInfo.class();
        dd.content=ddStr;
        dd.buildDD();
        return dd;
    }
    static onDisplayValueLost(cb){
        onDisplayValueLostEvents.push(cb);
    }
    static init(ops){
        AcroMLEngine.instance=new ops.engineClass();
        return AcroMLEngine.instance.start(ops);
    }
    static instance=null;
    static onSwitchLanguage=null;
}
export default AcroMLEngine;
export {AcroMLEngine as Engine};