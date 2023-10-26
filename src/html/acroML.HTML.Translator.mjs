import acroMLHTMLTagMethod from './acroML.HTML.TagMethod.mjs';
let acroMLHTMLTranslator={
	translateElement:function(DD,node,LCID,isTranslateChildren=true) {
		//console.log(node.constructor);
		//console.log(node.nodeType);
		//console.log(node.nodeName);//居然全是大写
		if ($(node).attr('translate')!='no'){
			let tagMethod = acroMLHTMLTagMethod.findNearstTagMethod(node.nodeName);
			if (tagMethod) {
				tagMethod(DD,node,LCID);
			}
		}
		if (isTranslateChildren==true){
			for (let i = 0; i < node.childNodes.length; i++)
				acroMLHTMLTranslator.translateElement(DD,node.childNodes[i],LCID,isTranslateChildren);
		}
	},
	translatePage:function(DD,LCID,isTranslateChildren=true) {
		let nodes=document.documentElement.childNodes;
		acroMLHTMLTranslator.translateElements(DD,nodes,LCID,isTranslateChildren);
	},
	translateElements:function(DD,elements,LCID,isTranslateChildren=true){
		for(let i=0;i<elements.length;i++){
			let el=elements[i];
			//console.log(el);
			acroMLHTMLTranslator.translateElement(DD,el,LCID,isTranslateChildren);
		}
	}
}
export default acroMLHTMLTranslator;
let htmlTranslator=acroMLHTMLTranslator;
export {htmlTranslator};