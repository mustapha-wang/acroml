/**
 * Parse CSV(Comma-Separated Values) as Dictionary
 */
import AcroMLDD from "../acroML.DD.mjs";
import acroMLResources from "../acroML.Resources.mjs";
import AcroMLCSVText from "./acroML.CSVText.mjs";
import acroMLUtils from "../acroML.Utils.mjs";
class AcroMLCSVTextDD extends AcroMLDD{
	constructor(){
		super();
		this.content = "";
	}
	// / <summary>
	// / 解析lng文件，放到Hash表中
	// / </summary>
	buildingDD() {
		//console.log('call acroMLCSVTextDD.buildingDD');
		let cvs=new AcroMLCSVText();
		cvs.content=this.content;

		let vDDKeyIndex = null;
		let vLCIDIndex = null;
		let vSeqNoIndex = null;
		let vDisplayValueIndex = null;

		this.DD = {};
		let self=this;
		let fieldIndexes={};
		cvs.parse(function(SL){
			for (let i = 0; i < SL.length; i++) {
				fieldIndexes[SL[i]]=i;
			}
			
			const needFields=['DDKey','LCID','DisplayValue'];
			for(let i=0;i<needFields.length;i++){
				let index=fieldIndexes[needFields[i]];
				if (index==null){
					throw new Error(acroMLUtils.printf(acroMLResources.S_NotFoundField,needFields[i]));
				}
			}

			vDDKeyIndex=fieldIndexes['DDKey'];
			vLCIDIndex=fieldIndexes['LCID'];
			vSeqNoIndex=fieldIndexes['SeqNo'];
			vDisplayValueIndex=fieldIndexes['DisplayValue'];
		},function(SL){
			let DisplayValue=SL[vDisplayValueIndex];
			if (DisplayValue){
				self.addDisplayValue(SL[vDDKeyIndex], SL[vLCIDIndex],
					(vSeqNoIndex == null) ? "0" : SL[vSeqNoIndex],
					DisplayValue);
			}
		});
		super.buildingDD();
	}
}
export default AcroMLCSVTextDD;
AcroMLDD.registerDD('.lng','utf16le',[0xFF,0xFE],AcroMLCSVTextDD);
AcroMLDD.registerDD('.csv.txt','utf8',[],AcroMLCSVTextDD);
export {AcroMLCSVTextDD as CSVTextDD};