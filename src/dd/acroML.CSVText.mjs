/**
 * Comma-Separated Values
 */
import acroMLResources from "../acroML.Resources.mjs";
class AcroMLCSVText {
	constructor(){
		this.content = "";
		this.QuoteChar = '"';
		this.recordIndex = 0;
	}
	DecodeStr(Source, AQuoteChar) {
		let i, j;
		let P;
		let PResult;
		let ALen;
		let Result;
		let c;

		ALen = Source.length;
		if (ALen <= 0)
			return "";

		P = 0;
		if ((ALen == 2) && (Source[P] == AQuoteChar)
			&& (Source[P + 1] == AQuoteChar))
			return "";

		Result = new Array(ALen);

		PResult = 0;
		i = 0;
		j = 0;
		while (i < ALen) {
			c = Source[P];
			if (c==AQuoteChar) {
				i++;
				if (i >= ALen)
					break;
				P++;
				c = Source[P];
				if (c==AQuoteChar) {
					Result[PResult] = AQuoteChar;
					j++;
					PResult++;
				} else {
					continue;
				}
			} else if (c=='%') {
				i++;
				if (i >= ALen) break;
				P++;
				c = Source[P];
				if (c=='c')	Result[PResult] = '\n';
				else if (c=='n') Result[PResult] = '\r';
				else if (c=='%') Result[PResult] = '%';
				else if (c=='0') Result[PResult] = '\u0000';
				else throw new Error(acroMLResources.S_CSVFormatError);
				j++;
				PResult++;
			} else {
				Result[PResult] = c;
				j++;
				PResult++;
			}
			i++;
			if (i >= ALen)
				break;
			P++;
		}
		return Result.slice(0, j).join('');
	}
	readRecord(SR, SL) {
		if (this.recordIndex >= SR.length)
			return false;

		let S, vValue;
		let i, vIndex1;
		let vIsInString;

		S = SR[this.recordIndex];
		this.recordIndex++;
		if (S == null | S.length <= 0)
			return false;

		vIndex1 = 0;
		vIsInString = false;
		SL.length = 0;

		for (i = 0; i < S.length; i++) {
			switch (S.charAt(i)) {
			case '"':
				vIsInString = !vIsInString;
				break;
			case ',':
				if (!vIsInString) {
					vValue = S.substring(vIndex1, i);
					vValue = this.DecodeStr(vValue, this.QuoteChar);
					SL.push(vValue);
					vIndex1 = i + 1;
				}
				break;
			}
		}
		return true;
	}

	// / <summary>
	// / 解析lng文件
	// / </summary>
	parse(onColumn,onRow) {
		//console.log('call acroMLTextDD.buildingDD');
		let SR;
		let SL;

		SR = this.content.split("\r\n");
		SL = new Array();
		this.recordIndex = 0;
		if (!this.readRecord(SR, SL))
			return;
		onColumn(SL);

		while (true) {
			if (!this.readRecord(SR, SL))
				return;
			onRow(SL);
		}	
	}
}
export default AcroMLCSVText;
export {AcroMLCSVText as CSVText};