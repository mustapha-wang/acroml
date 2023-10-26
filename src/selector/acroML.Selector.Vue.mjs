import AcroMLEngine from '../acroML.Engine.mjs';
import acroMLCulture from '../acroML.Culture.mjs';
let AcroMLVueSelector={
  data(){
    let LCIDs=[];
    let isFoundEnglish=false;
    for(let LCID in AcroMLEngine.instance.dd.LCIDList){
      if (LCID==1033) isFoundEnglish=true;
      LCIDs.push(LCID);
    }
    if (!isFoundEnglish){
      LCIDs.unshift(1033);
    }
    let langs=LCIDs.map(function(LCID){
      let lang=acroMLCulture.findCultureByLCID(LCID);
      return lang;
    });
    return {
      langs,
      AcroMLEngine,
      onChange(e){
        let LCID=e.target.value;
        AcroMLEngine.instance.LCID=LCID;
        AcroMLEngine.onSwitchLanguage();
      }
    }
  },
  template:`
    <div>
      <span>{{t('Language:')}}</span>
      <select :value='AcroMLEngine.instance.LCID' :onChange='onChange'>
        <option v-for="item in langs" :key=item.LCID :value=item.LCID>
          {{item.LCID+','+t(item.LanguageName_English)+','+t(item.RegionName_English)}}
        </option>
      </select>
    </div>
  `
}
export default AcroMLVueSelector;
let VueSelector=AcroMLVueSelector;
export {VueSelector};