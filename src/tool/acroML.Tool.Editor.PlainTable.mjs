import acroMLTool from './acroML.Tool.mjs';
import acroMLCulture from '../acroML.Culture.mjs';
let acroMLPlainTableEditor={
    read(jsonStr){
        let data=JSON.parse(jsonStr);
        let rows_byDDKey={};
        let total=data.rows.length;
        for(let i=0;i<data.rows.length;i++){
            let row=data.rows[i];
            let row2={};
            for(let j=0;j<data.meta.length;j++){
                row2[data.meta[j]]=row[j];
            }
            rows_byDDKey[row2.DDKey]=row2;
        }
        for(let DDKey in rows_byDDKey){
            let row=rows_byDDKey[DDKey];
            let CatalogID=row['CatalogID'];
            let parent=rows_byDDKey[CatalogID];
            if (parent){
                row.parent=parent;
                if (!parent.children) parent.children=[];
                parent.children.push(row);
            }
        }
        let rows=[];
        for(let DDKey in rows_byDDKey){
            let row=rows_byDDKey[DDKey];
            if (!row.parent){
                rows.push(row);
            }
        }
        let displayValueColumns=[];
        for(let i=0;i<data.meta.length;i++){
            let field=data.meta[i];
            if (field=='CatalogID' || field=='DDKey' || field=='SortNumber') continue;
            let parts=field.split('-');
            if (parts.length!=2) continue;
            let LCID=parts[0];
            if (isNaN(parseFloat(LCID))|| Number.isFinite(LCID)) continue;
            LCID=parseInt(LCID);
            let isFound=false;
            let column;
            for(let j=0;j<displayValueColumns.length;j++){
                column=displayValueColumns[j]
                if (column.lng.LCID==LCID){
                    isFound=true;
                    break;
                }
            }
            if (!isFound){
                let lng=acroMLCulture.findCultureByLCID(LCID);
                column={lng,SeqNos:[]}
                displayValueColumns.push(column);
            }
            let SeqNo=parts[1];
            isFound=false;
            for(let j=0;j<column.SeqNos.length;j++){
                if (column.SeqNos[j]==SeqNo){
                    isFound=true;
                    break;
                }
            }
            if (!isFound) column.SeqNos.push(SeqNo);
        }
        return {
            displayValueColumns:displayValueColumns,
            total,
            rows:rows,
            rows_byDDKey:rows_byDDKey
        }
    },
    write:function(treeGridDD){
        let meta=['CatalogID','DDKey','SortNumber'];
        for(let i=0;i<treeGridDD.displayValueColumns.length;i++){
            let column=treeGridDD.displayValueColumns[i];
            for(let j=0;j<column.SeqNos.length;j++){
                meta.push(column.lng.LCID+'-'+column.SeqNos[j]);
            }
        }
        let rows=[];
        function scanRow(row0,catalogID){
            let row=[catalogID];
            for(let col=1;col<meta.length;col++){
                row.push(row0[meta[col]]);
            }
            rows.push(row);
            if (row0.children){
                //console.log('child',row0.children.length);
                for(let i=0;i<row0.children.length;i++){
                    scanRow(row0.children[i],row0.DDKey);
                }
            }
        }
        //console.log(treeGridDD.rows.length);
        for(let i=0;i<treeGridDD.rows.length;i++){
            let row0=treeGridDD.rows[i];
            scanRow(row0);
        }
        let data={meta,rows}
        let str=JSON.stringify(data,function(k,v){
            if (v==null || v==undefined) return '';
            else return v;
        },2);
        return str;
    }
}
export default acroMLPlainTableEditor;
acroMLTool.registerEditor('.plaintable.json',acroMLPlainTableEditor);
let plainTableEditor=acroMLPlainTableEditor;
export {plainTableEditor};