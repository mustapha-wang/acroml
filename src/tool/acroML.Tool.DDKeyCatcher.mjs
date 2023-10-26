
import AcroMLEngine from '../acroML.Engine.mjs';
import acroMLCulture from '../acroML.Culture.mjs';
let lostDDKeys={};
let acroMLDDKeyCatcher={
    lost:function(DDKey,LCID,SeqNo){
        // let key=DDKey+'\u0009'+LCID+'\u0009'+SeqNo;            
        // if (!DDKeys[key]) DDKeys[key]={DDKey,LCID,SeqNo};
        let d=lostDDKeys[DDKey];
        if (!d){
            d={};
            lostDDKeys[DDKey]=d;
        }
        let l=d[LCID];
        if (!l){
            l={};
            d[LCID]=l;
        }
        l[SeqNo]={DDKey,LCID,SeqNo};
    },
    getData:function(){
        let columns=[];
        let rows=[];
        let rows_byDDKey={};
        for(let DDKey in lostDDKeys){
            let d=lostDDKeys[DDKey];
            let row={DDKey}
            for(let LCID in d){
                let isFound=false;
                let column;
                for(let i=0;i<columns.length;i++){
                    column=columns[i];
                    if (column.lng.LCID==LCID){
                        isFound=true;
                        break;
                    }
                }
                if (!isFound){
                    let lng=acroMLCulture.findCultureByLCID(LCID);
                    column={lng,SeqNos:[]}
                    columns.push(column);
                }
                let l=d[LCID];
                for(let SeqNo in l){
                    isFound=false;
                    for(let j=0;j<column.SeqNos.length;j++){
                        if (column.SeqNos[j]==SeqNo){
                            isFound=true;
                            break;
                        }
                    }
                    if (!isFound) column.SeqNos.push(SeqNo);
                    row[LCID+'-'+SeqNo]='';
                }
            }
            rows.push(row);
            rows_byDDKey[DDKey]=row;
        }
        return {
            total:rows.length,
            displayValueColumns:columns,
            rows,
            rows_byDDKey:rows_byDDKey
        };
    }
}
export default acroMLDDKeyCatcher;
AcroMLEngine.onDisplayValueLost(function(DDKey,LCID,SeqNo){
    acroMLDDKeyCatcher.lost(DDKey,LCID,SeqNo);
});
let ddKeyCatcher=acroMLDDKeyCatcher;
export {ddKeyCatcher};