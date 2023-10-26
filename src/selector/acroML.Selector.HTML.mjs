import AcroMLEngine from '../acroML.Engine.mjs';
import acroMLCulture from '../acroML.Culture.mjs';
function acroBuildHTMLSelector(container){
  function getLanguageText(lng){
    return lng.LCID+','+
      AcroMLEngine.instance.getDisplayValue(lng.LanguageName_English)+','+
      AcroMLEngine.instance.getDisplayValue(lng.RegionName_English);
  }
  let select=$('<select/>');
  select.change(function(e){
      //console.log(e);
      let LCID=$(e.target).val();
      //console.log(LCID);
      document.cookie='LCID='+LCID;
      AcroMLEngine.instance.LCID=LCID; 
      let options=select.children();
      //console.log(options);
      for(let i=0;i<options.length;i++){
          let option=options[i];
          //console.log(option);
          let LCID2=$(option).val();
          let lng=acroMLCulture.findCultureByLCID(LCID2);
          let text=getLanguageText(lng);
          $(option).text(text);
      }
      AcroMLEngine.onSwitchLanguage();
  })
  let lngs=[];
  let isFoundEnglish=false;
  for(let LCID2 in AcroMLEngine.instance.dd.LCIDList){
      if (LCID2==1033) isFoundEnglish=true;
      let lng=acroMLCulture.findCultureByLCID(LCID2);
      lngs.push(lng);
  }
  if (!isFoundEnglish){
      let lng=acroMLCulture.findCultureByLCID(1033);
      lngs.unshift(lng);
  }
  for(let i=0;i<lngs.length;i++){
      let lng=lngs[i];
      
      let option='<option value="'+lng.LCID+'"';
      if (lng.LCID==AcroMLEngine.instance.LCID){
          option=option+' selected';
      }
      option=option+'>'+getLanguageText(lng)+'</option>';
      select.append(option);
  }
  select.val(AcroMLEngine.instance.LCID);
  if (container) $(container).append(select);
  return select;
}
export default acroBuildHTMLSelector;
let buildHTMLSelector=acroBuildHTMLSelector;
export {buildHTMLSelector}