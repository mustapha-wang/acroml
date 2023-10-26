let ddInfos={};
class AcroMLDD {
	constructor(){
		this.fIsDDBuilded = false;
		this.DD = {};
		this.LCIDList = {};
	}
	doBeforeBuildDD() {
	}

	doAfterBuildDD() {
	}

	doNotFoundDisplayValue(ADDKey, ALCID, ASeqNo) {
	}

	buildingDD() {
		//console.log('call acroMLDD.buildingDD');
	}

	buildDD() {
		this.doBeforeBuildDD();
		this.buildingDD();
		this.fIsDDBuilded = true;
		this.doAfterBuildDD();
	}

	// / <summary>
	// / 查找ADDKey的翻译字串
	// / </summary>
	// / <param name="ADDKey">原语</param>
	// / <param name="ALCID">语言ID</param>
	// / <param name="ASeqNo">序号</param>
	// / <param name="AFound">是否找到</param>
	// / <returns>返回找到的翻译字串</returns>
	getDisplayValue(ADDKey, ALCID, ASeqNo, AFound) {
		if (!ASeqNo)
			ASeqNo = 0;
		if (AFound != null)
			AFound.value = false;
		if (ADDKey == null || ADDKey.length <= 0)
			return "";
		var vKey;
		var vDisplayValue;

		// /Build的过程不能多线程访问
		if (!this.fIsDDBuilded)
			this.buildDD();

		vKey = ADDKey + '\u0009' + ALCID + '\u0009' + ASeqNo.toString();

		vDisplayValue = this.DD[vKey];
		if (vDisplayValue == null) {
			vDisplayValue = ADDKey;
			if (AFound != null)
				AFound.value = false;
			this.doNotFoundDisplayValue(ADDKey, ALCID, ASeqNo);
		} else {
			if (AFound != null)
				AFound.value = true;
		}
		return vDisplayValue;
	}

	addDisplayValue(DDKey, LCID, SeqNo, DisplayValue) {
		var vKey;
		vKey = DDKey + '\u0009' + LCID;
		vKey =
			vKey + '\u0009'
				+ ((SeqNo == null || SeqNo.length <= 0) ? "0" : SeqNo);
		var vLCID = LCID.toString();
		this.LCIDList[vLCID] = vLCID;
		this.DD[vKey] = DisplayValue;
	}

	static registerDD(fileExt,encoding,bom,ddClass){
		ddInfos[fileExt]={encoding,bom,class:ddClass};
	}
	static getDDByFileExt(ddFile){
		for(let key in ddInfos){
				let ext=ddFile.substr(ddFile.length-key.length);
				if (ext==key) return ddInfos[key];
		}
	}
}
export default AcroMLDD;
export {AcroMLDD as DD};