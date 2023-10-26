/**
 * to-do:
 * （1）分LCID存储成不同文件；
 * （2）用chrome插件直接把文件写到某个目录下
 * （3）字典从后台数据库读写
 */
import ComSelectLCID from './com.selectLCID.js';
import ComEditRow from './com.editRow.js';
import util_treePlain from './util.treePlain.js';

let PageDD={
  setup(){
    //use不能放在文件顶部，已经加载的js文件，第二次不会执行，但是window app已经重建了
    //window.app.use(EasyUI);
  },
  created(){
    // this.$messager.ok=this.t('OK');
    // this.$messager.cancel=this.t('Cancel');
    
  },
  beforeUpdate(){

  },
  mounted(){
    let self=this;
    function loadDefaultDD(){
      let editor=AcroML.tool.getEditorByFileExt(AcroML.Engine.instance.ddFile);
      let ddStr=AcroML.Engine.instance.dd.content;
      self.ddFile=AcroML.Engine.instance.ddFile;
      return editor.read(ddStr);
    }
    let dd=loadDefaultDD();
    this.displayDD(dd);
  },
  data(){
    const default_opts={
      rawTreeRows:[],
      rawTreeRows_byDDKey:{},
      pageNumber: 1,
      rows:[],
      displayValueColumns:[],
      checkedRows:[],
      expandRowRules:[{
        field:'isVisual',
        op:'equal',
        value:true
      }],
      ddFile:'',
      DDKeyValidateMsg:'',
      isMovingRowsLevel:false,
      newDDKeyIndex:0,
      DDKeyDragState:0,
      //refreshFlag:new Date().getTime()
    }
    return default_opts;
  },
  components: {
    ComSelectLCID,ComEditRow
  },
  computed:{
    isExitsChineseSimplified(){
      for(let i=0;i<this.displayValueColumns.length;i++){
        if (this.displayValueColumns[i].lng.LCID==2052){
          return true;
        }
      }
      return false; 
    },
    isExitsChineseTraditional(){
      for(let i=0;i<this.displayValueColumns.length;i++){
        if (this.displayValueColumns[i].lng.LCID==1028){
          return true;
        }
      }
      return false; 
    }
  },
  methods:{
    getRowIndex(data){
      return data.row.acroStates.index+1;
      //console.log(data);
      //treegrid的data.rowIndex行号是空，自己处理
      if (data.rowIndex!=undefined) return data.rowIndex+1;
      // else if (data.row.parent) return data.row.parent.children.indexOf(data.row)+1;
      // else return this.$refs.tree.rows.indexOf(data.row)+1;
    },
    adjustColumnOrder(columns){
      let newColumns=[];
      //column顺序：简体、繁体、英文
      const columnOrders=[2052,1028,1033];
      for(let j=0;j<columnOrders.length;j++){
        for(let i=columns.length-1;i>=0;i--){
          let column=columns[i];
          if (column.lng.LCID==columnOrders[j]){
            //console.log(column);
            newColumns.push(column);
            columns.splice(i,1);
            break;
          }
        }
      }
      for(let i=0;i<columns.length;i++){
        let column=columns[i];
        newColumns.push(column);
      }
      return newColumns;
    },
    displayDD(dd){
      this.finishEditing();
      this.rawTreeRows=dd.rows;
      this.rawTreeRows_byDDKey=dd.rows_byDDKey;
      let columns=this.adjustColumnOrder(dd.displayValueColumns);
      //console.log(columns);
      this.displayValueColumns=columns;
      let rows=util_treePlain.expandTree2Plain(this.rawTreeRows);
      //console.log(this.$refs.tree.sortsState);
      if (this.$refs.tree.sortsState.length>0){
        rows=util_treePlain.sortTree2Plain(this.rawTreeRows,this.$refs.tree.sortsState);
      }
      this.rows=rows;
    },
    openDD(files){
      //console.log(files);
      if (files.length<=0) return;
      Object.assign(this.$data,this.$options.data());
      let self=this;
      this.ddFile=files[0].name;
      AcroML.tool.readFile(files[0],
        function(data){
          self.displayDD(data);
        }
      );
      //相同文件第二次打开不触发，必须清空
      //files.length=0;
      //console.log(self.$refs.fileButton);
      let el=document.getElementById(self.$refs.FB_openDD.fileId);
      //console.log(el);
      //console.log(el.files);
      el.value='';
    },
    importDD(files){
      if (files.length<=0) return;
      let self=this;
      AcroML.tool.readFile(files[0],
        function(data){
          self.importDDContent(data);
        }
      );
      let el=document.getElementById(self.$refs.FB_importDD.fileId);
      el.value='';
    },
    grabDD(files){
      if (files.length<=0) return;
      let self=this;
      AcroML.tool.readFile(files[0],
        function(data){
          self.importDDContent(data,{isAddColumn:false,isAddDDKey:false});
        }
      );
      let el=document.getElementById(self.$refs.FB_grabDD.fileId);
      el.value='';
    },
    sortColumn(row1,row2){
      //自己排序，有了这个函数，不要用预设的排序
      //console.log(row1,row2);
    },
    onSortChange(sorts){
      //console.log(sorts);
      this.finishEditing();
      let rows=util_treePlain.sortTree2Plain(this.rawTreeRows,sorts);
      this.rows=rows;
      //this.$refs.tree.innerData=rows;
    },
    saveDDasTreeGrid(){
      this.$refs.tree.endEdit();
      AcroML.tool.writeFile({
        displayValueColumns:this.displayValueColumns,
        rows:this.rawTreeRows
      },'DD.treegrid.json')
    },
    saveDDasTable(){
      AcroML.tool.writeFile({
        displayValueColumns:this.displayValueColumns,
        rows:this.rawTreeRows
      },'DD.plaintable.json');
    },
    saveDDasCSV(){
      //data使用ArrayBuffer/Uint16Array就会按字符串下载，使用array就是按数组下载
      AcroML.tool.writeFile({
        displayValueColumns:this.displayValueColumns,
        rows:this.rawTreeRows
      },'DD.csv.txt');
    },
    saveDDasLNG(){
      //data使用ArrayBuffer/Uint16Array就会按字符串下载，使用array就是按数组下载
      AcroML.tool.writeFile({
        displayValueColumns:this.displayValueColumns,
        rows:this.rawTreeRows
      },'DD.lng');
    },
    s2t(e){
      console.log(e);
      console.log(this.$refs.tree);
      if (!this.isExitsChineseSimplified || !this.isExitsChineseTraditional) return;
      //console.log(this);
      for(let r=0;r<this.checkedRows.length;r++){
        let row=this.checkedRows[r];
        for(let i=0;i<this.displayValueColumns.length;i++){
          let column=this.displayValueColumns[i];
          if (column.lng.LCID==2052){
            for(let j=0;j<column.SeqNos.length;j++){
              let SeqNo=column.SeqNos[j];
              let s=row['2052-'+SeqNo];
              if (s){
                row['1028-'+SeqNo]=AcroML.tool.chinese.s2t(s);
              }
            }
            break;
          }
        }
      }
    },
    t2s(){
      if (!this.isExitsChineseSimplified || !this.isExitsChineseTraditional) return;
      for(let r=0;r<this.checkedRows.length;r++){
        let row=this.checkedRows[r];
        for(let i=0;i<this.displayValueColumns.length;i++){
          let column=this.displayValueColumns[i];
          if (column.lng.LCID==2052){
            for(let j=0;j<column.SeqNos.length;j++){
              let SeqNo=column.SeqNos[j];
              let s=row['1028-'+SeqNo];
              if (s){
                row['2052-'+SeqNo]=AcroML.tool.chinese.t2s(s);
              }
            }
            break;
          }
        }
      }
    },
    askAddLCID(){
      this.$refs.dialog_selectLCID.open(this.displayValueColumns);
    },
    doAddLCID(LCID){
      //console.log(LCID);
      //console.log(this.$refs.tree.allColumns);
      //console.log(this.$refs.tree);
      let lng=AcroML.culture.findCultureByLCID(LCID);
      this.displayValueColumns.push({lng,SeqNos:['0']});
      this.displayValueColumns=this.adjustColumnOrder(this.displayValueColumns);
      //嵌套的lng的column的field也必须设置为唯一的LCID，否则显示不会刷新
      //console.log(this.displayValueColumns);
      //this.$refs.tree.addColumn(LCID);
      //this.$refs.tree.changeColumns();
      //this.rows=this.rows;
    },
    onFilterChange(rules){
      //console.log(rules);
      //this.$refs.tree.rows=this.rows;
      this.finishEditing();
    },
    getNewDDKey(){ 
      while (true){
        this.newDDKeyIndex++;
        let DDKey='DDKey'+this.newDDKeyIndex;
        let r=this.rawTreeRows_byDDKey[DDKey];
        if (!r) return DDKey;
      }
    },
    appendSiblingRow(focusRow){
      //console.log(focusRow);
      //console.log(this.$refs.tree);
      /*
      //行内编辑很难控制
      g_DDRows.push({DDKey:'wxh',SortNumber:0,SeqNo:0,'1028':'ss','2052':'dd'});
      self.refreshFlag=new Date().getTime();
      //this.$refs.tree.selectRow({DDKey:''});
      // //this.tree.current.scrollTop({});
      // this.tree.current.beginEdit({DDKey:''},this.tree.current.state.centerColumns[1]);
      // //如何焦点落在新增的这行，光标闪烁
      // this.tree.current.doEnter();
      */
      this.editingRowProxy=null;
      if (!focusRow){
        if (this.$refs.tree.editingItem) focusRow=this.$refs.tree.editingItem.row;
      }
      //console.log(focusRow);
      this.addingFocusRow=focusRow;
      this.addingMode='sibling';
      //console.log(CatalogID);
      let DDKey=this.getNewDDKey();
      let newRow={DDKey,SortNumber:0,children:[]}
      //this._editRow(newRow);
      this.editRowSuccess(newRow);
    },
    appendChildRow(focusRow){
      //console.log(this.$refs.tree.editingItem);
      this.editingRowProxy=null;
      if (!focusRow){
        if (this.$refs.tree.editingItem){
          focusRow=this.$refs.tree.editingItem.row;
        }
      }
      this.addingFocusRow=focusRow;
      this.addingMode='child';
      //console.log(CatalogID);
      let DDKey=this.getNewDDKey();
      let newRow={DDKey,SortNumber:0,children:[]};
      //this._editRow(newRow);
      this.editRowSuccess(newRow);
    },
    editRow(rowProxy){
      //console.log(rowProxy);
      this.editingRowProxy=rowProxy;
      let newRow={};
      Object.assign(newRow,rowProxy);
      this._editRow(newRow);
    },
    _editRow(row){
      this.$refs.dialog_editRow.editRow(row);
    },
    editRowSuccess(row){
      //console.log(row);
      let isExist=false;
      let findRow=this.rawTreeRows_byDDKey[row.DDKey];
      if (this.editingRowProxy){
        if (findRow && (row.DDKey!=this.editingRowProxy.DDKey)){
          isExist=true;
        }
      }
      else{
        if (findRow) isExist=true;
      }
      if (isExist){
        this.$messager.alert({
          title: AcroML.t("error"),
          icon: "error",
          msg: AcroML.utils.format(AcroML.t('DDKey "{0}" already exists!'),row.DDKey)
        });  
        return false;
      }
      if (this.editingRowProxy){
        let oldDDKey=this.editingRowProxy.DDKey;
        let newDDKey=row.DDKey;
        if (oldDDKey!=newDDKey){
          delete this.rawTreeRows_byDDKey[oldDDKey];
          this.rawTreeRows_byDDKey[newDDKey]=this.editingRowProxy;
        }
        Object.assign(this.editingRowProxy,row);
      }
      else {
        if (!row.acroStates) row.acroStates={};
        row.isVisual=true;
        row.acroStates.level=0;
        row.acroStates.state='open';
        let parent;
        if (this.addingMode=='child') parent=this.addingFocusRow;
        else if (this.addingFocusRow) parent=this.addingFocusRow.parent;
        if (parent){
          //console.log(parent);
          row.acroStates.level=parent.acroStates.level+1;       
          if (parent.acroStates.state=='closed'){
            parent.acroStates.state='open';
            function scanNodes(parent,nodes){
              for(let i=0;i<nodes.length;i++){
                let node=nodes[i];
                node.isVisual=parent.acroStates.state=='open';
                if (node.children) scanNodes(node,node.children);
              }
            }
            scanNodes(parent,parent.children);
          }
          //添加进g_DDRoots
          row.parent=parent;
          let newIndex=0;
          if (this.addingFocusRow){
            if (this.addingMode=='sibling'){
              //兄弟上一个，儿子第一个
              newIndex=parent.children.indexOf(this.addingFocusRow);
            }
          }
          parent.children.splice(newIndex,0,row);
        }
        else{
          let newRootIndex=0;
          if (this.addingFocusRow){
            newRootIndex=this.findRowIndex(this.rawTreeRows,this.addingFocusRow.DDKey);
          }
          this.rawTreeRows.splice(newRootIndex,0,row);
        }
        let insertIndex=0;
        if (this.addingFocusRow){
          if (this.addingMode=='sibling'){
            //兄弟前面
            insertIndex=this.addingFocusRow.acroStates.index;
          }
          else{
            //第一个儿子
            insertIndex=this.addingFocusRow.acroStates.index+1;
          }
        }
        this.rows.splice(insertIndex,0,row);
        //后面的行index重新赋值
        row.acroStates.index=insertIndex;
        for(let i=row.acroStates.index+1;i<this.rows.length;i++){
          this.rows[i].acroStates.index=i;
        }
        this.rawTreeRows_byDDKey[row.DDKey]=row;
        //同步innerData
        if (this.$refs.tree.innerData!=this.rows){
          this.$refs.tree.innerData=this.rows;
        }
        this.$refs.tree.doFilter();
        //直接改变this.$refs.tree.rows会自动刷新，改变this.rows不行
        //刷新后如何翻到原来的哪也去？
        //this.pageNumber=this.$refs.tree.pageNumberState;
        //this.refreshFlag=new Date().getTime();
        //this.rows=this.rows;
      }
      this.$nextTick(function(){
        //下次渲染结束后选中当前编辑行
        this.$refs.tree.scrollTo(row);
        this.$refs.tree.selectRow(row);
        this.$refs.tree.navRow(row);
        //必须加上beginEdit，否则this.$refs.tree.editingItem.row不变
        this.$refs.tree.beginEdit(row,{});
        //this.$refs.tree.pageNumberState=this.pageNumber;
      });
      return true;
    },
    finishEditing(){
      if (this.$refs.tree.editingItem){
        if (this.$refs.tree.editingItem.invalid) this.$refs.tree.cancelEdit();
        else this.$refs.tree.endEdit();
      }
    },
    deleteCheckedRows(){
      // console.log(this.rows==this.$refs.tree.rows);//false
      // console.log(this.rows==this.$refs.tree.data);//true
      // console.log(this.rows==this.$refs.tree.innerData);//false
      // console.log(this.$refs.tree.rows==this.$refs.tree.innerData);//false
      // console.log(this.$refs.tree.rows==this.$refs.tree.filteredData);//false
      //console.log(this.$refs.tree.rows);
      let self=this;
      this.$messager.confirm({
        title: this.t('Confirm'),
        msg: this.t('Are you sure to delete checked rows?'),
        result: function(r){
          if (r){
            while(self.checkedRows.length>0){
              let row=self.checkedRows[0];
              self.deleteRow(row);
            }
            //同步innerData，否则删除的行看起来还在
            if (self.rows!=self.$refs.tree.innerData){
              //this.$refs.tree.innerData.splice(fromIndex,count);
              self.$refs.tree.innerData=self.rows;
            }
            self.$refs.tree.doFilter();
          }
        }
      });
    },
    deleteRow(rowProxy){
      let self=this;
      
      this.finishEditing();
      //深度优先，找到最后一行要删除的
      let fromIndex=rowProxy.acroStates.index;
      let endIndex;
      function scanNode(node){
        delete self.rawTreeRows_byDDKey[node.DDKey];
        endIndex=node.acroStates.index;
        if (node.children){
          for(let i=0;i<node.children.length;i++){
            scanNode(node.children[i]);
          }
        }
      }
      scanNode(rowProxy);
      //console.log(fromIndex,endIndex);
      let count=endIndex-fromIndex+1;
      this.rows.splice(fromIndex,count);
      //清除在选中行中的行
      function removeNodes(nodes){
        for(let i=nodes.length-1;i>=0;i--){
          let node=nodes[i];
          if (node.acroStates.index>=fromIndex && node.acroStates.index<=endIndex){
            nodes.splice(i,1);
          }
        }
      }
      removeNodes(this.checkedRows);
      removeNodes(this.$refs.tree.selectedRows);
      //console.log('this.rows end');

      //filteredData如果不删除，分页按钮刷新后会再出现，删除及慢，改为调用doFilter函数
      //removeNodes(this.$refs.tree.filteredData);
      //console.log('tree.filteredData end');
      //this.$refs.tree.rows是当页数据，清除才能马上刷新，改为调用doFilter函数
      //removeNodes(this.$refs.tree.rows);
      //console.log('tree.rows end');       
      //修正剩下的行的索引号    
      for(let i=fromIndex;i<this.rows.length;i++){
        this.rows[i].acroStates.index=i;
      }
      //把删除的行从父节点或根节点移除
      let index;
      if (rowProxy.parent){
        index=this.findRowIndex(rowProxy.parent.children,rowProxy.DDKey)
        if (index>=0) rowProxy.parent.children.splice(index,1);
      }
      else{
        //console.log(this.rawTreeRows,rowProxy);
        index=this.findRowIndex(this.rawTreeRows,rowProxy.DDKey);
        if (index>=0) this.rawTreeRows.splice(index,1);
      }
      //改变this.$refs.tree.rows会局部刷新
      //用this.rows会全部重新渲染，闪烁，不好
      //不会自动同步删除this.rows中资料，神奇的是两个与rowProxy比较都能找到
      //this.refreshFlag=new Date().getTime();
      // this.rows=this.rows;
      //this.$refs.tree.rows=this.rows;     
    },
    saveLostDDKeys(){
      let data=AcroML.ddKeyCatcher.getData();
      AcroML.tool.writeFile(data,'DDKeys.csv.txt');
    },
    deleteColumn(column){
      this.$messager.confirm({
        title: this.t('Confirm'),
        msg: this.t('Are you sure to delete the column?'),
        result: (r) => {
          if (r){
            const index=this.displayValueColumns.indexOf(column);
            if (index>=0) this.displayValueColumns.splice(index,1);
            function scanNodes(nodes){
              for(let i=0;i<nodes.length;i++){
                let node=nodes[i];
                for(let j=0;j<column.SeqNos.length;j++){
                  let field=column.lng.LCID+'-'+column.SeqNos[j];
                  delete node[field];
                }
                if (node.children) scanNodes(node.children);
              }
            }
            //删除这种语言的全部资料
            scanNodes(this.rawTreeRows);
            this.$refs.tree.changeColumns();
            //不需要全部刷新
            //this.refreshFlag=new Date().getTime();
          }
        }
      });
    },
    addSeqNo(column){

    },
    resetColumns(){
      for(let i=0;i<this.$refs.tree.allColumns.length;i++){
        this.$refs.tree.allColumns[i].currOrder=null;
      }
    },
    buildNewDD(){
      Object.assign(this.$data,this.$options.data());
      this.displayValueColumns.push({lng:AcroML.culture.findCultureByLCID(2052),SeqNos:['0']});
      this.displayValueColumns.push({lng:AcroML.culture.findCultureByLCID(1028),SeqNos:['0']});
      this.displayValueColumns.push({lng:AcroML.culture.findCultureByLCID(1033),SeqNos:['0']});
      //console.log(this.$data);
    },
    findRowIndex(items,DDKey){
      for(let i=0;i<items.length;i++){
        if (items[i].DDKey==DDKey) return i;
      }
      return -1;
    },
    onRowSelect(row){
      //DDKey重复时，不允许跳到别的行
      //console.log(this.$refs.tree.editingItem);
      if (!this.$refs.tree.editingItem) return;
      if (this.$refs.tree.editingItem.invalid){
        this.$refs.tree.selectRow(this.$refs.tree.editingItem.row);
      }
      else{
        //row.selected='T';
      }
    },
    onRowUnselect(row){
      //console.log(row);
      //row.selected='F';
    },
    onGridEditValidate(e){
      //边打边找，检查DDKey重复
      //console.log(e);
      if (!e.column || (e.column.field!='DDKey')) return;
      //console.log(this.$refs.DDKeyEditBox);
      let DDKey=this.$refs.DDKeyEditBox.text;
      if (DDKey==''||DDKey==undefined){
        e.invalid=true;
        this.DDKeyValidateMsg=this.t('DDKey required.');
        return;
      }
      let row0=this.rawTreeRows_byDDKey[DDKey];
      //console.log(DDKey,row0);
      if (row0 && (row0.acroStates.index!=e.row.acroStates.index)){
        //不能直接比较地址：可能一个是原始元件，一个是proxy
        //console.log(row0,e.row);
        e.invalid=true;
        this.DDKeyValidateMsg=AcroML.utils.format(AcroML.t('DDKey "{0}" already exists!'),DDKey);
        return;
      }

      e.invalid=false;
      this.DDKeyValidateMsg='';
      delete this.rawTreeRows_byDDKey[e.row.DDKey];
      this.rawTreeRows_byDDKey[DDKey]=e.row;
      e.row.DDKey=DDKey;
    },
    onPageChange(e){
      //console.log(e);
      this.finishEditing();
    },
    onRowToggle(e,row){
      //console.log('toggle',e,row);
      //this.finishEditing();
      util_treePlain.toggleRow(row);
      this.$refs.tree.doFilter();
      //取消冒泡，使其不触发cellclick事件
      e.cancelBubble=true;
      e.preventDefault();
      e.stopPropagation();
    },
    getDDKeyExpanderClass(row) {
      let c="tree-hit";
      if (!row.children || row.children.length==0) return c;
      if (row.acroStates.state=='open') c=c+' tree-expanded';
      else c=c+' tree-collapsed';
      return c;
    },
    getDDKeyEditBoxClass(row){
      let c='';
      if (this.DDKeyValidateMsg) c=c+'textbox-invalid';
      return c;
    },
    expandAll(){
      this.finishEditing();
      util_treePlain.expandAll(this.rows);
      this.$refs.tree.doFilter();
    },
    collapseAll(){
      this.finishEditing();
      util_treePlain.collapseAll(this.rows);
      this.$refs.tree.doFilter();
    },
    onCellClick(e){
      //console.log('cellclick',e);
      //if (e.column.field=='DDKey') throw
      //e.preventDefault();
    },
    importDDContent(data,ops){
      let self=this;
      AcroML.tool.mergeDD({
        rows:this.rawTreeRows,
        rows_byDDKey:this.rawTreeRows_byDDKey,
        displayValueColumns:this.displayValueColumns
      },data,ops);
      this.displayDD({
        rows:this.rawTreeRows,
        rows_byDDKey:this.rawTreeRows_byDDKey,
        displayValueColumns:this.displayValueColumns
      });
    },
    importLostDDKeys(){
      let data=AcroML.ddKeyCatcher.getData();
      this.importDDContent(data);
    },
    onDDKeyDragStart(e){
      //console.log('drag start',e);
      this.finishEditing();
      this.DDKeyDragState=1;
      this.DDKeyDragRow=e.target.row;
    },
    onDDKeyDragEnd(e){
      //console.log('drag end',e);
      let self=this;
      this.DDKeyDragState=2;
      //拖动鼠标不在DDKey上释放，不会触发onDDKeyClick，用settimeout在下一个事件中重置DDKeyDragState
      setTimeout(function(){
        //console.log('next timeout');
        self.DDKeyDragState=0;
        self.DDKeyDragRow=null;
      },0);
      this.moveRowsLevle([this.DDKeyDragRow],this.$refs.tree.highlightRow);
    },
    onDDKeyDrag(e){
      let span1=this.$refs.span_treeCheckColumnHeader;
      let r1=span1.getBoundingClientRect();
      let span2=this.$refs.DDKeyDragProxy_span;
      let r2=span2.getBoundingClientRect();
      e.left=r1.left-r2.width+26;
    },
    onDDKeyDragEnter(){
      //this.draggEnterRow=
    },
    onDDKeyDrop(e){
      //console.log('drop',e);
      //console.log(this.$refs.tree.highlightRow);
      //this.moveRowsLevle([this.DDKeyDragRow],this.$refs.tree.highlightRow);
    },
    onDDKeyClick(e){
      //console.log(e);
      //阻止拖动结束时，继续当成点击事件让cell进入编辑状态
      if (this.DDKeyDragState==2){
        e.cancelBubble=true;
        e.preventDefault();
        e.stopPropagation();
      }
      this.DDKeyDragState=0;
    },
    onAllCheckedChange(checked){
      let self=this;
      this.checkedRows=[];
      this.rows.map(function(row){
        row.selected=checked;//?'T':'F';
        if (checked) self.checkedRows.push(row);
      });
    },
    onCheckBoxClick(e,row){
      //console.log(e,row);
      //console.log(row.selected);
      if (row.selected) this.checkedRows.push(row);
      else{
        let index=this.checkedRows.indexOf(row);
        if (index>=0) this.checkedRows.splice(index,1);
      }
      //阻止checkbox点击后继续触发选中行
      //如果设置selectionMode为multiple，同行里面点击不同的cell会导致次行在选中/不选中反复跳
      e.cancelBubble=true;
      e.preventDefault();
    },
    onCheckBoxFilterCheckedChange(checked){
      //console.log(checked);
      this.$refs.tree.doFilter({field:'selected',op:'equal',value:checked});
    },
    startMoveCheckedRowsLevel(){
      if (this.checkedRows.length<=0) return;
      this.isMovingRowsLevel=true;
    },
    cancelMoveCheckedRowsLevle(){
      this.isMovingRowsLevel=false;
    },
    moveCheckedRowsLevle(parent){
      //console.log(parent);
      //注意：g_DDRoots根节点与proxy节点不同
      // console.log(this.rawTreeRows[0],this.checkedRows[0]);
      // console.log(this.rawTreeRows[0]==this.checkedRows[0]);
      let moveRows=[];
      //父子都选中了，只移动父
      for(let i=this.checkedRows.length-1;i>=0;i--){
        let row=this.checkedRows[i];
        let parentIndex=-1;
        if (row.parent) parentIndex=this.findRowIndex(this.checkedRows,row.parent.DDKey);
        if (parentIndex<0) moveRows.push(row);
      }
      this.moveRowsLevle(moveRows,parent);
    },
    moveRowsLevle(moveRows,parent){
      //console.log(this.checkedRows,moveRows);
      //目标节点的直系祖先
      let parents=[];
      let p=parent;
      while (p){
        parents.push(p);
        p=p.parent;
      }
      for(let i=moveRows.length-1;i>=0;i--){
        let row=moveRows[i];
        let pindex=parents.indexOf(row);
        if (pindex>=0){
          //父子死循环
        }
        else{
          let isMoved=((parent && row.parent!=parent)|| (!parent && row.parent));
          //console.log(isMoved);
          if (isMoved){
            let index;
            if (row.parent){
              index=this.findRowIndex(row.parent.children,row.DDKey);
              if (index>=0) row.parent.children.splice(index,1);
            }
            else{
              index=this.findRowIndex(this.rawTreeRows,row.DDKey);
              if (index>=0) this.rawTreeRows.splice(index,1);
            }
            //console.log(row,index);
          }
          if (parent){
            if (row.parent!=parent){
              if (!parent.children) parent.children=[];
              parent.children.push(row);
              row.parent=parent;
            }
          }
          else{
            if (row.parent){
              this.rawTreeRows.push(row);
              row.parent=null;
            }
          }
        }
      }
      this.isMovingRowsLevel=false;
      let rows=util_treePlain.expandTree2Plain(this.rawTreeRows);
      if (this.$refs.tree.sortsState.length>0){
        rows=util_treePlain.sortTree2Plain(this.rawTreeRows,this.$refs.tree.sortsState);
      }
      this.rows=rows;
      //同步innerData
      // if (this.$refs.tree.innerData!=this.rows){
      //   this.$refs.tree.innerData=this.rows;
      // }
      // this.$refs.tree.doFilter();
    }
  },
  //virtualScroll为true时，从this.rows/this.$ref.tree.rows删除行并不能刷新
  //分页不用设置高度style='height:500px'，虚拟化卷动一定要设置高度
  template:`
    <div>
      <div style="background-image:url('/img/worldmap2.gif');background-size: 100% 100%;">
        <img src='/img/DD.ico'/>
        <h1 style="display:inline-block">{{t('Data Dictionary Editor')}}</h1>
      </div>
      <div className="dialog-button">
        <ButtonGroup>
          <LinkButton iconCls="icon-expand" :onClick=expandAll
              v-Tooltip="{
                content:t('Expand All'),
                position:'bottom'}"
          ></LinkButton>
          <LinkButton iconCls="icon-collapse" :onClick=collapseAll
              v-Tooltip="{
                content:t('Collapse All'),
                position:'bottom'}"
          ></LinkButton>
        </ButtonGroup>
        <span class='tree-indent'></span>
        <ButtonGroup>
          <LinkButton iconCls="icon-new" :onClick=buildNewDD
              v-Tooltip="{
                content:t('Build New DD'),
                position:'bottom'}"
          ></LinkButton>
          <FileButton iconCls='icon-open' ref="FB_openDD"
            accept=".lng,.treegrid.json,.plaintable.json,.csv.txt"
            :onSelect=openDD
            v-Tooltip="{
              content:t('Open DD File...'),
              position:'bottom'}"
          />
          <FileButton iconCls='icon-import' ref="FB_importDD"
            accept=".lng,.treegrid.json,.plaintable.json,.csv.txt"
            :onSelect=importDD
            v-Tooltip="{
              content:t('Import DD File...'),
              position:'bottom'}"
          />
          <FileButton iconCls='icon-grab' ref='FB_grabDD'
            accept=".lng,.treegrid.json,.plaintable.json,.csv.txt"
            :onSelect=grabDD
            v-Tooltip="{
              content:t('Grab Data from DD File...'),
              position:'bottom'}"
          />
          <LinkButton iconCls="icon-saveTG" :onClick=saveDDasTreeGrid
            v-Tooltip="{
              content:t('Save DD as TreeGrid...'),
              position:'bottom'}"
          ></LinkButton>
          <LinkButton iconCls="icon-savePT" :onClick=saveDDasTable
            v-Tooltip="{
              content:t('Save DD as PlainTable...'),
              position:'bottom'}"
          ></LinkButton>
          <LinkButton iconCls="icon-saveCSV" :onClick=saveDDasCSV
            v-Tooltip="{
              content:t('Save DD as utf-8 CSV...'),
              position:'bottom'}"
          ></LinkButton>
          <LinkButton iconCls="icon-saveLNG" :onClick=saveDDasLNG
            v-Tooltip="{
              content:t('Save DD as ucs-2 CSV...'),
              position:'bottom'}"
          ></LinkButton>
        </ButtonGroup>
        <span class='tree-indent'></span>
        <ButtonGroup>
          <LinkButton iconCls="icon-import" :onClick=importLostDDKeys
            v-Tooltip="{
              content:t('Import Losted DDKeys...'),
              position:'bottom'}"
          ></LinkButton>
          <LinkButton iconCls="icon-save" :onClick=saveLostDDKeys
            v-Tooltip="{
              content:t('Save Losted DDKeys...'),
              position:'bottom'}"
          ></LinkButton>
        </ButtonGroup>
      </div>
      <div>{{ddFile}}</div>
      <div>
          <DraggableProxy ref='DDKeyDragProxy'>
            <div v-if="DDKeyDragState==1" style="background: #fbec88;opacity: 0.6;">
              <span ref='DDKeyDragProxy_span'>{{DDKeyDragRow['DDKey']}}</span>
            </div>
          </DraggableProxy>
          <DataGrid idField="DDKey" :data="rows" 
            :pagination=true pagePosition='bottom'
            :pageLayout="['list','sep','first','prev','links','next','last','sep','refresh','info']"
            :virtualScroll="false" :lazy="false"
            selectionMode='single'
            :total="rows.length"
            :pageNumber="pageNumber"
            :pageSize=20
            @pageChange="onPageChange($event)"
            @sortChange="onSortChange"
            @filterChange="onFilterChange"
            @cellClick="onCellClick($event)"
            :filterRules="expandRowRules"
            :filterable=true editMode="cell" :clickToEdit=true :dblclickToEdit=false
            @rowSelect=onRowSelect
            @rowUnselect=onRowUnselect
            @editValidate=onGridEditValidate
            :columnResizing=true
            ref="tree"
          >
            <GridColumnGroup>
              <GridHeaderRow>
                <GridColumn field='rowIndex' align="center" :filterable=false width="50"
                  cellCss="datagrid-td-rownumber" rowspan=3 :sortable=false>
                  <template v-slot:body="data">
                    <LinkButton v-if="isMovingRowsLevel" text='S' @click="moveCheckedRowsLevle(data.row)"
                      style='background:#ffe48d'
                      v-Tooltip="{
                        content:t('Move checked rows to this row as son'),
                        position:'bottom'}"></LinkButton>
                    <span v-else>{{getRowIndex(data)}}</span>
                  </template>
                  <template v-slot:filter>
                    <ButtonGroup>
                      <LinkButton v-if="isMovingRowsLevel" text='C' @click="cancelMoveCheckedRowsLevle(null)"
                        style='background:#ff0000' 
                        v-Tooltip="{
                            content:t('Cancel move'),
                            position:'bottom'}"></LinkButton>
                      <LinkButton v-if="isMovingRowsLevel" text='R' @click="moveCheckedRowsLevle(null)"
                      style='background:#00ff00'
                        v-Tooltip="{
                            content:t('Move checked rows as root'),
                            position:'bottom'}"></LinkButton>
                    </ButtonGroup>
                  </template>
                </GridColumn>
                <GridColumn field='actions' :title="t('Actions')" align="center" :rowspan=3 :width=68>
                <template v-slot:header="scope">
                  <LinkButton iconCls='icon-cut' @click="deleteCheckedRows"
                    :disabled="checkedRows.length==0"
                    v-Tooltip="{
                      content:t('Delete checked rows...'),
                      position:'bottom'}"
                  ></LinkButton>  
                </template>
                <template v-slot:body="scope">
                    <ButtonGroup>
                      <LinkButton iconCls='icon-edit' @click="editRow(scope.row)"
                        v-Tooltip="{
                          content:t('Edit'),
                          position:'bottom'}"
                      ></LinkButton>
                      <LinkButton iconCls='icon-addChild' @click="appendChildRow(scope.row)"
                        v-Tooltip="{
                          content:t('Add Child Node'),
                          position:'bottom'}"
                      ></LinkButton>
                    </ButtonGroup>
                  </template>
                  <template v-slot:filter>
                    <ButtonGroup>
                      <LinkButton iconCls="icon-addSibling" @click="appendSiblingRow()"
                        v-Tooltip="{
                          content:t('Append Sibling Node...'),
                          position:'bottom'}"
                      ></LinkButton>
                      <LinkButton iconCls="icon-move" @click=startMoveCheckedRowsLevel
                        :disabled="checkedRows.length==0"
                        v-Tooltip="{
                          content:t('Move checked rows to ...'),
                          position:'bottom'}"
                      ></LinkButton>
                    </ButtonGroup>
                  </template>
                </GridColumn>
                <GridColumn field="ck" :rowspan=3 :filterable=false :width="30" align="center">
                  <template v-slot:header="scope">
                    <span ref="span_treeCheckColumnHeader"></span>
                    <CheckBox @checkedChange="onAllCheckedChange($event)"></CheckBox>
                  </template>
                  <template v-slot:body="scope">
                    <CheckBox v-model="scope.row.selected"
                      @click="onCheckBoxClick($event,scope.row)"></CheckBox>
                  </template>
                  <template v-slot:filter>
                    <CheckBox 
                      @checkedChange="onCheckBoxFilterCheckedChange"></CheckBox>
                  </template>
                </GridColumn>
                <GridColumn field='DDKey' :title="t('DDKey')"
                  rowspan=3 halign="center"
                  :editable=true
                  :sortable=true
                  :sorter="sortColumn"
                  width=200>
                  <template v-slot:body="{row,column,rowIndex}">
                    <div v-Droppable="{dragEnter:onDDKeyDragEnter,drop:onDDKeyDrop}"
                      v-Draggable="{row:row,proxy:$refs.DDKeyDragProxy,revert:true,axis:'v',dragStart:onDDKeyDragStart,dragEnd:onDDKeyDragEnd,drag:onDDKeyDrag}"
                        @click="onDDKeyClick">
                        <span class='tree-indent' :style='{width:(row.acroStates.level*16).toString()+"px"}'></span>
                        <span v-if="row.children && row.children.length>0" :class="getDDKeyExpanderClass(row)" @click="onRowToggle($event,row)"></span>
                        <span v-else class='tree-indent'></span>
                        <span class='tree-title'>{{row[column.field]}}</span>
                    </div>
                  </template>
                  <template v-slot:edit="{row,column,rowIndex}">
                    <TextBox :value="row[column.field]" :multiline=true ref="DDKeyEditBox"  
                      :inputStyle='{"white-space":"nowrap"}' :class="getDDKeyEditBoxClass(row)" v-Tooltip="{
                        content:DDKeyValidateMsg}">
                    </TextBox>
                  </template>
                </GridColumn>
                <GridColumn field='SortNumber' :title="t('SortNumber')"
                  rowspan=3 halign="center" align="center"
                  :editable=true
                  :sortable=true
                  :sorter="sortColumn"
                  width=50>
                  <template v-slot:edit="{row,column}">
                    <NumberBox v-model="row['SortNumber']" :precision=0></NumberBox>
                  </template>                 
                </GridColumn>
                <GridColumn field='displayValue'
                  rowspan=1 halign="center"
                  :colspan=displayValueColumns.length
                  :editable=true
                  :sortable=false>
                  <template v-slot:header="scope">
                    <span style="margin-right:5px">{{t('DisplayValue')}}</span>
                    <LinkButton iconCls="icon-addLang" :onClick=askAddLCID
                      v-Tooltip="{
                        content:t('Add Language...'),
                        position:'bottom'}"
                    ></LinkButton>
                  </template>
                </GridColumn>
              </GridHeaderRow>
              <GridHeaderRow>
              <template v-for='column in displayValueColumns'>
                <GridColumn 
                  :field="column.lng.LCID.toString()"
                  :colspan=column.SeqNos.length
                  :editable=true
                  :sortable=false                
                  :halign="'center'">
                  <template v-slot:header="scope">
                    <div>
                      <span>{{column.lng.LCID+','+t(column.lng.LanguageName_English)+','+t(column.lng.RegionName_English)}}</span>
                      <div>{{column.lng.LanguageName_Native+','+column.lng.RegionName_Native}}</div>
                    </div>
                    <LinkButton iconCls='icon-cut' @click="deleteColumn(column)"
                      v-Tooltip="{
                        content:t('Delete'),
                        position:'bottom'}"
                      ></LinkButton>
                    <LinkButton iconCls='icon-add' @click="addSeqNo(column)"
                      v-Tooltip="{
                        content:t('Add SeqNo...'),
                        position:'bottom'}"
                    ></LinkButton>
                    <LinkButton iconCls='icon-s2t' @click="s2t($event)" v-if="column.lng.LCID==1028"
                      :disabled="!isExitsChineseSimplified||checkedRows.length==0"
                      v-Tooltip="{
                        content:t('Chinese (Simplified)')+'→'+t('Chinese (Traditional)'),
                        position:'bottom'}"
                    ></LinkButton>
                    <LinkButton iconCls='icon-t2s' @click="t2s($event)" v-if="column.lng.LCID==2052"
                      :disabled="!isExitsChineseTraditional||checkedRows.length==0"
                      v-Tooltip="{
                        content:t('Chinese (Traditional)')+'→'+t('Chinese (Simplified)'),
                        position:'bottom'}"
                    ></LinkButton>
                  </template>
                </GridColumn>
              </template>  
              </GridHeaderRow>
              <GridHeaderRow>
                <template v-for='column in displayValueColumns'>
                  <GridColumn v-for='SeqNo in column.SeqNos'
                    :field="column.lng.LCID.toString()+'-'+SeqNo" 
                    :sortable=true
                    :sorter="sortColumn"
                    :editable=true halign="center"
                    :title="SeqNo">
                    <template v-slot:edit="{row,column}">
                      <TextBox v-model="row[column.field]" :multiline=true 
                        :inputStyle='{"white-space":"nowrap"}'></TextBox>
                    </template>
                  </GridColumn>
                </template>
              </GridHeaderRow>
            </GridColumnGroup>
          </DataGrid>
          <div style='text-align:right;margin-right:10px'>
            <span>{{t('Total Rows:')}}  {{rows.length}}</span>
            <span>,{{t('Checked Rows:')}} {{checkedRows.length}}</span>
          </div>
      </div>
      <ComSelectLCID ref="dialog_selectLCID" :onOK="doAddLCID" :title="t('Add one language')">
      </ComSelectLCID>
      <ComEditRow ref="dialog_editRow" :displayValueColumns=displayValueColumns :editSuccess=editRowSuccess>
      </ComEditRow>
    </div>
  `
}
export default PageDD;