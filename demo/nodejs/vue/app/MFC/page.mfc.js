console.log('page.likeButton');

let Com_LikeButton={
  data(){
    console.log('mfc data');
    return{
      liked: false
    }
  },
  computed:{
    s_file(){
      //window.t是响应式函数，LCID改变后会重计算
      return t('&File');
      //acroML.t不是响应式函数，LCID改变后不会重计算
      return acroML.t('&File');
    }
  },
  methods:{
    onClick(e){
      console.log('onClick');
      this.liked=true;
    }
  },
  mounted(){
    console.log('mfc mounted');
  },
  activated(){
    console.log('mfc activated');
  },
  deactivated(){
    console.log('mfc deactivated');
  },
  beforeUnmount(){//没有触发
    console.log('mfc beforeUnmount');
  },
  mounted(){//没有触发
    console.log('mfc mounted');
  },
  template:`
    <span>{{s_file}}</span>
    <div>demo: vue MFC(Multi File Component),*.js</div>
    <span v-if='liked'>{{t('&File')}}</span>
    <button v-else @click='onClick'>
      {{t('&Edit')}}
    </button>
  `
}
export default Com_LikeButton;