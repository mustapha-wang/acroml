import Com_Header from './com.header.js';
import Com_Left from './com.left.js';
import Com_Right from './com.right.js';
//console.log(acroML);
let Com_Main={
    components: {
        Com_Header,Com_Left,Com_Right
    },
    created(){
        console.log('main created');
        //翻译easyui，没必要，在主页已经翻译了
        // this.$messager.ok=this.t('OK');
        // this.$messager.cancel=this.t('Cancel');
    },
    methods:{
        switchTab(name,file){
            this.$refs.right.switchTab(name,file);
        }
    },
    template: `
        <a href="/"><img src='/img/home_16.png'/>{{t('Home')}}</a>
        <h1>{{t('Demo:translate at frontend browser,translate needed(vue)')}}</h1>
        <span>SPA:Single Page Application</span>
        <div className='layout-header2' style="background-color:bisque">
            <Com_Header></Com_Header>
        </div>
        <div className='layout-middle'>
            <div v-Resizable="{minWidth:200,handles:'e'}" className='layout-left' style="width:200px;float:left;overflow:hidden;background-color:aquamarine">
                <Com_Left :switchTab=switchTab></Com_Left>
            </div>
            <div className='layout-right' style="margin-left:200px;overflow:hidden">
                <Com_Right ref=right></Com_Right>
            </div>
            <div style="clear:both"></div>
        </div>
        <div className='layout-footer' style="background-color:brown;text-align:center">
            <span>copyright© Acroprise Inc. 2001-2023</span>
        </div>
    `
}
export default Com_Main;