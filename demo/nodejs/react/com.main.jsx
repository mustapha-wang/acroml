import Com_Header from './com.header.jsx';
import Com_Left from './com.left.jsx';
import Com_Right from './com.right.jsx';
import {Resizable} from 'easyui';
class Com_Main extends React.Component {
  constructor(props){
    console.log('main constructor');
    super(props);
    this.switchTab=this.switchTab.bind(this);
    this.ref_right = React.createRef(null);
    /*
    //如果com.root不实现，这里实现也可以
    this.state={
      LCID:acroML.browserEngine.LCID
    }
    let self=this;
    acroML.browserEngine.switchLanguage=function(){
      console.log(acroML.browserEngine.LCID);
      self.state.LCID=acroML.browserEngine.LCID;
      self.setState(self.state);
      //console.log(LCID);
    }
    */
  }
  switchTab(name,file){
    this.ref_right.current.switchTab(name,file);
  }
  render() {
    console.log('main render');
    return (
        <div>
            <a href="/">{t('Home')}</a>
            <h1>{t('Demo:translate at frontend browser,translate needed(React+jsx)')}</h1>
            <span>SPA:Single Page Application</span>
            <div className='layout-header' style={{backgroundColor:'bisque'}}>
                <Com_Header></Com_Header>
            </div>
            <div className='layout-middle'>
                <Resizable minWidth='200' handles='e'>
                  <div className='layout-left' style={{width:'200px',float:'left',overflow: 'hidden',backgroundColor:'aquamarine'}}>
                      <Com_Left switchTab={this.switchTab}></Com_Left>
                  </div>
                </Resizable>
                <div className='layout-right' style={{marginLeft:'200px',overflow: 'hidden'}}>
                  <Com_Right ref={this.ref_right}></Com_Right> 
                </div>
                <div style={{clear:'both'}}></div>
            </div>
            <div className='layout-footer' style={{backgroundColor:'brown',textAlign:'center'}}>
                <span>copyright© Acroprise Inc. 2001-2023</span>
            </div>
      </div>
    );
  }
}
export default Com_Main;