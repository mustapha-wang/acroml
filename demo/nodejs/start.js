var express = require('express');
var app = express();
var port=3456;
app.set('port', port);
app.set('view engine', 'ejs');
var engine = require('ejs-locals');
app.engine('ejs', engine);

app.use(express.static('assets'));
var cookieParser = require("cookie-parser");
app.use(cookieParser('acroprise inc.'));

app.use('/html',express.static(__dirname+'/html'));
app.use('/js/acroml',express.static(__dirname+'/../../'));
app.use('/react',express.static(__dirname+'/react'));
app.use('/vue',express.static(__dirname+'/vue'));

var port=app.get('port');
var http = require('http');
var server = http.createServer(app);
server.listen(port, function() {
    console.log('Acro Multi-Language Suite WebServer Running on Port:'+port+'...');
});

let path=require('path');
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
let routes=[{
    path:'/ejs/demo',view:__dirname+'/ejs/demo.ejs'
},{
    path:'/html/demo/:type',view:__dirname+'/html/demo.ejs'
}]
function renderEJS(view,req,res){
    //console.log(req.params);
    //console.log(req.headers);
    //console.log(req.cookies);
    let LCID=req.cookies['LCID'];
    if (!LCID){
        let languages = req.headers["accept-language"];
        //languages格式：zh-CN,zh;q=0.9
        let tag;
        if (languages) {
            var langs = languages.split(";");
            if (langs && (langs.length > 0)) {
                var lang = langs[0];
                tag = lang.split(",")[0];
            }
        }
        //console.log(tag);
        LCID=AcroML.culture.tag2LCID(tag);
    }
    //console.log(LCID);
    res.render(view,{
        AcroML:{
            LCID:LCID,
            t:function(DDKey){
                let displayValue=AcroML.Engine.instance.getDisplayValue(DDKey,LCID);
                //console.log(DDKey,LCID,displayValue);
                return displayValue;
            },
            dd:AcroML.Engine.instance.dd,
            culture:AcroML.culture   
        },
        pathParams:req.params
    },function(err,html){
        if (err){
            res.status(500).send(JSON.stringify({
                code:err.code?err.code:err.name,
                message:err.message
            }));
            console.log(err);
        } 
        else res.send(html);
    });
}
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
//console.log(AcroML);
AcroML.Engine.init({
    engineClass:AcroMLNodeJsEngine,
    ddFile:path.resolve(__dirname,'./assets/dd/Unicode.plaintable.json')
})
.then(function(){
    for(let i=0;i<routes.length;i++){
        let r=routes[i];
        app.get(r.path,function(req,res){
            return renderEJS(r.view,req,res);
        });
    }
},function(e){
    console.log(e);
})
