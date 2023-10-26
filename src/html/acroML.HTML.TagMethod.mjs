let tagMethods = {};
let acroMLHTMLTagMethod = {
	registerTagMethod : function(tag, method) {
		tagMethods[tag.toUpperCase()] = method;
	},
	findNearstTagMethod : function(tag) {
		return tagMethods[tag.toUpperCase()];
	}
}
export default acroMLHTMLTagMethod;
let htmlTagMethod=acroMLHTMLTagMethod;
export {htmlTagMethod};