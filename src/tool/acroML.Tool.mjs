import acroMLCulture from '../acroML.Culture.mjs';
import acroMLResources from "../acroML.Resources.mjs";
import acroMLUtils from '../acroML.Utils.mjs';
import AcroMLDD from '../acroML.DD.mjs';
let editors={};
let acroMLTool={
  registerEditor(fileExt,editor){
    editors[fileExt]=editor;
  },
  getEditorByFileExt(ddFile){
    for(let key in editors){
      let ext=ddFile.substr(ddFile.length-key.length);
      if (ext==key) return editors[key];
    }
  },
  /**
   * 合并两本字典，把newData合并到oldData里
   * @param {object(displayValueColumns,rows)} oldData 
   * @param {object(displayValueColumns,rows)} newData 
   * @param {object(isAddColumn,isAddDDKey)} ops 
   */
  mergeDD(oldData,newData,ops){
    let ops0={isAddColumn:true,isAddDDKey:true};
    ops=Object.assign(ops0,ops);
    if (ops.isAddColumn==true){
      for(let i=0;i<newData.displayValueColumns.length;i++){
        let newColumn=newData.displayValueColumns[i];
        let isFound=false;
        let oldColumn;
        for(let j=0;j<oldData.displayValueColumns.length;j++){
          oldColumn=oldData.displayValueColumns[j];
          if (newColumn.lng.LCID==oldColumn.lng.LCID){
            isFound=true;
            break;
          }
        }
        if (!isFound){
          let lng=acroMLCulture.findCultureByLCID(newColumn.lng.LCID);
          oldColumn={lng,SeqNos:[]}
          oldData.displayValueColumns.push(oldColumn);
        }
        
        for(let j=0;j<newColumn.SeqNos.length;j++){
          isFound=false;
          for(let k=0;k<oldColumn.SeqNos.length;k++){
            if (newColumn.SeqNos[j]==oldColumn.SeqNos[k]){
              isFound=true;
              break;
            }
          }
          if (!isFound){
            oldColumn.SeqNos.push(newColumn.SeqNos[j]);
          }
        }
      }
    }
    function scanNodes(newParent,newRows){
      for(let i=0;i<newRows.length;i++){
        let newRow=newRows[i];
        let oldRow=oldData.rows_byDDKey[newRow.DDKey];
        if (!oldRow && (ops.isAddDDKey==true)){
          oldRow={DDKey:newRow.DDKey,
            isVisual:true,
            tmStates:{level:0,state:'open'},
            children:[]
          }
          oldData.rows_byDDKey[newRow.DDKey]=oldRow;
          let oldParent;
          if (newParent){
            oldParent=oldData.rows_byDDKey[newParent.DDKey];
          }
          if (oldParent){
            oldRow.tmStates.level=oldParent.level+1;
            if (!oldParent.children) oldParent.children=[];
            oldParent.children.push(oldRow);
          }
          else oldData.rows.push(oldRow);
        }
        if (oldRow){
          for(let j=0;j<oldData.displayValueColumns.length;j++){
            let oldColumn=oldData.displayValueColumns[j];
            for(let k=0;k<oldColumn.SeqNos.length;k++){
              let key=oldColumn.lng.LCID+'-'+oldColumn.SeqNos[k];
              let oldValue=oldRow[key];
              if (oldValue==undefined || oldValue==null || oldValue==''){
                let newValue=newRow[key];
                if (newValue!=undefined && newValue!=null && newValue!=''){
                  oldRow[key]=newValue;
                }
              }
            }
          }
        }
        if (newRow.children) scanNodes(newRow,newRow.children);
      }
    }
    scanNodes(null,newData.rows);
  },
  /**
   * 浏览器中读取字典文件，按扩展名使用不同的解析函数。
   * @param {*} fileBlob 
   * @param {*} success 
   */
  readFile(fileBlob,success){
    let reader = new FileReader();
    reader.readAsText(fileBlob,"UTF-8");
    //reader.readAsBinaryString(fileBlob);
    //reader.readAsArrayBuffer(fileBlob);
    reader.onload = function (e) { 
      //用readAsText(files[0],"UTF-8")为何能正确读取lng文件（ucs-2/utf16le）,BOM也去掉了
      //console.log(e);
      let content = e.target.result;
      let ddEditor=acroMLTool.getEditorByFileExt(fileBlob.name);
      if (!ddEditor) throw new Error(acroMLUtils.printf(acroMLResources.S_UnknownFileExt,fileBlob.name));
      let data=ddEditor.read(content);
      success(data);
    }
  },
  writeFile(treeGridDD,ddFile){
    let ddEditor=acroMLTool.getEditorByFileExt(ddFile);
    let str=ddEditor.write(treeGridDD);
    let ddInfo=AcroMLDD.getDDByFileExt(ddFile);
    let data;
    let encoding=ddInfo.encoding;
    if (encoding=='utf16le'){
      data=acroMLUtils.str_ucs2(str,true);
    }
    else{
      data=str;
    }
    const urlObject = window.URL || window.webkitURL || window;
    const export_blob = new Blob([data],{type:'application/json,charset=utf-8;'});
    const save_link = document.createElement('a');
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = ddFile;
    save_link.click();
    //console.log(save_link.href);
    save_link.remove();
    URL.revokeObjectURL(save_link.href);
  }
}
export default acroMLTool;
let tool=acroMLTool;
export {tool};