import acroMLTool from "./acroML.Tool.mjs";
import acroMLDDKeyCatcher from "./acroML.Tool.DDKeyCatcher.mjs";
import acroMLChinese from "./acroML.Tool.Chinese.mjs";
import acroMLCSVEditor from "./acroML.Tool.Editor.CSV.mjs";
import acroMLPlainTableEditor from "./acroML.Tool.Editor.PlainTable.mjs";
import acroMLTreeGridEditor from "./acroML.Tool.Editor.TreeGrid.mjs";
let AcroML={
  tool:acroMLTool,
  ddKeyCatcher:acroMLDDKeyCatcher,
  chinese:acroMLChinese,
  csvEditor:acroMLCSVEditor,
  plainTableEditor:acroMLPlainTableEditor,
  treeGridEditor:acroMLTreeGridEditor
}
export default AcroML;