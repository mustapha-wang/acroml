/**
 * Parse TreeGrid format strings as Dictionary
 */
import AcroMLDD from "../acroML.DD.mjs";

class AcroMLTreeGridDD extends AcroMLDD {
	constructor(){
		super();
		this.content = "";
	}
	// / <summary>
	// / 解析treegrid格式json文件，放到Hash表中
	// / </summary>
	buildingDD(){
		let data=JSON.parse(this.content);
		let self=this;
		function scanRows(rows){
			for(let i=0;i<rows.length;i++){
				let row=rows[i];
				for(let j=0;j<data.displayValueColumns.length;j++){
					let column=data.displayValueColumns[j];
					let LCID=column.lng.LCID;
					for(let k=0;k<column.SeqNos.length;k++){
						let SeqNo=column.SeqNos[k];
						let DisplayValue=row[LCID+'-'+SeqNo];
						if (!DisplayValue) continue;
						let DDKey=row.DDKey;
						self.addDisplayValue(DDKey,LCID,SeqNo,DisplayValue);
					}
				}
				if (row.children) scanRows(row.children);
			}
		}
		scanRows(data.rows);
		super.buildingDD();		
	}
}
export default AcroMLTreeGridDD;
AcroMLDD.registerDD('.treegrid.json','utf8',[],AcroMLTreeGridDD);
export {AcroMLTreeGridDD as TreeGridDD};