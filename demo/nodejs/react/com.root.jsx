import Com_Main from './com.main.jsx';
//import Com_acroMLStub from './com.acroML.stub.jsx';
export default function COM_Root(){
  console.log('root',AcroML.Engine.instance.LCID);
  
  // let [LCID,setLCID]=React.useState(AcroML.browserEngine.LCID);
  // AcroML.browserEngine.switchLanguage=function(){
  //   //console.log(AcroML.browserEngine.LCID);
  //   setLCID(AcroML.browserEngine.LCID);
  //   //console.log(LCID);
  // }
  
 //<Com_acroMLStub>
  return(
    <Com_Main></Com_Main>
  );
}