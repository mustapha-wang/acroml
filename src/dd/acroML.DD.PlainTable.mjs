/**
 * Parse Plain Table format strings as Dictionary
 */
import AcroMLDD from "../acroML.DD.mjs";
class AcroMLPlainTableDD extends AcroMLDD {
	constructor(){
		super();
		this.content = "";
	}
	// / <summary>
	// / 解析plaintable格式json文件，放到Hash表中
	// / </summary>
	buildingDD() {
		let data=JSON.parse(this.content);
		let DDKeyFieldIndex;
		let fields=[];
		for(let i=0;i<data.meta.length;i++){
			let field=data.meta[i];
			if (field=='CatalogID' || field=='SortNumber') continue;
			if (field=='DDKey') DDKeyFieldIndex=i;
			else{
				let parts=field.split('-');
				if (parts.length!=2) continue;
				let LCID=parts[0];
				if (isNaN(parseFloat(LCID))|| Number.isFinite(LCID)) continue;
				LCID=parseInt(LCID);
				let SeqNo=parts[1];
				fields.push({index:i,LCID,SeqNo});
			}
		}
		//console.log(fields);
		for(let i=0;i<data.rows.length;i++){
			let row=data.rows[i];
			for(let j=0;j<fields.length;j++){
				let DisplayValue=row[fields[j].index];
				if (!DisplayValue) continue;
				let DDKey=row[DDKeyFieldIndex];
				this.addDisplayValue(DDKey,fields[j].LCID,fields[j].SeqNo,DisplayValue);
			}
		}
		super.buildingDD();		
	}
}
export default AcroMLPlainTableDD;
AcroMLDD.registerDD('.plaintable.json','utf8',[],AcroMLPlainTableDD);
export {AcroMLPlainTableDD as PlainTableDD};