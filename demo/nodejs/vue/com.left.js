let Com_Left={
  props:['switchTab'],
  data(){
    return{   
    }
  },
  methods:{
    menu_click(e){
      //console.log(e);
      let name=e.target.innerHTML;
      //console.log(name);
      let file=e.target.getAttribute('file');
      //console.log(file);
      this.switchTab(name,file);
      e.preventDefault();
    }
  },
  template:`
    <div>
      <a href='/'>{{t('Home')}}</a><br/>
      <a href='#' @click=menu_click file='/vue/app/DDEditor/page.DDEditor.js'>{{t('DD Editor')}}</a><br/>
      <a href='#' :onClick="menu_click" file='/vue/app/MFC/page.mfc.js'>{{t('vue MFC')}}</a><br/>
      <a href='#' :onClick="menu_click" file='/vue/app/SFC/page.sfc.vue'>{{t('vue SFC')}}</a><br/>
      <a href='#' :onClick="menu_click" file='/vue/app/fc/page.fc.js'>{{t('function component')}}</a><br/>
      <a href='#' :onClick="menu_click" file='/vue/app/efficiency/page.efficiency.vue'>{{t('efficiency')}}</a>
    </div>
  `
}
export default Com_Left;