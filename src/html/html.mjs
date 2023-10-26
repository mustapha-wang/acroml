import acroMLHTMLTagMethod from "./acroML.HTML.TagMethod.mjs";
import acroMLHTMLRegister from "./acroML.HTML.TagMethod.Register.mjs";
import acroMLHTMLTranslator from "./acroML.HTML.Translator.mjs";
let AcroML={
  htmlTagMethod:acroMLHTMLTagMethod,
  htmlTranslator:acroMLHTMLTranslator,
}
export default AcroML;
let htmlTagMethod=acroMLHTMLTagMethod;
let htmlTranslator=acroMLHTMLTranslator;
export {
  htmlTagMethod,
  htmlTranslator
};