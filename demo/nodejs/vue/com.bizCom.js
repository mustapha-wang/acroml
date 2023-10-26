/**
 * 尽量用vue3自己的生命周期事件，foil不产生新的事件。
 * activate/deactivate切换tab时用keepalive组件产生
 */
import loadVueCom from './util.loadVueCom.js';
let Com_bizCom={
  props:['foil_tab'],
  data(){
    return {
      comStub0:null,
      comStub:null
    }
  },
  created(){
    let tab=this['foil_tab'];
    tab.com=this;
    console.log('bizCom created',tab.file);
    this.comStub=loadVueCom(tab.file);
    this.comStub0=this.comStub;
    this.foil_onStateChanged('create');
  },
  beforeUpdate(){

  },
  mounted(){
    console.log('bizCom mounted');
  },
  beforeUnmount(){
    console.log('bizCom beforeUnmount');
    console.log(this.comStub);
    this.foil_onStateChanged('destroy');
  },
  methods:{
    foil_onStateChanged(state){
      let tab=this['foil_tab'];
      console.log('bizCom foil_onStateChanged',state,tab);
      //console.log(this.comStub);
      switch (state){
        case 'deactive':
          //本来多个tab不需要移除，但是为了让当前biz组件触发onDeactivate事件
          this.comStub0=this.comStub;
          this.comStub=null;
          break;
        case 'active':
          this.comStub=this.comStub0;
          break;
      }
    }
  },
  template:`
    <KeepAlive>
      <component :is="comStub">
      </component>
    </KeepAlive>
  `
}
export default Com_bizCom;