import {Tabs,TabPanel} from 'easyui';
import Com_bizCom from './com.bizCom.jsx';

class Com_Right extends React.Component {
    constructor(props){
      console.log('Com_Right constructor');
      super(props);
      this.state={
        tabs:[]
      }
      this.ref_tabs=React.createRef(null);
      this.onTabClose=this.onTabClose.bind(this);
      this.onTabSelect=this.onTabSelect.bind(this);
      this.onTabUnselect=this.onTabUnselect.bind(this);
    }
    switchTab(name,file){
      let self=this;
      // console.log(name,file);
      // console.log(this.state.tabs);
      console.log(this.ref_tabs.current);
      let tab=null;
      for(let i=0;i<this.state.tabs.length;i++){
        if (this.state.tabs[i].name==name){
          tab=this.state.tabs[i];
          this.ref_tabs.current.select(i);
          break;
        }
      }
      if (!tab){
        this.state.tabs.push({name,file,foil:{}});
        this.setState(this.state.tabs,function(){
          //console.log(self.state.tabs.length);
          //使用setTimeput异步模式，让子函数式组件能收到props.foil.state为create的通知
          setTimeout(function(){
            //tabs的select不能切换到新的tab，应该是个bug，改用panel
            //self.ref_tabs.current.state.selectedIndex=this.ref_tabs.current.panels.length-1;
            //self.ref_tabs.current.select(self.state.tabs.length-1);
            let panel=self.ref_tabs.current.panels[self.ref_tabs.current.panels.length-1];
            panel.select();
          },0);
          //console.log(panel);
        });
        //console.log(React);
        //nextTick函数已经移除
        // React.nextTick(function(){
        //   self.ref_tabs.current.select(self.state.tabs.length-1);
        // });
              
        //my god，只有延迟1秒有效
        // setTimeout(function(){
        //   self.ref_tabs.current.select(self.state.tabs.length-1);
        // }, 1000);
      }
    }
    getBizCom(panel){
      let bizCom=panel.props.children;
      if (Array.isArray(panel.props.children)) bizCom=panel.props.children[0];
      return bizCom;
    }
    onTabSelect(panel){
      //奇怪，bug？panel关闭时会触发一次select
      console.log('onTabSelect',panel);
      if (!panel.state.closed){
        let bizCom=this.getBizCom(panel);
        console.log(bizCom);
        bizCom.props.foil.onStateChanged('active');
      }
    }
    onTabUnselect(panel){
      console.log('onTabUnSelect',panel);
      let bizCom=this.getBizCom(panel);
      bizCom.props.foil.onStateChanged('deactive');
    }
    onTabClose(panel){
      //console.log(this.state.tabs);
      console.log('onTabClose',panel);
      //不在这里调用bizCom.props.foil.onDestroy，因为已经开始销毁，子函数式组件不会再被调用渲染
      // let bizCom=this.getBizCom(panel);
      // bizCom.props.foil.onDestroy();
      for(let i=0;i<this.state.tabs.length;i++){
        if (this.state.tabs[i].name==panel.props.title){
          this.state.tabs.splice(i,1);  
          this.setState(this.state);
          break;
        }
      }
    }
    componentDidMount(){
      let self=this;
      console.log('right componentDidMount');
      console.log(this.ref_tabs.current.handleTabClose);
      //hook handleTabClose这个函数，在关闭panel前通知到bizCom里面的原件要销毁了做一些清理工作，比如清除timer
      let fn=this.ref_tabs.current.handleTabClose;
      this.ref_tabs.current.handleTabClose=function(panel){
        console.log('handleTabClose',panel);
        let bizCom=self.getBizCom(panel);
        bizCom.props.foil.onStateChanged('destroy');
        //必须用异步，否则子函数式组件不会被调用刷新
        setTimeout(function(){
          fn.call(self.ref_tabs.current,panel);
        }, 0);
      }
    }
    componentDidUpdate(){
      console.log('right componentDidUpdate');
    }

    render(){
      console.log('right render');
      let tabs=this.state.tabs.map(function(tab){
          return (
            <TabPanel title={tab.name} closable='true' key={tab.name}>
              <Com_bizCom file={tab.file} foil={tab.foil}></Com_bizCom>
            </TabPanel>
          )
      });
      return(
          <Tabs ref={this.ref_tabs} onTabSelect={this.onTabSelect} onTabUnselect={this.onTabUnselect}
            plain='true' scrollable="true" onTabClose={this.onTabClose}>
            {tabs}
          </Tabs>
      );
    }
}

export default Com_Right;