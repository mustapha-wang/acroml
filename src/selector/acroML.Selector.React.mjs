/**
 * 不用jsx格式，index.js使用时无法加载jsx文件，用React.createElement创建
 * 这个组件是react专用，vue下用不到，nodejs后台也用不到，是否要从index.js引入？
 * 如果不引入:
 * （1）页面单独引入比较繁琐
 * （2）develpment模式从src、roduction模式从dist，不要部分从src部分从dist
 */
import AcroMLEngine from '../acroML.Engine.mjs';
import acroMLCulture from '../acroML.Culture.mjs';
function AcroMLReactSelector(props){
  function onChange(e){
    let LCID=e.target.value;
    //console.log(LCID);
    AcroMLEngine.instance.LCID=LCID;
    AcroMLEngine.onSwitchLanguage();
  }

  //console.log('Com_Language_ComboBox render');
  let LCIDs=[];
  let isFoundEnglish=false;
  if (AcroMLEngine.instance.dd){
    for(let LCID in AcroMLEngine.instance.dd.LCIDList){
      if (LCID==1033) isFoundEnglish=true;
      LCIDs.push(LCID);
    }
  }
  if (!isFoundEnglish){
    LCIDs.unshift(1033);
  }
  
  let langs=LCIDs.map(function(LCID){
    let lang=acroMLCulture.findCultureByLCID(LCID);
    return React.createElement('option',{key:LCID,value:LCID},
      LCID+','+lang.LanguageName_Native+','+lang.RegionName_Native);
  });
  
  let el=React.createElement('div',{},
    React.createElement('span',{},t('Language')),
    React.createElement('select',{value:AcroMLEngine.instance.LCID,onChange:onChange},langs)
  );
  return el;
}
export default AcroMLReactSelector;
let ReactSelector=AcroMLReactSelector;
export {ReactSelector};