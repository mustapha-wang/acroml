export default function COM_timer(props){
  console.log('page timer function:',props.foil.state);
  let [time,setTime]=React.useState(0);
  function getNow(){
    return time;
  }
  //timerID不参与渲染，用useRef
  let timerID=React.useRef(null);
  console.log('timerID:',timerID.current);
  /*
  React.useEffect(function(){
    timerID.current=setInterval(function(){
      console.log('timer:',time);
      time++;
      setTime(time);
    },1000);
    console.log('start timer',timerID.current)
    return function(){
      console.log('clear timerID:',timerID.current);
      clearInterval(timerID.current);
      timerID.current=null;
    }
  },[]);
  */
  
  if (props.foil.state=='create' || props.foil.state=='active'){
    if (timerID.current==null){
      console.log('start timer')
      timerID.current=setInterval(function(){
        console.log('timer:',time);
        time++;
        setTime(time);
      },1000);
    }
  }
  else if (props.foil.state=='deactive'||props.foil.state=='destroy'){
    if (timerID.current!=null){
      console.log('clear timerID:',timerID.current);
      clearInterval(timerID.current);
      timerID.current=null;
    }
  }
  
  return(
    <div>
      <span>{t('&File')}</span>
      <span>{getNow()}</span>
    </div>
  )
}