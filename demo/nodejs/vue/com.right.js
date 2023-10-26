import Com_bizCom from './com.bizCom.js';
let Com_Right={
  components:{Com_bizCom: Com_bizCom},
  data() {
    return {
      tabs:[]
    }
  },
  methods:{
    switchTab(name,file){
      let self=this;
      //console.log(name,file);
      //console.log(this.$refs.tabs);
      let tab=null;
      for(let i=0;i<this.tabs.length;i++){
          if (this.tabs[i].name==name){
              tab=this.tabs[i];
              this.$refs.tabs.select(i);
              break;
          }
      }
      if (!tab){
          this.tabs.push({name,file: file});
          this.$nextTick(function(){
            // let panel=self.$refs.tabs.panels[self.$refs.tabs.panels.length-1];
            // panel.select();
            self.$refs.tabs.select(self.tabs.length-1);
            //当是第一个tab时不会触发onTabSelect事件
            if (self.tabs.length==1){
              let panel=self.$refs.tabs.panels[self.$refs.tabs.panels.length-1];
              self.onTabSelect(panel);
            }
          });
          //方法2：createApp创新新的元件挂载
          //window.loadPage(file);
      }
    },
    onTabSelect(panel){
      console.log('onTabSelect',panel);
      let tab=panel.$attrs['foil_tab'];
      // console.log(tab);
      tab.com.foil_onStateChanged('active');
    },
    onTabUnselect(panel){
      console.log('onTabUnselect',panel);
      let tab=panel.$attrs['foil_tab'];
      tab.com.foil_onStateChanged('deactive');
    },
    onTabClose(panel){
      console.log('onTabClose',panel);
      let tab=panel.$attrs['foil_tab'];
      //tab.com.foil_onStateChanged('destroy');
      for(let i=0;i<this.tabs.length;i++){
          if (this.tabs[i].name==panel.title){
              this.tabs.splice(i,1);
              break;
          }
      }
    }
  },
  
  template:`
    <Tabs ref=tabs :scrollable=true :plain=true 
      @tabSelect=onTabSelect @tabUnselect=onTabUnselect @tabClose=onTabClose>
      <TabPanel v-for="tab in tabs" :key="tab.name" :title="tab.name" :closable=true :foil_tab=tab>
        <Com_bizCom :foil_tab=tab />
      </TabPanel>
    </Tabs>
  `
}
export default Com_Right;