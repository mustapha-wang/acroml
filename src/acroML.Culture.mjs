let g_cultures=[];
let g_cultures_byLCID = {};
let g_cultures_byTag = {};
function registerLCID(LCID,
    LanguageName_Abbreviate,
    LanguageName_English,
    LanguageName_Chinese,
    LanguageName_Native,
    RegionID,
    RegionName_Abbreviate,
    RegionName_English,
    RegionName_Chinese,
    RegionName_Native,
    CodePage_ANSI,
    CodePage_OEM,
    CodePage_MAC,
    Google_Abbreviate,
    BaiDu_Abbreviate,
    Tag)
{
    let keyLCID = LCID.toString();
    if (g_cultures_byLCID[keyLCID])
        throw "LCID:" + LCID + " already registered!";
    let culture = {
        LCID,
        LanguageName_Abbreviate,
        LanguageName_English,
        LanguageName_Chinese,
        LanguageName_Native,
        RegionID,
        RegionName_Abbreviate,
        RegionName_English,
        RegionName_Chinese,
        RegionName_Native,
        CodePage_ANSI,
        CodePage_OEM,
        CodePage_MAC,
        Google_Abbreviate,
        BaiDu_Abbreviate,
        Tag
    }
    g_cultures.push(culture);
    g_cultures_byLCID[keyLCID] = culture;

    if (g_cultures_byTag[Tag])
        throw "Tag:" + Tag + " already registered!";
    g_cultures_byTag[Tag] = culture;
}

function init(){
    registerLCID(1025,"ARA","Arabic","阿拉伯语(沙特阿拉伯)","العربية",966,"SAU","Saudi Arabia","沙特阿拉伯","المملكة العربية السعودية",1256,720,10004,"ar",null,"ar-SA");
    registerLCID(1026,"BGR","Bulgarian","保加利亚语(保加利亚)","български",359,"BGR","Bulgaria","保加利亚","България",1251,866,10007,"bg","bul","bg-BG");
    registerLCID(1027,"CAT","Catalan","加泰罗尼亚语(加泰罗尼亚)","català",34,"ESP","Spain","西班牙","Espanya",1252,850,10000,"ca",null,"ca-ES");
    registerLCID(1028,"CHT","Chinese (Traditional)","中文(繁体，中国台湾)","中文(繁體)",886,"TWN","Taiwan,China","中国台湾","中國台灣",950,950,10002,"zh-tw","cht","zh-TW");
    registerLCID(1029,"CSY","Czech","捷克语(捷克共和国)","čeština",420,"CZE","Czech Republic","捷克共和国","Česká republika",1250,852,10029,"cs","cs","cs-CZ");
    registerLCID(1030,"DAN","Danish","丹麦语(丹麦)","dansk",45,"DNK","Denmark","丹麦","Danmark",1252,850,10000,"da","dan","da-DK");
    registerLCID(1031,"DEU","German","德语(德国)","Deutsch",49,"DEU","Germany","德国","Deutschland",1252,850,10000,"de","de","de-DE");
    registerLCID(1032,"ELL","Greek","希腊语(希腊)","Ελληνικά",30,"GRC","Greece","希腊","Ελλάδα",1253,737,10006,"el","el","el-GR");
    registerLCID(1033,"ENU","English","英语(美国)","English",1,"USA","United States","美国","United States",1252,437,10000,"en","en","en-US");
    registerLCID(1034,"ESP","Spanish","西班牙语(西班牙，传统排序)","español",34,"ESP","Spain","西班牙","España",1252,850,10000,"es",null,"es-ES_tradnl");
    registerLCID(1035,"FIN","Finnish","芬兰语(芬兰)","suomi",358,"FIN","Finland","芬兰","Suomi",1252,850,10000,"fi","fin","fi-FI");
    registerLCID(1036,"FRA","French","法语(法国)","français",33,"FRA","France","法国","France",1252,850,10000,"fr","fra","fr-FR");
    registerLCID(1037,"HEB","Hebrew","希伯来语(以色列)","עברית",972,"ISR","Israel","以色列","ישראל",1255,862,10005,"iw",null,"he-IL");
    registerLCID(1038,"HUN","Hungarian","匈牙利语(匈牙利)","magyar",36,"HUN","Hungary","匈牙利","Magyarország",1250,852,10029,"hu","hu","hu-HU");
    registerLCID(1039,"ISL","Icelandic","冰岛语(冰岛)","íslenska",354,"ISL","Iceland","冰岛","Ísland",1252,850,10079,"is",null,"is-IS");
    registerLCID(1040,"ITA","Italian","意大利语(意大利)","italiano",39,"ITA","Italy","意大利","Italia",1252,850,10000,"it","it","it-IT");
    registerLCID(1041,"JPN","Japanese","日语(日本)","日本語",81,"JPN","Japan","日本","日本",932,932,10001,"ja","jp","ja-JP");
    registerLCID(1042,"KOR","Korean","朝鲜语(韩国)","한국어",82,"KOR","Korea","韩国","대한민국",949,949,10003,"ko","kor","ko-KR");
    registerLCID(1043,"NLD","Dutch","荷兰语(荷兰)","Nederlands",31,"NLD","Netherlands","荷兰","Nederland",1252,850,10000,"nl","nl","nl-NL");
    registerLCID(1044,"NOR","Norwegian (Bokmål)","书面挪威语(挪威)","norsk (bokmål)",47,"NOR","Norway","挪威","Norge",1252,850,10000,"no",null,"nb-NO");
    registerLCID(1045,"PLK","Polish","波兰语(波兰)","polski",48,"POL","Poland","波兰","Polska",1250,852,10029,"pl","pl","pl-PL");
    registerLCID(1046,"PTB","Portuguese","葡萄牙语(巴西)","Português",55,"BRA","Brazil","巴西","Brasil",1252,850,10000,"pt","pt","pt-BR");
    registerLCID(1047,"RMC","Romansh","罗曼什语(瑞士)","Rumantsch",41,"CHE","Switzerland","瑞士","Svizra",1252,850,10000,"",null,"rm-CH");
    registerLCID(1048,"ROM","Romanian","罗马尼亚语(罗马尼亚)","română",40,"ROM","Romania","罗马尼亚","România",1250,852,10029,"ro","rom","ro-RO");
    registerLCID(1049,"RUS","Russian","俄语(俄罗斯)","русский",7,"RUS","Russia","俄罗斯","Россия",1251,866,10007,"ru","ru","ru-RU");
    registerLCID(1050,"HRV","Croatian","克罗地亚语(克罗地亚)","hrvatski",385,"HRV","Croatia","克罗地亚","Hrvatska",1250,852,10082,"hr",null,"hr-HR");
    registerLCID(1051,"SKY","Slovak","斯洛伐克语(斯洛伐克)","slovenčina",421,"SVK","Slovakia","斯洛伐克","Slovenská republika",1250,852,10029,"sk",null,"sk-SK");
    registerLCID(1052,"SQI","Albanian","阿尔巴尼亚语(阿尔巴尼亚)","shqipe",355,"ALB","Albania","阿尔巴尼亚","Shqipëria",1250,852,10029,"sq",null,"sq-AL");
    registerLCID(1053,"SVE","Swedish","瑞典语(瑞典)","svenska",46,"SWE","Sweden","瑞典","Sverige",1252,850,10000,"sv",null,"sv-SE");
    registerLCID(1054,"THA","Thai","泰语(泰国)","ไทย",66,"THA","Thailand","泰国","ไทย",874,874,10021,"th","th","th-TH");
    registerLCID(1055,"TRK","Turkish","土耳其语(土耳其)","Türkçe",90,"TUR","Turkey","土耳其","Türkiye",1254,857,10081,"tr",null,"tr-TR");
    registerLCID(1056,"URD","Urdu","乌尔都语(巴基斯坦伊斯兰共和国)","اُردو",92,"PAK","Islamic Republic of Pakistan","巴基斯坦伊斯兰共和国","پاکستان",1256,720,10004,"",null,"ur-PK");
    registerLCID(1057,"IND","Indonesian","印度尼西亚语(印度尼西亚)","Bahasa Indonesia",62,"IDN","Indonesia","印度尼西亚","Indonesia",1252,850,10000,"id",null,"id-ID");
    registerLCID(1058,"UKR","Ukrainian","乌克兰语(乌克兰)","українська",380,"UKR","Ukraine","乌克兰","Україна",1251,866,10017,"uk",null,"uk-UA");
    registerLCID(1059,"BEL","Belarusian","白俄罗斯语(白俄罗斯)","Беларускі",7,"BLR","Belarus","白俄罗斯","Беларусь",1251,866,10007,"be",null,"be-BY");
    registerLCID(1060,"SLV","Slovenian","斯洛文尼亚语(斯洛文尼亚)","slovenski",386,"SVN","Slovenia","斯洛文尼亚","Slovenija",1250,852,10029,"sl","slo","sl-SI");
    registerLCID(1061,"ETI","Estonian","爱沙尼亚语(爱沙尼亚)","eesti",372,"EST","Estonia","爱沙尼亚","Eesti",1257,775,10029,"et","est","et-EE");
    registerLCID(1062,"LVI","Latvian","拉脱维亚语(拉脱维亚)","latviešu",371,"LVA","Latvia","拉脱维亚","Latvija",1257,775,10029,"lv",null,"lv-LV");
    registerLCID(1063,"LTH","Lithuanian","立陶宛语(立陶宛)","lietuvių",370,"LTU","Lithuania","立陶宛","Lietuva",1257,775,10029,"lt",null,"lt-LT");
    registerLCID(1064,"TAJ","Tajik (Cyrillic)","塔吉克语(西里尔文，塔吉克斯坦)","Тоҷикӣ",992,"TAJ","Tajikistan","塔吉克斯坦","Тоҷикистон",1251,866,10007,"",null,"tg-Cyrl-TJ");
    registerLCID(1065,"FAR","Persian","波斯语","فارسى",981,"IRN","Iran","伊朗","ایران",1256,720,10004,"fa",null,"fa-IR");
    registerLCID(1066,"VIT","Vietnamese","越南语(越南)","Tiếng Việt",84,"VNM","Vietnam","越南","Việt Nam",1258,1258,10000,"vi","vie","vi-VN");
    registerLCID(1067,"HYE","Armenian","亚美尼亚语(亚美尼亚)","Հայերեն",374,"ARM","Armenia","亚美尼亚","Հայաստան",0,1,2,"",null,"hy-AM");
    registerLCID(1068,"AZE","Azeri (Latin)","阿塞拜疆语(拉丁语，阿塞拜疆)","Azərbaycan­ılı",994,"AZE","Azerbaijan","阿塞拜疆","Azərbaycan",1254,857,10081,"",null,"az-Latn-AZ");
    registerLCID(1069,"EUQ","Basque","巴斯克语(巴斯克)","euskara",34,"ESP","Spain","西班牙","Espainia",1252,850,10000,"",null,"eu-ES");
    registerLCID(1070,"HSB","Upper Sorbian","上索布语(德国)","hornjoserbšćina",49,"GER","Germany","德国","Němska",1252,850,10000,"",null,"wen-DE");
    registerLCID(1071,"MKI","Macedonian (FYROM)","马其顿语(前南斯拉夫马其顿共和国)","македонски јазик",389,"MKD","Macedonia (FYROM)","马其顿(前南斯拉夫马其顿共和国)","Македонија",1251,866,10007,"mk",null,"mk-MK");
    registerLCID(1074,"TSN","Setswana","茨瓦纳语(南非)","Setswana",27,"ZAF","South Africa","南非","Aforika Borwa",1252,850,10000,"",null,"tn-ZA");
    registerLCID(1076,"XHO","isiXhosa","索萨语(南非)","isiXhosa",27,"ZAF","South Africa","南非","uMzantsi Afrika",1252,850,10000,"",null,"xh-ZA");
    registerLCID(1077,"ZUL","isiZulu","祖鲁语(南非)","isiZulu",27,"ZAF","South Africa","南非","iNingizimu Afrika",1252,850,10000,"",null,"zu-ZA");
    registerLCID(1078,"AFK","Afrikaans","南非荷兰语(南非)","Afrikaans",27,"ZAF","South Africa","南非","Suid Afrika",1252,850,10000,"af","nl","af-ZA");
    registerLCID(1079,"KAT","Georgian","格鲁吉亚语(格鲁吉亚)","ქართული",995,"GEO","Georgia","格鲁吉亚","საქართველო",0,1,2,"",null,"ka-GE");
    registerLCID(1080,"FOS","Faroese","法罗语(法罗群岛)","føroyskt",298,"FRO","Faroe Islands","法罗群岛","Føroyar",1252,850,10079,"",null,"fo-FO");
    registerLCID(1081,"HIN","Hindi","印地语(印度)","हिंदी",91,"IND","India","印度","भारत",0,1,2,"hi",null,"hi-IN");
    registerLCID(1082,"MLT","Maltese","马耳他语(马耳他)","Malti",356,"MLT","Malta","马耳他","Malta",0,1,2,"mt",null,"mt-MT");
    registerLCID(1083,"SME","Sami (Northern)","北萨米语(挪威)","davvisámegiella",47,"NOR","Norway","挪威","Norga",1252,850,10000,"",null,"se-NO");
    registerLCID(1086,"MSL","Malay","马来语(马来西亚)","Bahasa Melayu",60,"MYS","Malaysia","马来西亚","Malaysia",1252,850,10000,"ms",null,"ms-MY");
    registerLCID(1087,"KKZ","Kazakh","哈萨克语(哈萨克斯坦)","Қазақ",7,"KAZ","Kazakhstan","哈萨克斯坦","Қазақстан",0,1,2,"",null,"kk-KZ");
    registerLCID(1088,"KYR","Kyrgyz","吉尔吉斯语(吉尔吉斯斯坦)","Кыргыз",996,"KGZ","Kyrgyzstan","吉尔吉斯斯坦","Кыргызстан",1251,866,10007,"",null,"ky-KG");
    registerLCID(1089,"SWK","Kiswahili","斯瓦希里语(肯尼亚)","Kiswahili",254,"KEN","Kenya","肯尼亚","Kenya",1252,437,10000,"sw",null,"sw-KE");
    registerLCID(1090,"TUK","Turkmen","土库曼语(土库曼斯坦)","türkmençe",993,"TKM","Turkmenistan","土库曼斯坦","Türkmenistan",1250,852,10029,"",null,"tk-TM");
    registerLCID(1091,"UZB","Uzbek (Latin)","乌兹别克语(拉丁语，乌兹别克斯坦)","U`zbek",7,"UZB","Uzbekistan","乌兹别克斯坦","U`zbekiston Respublikasi",1254,857,10029,"",null,"uz-Latn-UZ");
    registerLCID(1092,"TTT","Tatar","鞑靼语(俄罗斯)","Татар",7,"RUS","Russia","俄罗斯","Россия",1251,866,10007,"",null,"tt-RU");
    registerLCID(1093,"BNG","Bengali","孟加拉语(印度)","বাংলা",91,"IND","India","印度","ভারত",0,1,2,"",null,"bn-IN");
    registerLCID(1094,"PAN","Punjabi","旁遮普语(印度)","ਪੰਜਾਬੀ",91,"IND","India","印度","ਭਾਰਤ",0,1,2,"",null,"pa-IN");
    registerLCID(1095,"GUJ","Gujarati","古吉拉特语(印度)","ગુજરાતી",91,"IND","India","印度","ભારત",0,1,2,"",null,"gu-IN");
    registerLCID(1096,"ORI","Oriya","奥里雅语(印度)","ଓଡ଼ିଆ",91,"IND","India","印度","ଭାରତ",0,1,2,"",null,"or-IN");
    registerLCID(1097,"TAM","Tamil","泰米尔语(印度)","தமிழ்",91,"IND","India","印度","இந்தியா",0,1,2,"",null,"ta-IN");
    registerLCID(1098,"TEL","Telugu","泰卢固语(印度)","తెలుగు",91,"IND","India","印度","భారత దేశం",0,1,2,"",null,"te-IN");
    registerLCID(1099,"KDI","Kannada","埃纳德语(印度)","ಕನ್ನಡ",91,"IND","India","印度","ಭಾರತ",0,1,2,"",null,"kn-IN");
    registerLCID(1100,"MYM","Malayalam","马拉雅拉姆语(印度)","മലയാളം",91,"IND","India","印度","ഭാരതം",0,1,2,"ms",null,"ml-IN");
    registerLCID(1101,"ASM","Assamese","阿萨姆语(印度)","অসমীয়া",91,"IND","India","印度","ভাৰত",0,1,2,"",null,"as-IN");
    registerLCID(1102,"MAR","Marathi","马拉地语(印度)","मराठी",91,"IND","India","印度","भारत",0,1,2,"",null,"mr-IN");
    registerLCID(1103,"SAN","Sanskrit","梵语(印度)","संस्कृत",91,"IND","India","印度","भारतम्",0,1,2,"",null,"sa-IN");
    registerLCID(1104,"MNN","Mongolian (Cyrillic)","蒙古语(西里尔文，蒙古)","Монгол хэл",976,"MNG","Mongolia","蒙古","Монгол улс",1251,866,10007,"",null,"mn-MN");
    registerLCID(1105,"BOB","Tibetan","藏语(中国)","བོད་ཡིག",86,"CHN","People`s Republic of China","中华人民共和国","ཀྲུང་ཧྭ་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ།",0,1,2,"",null,"bo-CN");
    registerLCID(1106,"CYM","Welsh","威尔士语(英国)","Cymraeg",44,"GBR","United Kingdom","英国","y Deyrnas Unedig",1252,850,10000,"cy",null,"cy-GB");
    registerLCID(1107,"KHM","Khmer","高棉语(柬埔寨)","ខ្មែរ",855,"KHM","Cambodia","柬埔寨","កម្ពុជា",0,1,2,"",null,"km-KH");
    registerLCID(1108,"LAO","Lao","老挝语(老挝人民民主共和国)","ລາວ",457,"LAO","Lao P.D.R.","老挝人民民主共和国","ສ.ປ.ປ. ລາວ",0,1,2,"",null,"lo-LA");
    registerLCID(1110,"GLC","Galician","加利西亚语(加利西亚语)","galego",34,"ESP","Spain","西班牙","España",1252,850,10000,"gl",null,"gl-ES");
    registerLCID(1111,"KNK","Konkani","孔卡尼语(印度)","कोंकणी",91,"IND","India","印度","भारत",0,1,2,"",null,"kok-IN");
    registerLCID(1114,"SYR","Syriac","叙利亚语(叙利亚)","ܣܘܪܝܝܐ",963,"SYR","Syria","叙利亚","سوريا",0,1,2,"",null,"syr-SY");
    registerLCID(1115,"SIN","Sinhala","僧伽罗语(斯里兰卡)","සිංහ",94,"LKA","Sri Lanka","斯里兰卡","ශ්‍රී ලංකා",0,1,2,"",null,"si-LK");
    registerLCID(1117,"IUS","Inuktitut (Syllabics)","因纽特语(音节，加拿大)","ᐃᓄᒃᑎᑐᑦ",2,"CAN","Canada","加拿大","ᑲᓇᑕ",0,1,2,"",null,"iu-Cans-CA");
    registerLCID(1118,"AMH","Amharic","阿姆哈拉语(埃塞俄比亚)","አማርኛ",251,"ETH","Ethiopia","埃塞俄比亚","ኢትዮጵያ",0,1,2,"",null,"am-ET");
    registerLCID(1121,"NEP","Nepali","尼泊尔语(尼泊尔)","नेपाली",977,"NEP","Nepal","尼泊尔","नेपाल",0,1,2,"",null,"ne-NP");
    registerLCID(1122,"FYN","Frisian","弗里西亚语(荷兰)","Frysk",31,"NLD","Netherlands","荷兰","Nederlân",1252,850,10000,"",null,"fy-NL");
    registerLCID(1123,"PAS","Pashto","普什图语(阿富汗)","پښتو",93,"AFG","Afghanistan","阿富汗","افغانستان",0,1,2,"",null,"ps-AF");
    registerLCID(1124,"FPO","Filipino","菲律宾语(菲律宾)","Filipino",63,"PHL","Philippines","菲律宾","Pilipinas",1252,437,10000,"tl",null,"fil-PH");
    registerLCID(1125,"DIV","Divehi","迪维希语(马尔代夫)","ދިވެހިބަސް",960,"MDV","Maldives","马尔代夫","ދިވެހި ރާއްޖެ",0,1,2,"",null,"dv-MV");
    registerLCID(1128,"HAU","Hausa (Latin)","豪撒语(拉丁语，尼日利亚)","Hausa",234,"NGA","Nigeria","尼日利亚","Nigeria",1252,437,10000,"",null,"ha-Latn-NG");
    registerLCID(1130,"YOR","Yoruba","约鲁巴语(尼日利亚)","Yoruba",234,"NGA","Nigeria","尼日利亚","Nigeria",1252,437,10000,"",null,"yo-NG");
    registerLCID(1131,"QUB","Quechua","克丘亚语(玻利维亚)","runasimi",591,"BOL","Bolivia","玻利维亚","Bolivia Suyu",1252,850,10000,"",null,"quz-BO");
    registerLCID(1132,"NSO","Sesotho sa Leboa","巴索托语(南非)","Sesotho sa Leboa",27,"ZAF","South Africa","南非","Afrika Borwa",1252,850,10000,"",null,"nso-ZA");
    registerLCID(1133,"BAS","Bashkir","巴什基尔语(俄罗斯)","Башҡорт",7,"RUS","Russia","俄罗斯","Россия",1251,866,10007,"",null,"ba-RU");
    registerLCID(1134,"LBX","Luxembourgish","卢森堡语(卢森堡)","Lëtzebuergesch",352,"LUX","Luxembourg","卢森堡","Luxembourg",1252,850,10000,"",null,"lb-LU");
    registerLCID(1135,"KAL","Greenlandic","格陵兰语(格陵兰)","kalaallisut",299,"GRL","Greenland","格陵兰","Kalaallit Nunaat",1252,850,10000,"",null,"kl-GL");
    registerLCID(1136,"IBO","Igbo","伊博语(尼日利亚)","Igbo",234,"NGA","Nigeria","尼日利亚","Nigeria",1252,437,10000,"",null,"ig-NG");
    registerLCID(1144,"III","Yi","彝语(中国)","ꆈꌠꁱꂷ",86,"CHN","People`s Republic of China","中华人民共和国","ꍏꉸꏓꂱꇭꉼꇩ",0,1,2,"",null,"ii-CN");
    registerLCID(1146,"MPD","Mapudungun","马普丹冈语(智利)","Mapudungun",56,"CHL","Chile","智利","Chile",1252,850,10000,"",null,"arn-CL");
    registerLCID(1148,"MWK","Mohawk","莫霍克语(莫霍克)","Kanien`kéha",2,"CAN","Canada","加拿大","Canada",1252,850,10000,"",null,"moh-CA");
    registerLCID(1150,"BRE","Breton","布里多尼语(法国)","brezhoneg",33,"FRA","France","法国","Frañs",1252,850,10000,"",null,"br-FR");
    registerLCID(1152,"UIG","Uyghur","维吾尔语(中国)","ئۇيغۇرچە",86,"CHN","People`s Republic of China","中华人民共和国","جۇڭخۇا خەلق جۇمھۇرىيىتى",1256,720,10004,"",null,"ug-CN");
    registerLCID(1153,"MRI","Maori","毛利语(新西兰)","Reo Māori",64,"NZL","New Zealand","新西兰","Aotearoa",0,1,2,"",null,"mi-NZ");
    registerLCID(1154,"OCI","Occitan","奥克西唐语(法国)","Occitan",33,"FRA","France","法国","França",1252,850,10000,"",null,"oc-FR");
    registerLCID(1155,"COS","Corsican","科西嘉语(法国)","Corsu",33,"FRA","France","法国","France",1252,850,10000,"",null,"co-FR");
    registerLCID(1156,"GSW","Alsatian","阿尔萨斯语(法国)","Elsässisch",33,"FRA","France","法国","Frànkrisch",1252,850,10000,"",null,"gsw-FR");
    registerLCID(1157,"SAH","Yakut","雅库特语(俄罗斯)","саха",7,"RUS","Russia","俄罗斯","Россия",1251,866,10007,"",null,"sah-RU");
    registerLCID(1158,"QUT","K`iche","基切语(危地马拉)","K`iche",502,"GTM","Guatemala","危地马拉","Guatemala",1252,850,10000,"",null,"qut-GT");
    registerLCID(1159,"KIN","Kinyarwanda","卢旺达语(卢旺达)","Kinyarwanda",250,"RWA","Rwanda","卢旺达","Rwanda",1252,437,10000,"",null,"rw-RW");
    registerLCID(1160,"WOL","Wolof","沃洛夫语(塞内加尔)","Wolof",608,"SEN","Senegal","塞内加尔","Sénégal",1252,850,10000,"",null,"wo-SN");
    registerLCID(1164,"PRS","Dari","达里语(阿富汗)","درى",93,"AFG","Afghanistan","阿富汗","افغانستان",1256,720,10004,"",null,"prs-AF");
    registerLCID(1169,"GLA","Scottish Gaelic","苏格兰盖立语(英国)","Gàidhlig",44,"GBR","United Kingdom","英国","An Rìoghachd Aonaichte",1252,850,10000,"",null,"gd-GB");
    registerLCID(2049,"ARI","Arabic","阿拉伯语(伊拉克)","العربية",964,"IRQ","Iraq","伊拉克","العراق",1256,720,10004,"ar","ara","ar-IQ");
    registerLCID(2052,"CHS","Chinese (Simplified)","中文(简体，中国)","中文(简体)",86,"CHN","People`s Republic of China","中华人民共和国","中华人民共和国",936,936,10008,"zh-cn","zh","zh-CN");
    registerLCID(2055,"DES","German","德语(瑞士)","Deutsch",41,"CHE","Switzerland","瑞士","Schweiz",1252,850,10000,"de","de","de-CH");
    registerLCID(2057,"ENG","English","英语(英国)","English",44,"GBR","United Kingdom","英国","United Kingdom",1252,850,10000,"en","en","en-GB");
    registerLCID(2058,"ESM","Spanish","西班牙语(墨西哥)","Español",52,"MEX","Mexico","墨西哥","México",1252,850,10000,"es","spa","es-MX");
    registerLCID(2060,"FRB","French","法语(比利时)","français",32,"BEL","Belgium","比利时","Belgique",1252,850,10000,"fr","fra","fr-BE");
    registerLCID(2064,"ITS","Italian","意大利语(瑞士)","italiano",41,"CHE","Switzerland","瑞士","Svizzera",1252,850,10000,"it","it","it-CH");
    registerLCID(2067,"NLB","Dutch","荷兰语(比利时)","Nederlands",32,"BEL","Belgium","比利时","België",1252,850,10000,"nl","nl","nl-BE");
    registerLCID(2068,"NON","Norwegian (Nynorsk)","尼诺斯克挪威语(挪威)","norsk (nynorsk)",47,"NOR","Norway","挪威","Noreg",1252,850,10000,"no",null,"nn-NO");
    registerLCID(2070,"PTG","Portuguese","葡萄牙语(葡萄牙)","português",351,"PRT","Portugal","葡萄牙","Portugal",1252,850,10000,"pt","pt","pt-PT");
    registerLCID(2074,"SRL","Serbian (Latin)","塞尔维亚语(拉丁语，塞尔维亚和黑山(前))","srpski",381,"SCG","Serbia and Montenegro (Former)","塞尔维亚和黑山(前)","Srbija i Crna Gora (Prethodno)",1250,852,10029,"sr",null,"sr-Latn-CS");
    registerLCID(2077,"SVF","Swedish","瑞典语(芬兰)","svenska",358,"FIN","Finland","芬兰","Finland",1252,850,10000,"sv","swe","sv-FI");
    registerLCID(2092,"AZC","Azeri (Cyrillic)","阿塞拜疆语(西里尔文，阿塞拜疆)","Азәрбајҹан дили",994,"AZE","Azerbaijan","阿塞拜疆","Азәрбајҹан",1251,866,10007,"",null,"az-Cyrl-AZ");
    registerLCID(2094,"DSB","Lower Sorbian","下索布语(德国)","dolnoserbšćina",49,"GER","Germany","德国","Nimska",1252,850,10000,"",null,"dsb-DE");
    registerLCID(2107,"SMF","Sami (Northern)","北萨米语(瑞典)","davvisámegiella",46,"SWE","Sweden","瑞典","Ruoŧŧa",1252,850,10000,"",null,"se-SE");
    registerLCID(2108,"IRE","Irish","爱尔兰语(爱尔兰)","Gaeilge",353,"IRL","Ireland","爱尔兰","Éire",1252,850,10000,"ga",null,"ga-IE");
    registerLCID(2110,"MSB","Malay","马来语(文莱达鲁萨兰国)","Bahasa Melayu",673,"BRN","Brunei Darussalam","文莱达鲁萨兰国","Brunei Darussalam",1252,850,10000,"ms",null,"ms-BN");
    registerLCID(2115,"UZB","Uzbek (Cyrillic)","乌兹别克语(西里尔文，乌兹别克斯坦)","Ўзбек",7,"UZB","Uzbekistan","乌兹别克斯坦","Ўзбекистон Республикаси",1251,866,10007,"",null,"uz-Cyrl-UZ");
    registerLCID(2117,"BNB","Bengali","孟加拉语(孟加拉国)","বাংলা",880,"BGD","Bangladesh","孟加拉国","বাংলাদেশ",0,1,2,"",null,"bn-BD");
    registerLCID(2128,"MNG","Mongolian (Traditional Mongolian)","蒙古语(传统蒙古语，中国)","ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ",86,"CHN","People`s Republic of China","中华人民共和国","ᠪᠦᠭᠦᠳᠡ ᠨᠠᠢᠷᠠᠮᠳᠠᠬᠤ ᠳᠤᠮᠳᠠᠳᠤ ᠠᠷᠠᠳ ᠣᠯᠣᠰ",0,1,2,"",null,"mn-Mong-CN");
    registerLCID(2141,"IUK","Inuktitut (Latin)","因纽特语(拉丁语，加拿大)","Inuktitut",2,"CAN","Canada","加拿大","kanata",1252,437,10000,"",null,"iu-Latn-CA");
    registerLCID(2143,"TZM","Tamazight (Latin)","塔马塞特语(拉丁语，阿尔及利亚)","Tamazight",213,"DZA","Algeria","阿尔及利亚","Djazaïr",1252,850,10000,"",null,"tzm-Latn-DZ");
    registerLCID(2155,"QUE","Quechua","克丘亚语(厄瓜多尔)","runasimi",593,"ECU","Ecuador","厄瓜多尔","Ecuador Suyu",1252,850,10000,"",null,"quz-EC");
    registerLCID(3073,"ARE","Arabic","阿拉伯语(埃及)","العربية",20,"EGY","Egypt","埃及","مصر",1256,720,10004,"ar","ara","ar-EG");
    registerLCID(3076,"ZHH","Chinese (Traditional)","中文(繁体，中国香港特别行政区)","中文(繁體)",852,"HKG","Hong Kong S.A.R.,China","中国香港特别行政区","中國香港特別行政區",950,950,10002,"zh-tw","yue","zh-HK");
    registerLCID(3079,"DEA","German","德语(奥地利)","Deutsch",43,"AUT","Austria","奥地利","Österreich",1252,850,10000,"de","de","de-AT");
    registerLCID(3081,"ENA","English","英语(澳大利亚)","English",61,"AUS","Australia","澳大利亚","Australia",1252,850,10000,"en","en","en-AU");
    registerLCID(3082,"ESN","Spanish","西班牙语(西班牙，国际排序)","español",34,"ESP","Spain","西班牙","España",1252,850,10000,"es","spa","es-ES");
    registerLCID(3084,"FRC","French","法语(加拿大)","français",2,"CAN","Canada","加拿大","Canada",1252,850,10000,"fr","fra","fr-CA");
    registerLCID(3098,"SRB","Serbian (Cyrillic)","塞尔维亚语(西里尔文，塞尔维亚和黑山(前))","српски",381,"SCG","Serbia and Montenegro (Former)","塞尔维亚和黑山(前)","Србија и Црна Гора (Претходно)",1251,855,10007,"sr",null,"sr-Cyrl-CS");
    registerLCID(3131,"SMG","Sami (Northern)","北萨米语(芬兰)","davvisámegiella",358,"FIN","Finland","芬兰","Suopma",1252,850,10000,"",null,"se-FI");
    registerLCID(3179,"QUP","Quechua","克丘亚语(秘鲁)","runasimi",51,"PER","Peru","秘鲁","Peru Suyu",1252,850,10000,"",null,"quz-PE");
    registerLCID(4097,"ARL","Arabic","阿拉伯语(利比亚)","العربية",218,"LBY","Libya","利比亚","ليبيا",1256,720,10004,"ar","ara","ar-LY");
    registerLCID(4100,"ZHI","Chinese (Simplified)","中文(简体，新加坡)","中文(简体)",65,"SGP","Singapore","新加坡","新加坡",936,936,10008,"zh-cn",null,"zh-SG");
    registerLCID(4103,"DEL","German","德语(卢森堡)","Deutsch",352,"LUX","Luxembourg","卢森堡","Luxemburg",1252,850,10000,"de","de","de-LU");
    registerLCID(4105,"ENC","English","英语(加拿大)","English",2,"CAN","Canada","加拿大","Canada",1252,850,10000,"en","en","en-CA");
    registerLCID(4106,"ESG","Spanish","西班牙语(危地马拉)","Español",502,"GTM","Guatemala","危地马拉","Guatemala",1252,850,10000,"es","spa","es-GT");
    registerLCID(4108,"FRS","French","法语(瑞士)","français",41,"CHE","Switzerland","瑞士","Suisse",1252,850,10000,"fr","fra","fr-CH");
    registerLCID(4122,"HRB","Croatian (Latin)","克罗地亚语(拉丁语，波斯尼亚和黑塞哥维那)","hrvatski",387,"BIH","Bosnia and Herzegovina","波斯尼亚和黑塞哥维那","Bosna i Hercegovina",1250,852,10082,"hr",null,"hr-BA");
    registerLCID(4155,"SMJ","Sami (Lule)","律勒萨米语(挪威)","julevusámegiella",47,"NOR","Norway","挪威","Vuodna",1252,850,10000,"",null,"smj-NO");
    registerLCID(5121,"ARG","Arabic","阿拉伯语(阿尔及利亚)","العربية",213,"DZA","Algeria","阿尔及利亚","الجزائر",1256,720,10004,"ar","ara","ar-DZ");
    registerLCID(5124,"ZHM","Chinese (Traditional)","中文(繁体，中国澳门特别行政区)","中文(繁體)",853,"MCO","Macao S.A.R.,China","中国澳门特别行政区","中國澳門特別行政區",950,950,10002,"zh-tw",null,"zh-MO");
    registerLCID(5127,"DEC","German","德语(列支敦士登)","Deutsch",41,"LIE","Liechtenstein","列支敦士登","Liechtenstein",1252,850,10000,"de","de","de-LI");
    registerLCID(5129,"ENZ","English","英语(新西兰)","English",64,"NZL","New Zealand","新西兰","New Zealand",1252,850,10000,"en","en","en-NZ");
    registerLCID(5130,"ESC","Spanish","西班牙语(哥斯达黎加)","Español",506,"CRI","Costa Rica","哥斯达黎加","Costa Rica",1252,850,10000,"es","spa","es-CR");
    registerLCID(5132,"FRL","French","法语(卢森堡)","français",352,"LUX","Luxembourg","卢森堡","Luxembourg",1252,850,10000,"fr","fra","fr-LU");
    registerLCID(5146,"BSB","Bosnian (Latin)","波斯尼亚语(拉丁语，波斯尼亚和黑塞哥维那)","bosanski",387,"BIH","Bosnia and Herzegovina","波斯尼亚和黑塞哥维那","Bosna i Hercegovina",1250,852,10082,"",null,"bs-Latn-BA");
    registerLCID(5179,"SMK","Sami (Lule)","律勒萨米语(瑞典)","julevusámegiella",46,"SWE","Sweden","瑞典","Svierik",1252,850,10000,"",null,"smj-SE");
    registerLCID(6145,"ARM","Arabic","阿拉伯语(摩洛哥)","العربية",212,"MAR","Morocco","摩洛哥","المملكة المغربية",1256,720,10004,"ar","ara","ar-MA");
    registerLCID(6153,"ENI","English","英语(爱尔兰)","English",353,"IRL","Ireland","爱尔兰","Ireland",1252,850,10000,"en","en","en-IE");
    registerLCID(6154,"ESA","Spanish","西班牙语(巴拿马)","Español",507,"PAN","Panama","巴拿马","Panamá",1252,850,10000,"es","spa","es-PA");
    registerLCID(6156,"FRM","French","法语(摩纳哥)","français",377,"MCO","Principality of Monaco","摩纳哥公国","Principauté de Monaco",1252,850,10000,"fr","fra","fr-MC");
    registerLCID(6170,"SRS","Serbian (Latin)","塞尔维亚语(拉丁语，波斯尼亚和黑塞哥维那)","srpski",387,"BIH","Bosnia and Herzegovina","波斯尼亚和黑塞哥维那","Bosna i Hercegovina",1250,852,10082,"sr",null,"sr-Latn-BA");
    registerLCID(6203,"SMA","Sami (Southern)","南萨米语(挪威)","åarjelsaemiengiele",47,"NOR","Norway","挪威","Nöörje",1252,850,10000,"",null,"sma-NO");
    registerLCID(7169,"ART","Arabic","阿拉伯语(突尼斯)","العربية",216,"TUN","Tunisia","突尼斯","تونس",1256,720,10004,"ar","ara","ar-TN");
    registerLCID(7177,"ENS","English","英语(南非)","English",27,"ZAF","South Africa","南非","South Africa",1252,437,10000,"en","en","en-ZA");
    registerLCID(7178,"ESD","Spanish","西班牙语(多米尼加共和国)","Español",1,"DOM","Dominican Republic","多米尼加共和国","República Dominicana",1252,850,10000,"es","spa","es-DO");
    registerLCID(7194,"SRN","Serbian (Cyrillic)","塞尔维亚语(西里尔文，波斯尼亚和黑塞哥维那)","српски",387,"BIH","Bosnia and Herzegovina","波斯尼亚和黑塞哥维那","Босна и Херцеговина",1251,855,10007,"sr",null,"sr-Cyrl-BA");
    registerLCID(7227,"SMB","Sami (Southern)","南萨米语(瑞典)","åarjelsaemiengiele",46,"SWE","Sweden","瑞典","Sveerje",1252,850,10000,"",null,"sma-SE");
    registerLCID(8193,"ARO","Arabic","阿拉伯语(阿曼)","العربية",968,"OMN","Oman","阿曼","عمان",1256,720,10004,"ar","ara","ar-OM");
    registerLCID(8201,"ENJ","English","英语(牙买加)","English",1,"JAM","Jamaica","牙买加","Jamaica",1252,850,10000,"en","en","en-JM");
    registerLCID(8202,"ESV","Spanish","西班牙语(委内瑞拉玻利瓦尔共和国)","Español",58,"VEN","Bolivarian Republic of Venezuela","委内瑞拉玻利瓦尔共和国","Republica Bolivariana de Venezuela",1252,850,10000,"es","spa","es-VE");
    registerLCID(8218,"BSC","Bosnian (Cyrillic)","波斯尼亚语(西里尔文，波斯尼亚和黑塞哥维那)","босански",387,"BIH","Bosnia and Herzegovina","波斯尼亚和黑塞哥维那","Босна и Херцеговина",1251,855,10082,"",null,"bs-Cyrl-BA");
    registerLCID(8251,"SMS","Sami (Skolt)","斯科特萨米语(芬兰)","sääm´ǩiõll",358,"FIN","Finland","芬兰","Lää´ddjânnam",1252,850,10000,"",null,"sms-FI");
    registerLCID(9217,"ARY","Arabic","阿拉伯语(也门)","العربية",967,"YEM","Yemen","也门","اليمن",1256,720,10004,"ar","ara","ar-YE");
    registerLCID(9225,"ENB","English","英语(加勒比海)","English",1,"CAR","Caribbean","加勒比海","Caribbean",1252,850,10000,"en","en","en-CB");
    registerLCID(9226,"ESO","Spanish","西班牙语(哥伦比亚)","Español",57,"COL","Colombia","哥伦比亚","Colombia",1252,850,10000,"es","spa","es-CO");
    registerLCID(9242,"SRM","Serbian (Latin)","塞尔维亚语(拉丁语，塞尔维亚共和国)","srpski",381,"SRB","Serbia","塞尔维亚共和国","Srbija",1250,852,10029,"sr",null,"sr-Latn-RS");
    registerLCID(9275,"SMN","Sami (Inari)","伊纳里萨米语(芬兰)","sämikielâ",358,"FIN","Finland","芬兰","Suomâ",1252,850,10000,"",null,"smn-FI");
    registerLCID(10241,"ARS","Arabic","阿拉伯语(叙利亚)","العربية",963,"SYR","Syria","叙利亚","سوريا",1256,720,10004,"ar","ara","ar-SY");
    registerLCID(10249,"ENL","English","英语(伯利兹)","English",501,"BLZ","Belize","伯利兹","Belize",1252,850,10000,"en","en","en-BZ");
    registerLCID(10250,"ESR","Spanish","西班牙语(秘鲁)","Español",51,"PER","Peru","秘鲁","Perú",1252,850,10000,"es","spa","es-PE");
    registerLCID(10266,"SRO","Serbian (Cyrillic)","塞尔维亚语(西里尔文，塞尔维亚共和国)","српски",381,"SRB","Serbia","塞尔维亚共和国","Србија",1251,855,10007,"sr",null,"sr-Cyrl-RS");
    registerLCID(11265,"ARJ","Arabic","阿拉伯语(约旦)","العربية",962,"JOR","Jordan","约旦","الأردن",1256,720,10004,"ar","ara","ar-JO");
    registerLCID(11273,"ENT","English","英语(特立尼达和多巴哥)","English",1,"TTO","Trinidad and Tobago","特立尼达和多巴哥","Trinidad y Tobago",1252,850,10000,"en","en","en-TT");
    registerLCID(11274,"ESS","Spanish","西班牙语(阿根廷)","Español",54,"ARG","Argentina","阿根廷","Argentina",1252,850,10000,"es","spa","es-AR");
    registerLCID(11290,"SRP","Serbian (Latin)","塞尔维亚语(拉丁语，黑山共和国)","srpski",381,"MNE","Montenegro","黑山共和国","Crna Gora",1250,852,10029,"sr",null,"sr-Latn-ME");
    registerLCID(12289,"ARB","Arabic","阿拉伯语(黎巴嫩)","العربية",961,"LBN","Lebanon","黎巴嫩","لبنان",1256,720,10004,"ar","ara","ar-LB");
    registerLCID(12297,"ENW","English","英语(津巴布韦)","English",263,"ZWE","Zimbabwe","津巴布韦","Zimbabwe",1252,437,10000,"en","en","en-ZW");
    registerLCID(12298,"ESF","Spanish","西班牙语(厄瓜多尔)","Español",593,"ECU","Ecuador","厄瓜多尔","Ecuador",1252,850,10000,"es","spa","es-EC");
    registerLCID(12314,"SRQ","Serbian (Cyrillic)","塞尔维亚语(西里尔文，黑山共和国)","српски",381,"MNE","Montenegro","黑山共和国","Црна Гора",1251,855,10007,"sr",null,"sr-Cyrl-ME");
    registerLCID(13313,"ARK","Arabic","阿拉伯语(科威特)","العربية",965,"KWT","Kuwait","科威特","الكويت",1256,720,10004,"ar","ara","ar-KW");
    registerLCID(13321,"ENP","English","英语(菲律宾共和国)","English",63,"PHL","Republic of the Philippines","菲律宾共和国","Philippines",1252,437,10000,"en","en","en-PH");
    registerLCID(13322,"ESL","Spanish","西班牙语(智利)","Español",56,"CHL","Chile","智利","Chile",1252,850,10000,"es","spa","es-CL");
    registerLCID(14337,"ARU","Arabic","阿拉伯语(阿联酋)","العربية",971,"ARE","U.A.E.","阿联酋","الإمارات العربية المتحدة",1256,720,10004,"ar","ara","ar-AE");
    registerLCID(14346,"ESY","Spanish","西班牙语(乌拉圭)","Español",598,"URY","Uruguay","乌拉圭","Uruguay",1252,850,10000,"es","spa","es-UY");
    registerLCID(15361,"ARH","Arabic","阿拉伯语(巴林)","العربية",973,"BHR","Bahrain","巴林","البحرين",1256,720,10004,"ar","ara","ar-BH");
    registerLCID(15370,"ESZ","Spanish","西班牙语(巴拉圭)","Español",595,"PRY","Paraguay","巴拉圭","Paraguay",1252,850,10000,"es","spa","es-PY");
    registerLCID(16385,"ARQ","Arabic","阿拉伯语(卡塔尔)","العربية",974,"QAT","Qatar","卡塔尔","قطر",1256,720,10004,"ar","ara","ar-QA");
    registerLCID(16393,"ENN","English","英语(印度)","English",91,"IND","India","印度","India",1252,437,10000,"en","en","en-IN");
    registerLCID(16394,"ESB","Spanish","西班牙语(玻利维亚)","Español",591,"BOL","Bolivia","玻利维亚","Bolivia",1252,850,10000,"es","spa","es-BO");
    registerLCID(17417,"ENM","English","英语(马来西亚)","English",60,"MYS","Malaysia","马来西亚","Malaysia",1252,437,10000,"en","en","en-MY");
    registerLCID(17418,"ESE","Spanish","西班牙语(萨尔瓦多)","Español",503,"SLV","El Salvador","萨尔瓦多","El Salvador",1252,850,10000,"es","spa","es-SV");
    registerLCID(18441,"ENE","English","英语(新加坡)","English",65,"SGP","Singapore","新加坡","Singapore",1252,437,10000,"en","en","en-SG");
    registerLCID(18442,"ESH","Spanish","西班牙语(洪都拉斯)","Español",504,"HND","Honduras","洪都拉斯","Honduras",1252,850,10000,"es","spa","es-HN");
    registerLCID(19466,"ESI","Spanish","西班牙语(尼加拉瓜)","Español",505,"NIC","Nicaragua","尼加拉瓜","Nicaragua",1252,850,10000,"es","spa","es-NI");
    registerLCID(20490,"ESU","Spanish","西班牙语(波多黎各)","Español",1,"PRI","Puerto Rico","波多黎各","Puerto Rico",1252,850,10000,"es","spa","es-PR");
    registerLCID(21514,"EST","Spanish","西班牙语(美国)","Español",1,"USA","United States","美国","Estados Unidos",1252,850,10000,"es","spa","es-US");
}

init();
let acroMLCulture = {
    items: g_cultures,
    findCultureByLCID: function (LCID) {
        return g_cultures_byLCID[LCID.toString()];
    },
    findCultureByTag: function (Tag) {
        return g_cultures_byTag[Tag];
    },
    tag2LCID: function (Tag) {
        var c = g_cultures_byTag[Tag];
        if (c)
            return c.LCID;
        else
            return null;
    },
    LCID2Tag: function (LCID) {
        var c = g_cultures_byLCID[LCID];
        if (c)
            return c.Tag;
        else
            return null;
    }
}
export default acroMLCulture;
export {acroMLCulture as culture};