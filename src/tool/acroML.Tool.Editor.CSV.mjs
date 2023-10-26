/**
 * 转成easyui treegrid需要的格式，便于编辑
 */
import AcroMLCSVText from '../dd/acroML.CSVText.mjs';
import acroMLCulture from '../acroML.Culture.mjs';
import acroMLTool from './acroML.Tool.mjs';
function encodeStr(Source,AQuoteChar='"'){
    let Result=AQuoteChar;
    if (Source){
        for(let i=0;i<Source.length;i++){
            let P=Source[i];
            if (P==AQuoteChar) Result=Result+AQuoteChar+AQuoteChar;
            else if (P=='\r') Result=Result+"%n";//js回车,delphi是用%n
            else if (P=='\n') Result=Result+"%c";//js换行,delphi是用%c
            else if (P=='\u0000') Result=Result+"%0";
            else if (P=='%') Result=Result+"%%";
            else Result=Result+P;
        }
    }
    Result=Result+AQuoteChar;
    return Result;
}

let acroMLCSVEditor={
    read:function(csvStr){
        let parser=new AcroMLCSVText();
        parser.content=csvStr;
        let aFields=[];
        let aRows=[];
        let oDisplayValueColumns={};
        parser.parse(function(SL){
            //console.log(SL);
            for(let i=0;i<SL.length;i++){
                aFields.push(SL[i]);
            }
        },function(SL){
            let row={};
            for(let i=0;i<SL.length;i++){
                row[aFields[i]]=SL[i];
            }
            //console.log(row);
            let SeqNos=oDisplayValueColumns[row.LCID];
            if (!SeqNos){
                SeqNos=[];
                oDisplayValueColumns[row.LCID]=SeqNos;
            }
            let isFound=false;
            for(let i=0;i<SeqNos.length;i++){
                if (SeqNos[i]==row.SeqNo){
                    isFound=true;
                    break;
                }
            }
            if (!isFound) SeqNos.push(row.SeqNo);
            aRows.push(row);
        });
        
        let oRows={};
        for(let i=0;i<aRows.length;i++){
            let row=aRows[i];
            if (row.DDKey=='') continue;
            let row2=oRows[row.DDKey];
            if (!row2){
                oRows[row.DDKey]=row;
                row2=row;
                row2.children=[];
            }
            let key=row.LCID+'-'+row.SeqNo;
            row2[key]=row['DisplayValue'];
            delete row.DisplayValue;
            delete row.LCID;
            delete row.SeqNo;
        }
        //按CatalogID构建树,把根节点加入列表
        let total=0;
        let roots=[];
        for(let DDKey in oRows){
            total++;
            let row=oRows[DDKey];
            let parent=oRows[row.CatalogID];
            if (parent && (parent!=row)){
                row.parent=parent;
                parent.children.push(row);
            }
            else{
                roots.push(row);
            }
            delete row.CatalogID; 
        }
        
        //console.log(aRows2.length);
        let aDisplayValueColumns=[];
        for(let LCID in oDisplayValueColumns){
            let lng=acroMLCulture.findCultureByLCID(LCID);
            aDisplayValueColumns.push({lng,SeqNos:oDisplayValueColumns[LCID]});
        }
        return {
            displayValueColumns:aDisplayValueColumns,
            total,
            rows:roots,
            rows_byDDKey:oRows
        }
    },
    _write(treeGridDD){
        let content='"DDKey","SortNumber","LCID","SeqNo","DisplayValue","CatalogID",';
        function scanNodes(parent,rows){
            for(let i=0;i<rows.length;i++){
                let row=rows[i];
                let isRowEmpty=true;
                for(let j=0;j<treeGridDD.displayValueColumns.length;j++){
                    let column=treeGridDD.displayValueColumns[j];
                    for(let k=0;k<column.SeqNos.length;k++){
                        let SeqNo=column.SeqNos[k];
                        let LCID=column.lng.LCID;
                        let key=column.lng.LCID+'-'+SeqNo;
                        let DisplayValue=row[key];
                        if (!DisplayValue||DisplayValue==''){
                            if (isRowEmpty && (j==treeGridDD.displayValueColumns.length-1) && (k==column.SeqNos.length-1)){
                                //整行为空，保留简体中文
                                LCID=2052;
                            }
                            else continue;
                        }
                        isRowEmpty=false;
                        content=content+'\r\n';
                        content=content+encodeStr(row.DDKey)+',';
                        content=content+encodeStr(row.SortNumber)+',';
                        content=content+encodeStr(LCID.toString())+',';
                        content=content+encodeStr(SeqNo)+',';
                        content=content+encodeStr(DisplayValue)+',';
                        let CatalogID='';
                        if (parent) CatalogID=parent.DDKey;
                        content=content+encodeStr(CatalogID)+',';
                    }
                }
                if (row.children) scanNodes(row,row.children);
            }
        }
        scanNodes(null,treeGridDD.rows);
        return content;
    },
    write(treeGridDD){
        let content=acroMLCSVEditor._write(treeGridDD);
        return content;
    }
}
export default acroMLCSVEditor;
acroMLTool.registerEditor('.lng',acroMLCSVEditor);
acroMLTool.registerEditor('.csv.txt',acroMLCSVEditor);
let csvEditor=acroMLCSVEditor;
export {csvEditor};