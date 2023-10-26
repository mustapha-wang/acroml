import { Suspense,Component } from 'react';
class Com_bizCom extends React.Component {
  constructor(props) {
    console.log('Com_bizCom constructor');
    super(props);
    props.foil.onStateChanged=this.foil_onStateChanged.bind(this);
    this.state={
      foil:{
        state:'create'
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    //console.log(nextProps);
    //文件相同时不要再渲染，LCID改变后必须重渲染
    //if (nextProps.file && (nextProps.file === this.props.file)) return false;
    return true;
  }
  foil_onStateChanged(state){
    console.log('bizCom foil_onStateChanged',state);
    console.log(this.com);
    if (this.com.ref){
      //React.Component类组件可以通过函数通知状态
      if (this.com.ref.current.foil_onStateChanged){
        this.com.ref.current.foil_onStateChanged(state);
      }
    }
    else{
      //函数式组件只能通过proprs传递状态，然后bizCOM重渲染
      if (this.state.foil.state!=state){
        this.state.foil.state=state;
        this.com.props.foil.state=state;
        this.setState(this.state);
      }
    }
  }
  componentDidMount(){
    if (this.com.ref && this.com.ref.current.foil_onStateChanged){
      //只需要组件元件通知一下create状态，函数元件第一渲染已经把create带到props.foil.state
      this.com.ref.current.foil_onStateChanged('create');
    }
  }
  componentWillUnmount(){
    let self=this;
    console.log('bizCom componentWillUnmount',this.com.ref);
    //不在这里处理子函数式组件的销毁通知，来不及了，子函数式组件不会调用渲染
    //在easyui tab关闭前处理
  }
  render() {
    let self=this;
    console.log('Com_bizCom render',this.props);
    let file=this.props.file;
    if (!file) return null;

    /*
    let Com=React.lazy(function(){
      import函数不能加载jsx
      return import(file);
    });
    return(<Suspense><Com></Com></Suspense>)
    */
    let com;
    try{
      let obj=window.require(file);
      //console.log(obj);
      if (obj.__esModule===true) obj= obj.default;
      // console.log(typeof obj);
      // console.log(obj.prototype);
      console.log(self.com);
      let ops=null;
      if (self.com){
        ops=self.com.props;
      }
      else{
        ops={foil:{state:'create'}};
        if (obj.prototype && obj.prototype.isReactComponent){
          //类组件才有ref,函数式组件不能有ref
          ops.ref=React.createRef();
        }
      }
      com=React.createElement(obj,ops);
    }
    catch(err){
      com=React.createElement('div',{foil:{state:'create'}},err.stack);
    }
    self.com=com;
    return com;
  }
}
export default Com_bizCom;