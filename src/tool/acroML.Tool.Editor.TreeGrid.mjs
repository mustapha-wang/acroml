import acroMLTool from './acroML.Tool.mjs';
import acroMLCulture from '../acroML.Culture.mjs';
let acroMLTreeGridEditor={
    read(jsonStr){
        let data=JSON.parse(jsonStr);
        for(let i=0;i<data.displayValueColumns.length;i++){
            //修正一下lng
            let LCID=data.displayValueColumns[i].lng.LCID;
            let lng=acroMLCulture.findCultureByLCID(LCID);
            data.displayValueColumns[i].lng=lng;
        }
        let total=0;
        let rows_byDDKey={};
        function scanRows(rows){
            total=total+rows.length;
            for(let i=0;i<rows.length;i++){
                let row=rows[i];
                rows_byDDKey[row.DDKey]=row;
                if (row.children) scanRows(row.children);
            }
        }
        scanRows(data.rows);
        return {
            total,
            displayValueColumns:data.displayValueColumns,
            rows:data.rows,
            rows_byDDKey:rows_byDDKey
        }
    },
    write(treeGridDD){
        let data={displayValueColumns:treeGridDD.displayValueColumns,rows:[]};
        function scanNodes(newParent,oldNodes){
            for(let i=0;i<oldNodes.length;i++){
                let oldRow=oldNodes[i];
                let newRow={DDKey:oldRow.DDKey,SortNumber:oldRow.SortNumber};
                for(let j=0;j<treeGridDD.displayValueColumns.length;j++){
                    let column=treeGridDD.displayValueColumns[j];
                    let LCID=column.lng.LCID;
                    for(let k=0;k<column.SeqNos.length;k++){
                        let SeqNo=column.SeqNos[k];
                        let field=LCID+'-'+SeqNo;
                        newRow[field]=oldRow[field];
                    }
                }
                if (newParent) newParent.children.push(newRow);
                else data.rows.push(newRow);
                if (oldRow.children && oldRow.children.length>0){
                    newRow.children=[];
                    scanNodes(newRow,oldRow.children);
                }
            }
        }
        scanNodes(null,treeGridDD.rows);
        let str=JSON.stringify(data,function(k,v){
            if (v==null || v==undefined) return '';
            else return v;
        },2);//换行并缩进2个空格
        return str;
    }
}
export default acroMLTreeGridEditor;
acroMLTool.registerEditor('.treegrid.json',acroMLTreeGridEditor);
let treeGridEditor=acroMLTreeGridEditor;
export {treeGridEditor};