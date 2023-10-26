let LCIDs=AcroML.culture.items;
//console.log(LCIDs);
let ComSelectLCID={
  setup(){
  },
  data(){
    
    return{
      LCIDs,
      button_OK_status:false
    }
  },
  mounted(){
    //这个时候this.$refs.grid还是空
    //console.log(this.$refs.grid);
  },
  props:['onOK','title'],
  methods:{
    onRowClick(){
      //OK按钮使能
      //console.log(this.$refs.grid);
      this.button_OK_status=true;
    },
    onClick_OK(){
      //console.log(this.$refs.grid);
      this.close();
      let LCID=this.$refs.grid.selectedRows[0].LCID;
      if (this.onOK){
          this.onOK(LCID);
      }
    },
    open(columns){
      //先翻译，如果只是在显示渲染时翻译，filter使用还是旧的英文，过滤不到
      for(let i=0;i<LCIDs.length;i++){
        let item=LCIDs[i];
        item['LanguageName_Trans']=AcroML.t(item['LanguageName_English']);
        item['RegionName_Trans']=AcroML.t(item['RegionName_English']);
      }
      let rows=[];
      for(let i=0;i<LCIDs.length;i++){
        let isFound=false;
        for(let j=0;j<columns.length;j++){
          if (LCIDs[i].LCID==columns[j].lng.LCID){
            isFound=true;
            break;
          }
        }
        if (!isFound){
          rows.push(LCIDs[i]);
        }
      }
      this.LCIDs=rows;
      this.$refs.dialog.open();
    },
    close(){
      this.$refs.dialog.close();
    },
    onOpen(){
      //console.log(this.$refs.dialog);
      //这个时候this.$refs.grid还是空
      //console.log(this.$refs.grid);
      //选中第一行，OK按钮一直使能
      //this.$refs.grid.selectRow(LCIDs[0]);
      let self=this;
      setTimeout(() => {
        //console.log(this.$refs.grid);
        this.$refs.grid.selectRow(LCIDs[0]);
        this.button_OK_status=true;
        self.$refs.dialog.center();
      }, 0);
    }
  },
  template:`
    <Dialog :title="title" :modal=true bodyCls="f-column"
      :closed=true :dialogStyle="{width:'580px'}"
      ref="dialog"
      :onOpen=onOpen :collapsed=false
      :closable=true :resizable=true :draggable=true
    >
      <div class="f-full" style="overflow:auto">
        <DataGrid :data=LCIDs idField='LCID' :pagination=true :filterable=true
          :pageLayout="['list','sep','first','prev','next','last','sep','refresh','info']"
          ref="grid" selectionMode='single' :onRowClick=onRowClick :columnResizing=true
        >
          <GridColumnGroup>
            <GridHeaderRow>
              <GridColumn field='LCID' :title="t('LCID')" :rowspan=2 :sortable=true :width=60></GridColumn>
              <GridColumn field='Language' :title="t('Language')" :colspan=3></GridColumn>
              <GridColumn field='Region' :title="t('Region')" :colspan=2></GridColumn>
            </GridHeaderRow>
            <GridHeaderRow>
              <GridColumn field='LanguageName_Abbreviate' :title="t('Abbreviate')" :sortable=true :width=40></GridColumn>
              <GridColumn field='LanguageName_Trans' :title="t('Name')" :sortable=true :width=120></GridColumn>
              <GridColumn field='LanguageName_Native' :title="t('Native Name')" :sortable=true :width=120></GridColumn>
              <GridColumn field='RegionName_Trans' :title="t('Name')" :sortable=true :width=120></GridColumn>
              <GridColumn field='RegionName_Native' :title="t('Native Name')" :sortable=true></GridColumn>
            </GridHeaderRow>
          </GridColumnGroup>
        </DataGrid>
      </div>
      <div class="dialog-button">
        <LinkButton iconCls="icon-ok" :onClick=onClick_OK :disabled="!button_OK_status" ref="button_OK">{{t('OK')}}</LinkButton>
        <LinkButton iconCls="icon-cancel" :onClick=close>{{t('Cancel')}}</LinkButton>
      </div>
    </Dialog>
  `
}
export default ComSelectLCID;