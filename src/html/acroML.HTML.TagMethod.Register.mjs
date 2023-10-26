import acroMLHTMLTagMethod from "./acroML.HTML.TagMethod.mjs";
function getDisplayValue(DD,el,propName,propValue,LCID){
	//保存原始的DDKey
	if (!el.acroDDKeys) el.acroDDKeys={};
	let DDKey=el.acroDDKeys[propName];
	if (!DDKey){
		DDKey=propValue;
		el.acroDDKeys[propName]=propValue;
	}
	return DD.getDisplayValue(DDKey, LCID);
}
function proc_a(DD, el, LCID) {
	let elj=$(el);
	let text = elj.text();
	//console.log(text);
	let text2 = getDisplayValue(DD,el,'text',text,LCID);
	elj.text(text2);
}
function proc_input(DD, el, LCID) {
	let elj=$(el);
	let type = elj.attr('type');
	if (type=='button'||type=='submit'){
		let value=elj.attr('value');
		let value2 = getDisplayValue(DD,el,'value',value, LCID);
		elj.attr('value',value2);
	}
	else if (type=='text'){
		let placeholder=elj.attr('placeholder');
		let placeholder2 = getDisplayValue(DD,el,'placeholder',placeholder, LCID);
		elj.attr('placeholder',placeholder2);
	}
	//input没有text属性
	// let text = elj.text();
	// let text2 = DD.getDisplayValue(text, LCID);
	// elj.text(text2);
}
function proc_textarea(DD, el, LCID) {
	let elj=$(el);
	let placeholder=elj.attr('placeholder');
	let placeholder2 = getDisplayValue(DD,el,'placeholder',placeholder, LCID);
	elj.attr('placeholder',placeholder2);
}
function proc_fieldset(DD,el,LCID){
	let elj=$(el);
	let legend=elj.children("legend").text();
	//console.log(legend);
	let legend2 = getDisplayValue(DD,el,'legend',legend, LCID);
	elj.children("legend").text(legend2);
}

acroMLHTMLTagMethod.registerTagMethod("a", proc_a);
//div是容器
//g_acroMLTagMethodStorage.registerTagMethod("div", proc_a);
acroMLHTMLTagMethod.registerTagMethod("header", proc_a);
acroMLHTMLTagMethod.registerTagMethod("title", proc_a);
acroMLHTMLTagMethod.registerTagMethod("h1", proc_a);
acroMLHTMLTagMethod.registerTagMethod("h2", proc_a);
acroMLHTMLTagMethod.registerTagMethod("h3", proc_a);
acroMLHTMLTagMethod.registerTagMethod("h4", proc_a);
acroMLHTMLTagMethod.registerTagMethod("h5", proc_a);
acroMLHTMLTagMethod.registerTagMethod("h6", proc_a);
acroMLHTMLTagMethod.registerTagMethod("span", proc_a);
acroMLHTMLTagMethod.registerTagMethod("label", proc_a);
acroMLHTMLTagMethod.registerTagMethod("button", proc_a);
acroMLHTMLTagMethod.registerTagMethod("i", proc_a);
acroMLHTMLTagMethod.registerTagMethod("b", proc_a);
acroMLHTMLTagMethod.registerTagMethod("strong", proc_a);
acroMLHTMLTagMethod.registerTagMethod("mark", proc_a);
acroMLHTMLTagMethod.registerTagMethod("s", proc_a);
acroMLHTMLTagMethod.registerTagMethod("del", proc_a);
//select下拉框的option
acroMLHTMLTagMethod.registerTagMethod("option", proc_a);
//table相关
acroMLHTMLTagMethod.registerTagMethod("caption", proc_a);
acroMLHTMLTagMethod.registerTagMethod("th", proc_a);
//文本输入元件，不注册
//g_acroMLTagMethodStorage.registerTagMethod("textarea", proc_a);
acroMLHTMLTagMethod.registerTagMethod("p", proc_a);
acroMLHTMLTagMethod.registerTagMethod("input", proc_input);
acroMLHTMLTagMethod.registerTagMethod("textarea", proc_textarea);

//g_acroMLTagMethodStorage.registerTagMethod("fieldset", proc_fieldset);
acroMLHTMLTagMethod.registerTagMethod("legend", proc_a);

export default null;
export {};