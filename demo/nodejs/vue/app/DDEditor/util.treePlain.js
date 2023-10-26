let util_treePlain={
  expandTree2Plain(treeRows){
    let rows=[];
    function scanNodes(nodes,level){
      for(let i=0;i<nodes.length;i++){
        let node=nodes[i];
        if (!node.acroStates){
          node.acroStates={
            state:'open'
          }
        }
        node.acroStates.level=level;
        node.acroStates.index=rows.length;
        node.isVisual=node.acroStates.state=='open';
        rows.push(node);
        if (node.children){
          scanNodes(node.children,level+1);
        }
      }
    }
    scanNodes(treeRows,0);
    return rows;
  },
  sortTree2Plain(treeRows,sorts){
    let rows=[];
    function scanNodes(nodes){
      if (sorts && sorts.length>0){
        nodes.sort(function(a,b){
          let r;
          let v1=a[sorts[0].field];          
          let v2=b[sorts[0].field];
          if (v1==null||v1==undefined) v1='';
          if (v2==null||v2==undefined) v2='';
          if (sorts[0].field=='SortNumber'){
            if (v1=='') v1=-1;else v1=parseInt(v1);
            if (v2=='') v2=-1;v2=parseInt(v2);
          }
          if (v1<v2) r=-1;
          else if (v1==v2) r=0;
          else r=1;
          if (sorts[0].order=='desc') r=-r;
          return r;
        });
      }
      for(let i=0;i<nodes.length;i++){
        let node=nodes[i];
        node.acroStates.index=rows.length;
        rows.push(node);
        if (node.children) scanNodes(node.children);
      }
    }
    scanNodes(treeRows);
    //console.log(rows);
    return rows;
  },
  toggleRow(row){
    if (row.acroStates.state=='open') row.acroStates.state='closed';
    else row.acroStates.state='open';
    let root=row;
    function scanNodes(parent,children){   
      for(let i=0;i<children.length;i++){
        let node=children[i];
        node.isVisual=root.acroStates.state=='open' && parent.acroStates.state=='open';
        if (node.children) scanNodes(node,node.children);
      }
    }
    if (row.children) scanNodes(row,row.children);
  },
  expandAll(rows){
    for(let i=0;i<rows.length;i++){
      let node=rows[i];
      node.acroStates.state='open';
      node.isVisual=true;
    }
  },
  collapseAll(rows){
    for(let i=0;i<rows.length;i++){
      let node=rows[i];
      node.acroStates.state='closed';
      node.isVisual=node.parent?false:true;
    }
  },
}
export default util_treePlain;