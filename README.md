# acroml.js


# Functions #
1. Localize you application to English,Chinese...
2. Multiple format translate dictionary.
3. Provide dictionary editor.
# Dictionary format #
## - 1.*.csv.text ##

```js
"DDKey","SortNumber","LCID","SeqNo","DisplayValue","CatalogID",
"&Project Manager","","2052","0","专案管理员","",
"&Project Manager","","1028","0","專案管理員","",
"OK","","2052","0","确定","&Project Manager",
"OK","","1028","0","確定","&Project Manager",
```

## - 2.*.plaintable.json ##

```js
{
  "meta": ["CatalogID","DDKey","SortNumber","2052-0","1028-0","1033-0"],
  "rows": [
    ["","&Project Manager","0","专案管理员","專案管理員",""],
    ["&Project Manager","OK","0","确定","確定",""]
  ]
}
```

## - 3.*.treegrid.json ##

```js
{
  "displayValueColumns": [{
    "lng": {"LCID": 2052},
    "SeqNos": ["0"]
  },{
    "lng": {"LCID": 1028},
    "SeqNos": ["0"]
  },{
    "lng": {"LCID": 1033},
    "SeqNos": ["0"]
  }],
  "rows": [{
    "DDKey": "&Project Manager",
    "SortNumber": "",
    "2052-0": "专案管理员",
    "1028-0": "專案管理員",
    "1033-0": "",
    "children": [{
      "DDKey":"OK",
      "SortNumber": "",
      "2052-0": "确定",
      "1028-0": "確定",
      "1033-0": ""
    }]
  }]
}
```

# Usage #
## - 1.node.js ##
(1). use dist, all-in-one: acroml.js

```js
let AcroML=require('../../dist/umd/acroml.js');
AcroML.Engine.init({
  engineClass:AcroML.NodeJsEngine,
  ddFile:path.resolve(__dirname,'./assets/dd/Unicode.plaintable.json')
})
.then(function(){
  console.log('acroml inited.');
  let s=t('OK',2052);
  console.log(s);
});
let t=function(DDKey,LCID){
  let displayValue=AcroML.Engine.instance.getDisplayValue(DDKey,LCID);
  return displayValue;
}
```

(2). use dist, aparted core and addon

```js
acroml_require=function(path){
  let requireMap={
    'acroml-core':'../../dist/umd/acroml-core.js',
    'acroml-engine-nodejs':'../../dist/umd/acroml-engine-nodejs.js',
    'acroml-dd-plaintable':'../../dist/umd/acroml-dd-plaintable.js'
  }
  let p=requireMap[path];
  if (p) path=p;
  m=require(path);
  return m.default||m;
}
let AcroML=acroml_require('acroml-core');
acroml_require('acroml-dd-plaintable');
let AcroMLNodeJsEngine=acroml_require('acroml-engine-nodejs');
AcroML.Engine.init({
  engineClass:AcroMLNodeJsEngine,
  ddFile:path.resolve(__dirname,'./assets/dd/Unicode.plaintable.json')
})
.then(function(){
  console.log('acroml inited.');
});
```

## - 2.browser ##
(1). use source, es6: /js/acroml/src/index.mjs

```html
<html>
  <head>
    <title>OK</title>
    <meta charset="utf-8"></meta>
    <script src="/js/jquery-1.11.1/jquery-1.11.1.js"></script>
  </head>
  <body>
    <fieldset>
      <legend>OK</legend>
      <a>OK</a><br/>
      <a href="http://www.csdn.net"><i>OK</i></a>
    </fieldset>
    <span>OK</span>
    <script type="module">
      import AcroML from "/js/acroml/src/index.mjs";
      AcroML.Engine.onSwitchLanguage=function(){
        AcroML.htmlTranslator.translatePage(
          AcroML.Engine.instance.dd,AcroML.Engine.instance.LCID);
        }
        function start(){
          AcroML.buildHTMLSelector($('#languageSelector'));
          AcroML.Engine.onSwitchLanguage();
        }
        document.onready=async function(){
          await AcroML.Engine.init({
            engineClass:AcroML.BrowserEngine,
            ddFile:'/dd/Unicode.csv.txt'
        });
        start();
      }
    </script>
  </body>
</html>
```

(2). use dist, es5: /js/acroml/dist/global/acroml.js

```js
    <script src="/js/acroml/dist/global/acroml.js"></script>
    <script>
      AcroML.Engine.onSwitchLanguage=function(){
        AcroML.htmlTranslator.translatePage(
        AcroML.Engine.instance.dd,AcroML.Engine.instance.LCID);
      }
      function start(){
        AcroML.buildHTMLSelector($('#languageSelector'));
        AcroML.Engine.onSwitchLanguage();
      }
      document.onready=async function(){
        await AcroML.Engine.init({
         engineClass:AcroML.BrowserEngine,
    	 ddFile:'/dd/Unicode.csv.txt'
    	});
    	start();
      }
    </script>
```

(3). use dist, aparted core and addon

```js
    <script>
	  let requireMap={
	    'acroml-core':"/js/acroml/dist/umd/acroml-core.js",
	    'acroml-csvtext':"/js/acroml/dist/umd/acroml-csvtext.js",
	    'acroml-engine-browser':"/js/acroml/dist/umd/acroml-engine-browser.js",
	    "acroml-dd-csvtext":"/js/acroml/dist/umd/acroml-dd-csvtext.js",
	    "acroml-html":"/js/acroml/dist/umd/acroml-html.js",
	    "acroml-selector-html":"/js/acroml/dist/umd/acroml-selector-html.js"
	  }
	  let caches={};
	  function _require(path){
	    let p=requireMap[path];
	    if (p) path=p;
	    let m=caches[path];
	    if (!m){
	      var module={exports:{}}
	      var exports = module.exports;
	      $.ajax({
	        url:path,
	        async:false,
	        dataType:'text',
	        success:function(data){
	          let r=eval(data);
	        }
	      });
	      m=module.exports;
	      caches[path]=m;
	    }
	    return m.default||m;
	  }
	  window.acroml_require=_require;
	  let AcroML=_require("acroml-core");
	  let BrowserEngine=_require("acroml-engine-browser");
	  //_require("acroml-csvtext");
	  _require("acroml-dd-csvtext");
	  let {htmlTranslator}=_require("acroml-html");
	  let buildHTMLSelector=_require("acroml-selector-html");
	    
	  AcroML.Engine.onSwitchLanguage=function(){
	    htmlTranslator.translatePage(
          AcroML.Engine.instance.dd,AcroML.Engine.instance.LCID);
	  }
	  function start(){
	    buildHTMLSelector($('#languageSelector'));
	    AcroML.Engine.onSwitchLanguage();
	  }
	  document.onready=async function(){
	    await AcroML.Engine.init({
	      engineClass:BrowserEngine,
	      ddFile:'/dd/Unicode.csv.txt'
	    });
	    start();
	  }
    </script>
```

(4). use dist, in React

```js
    --index.html--
    ...
    <script>
      ...
	    AcroML.Engine.onSwitchLanguage=function(){
	      render_root();
	    }
	    window.t=AcroML.t;
	  </script>

    --root.jsx--
    import AcroMLReactSelector from 'acroml-selector-react';
    //import {ReactSelector} from 'acroml';
    function DemoRoot(props){
      return(
        <div>
          <AcroMLReactSelector/>
        </div>
      )
    }
    export default DemoRoot;

    --ui.demoml.jsx--
	class DemoML extends React.Component {
	  render(){
	    return(
	      <span>t('OK')</span>
	    )
	  }
	}
	export default DemoML;
```

# Q&A
(1).what is "acroml_require"?

like node.js require function,it is a sync function. 

- in browser,umd module addon use "acroml_require" to load core
- in browser,in "/src/easyui/acroML.EasyUI.mjs",use "acroml_require" to load easyui locale json file
- in node.js,umd module addon use it to load core.
  
simply,you can assign "require" to "acroml_require",also,you have a chance to enhance "require" getting a module mapping and diffient module search rule.