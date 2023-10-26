/**
 * 全部bizCom共用一个keeplive，无法在关闭tab时触发组件的onUnmounted事件。
 * keeplive的cache可以删除，但是无法触发unmounted事件
 * https://github.com/vuejs/core/issues/2077
 */
import loadVueCom from './util.loadVueCom.js';
let caches={}
console.log('com.bizCom2.js');
let Com_bizCom={
  props:['foil_tab'],
  data(){
    return {
      comStub:null,
    }
  },
  created(){
    let tab=this['foil_tab'];
    console.log('bizCom created',tab.file);
    //tab.com=this;
  },
  beforeUpdate(){
    let tab=this['foil_tab'];
    console.log(this.comStub);
    console.log('bizCom beforeUpdate',tab);
    if (!tab.file){
      //this.comStub=null;
    }
    else{
      let com=caches[tab.file];
      if (!com){
        //console.log('no cache');
        com=loadVueCom(tab.file);
        console.log(com);
        caches[tab.file]=com;
      }
      this.comStub=com;
    }
  },
  mounted(){
    console.log('bizCom mounted');
    let self=this;
    // this.$nextTick(function(){
    //   this.foil_onStateChanged('create');
    // });
    console.log(this.$refs.my);
    // setTimeout(function(){
    //   self.foil_onStateChanged('create');
    // }, 0);
  },
  beforeUnmount(){
    console.log('bizCom beforeUnmount');
    // this.foil_onStateChanged('destroy');
  },
  activated(){
    console.log('bizCom activated');
  },
  deactivated(){
    console.log('bizCom deactivated');
  },
  methods:{
    foil_onStateChanged(state){
      let tab=this['foil_tab'];
      console.log('bizCom foil_onStateChanged',state,tab);
      //console.log(this._.componentInstance);
      console.log(this.comStub);
      console.log(this.$refs.my);
      console.log(this.$refs.ka);
      if (state=='destroy'){
        //删除加载的元件缓存
        delete caches[tab.file];
        //删除KeepAlive元件的缓存，但是如何让组件产生unmounted事件？
        let ka=this.$refs.ka._;
        let vnode=ka.__v_cache.get(this.comStub);
        console.log(vnode);
        //ka.ctx.renderer.um(vnode, ka, ka.suspense,false);
        ka.__v_cache.delete(this.comStub);
        console.log(ka.__v_cache);
        //vnode.component.isUnmounted=true;
        //vnode.ctx.emit('unmounted');
        //this.comStub.$destroy();
        //delete this.comStub;
        this.comStub=null;
        // if (this.$refs.my.foil_onStateChanged){
        //   this.$refs.my.foil_onStateChanged(state);
        // }
      }
    },
    loadCom(){
      // let tab=this['foil_tab'];
      // if (tab.file){
      //   this.comStub=loadVueCom(tab.file);
      // }
    }
  },
  template:`
    <KeepAlive ref=ka>
      <component :is="comStub"  ref=my >
      </component>
    </KeepAlive>
  `
}
export default Com_bizCom;