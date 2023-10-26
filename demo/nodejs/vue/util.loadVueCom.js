import * as Vue from 'vue';
function loadVueCom(comFile){
  let com;
  if (comFile.substr(comFile.length-4).toLowerCase()=='.vue'){
      //使用vue的.vue格式的SFC元件
      com=Vue.defineAsyncComponent(function(){
          const options = {
              moduleCache: {
                vue: Vue
              },
              async getFile(url) {
                const res = await fetch(url);
                if (!res.ok)
                  throw Object.assign(new Error(res.statusText + ' ' + url), { res });
                return {
                  getContentData: function(asBinary){
                      return asBinary ? res.arrayBuffer() : res.text();
                  }
                }
              },
              addStyle(textContent) {
                const style = Object.assign(document.createElement('style'), { textContent });
                const ref = document.head.getElementsByTagName('style')[0] || null;
                document.head.insertBefore(style, ref);
              },
          }
      
          const { loadModule } = window['vue3-sfc-loader'];
          let com2=loadModule(comFile, options);
          let comMark=Vue.markRaw(com2);
          return comMark;
      });
  }
  else{
      //使用vue的.js格式的MFC元件
      com=Vue.defineAsyncComponent(function(){
          let com2=import(comFile);
          let comMark=Vue.markRaw(com2);
          return comMark;
      });
  }
  com=Vue.shallowRef(com);
  return com;
}
export default loadVueCom;