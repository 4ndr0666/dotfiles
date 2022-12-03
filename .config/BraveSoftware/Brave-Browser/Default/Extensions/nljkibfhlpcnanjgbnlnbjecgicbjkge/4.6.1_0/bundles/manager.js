/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		4: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./windows/manager.ts",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./data/xregexps.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"textlinks\":{\"source\":\"\\\\b(?:(?:h(?:x+|tt)?ps?|f(?:x+|t)p):\\\\/\\\\/(?:[A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൘-൞൦-൸෦-෯๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９\\\\$\\\\+<->\\\\^`\\\\|~¢-¦¨©¬®-±´¸×÷˂-˅˒-˟˥-˫˭˯-˿͵΄΅϶҂֍-֏؆-؈؋؎؏۞۩۽۾߶߾߿৲৳৺৻૱୰௳-௺౿൏൹฿༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙᙭៛᥀᧞-᧿᭡-᭪᭴-᭼᾽᾿-῁῍-῏῝-῟῭-`´῾⁄⁒⁺-⁼₊-₌₠-₿℀℁℃-℆℈℉℔№-℘℞-℣℥℧℩℮℺℻⅀-⅄⅊-⅍⅏↊↋←-⌇⌌-⌨⌫-␦⑀-⑊⒜-ⓩ─-❧➔-⟄⟇-⟥⟰-⦂⦙-⧗⧜-⧻⧾-⭳⭶-⮕⮗-⯿⳥-⳪⹐⹑⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿゛゜㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㏿䷀-䷿꒐-꓆꜀-꜖꜠꜡꞉꞊꠨-꠫꠶-꠹꩷-꩹꭛꭪꭫﬩﮲-﯁﷼﷽﹢﹤-﹦﹩＄＋＜-＞＾｀｜～￠-￦￨-￮￼�]+?:[A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൘-൞൦-൸෦-෯๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９\\\\$\\\\+<->\\\\^`\\\\|~¢-¦¨©¬®-±´¸×÷˂-˅˒-˟˥-˫˭˯-˿͵΄΅϶҂֍-֏؆-؈؋؎؏۞۩۽۾߶߾߿৲৳৺৻૱୰௳-௺౿൏൹฿༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙᙭៛᥀᧞-᧿᭡-᭪᭴-᭼᾽᾿-῁῍-῏῝-῟῭-`´῾⁄⁒⁺-⁼₊-₌₠-₿℀℁℃-℆℈℉℔№-℘℞-℣℥℧℩℮℺℻⅀-⅄⅊-⅍⅏↊↋←-⌇⌌-⌨⌫-␦⑀-⑊⒜-ⓩ─-❧➔-⟄⟇-⟥⟰-⦂⦙-⧗⧜-⧻⧾-⭳⭶-⮕⮗-⯿⳥-⳪⹐⹑⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿゛゜㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㏿䷀-䷿꒐-꓆꜀-꜖꜠꜡꞉꞊꠨-꠫꠶-꠹꩷-꩹꭛꭪꭫﬩﮲-﯁﷼﷽﹢﹤-﹦﹩＄＋＜-＞＾｀｜～￠-￦￨-￮￼�]+?@)?|www\\\\d?\\\\.)[\\\\d\\\\w.-]+\\\\.?(?:\\\\/[0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൘-൞൦-൸෦-෯๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ!-#%-\\\\*,-\\\\/:;\\\\?@\\\\[-\\\\]_\\\\{\\\\}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰৽੶૰౷಄෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎⌈-⌋〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⹏⹒、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꣼꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･\\\\$\\\\+<->\\\\^`\\\\|~¢-¦¨©¬®-±´¸×÷˂-˅˒-˟˥-˫˭˯-˿͵΄΅϶҂֍-֏؆-؈؋؎؏۞۩۽۾߶߾߿৲৳৺৻૱୰௳-௺౿൏൹฿༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙᙭៛᥀᧞-᧿᭡-᭪᭴-᭼᾽᾿-῁῍-῏῝-῟῭-`´῾⁄⁒⁺-⁼₊-₌₠-₿℀℁℃-℆℈℉℔№-℘℞-℣℥℧℩℮℺℻⅀-⅄⅊-⅍⅏↊↋←-⌇⌌-⌨⌫-␦⑀-⑊⒜-ⓩ─-❧➔-⟄⟇-⟥⟰-⦂⦙-⧗⧜-⧻⧾-⭳⭶-⮕⮗-⯿⳥-⳪⹐⹑⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿゛゜㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㏿䷀-䷿꒐-꓆꜀-꜖꜠꜡꞉꞊꠨-꠫꠶-꠹꩷-꩹꭛꭪꭫﬩﮲-﯁﷼﷽﹢﹤-﹦﹩＄＋＜-＞＾｀｜～￠-￦￨-￮￼�]*)?\",\"flags\":\"giu\"}}");

/***/ }),

/***/ "./lib/formatters.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSpeed = exports.formatSize = exports.makeNumberFormatter = exports.formatTimeDelta = exports.formatInteger = void 0;
// License: MIT
const i18n_1 = __webpack_require__("./lib/i18n.ts");
const memoize_1 = __webpack_require__("./lib/memoize.ts");
function formatInteger(num, digits) {
    const neg = num < 0;
    const snum = Math.abs(num).toFixed(0);
    if (typeof digits === "undefined" || !isFinite(digits)) {
        digits = 3;
    }
    if (digits <= 0) {
        throw new Error("Invalid digit count");
    }
    if (snum.length >= digits) {
        return num.toFixed(0);
    }
    if (neg) {
        return `-${snum.padStart(digits, "0")}`;
    }
    return snum.padStart(digits, "0");
}
exports.formatInteger = formatInteger;
const HOURS_PER_DAY = 24;
const SEC_PER_MIN = 60;
const MIN_PER_HOUR = 60;
const SECS_PER_HOUR = SEC_PER_MIN * MIN_PER_HOUR;
function formatTimeDelta(delta) {
    let rv = delta < 0 ? "-" : "";
    delta = Math.abs(delta);
    let h = Math.floor(delta / SECS_PER_HOUR);
    const m = Math.floor((delta % SECS_PER_HOUR) / SEC_PER_MIN);
    const s = Math.floor(delta % SEC_PER_MIN);
    if (h) {
        if (h >= HOURS_PER_DAY) {
            const days = Math.floor(h / HOURS_PER_DAY);
            if (days > 9) {
                return "∞";
            }
            rv += `${days}d::`;
            h %= HOURS_PER_DAY;
        }
        rv += `${formatInteger(h, 2)}:`;
    }
    return `${rv + formatInteger(m, 2)}:${formatInteger(s, 2)}`;
}
exports.formatTimeDelta = formatTimeDelta;
function makeNumberFormatter(fracDigits) {
    const rv = new Intl.NumberFormat(undefined, {
        style: "decimal",
        useGrouping: false,
        minimumFractionDigits: fracDigits,
        maximumFractionDigits: fracDigits
    });
    return rv.format.bind(rv);
}
exports.makeNumberFormatter = makeNumberFormatter;
const fmt0 = makeNumberFormatter(0);
const fmt1 = makeNumberFormatter(1);
const fmt2 = makeNumberFormatter(2);
const fmt3 = makeNumberFormatter(3);
const SIZE_UNITS = [
    ["sizeB", fmt0],
    ["sizeKB", fmt1],
    ["sizeMB", fmt2],
    ["sizeGB", fmt2],
    ["sizeTB", fmt3],
    ["sizePB", fmt3],
];
const SIZE_NUINITS = SIZE_UNITS.length;
const SIZE_SCALE = 875;
const SIZE_KILO = 1024;
exports.formatSize = memoize_1.memoize(function formatSize(size, fractions = true) {
    const neg = size < 0;
    size = Math.abs(size);
    let i = 0;
    while (size > SIZE_SCALE && ++i < SIZE_NUINITS) {
        size /= SIZE_KILO;
    }
    if (neg) {
        size = -size;
    }
    const [unit, fmt] = SIZE_UNITS[i];
    return i18n_1._(unit, fractions ? fmt(size) : fmt0(size));
}, 1000, 2);
const SPEED_UNITS = [
    ["speedB", fmt0],
    ["speedKB", fmt2],
    ["speedMB", fmt2],
];
const SPEED_NUNITS = SIZE_UNITS.length;
exports.formatSpeed = memoize_1.memoize(function formatSpeed(size) {
    const neg = size < 0;
    size = Math.abs(size);
    let i = 0;
    while (size > SIZE_KILO && ++i < SPEED_NUNITS) {
        size /= SIZE_KILO;
    }
    if (neg) {
        size = -size;
    }
    const [unit, fmt] = SPEED_UNITS[i];
    return i18n_1._(unit, fmt(size));
});


/***/ }),

/***/ "./lib/iconcache.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IconCache = void 0;
const tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
// License: MIT
const browser_1 = __webpack_require__("./lib/browser.ts");
const events_1 = __webpack_require__("./uikit/lib/events.ts");
const pserializer_1 = __webpack_require__("./lib/pserializer.ts");
const localforage_1 = tslib_1.__importDefault(__webpack_require__("./node_modules/localforage/dist/localforage.js"));
const STORE = "iconcache";
// eslint-disable-next-line no-magic-numbers
const CACHE_SIZES = browser_1.CHROME ? [16, 32] : [16, 32, 64, 127];
const BLACKLISTED = Object.freeze(new Set([
    "",
    "ext",
    "ico",
    "pif",
    "scr",
    "ani",
    "cur",
    "ttf",
    "otf",
    "woff",
    "woff2",
    "cpl",
    "desktop",
    "app",
]));
async function getIcon(size, manId) {
    const raw = await browser_1.downloads.getFileIcon(manId, { size });
    const icon = new URL(raw);
    if (icon.protocol === "data:") {
        const res = await fetch(icon.toString());
        const blob = await res.blob();
        return { size, icon: blob };
    }
    return { size, icon };
}
const SYNONYMS = Object.freeze(new Map([
    ["jpe", "jpg"],
    ["jpeg", "jpg"],
    ["jfif", "jpg"],
    ["mpe", "mpg"],
    ["mpeg", "mpg"],
    ["m4v", "mp4"],
]));
exports.IconCache = new class IconCache extends events_1.EventEmitter {
    constructor() {
        super();
        this.db = localforage_1.default.createInstance({ name: STORE });
        this.cache = new Map();
        this.get = pserializer_1.PromiseSerializer.wrapNew(8, this, this.get);
        this.set = pserializer_1.PromiseSerializer.wrapNew(1, this, this.set);
    }
    normalize(ext) {
        ext = ext.toLocaleLowerCase();
        return SYNONYMS.get(ext) || ext;
    }
    // eslint-disable-next-line no-magic-numbers
    async get(ext, size = 16) {
        ext = this.normalize(ext);
        if (BLACKLISTED.has(ext)) {
            return undefined;
        }
        const sext = `${ext}-${size}`;
        let rv = this.cache.get(sext);
        if (rv) {
            return rv;
        }
        rv = this.cache.get(sext);
        if (rv) {
            return rv;
        }
        let result = await this.db.getItem(sext);
        if (!result) {
            return this.cache.get(sext);
        }
        rv = this.cache.get(sext);
        if (rv) {
            return rv;
        }
        if (typeof result !== "string") {
            result = URL.createObjectURL(result).toString();
        }
        this.cache.set(sext, result);
        this.cache.set(ext, "");
        return result;
    }
    async set(ext, manId) {
        ext = this.normalize(ext);
        if (BLACKLISTED.has(ext)) {
            return;
        }
        if (this.cache.has(ext)) {
            // already processed in this session
            return;
        }
        // eslint-disable-next-line no-magic-numbers
        const urls = await Promise.all(CACHE_SIZES.map(size => getIcon(size, manId)));
        if (this.cache.has(ext)) {
            // already processed in this session
            return;
        }
        for (const { size, icon } of urls) {
            this.cache.set(`${ext}-${size}`, URL.createObjectURL(icon));
            await this.db.setItem(`${ext}-${size}`, icon);
        }
        this.cache.set(ext, "");
        this.emit("cached", ext);
    }
}();


/***/ }),

/***/ "./lib/imex.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.metalinkExporter = exports.aria2Exporter = exports.textExporter = exports.importText = exports.NS_DTA = exports.NS_METALINK_RFC5854 = void 0;
// License: MIT
const textlinks_1 = __webpack_require__("./lib/textlinks.ts");
const constants_1 = __webpack_require__("./lib/constants.ts");
exports.NS_METALINK_RFC5854 = "urn:ietf:params:xml:ns:metalink";
exports.NS_DTA = "http://www.downthemall.net/properties#";
function parseNum(file, attr, defaultValue, ns = exports.NS_METALINK_RFC5854) {
    const val = file.getAttributeNS(ns, attr);
    if (!val) {
        return defaultValue + 1;
    }
    const num = parseInt(val, 10);
    if (isFinite(num)) {
        return num;
    }
    return defaultValue + 1;
}
function urlToUsable(u) {
    try {
        return decodeURIComponent(u);
    }
    catch (ex) {
        return u || "";
    }
}
function importMeta4(data) {
    const parser = new DOMParser();
    const document = parser.parseFromString(data, "text/xml");
    const { documentElement } = document;
    const items = [];
    let batch = 0;
    for (const file of documentElement.querySelectorAll("file")) {
        try {
            const url = Array.from(file.querySelectorAll("url")).map(u => {
                try {
                    const { textContent } = u;
                    if (!textContent) {
                        return null;
                    }
                    const url = new URL(textContent);
                    if (!constants_1.ALLOWED_SCHEMES.has(url.protocol)) {
                        return null;
                    }
                    const prio = parseNum(u, "priority", 0);
                    return {
                        url,
                        prio
                    };
                }
                catch {
                    return null;
                }
            }).filter(u => !!u).reduce((p, c) => {
                if (!c) {
                    return null;
                }
                if (!p || p.prio < c.prio) {
                    return c;
                }
                return p;
            });
            if (!url) {
                continue;
            }
            batch = parseNum(file, "num", batch, exports.NS_DTA);
            const idx = parseNum(file, "idx", 0, exports.NS_DTA);
            const item = {
                url: url.url.toString(),
                usable: urlToUsable(url.url.toString()),
                batch,
                idx
            };
            const ref = file.getAttributeNS(exports.NS_DTA, "referrer");
            if (ref) {
                item.referrer = ref;
                item.usableReferrer = urlToUsable(ref);
            }
            const mask = file.getAttributeNS(exports.NS_DTA, "mask");
            if (mask) {
                item.mask = mask;
            }
            const description = file.querySelector("description");
            if (description && description.textContent) {
                item.description = description.textContent.trim();
            }
            const title = file.getElementsByTagNameNS(exports.NS_DTA, "title");
            if (title && title[0] && title[0].textContent) {
                item.title = title[0].textContent;
            }
            items.push(item);
        }
        catch (ex) {
            console.error("Failed to import file", ex);
        }
    }
    return items;
}
function parseKV(current, line) {
    const [k, v] = line.split("=", 2);
    switch (k.toLocaleLowerCase().trim()) {
        case "referer": {
            const refererUrls = textlinks_1.getTextLinks(v);
            if (refererUrls && refererUrls.length) {
                current.referrer = refererUrls.pop();
                current.usableReferrer = urlToUsable(current.referrer || "");
            }
            break;
        }
    }
}
function importText(data) {
    if (data.includes(exports.NS_METALINK_RFC5854)) {
        return importMeta4(data);
    }
    const splitter = /((?:.|\r)+)\n|(.+)$/g;
    const spacer = /^\s+/;
    let match;
    let current = undefined;
    let idx = 0;
    const items = [];
    while ((match = splitter.exec(data)) !== null) {
        try {
            const line = match[0].trimRight();
            if (!line) {
                continue;
            }
            if (spacer.test(line)) {
                if (!current) {
                    continue;
                }
                parseKV(current, line);
                continue;
            }
            const urls = textlinks_1.getTextLinks(line);
            if (!urls || !urls.length) {
                continue;
            }
            current = {
                url: urls[0],
                usable: urlToUsable(urls[0]),
                idx: ++idx
            };
            items.push(current);
        }
        catch (ex) {
            current = undefined;
            console.error("Failed to import", ex);
        }
    }
    return items;
}
exports.importText = importText;
class TextExporter {
    constructor() {
        this.fileName = "links.txt";
    }
    getText(items) {
        const lines = [];
        for (const item of items) {
            lines.push(item.url);
        }
        return lines.join("\n");
    }
}
class Aria2Exporter {
    constructor() {
        this.fileName = "links.aria2.txt";
    }
    getText(items) {
        const lines = [];
        for (const item of items) {
            lines.push(item.url);
            if (item.referrer) {
                lines.push(`  referer=${item.referrer}`);
            }
        }
        return lines.join("\n");
    }
}
class MetalinkExporter {
    constructor() {
        this.fileName = "links.meta4";
    }
    getText(items) {
        const document = window.document.implementation.
            createDocument(exports.NS_METALINK_RFC5854, "metalink", null);
        const root = document.documentElement;
        root.setAttributeNS(exports.NS_DTA, "generator", "DownThemAll!");
        root.appendChild(document.createComment("metalink as exported by DownThemAll!"));
        for (const item of items) {
            const anyItem = item;
            const f = document.createElementNS(exports.NS_METALINK_RFC5854, "file");
            f.setAttribute("name", anyItem.currentName);
            if (item.batch) {
                f.setAttributeNS(exports.NS_DTA, "num", item.batch.toString());
            }
            if (item.idx) {
                f.setAttributeNS(exports.NS_DTA, "idx", item.idx.toString());
            }
            if (item.referrer) {
                f.setAttributeNS(exports.NS_DTA, "referrer", item.referrer);
            }
            if (item.mask) {
                f.setAttributeNS(exports.NS_DTA, "mask", item.mask);
            }
            if (item.description) {
                const n = document.createElementNS(exports.NS_METALINK_RFC5854, "description");
                n.textContent = item.description;
                f.appendChild(n);
            }
            if (item.title) {
                const n = document.createElementNS(exports.NS_DTA, "title");
                n.textContent = item.title;
                f.appendChild(n);
            }
            const u = document.createElementNS(exports.NS_METALINK_RFC5854, "url");
            u.textContent = item.url;
            f.appendChild(u);
            if (anyItem.totalSize > 0) {
                const s = document.createElementNS(exports.NS_METALINK_RFC5854, "size");
                s.textContent = anyItem.totalSize.toString();
                f.appendChild(s);
            }
            root.appendChild(f);
        }
        let xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
        xml += root.outerHTML;
        return xml;
    }
}
exports.textExporter = new TextExporter();
exports.aria2Exporter = new Aria2Exporter();
exports.metalinkExporter = new MetalinkExporter();


/***/ }),

/***/ "./lib/textlinks.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextLinks = exports.FakeLink = void 0;
// License: MIT
const xregexps_json_1 = __webpack_require__("./data/xregexps.json");
const SCHEME_DEFAULT = "https";
// Link matcher
const regLinks = new RegExp(xregexps_json_1.textlinks.source, xregexps_json_1.textlinks.flags);
// Match more exactly or more than 3 dots.
// Links are then assumed "cropped" and will be ignored.
const regShortened = /\.{3,}/;
// http cleanup
const regHttp = /^h(?:x+|tt)?p(s?)/i;
// ftp cleanup
const regFtp = /^f(?:x+|t)p/i;
// www (sans protocol) match
const regWWW = /^www/i;
// Right-trim (sanitize) link
const regDTrim = /[<>._-]+$|#.*?$/g;
function mapper(e) {
    try {
        if (regShortened.test(e)) {
            return null;
        }
        if (regWWW.test(e)) {
            if (e.indexOf("/") < 0) {
                e = `${SCHEME_DEFAULT}://${e}/`;
            }
            else {
                e = `${SCHEME_DEFAULT}://${e}`;
            }
        }
        return e.replace(regHttp, "http$1").
            replace(regFtp, "ftp").
            replace(regDTrim, "");
    }
    catch (ex) {
        return null;
    }
}
/**
 * Minimal Link representation (partially) implementing DOMElement
 *
 * @param {string} url URL (href) of the Links
 * @param {string} title Optional. Title/description
 * @see DOMElement
 */
class FakeLink {
    constructor(url, title) {
        this.src = this.href = url;
        if (title) {
            this.title = title;
        }
        this.fake = true;
        Object.freeze(this);
    }
    hasAttribute(attr) {
        return (attr in this);
    }
    getAttribute(attr) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return (attr in self) ? self[attr] : null;
    }
    toString() {
        return this.href;
    }
}
exports.FakeLink = FakeLink;
FakeLink.prototype.childNodes = Object.freeze([]);
/**
 * Parses a text looking for any URLs with supported protocols
 *
 * @param {string} text Text to parse
 * @param {boolean} [fakeLinks]
 *   Whether an array of plain text links will be returned or
 *   an array of FakeLinks.
 * @returns {string[]} results
 */
function getTextLinks(text, fakeLinks = false) {
    const rv = text.match(regLinks);
    if (!rv) {
        return [];
    }
    let i;
    let k;
    let e;
    for (i = 0, k = 0, e = rv.length; i < e; i++) {
        const a = mapper(rv[i]);
        if (a) {
            rv[k] = fakeLinks ? new FakeLink(a) : a;
            k += 1;
        }
    }
    rv.length = k; // truncate
    return rv;
}
exports.getTextLinks = getTextLinks;


/***/ }),

/***/ "./windows/broadcaster.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Broadcaster = void 0;
// License: MIT
const keys_1 = __webpack_require__("./windows/keys.ts");
const winutil_1 = __webpack_require__("./windows/winutil.ts");
class Broadcaster {
    constructor(...els) {
        this.els = els.map(e => winutil_1.$(`#${e}`));
        this.onkey = this.onkey.bind(this);
        const keys = new Set(this.els.map(el => el.dataset.key));
        if (keys.size) {
            keys.forEach(key => {
                keys_1.Keys.on(key, this.onkey);
            });
        }
    }
    get disabled() {
        return this.els[0].classList.contains("disabled");
    }
    set disabled(val) {
        if (val) {
            for (const el of this.els) {
                el.classList.add("disabled");
            }
            return;
        }
        for (const el of this.els) {
            el.classList.remove("disabled");
        }
    }
    onkey(evt) {
        const { localName } = evt.target;
        if (localName === "input" || localName === "textarea") {
            return undefined;
        }
        if (this.onaction) {
            this.onaction();
        }
        return true;
    }
}
exports.Broadcaster = Broadcaster;


/***/ }),

/***/ "./windows/manager.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
// License: MIT
const table_1 = __webpack_require__("./windows/manager/table.ts");
const i18n_1 = __webpack_require__("./lib/i18n.ts");
const prefs_1 = __webpack_require__("./lib/prefs.ts");
const port_1 = tslib_1.__importDefault(__webpack_require__("./windows/manager/port.ts"));
const browser_1 = __webpack_require__("./lib/browser.ts");
const util_1 = __webpack_require__("./lib/util.ts");
const pserializer_1 = __webpack_require__("./lib/pserializer.ts");
const keys_1 = __webpack_require__("./windows/keys.ts");
__webpack_require__("./windows/theme.ts");
const $ = document.querySelector.bind(document);
let Table;
const LOADED = new Promise(resolve => {
    addEventListener("load", function dom() {
        removeEventListener("load", dom);
        resolve(true);
    });
});
addEventListener("DOMContentLoaded", function dom() {
    removeEventListener("DOMContentLoaded", dom);
    const platformed = (async () => {
        try {
            const platform = (await browser_1.runtime.getPlatformInfo()).os;
            document.documentElement.dataset.platform = platform;
            if (platform === "mac") {
                const ctx = $("#table-context").content;
                ctx.querySelector("#ctx-open-file").dataset.key = "ACCEL-KeyO";
                ctx.querySelector("#ctx-open-directory").dataset.key = "ALT-ACCEL-KeyO";
            }
        }
        catch (ex) {
            console.error("failed to setup platform", ex.toString(), ex.stack, ex);
        }
    })();
    const tabled = new util_1.Promised();
    const localized = i18n_1.localize(document.documentElement);
    const loaded = Promise.all([LOADED, platformed, localized]);
    const fullyloaded = Promise.all([LOADED, platformed, tabled, localized]);
    fullyloaded.then(async () => {
        const nag = await prefs_1.Prefs.get("nagging", 0);
        const nagnext = await prefs_1.Prefs.get("nagging-next", 7);
        const next = Math.ceil(Math.log2(Math.max(1, nag)));
        const el = $("#nagging");
        const remove = () => {
            el.parentElement.removeChild(el);
        };
        if (next <= nagnext) {
            return;
        }
        setTimeout(() => {
            $("#nagging-donate").addEventListener("click", () => {
                port_1.default.post("donate");
                prefs_1.Prefs.set("nagging-next", next);
                remove();
            });
            $("#nagging-later").addEventListener("click", () => {
                prefs_1.Prefs.set("nagging-next", next);
                remove();
            });
            $("#nagging-never").addEventListener("click", () => {
                prefs_1.Prefs.set("nagging-next", Number.MAX_SAFE_INTEGER);
                remove();
            });
            $("#nagging-message").textContent = i18n_1._("nagging-message", nag.toLocaleString());
            $("#nagging").classList.remove("hidden");
        }, 2 * 1000);
    });
    $("#donate").addEventListener("click", () => {
        port_1.default.post("donate");
    });
    $("#statusPrefs").addEventListener("click", () => {
        port_1.default.post("prefs");
    });
    port_1.default.on("all", async (items) => {
        await loaded;
        const treeConfig = JSON.parse(await prefs_1.Prefs.get("tree-config-manager", "{}"));
        requestAnimationFrame(() => {
            if (!Table) {
                Table = new table_1.DownloadTable(treeConfig);
                Table.init();
                const loading = $("#loading");
                loading.parentElement.removeChild(loading);
                tabled.resolve();
            }
            Table.setItems(items);
        });
    });
    // Updates
    const serializer = new pserializer_1.PromiseSerializer(1);
    port_1.default.on("dirty", serializer.wrap(this, async (items) => {
        await fullyloaded;
        Table.updateItems(items);
    }));
    port_1.default.on("removed", serializer.wrap(this, async (sids) => {
        await fullyloaded;
        Table.removedItems(sids);
    }));
    const statusNetwork = $("#statusNetwork");
    statusNetwork.addEventListener("click", () => {
        port_1.default.post("toggle-active");
    });
    port_1.default.on("active", async (active) => {
        await loaded;
        if (active) {
            statusNetwork.className = "icon-network-on";
            statusNetwork.setAttribute("title", i18n_1._("statusNetwork-active.title"));
        }
        else {
            statusNetwork.className = "icon-network-off";
            statusNetwork.setAttribute("title", i18n_1._("statusNetwork-inactive.title"));
        }
    });
    keys_1.Keys.on("ACCEL-KeyF", () => {
        $("#filter").focus();
        return true;
    });
});
addEventListener("contextmenu", event => {
    event.preventDefault();
    return false;
});
addEventListener("beforeunload", function () {
    port_1.default.disconnect();
});


/***/ }),

/***/ "./windows/manager/buttons.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Buttons = void 0;
// License: MIT
const events_1 = __webpack_require__("./lib/events.ts");
const winutil_1 = __webpack_require__("./windows/winutil.ts");
class Buttons extends events_1.EventEmitter {
    constructor(selector) {
        super();
        this.parent = winutil_1.$(selector);
        this.parent.addEventListener("click", this.clicked.bind(this));
    }
    clicked(evt) {
        let target = evt.target;
        while (target && target !== this.parent) {
            if (target.classList.contains("button")) {
                const { id } = target;
                if (id) {
                    this.emit(id);
                    return;
                }
            }
            target = target.parentElement;
        }
    }
}
exports.Buttons = Buttons;


/***/ }),

/***/ "./windows/manager/itemfilters.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable no-magic-numbers */

Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteredCollection = exports.UrlMenuFilter = exports.SizeMenuFilter = exports.StateMenuFilter = exports.MenuFilter = exports.TextFilter = void 0;
// License: MIT
const contextmenu_1 = __webpack_require__("./windows/contextmenu.ts");
const events_1 = __webpack_require__("./lib/events.ts");
// eslint-disable-next-line no-unused-vars
const filters_1 = __webpack_require__("./lib/filters.ts");
const sorting_1 = __webpack_require__("./lib/sorting.ts");
const formatters_1 = __webpack_require__("./lib/formatters.ts");
const i18n_1 = __webpack_require__("./lib/i18n.ts");
const winutil_1 = __webpack_require__("./windows/winutil.ts");
const TIMEOUT_SEARCH = 750;
class ItemFilter {
    constructor(id) {
        this.id = id;
    }
    // eslint-disable-next-line no-unused-vars
    allow(_) {
        return true;
    }
}
class TextFilter extends ItemFilter {
    constructor(owner) {
        super("text"); // There can be only one anyway
        this.owner = owner;
        this.box = winutil_1.$("#filter");
        this.timer = null;
        this.current = this.box.value = "";
        this.box.addEventListener("input", () => {
            if (this.timer) {
                return;
            }
            this.timer = window.setTimeout(() => this.update(), TIMEOUT_SEARCH);
        });
        this.box.addEventListener("keydown", e => {
            if (e.key !== "Escape") {
                return true;
            }
            this.current = this.box.value = "";
            this.box.blur();
            this.owner.removeFilter(this);
            e.stopPropagation();
            e.preventDefault();
            return false;
        });
    }
    update() {
        this.timer = null;
        const { value } = this.box;
        if (this.current === value) {
            return;
        }
        this.current = value;
        if (!value) {
            this.owner.removeFilter(this);
            return;
        }
        this.expr = new RegExp(value.
            replace(/^\s+|\s+$/g, "").
            replace(/([/{}()[\]\\^$.])/g, "\\$1").
            replace(/\*/g, ".*").
            replace(/\?/g, "."), "i");
        this.owner.addFilter(this);
    }
    allow(item) {
        const { expr } = this;
        return expr.test(item.currentName) ||
            expr.test(item.usable) ||
            expr.test(item.description);
    }
}
exports.TextFilter = TextFilter;
class MenuFilter extends ItemFilter {
    constructor(id) {
        super(id);
        this.items = new Map();
        const tmpl = winutil_1.$("#menufilter-template").
            content.cloneNode(true);
        this.menu = new contextmenu_1.ContextMenu(tmpl.firstElementChild);
        this.menu.on("clicked", this.onclicked.bind(this));
        this.menu.on("ctx-menufilter-invert", () => this.invert());
        this.menu.on("ctx-menufilter-clear", () => this.clear());
        this.menu.on("ctx-menufilter-sort-ascending", () => this.sort(false));
        this.menu.on("ctx-menufilter-sort-descending", () => this.sort(true));
    }
    // eslint-disable-next-line no-unused-vars
    sort(_) {
        throw new Error("Method not implemented.");
    }
    async show(evt) {
        Array.from(this.menu).
            filter(e => e.startsWith("ctx-menufilter-item-")).
            forEach(e => this.menu.remove(e));
        this.items.clear();
        await this.populate();
        for (const { item } of Array.from(this.items.values()).reverse()) {
            this.menu.prepend(item);
        }
        this.menu.show(evt);
    }
    populate() {
        throw new Error("Method not implemented.");
    }
    addItem(text, callback, checked) {
        const id = `ctx-menufilter-item-${this.items.size.toString()}`;
        if (text === "-") {
            const item = new contextmenu_1.MenuSeperatorItem(this.menu, id);
            this.items.set(id, { item, callback });
            return;
        }
        const item = new contextmenu_1.MenuItem(this.menu, id, text, {
            autoHide: "false",
        });
        item.iconElem.textContent = checked ? "✓" : "";
        this.items.set(id, { item, callback });
    }
    invert() {
        for (const { item, callback } of this.items.values()) {
            if (!callback) {
                continue;
            }
            if (!(item instanceof contextmenu_1.MenuItem)) {
                continue;
            }
            this.toggleItem(item);
            callback.apply(this);
        }
    }
    clear() {
        for (const { item } of this.items.values()) {
            if (!item.iconElem) {
                continue;
            }
            item.iconElem.textContent = "";
        }
    }
    toggleItem(item) {
        if (!item.iconElem) {
            return;
        }
        item.iconElem.textContent = !item.iconElem.textContent ? "✓" : "";
    }
    onclicked(evt) {
        const { item = null, callback = null } = this.items.get(evt) || {};
        if (!item) {
            return;
        }
        if (!(item instanceof contextmenu_1.MenuItem)) {
            return;
        }
        this.toggleItem(item);
        if (callback) {
            callback.call(this);
        }
    }
}
exports.MenuFilter = MenuFilter;
class FixedMenuFilter extends MenuFilter {
    constructor(id, collection, items) {
        super(id);
        this.collection = collection;
        this.selected = new Set();
        this.fixed = new Set(items);
        this.chain = null;
    }
    populate() {
        Array.from(this.fixed).forEach(item => {
            this.addItem(item.text, this.toggle.bind(this, item), this.selected.has(item));
        });
    }
    toggle(item) {
        if (this.selected.has(item)) {
            this.selected.delete(item);
        }
        else {
            this.selected.add(item);
        }
        this.regenerate();
    }
    regenerate() {
        if (!this.selected.size) {
            this.collection.removeFilter(this);
            return;
        }
        this.chain = null;
        this.chain = Array.from(this.selected).reduce((prev, curr) => {
            return (item) => {
                return curr.fn(item) || (prev !== null && prev(item));
            };
        }, this.chain);
        this.collection.addFilter(this);
    }
    allow(item) {
        return this.chain !== null && this.chain(item);
    }
    clear() {
        this.selected.clear();
        this.regenerate();
        super.clear();
    }
}
class StateMenuFilter extends FixedMenuFilter {
    constructor(collection, StateTexts) {
        const items = Array.from(StateTexts.entries()).map(([state, text]) => {
            return {
                state,
                text,
                fn: (item) => item.state === state,
            };
        });
        super("menufilter-state", collection, items);
    }
    sort(descending) {
        this.collection.sort(i => i.state, descending);
    }
}
exports.StateMenuFilter = StateMenuFilter;
class SizeMenuFilter extends FixedMenuFilter {
    constructor(collection) {
        const items = [
            { text: "size-unknown", start: -1, stop: 1 },
            { text: "sizes-small", start: 1, stop: 1 << 20 },
            { text: "sizes-medium", start: 1 << 20, stop: 250 << 20 },
            { text: "sizes-large", start: 250 << 20, stop: 1024 << 20 },
            { text: "sizes-huge", start: 1024 << 20 },
        ].map(i => {
            const { text, start, stop } = i;
            const astop = stop || 0;
            const fn = typeof stop !== undefined ?
                ((item) => item.totalSize >= start && item.totalSize < astop) :
                ((item) => item.totalSize >= start);
            return Object.assign(i, {
                fn,
                text: i18n_1._(text, formatters_1.formatSize(start, false), stop && formatters_1.formatSize(stop, false))
            });
        });
        super("mneufilter-size", collection, items);
    }
    sort(descending) {
        this.collection.sort(i => i.totalSize, descending);
    }
}
exports.SizeMenuFilter = SizeMenuFilter;
class UrlMenuFilter extends MenuFilter {
    constructor(collection) {
        super("menufilter-url");
        this.collection = collection;
        this.filters = new Set();
        this.domains = new Set();
        this.cmatcher = null;
    }
    async populate() {
        const filts = await filters_1.filters();
        for (const i of filts.all.filter(e => e.id !== "deffilter-all")) {
            this.addItem(i.label, this.toggleRegularFilter.bind(this, i), this.filters.has(i));
        }
        const domains = sorting_1.sort(Array.from(new Set(this.collection.items.map(e => e.domain))), undefined, sorting_1.naturalCaseCompare);
        if (!domains.length) {
            return;
        }
        this.addItem("-");
        domains.forEach(e => {
            this.addItem(e, this.toggleDomainFilter.bind(this, e), this.domains.has(e));
        });
    }
    toggleRegularFilter(filter) {
        if (this.filters.has(filter)) {
            this.filters.delete(filter);
        }
        else {
            this.filters.add(filter);
        }
        this.regenerate();
    }
    toggleDomainFilter(domain) {
        if (this.domains.has(domain)) {
            this.domains.delete(domain);
        }
        else {
            this.domains.add(domain);
        }
        this.regenerate();
    }
    regenerate() {
        if (!this.domains.size && !this.filters.size) {
            this.matcher = null;
            this.collection.removeFilter(this);
            return;
        }
        if (!this.filters.size) {
            this.matcher = null;
        }
        else {
            const exprs = Array.from(this.filters).map(f => Array.from(f)).flat();
            this.matcher = new filters_1.Matcher(exprs);
        }
        this.collection.addFilter(this);
    }
    allow(item) {
        if (this.domains.has(item.domain)) {
            return true;
        }
        return !!(this.matcher && this.matcher.match(item.usable));
    }
    clear() {
        this.domains.clear();
        this.filters.clear();
        this.regenerate();
        super.clear();
    }
    sort(descending) {
        this.collection.sort(i => i.usable, descending, true);
    }
}
exports.UrlMenuFilter = UrlMenuFilter;
class FilteredCollection extends events_1.EventEmitter {
    constructor(table) {
        super();
        this.table = table;
        this.items = [];
        this.filtered = [];
        this.filters = [];
    }
    addFilter(filter) {
        // Remove any old filters
        this.filters = this.filters.filter(f => f.id !== filter.id);
        this.filters.push(filter);
        this.recalculate();
        this.emit("filter-active", filter.id);
    }
    removeFilter(filter) {
        this.filters = this.filters.filter(f => f.id !== filter.id);
        this.recalculate();
        this.emit("filter-inactive", filter.id);
    }
    clearFilters() {
        this.filters.forEach(filter => {
            this.emit("filter-inactive", filter.id);
        });
        this.filters = [];
        this.recalculate();
    }
    _reassignPositions() {
        this.filtered = this.filtered.map((item, index) => {
            item.filteredPosition = index;
            return item;
        });
    }
    recalculate() {
        const selection = new Set(this.table.selection);
        const { focusRow } = this.table;
        const { filters } = this;
        let idx = 0;
        const selected = new Set();
        let focused;
        if (selection.size) {
            this.filtered.forEach(item => {
                const { filteredPosition } = item;
                if (selection.has(filteredPosition)) {
                    selected.add(item);
                }
                if (focusRow === filteredPosition) {
                    focused = item;
                }
            });
        }
        function allow(item) {
            if (!filters.every(f => f.allow(item))) {
                delete item.filteredPosition;
                return false;
            }
            item.filteredPosition = idx++;
            return true;
        }
        if (this.filters.length) {
            this.filtered = this.items.filter(allow);
        }
        else {
            this.filtered = this.items.slice();
            this._reassignPositions();
        }
        this.table.invalidate();
        if (!selection.size) {
            this.emit("changed");
            return;
        }
        for (const i of this.filtered) {
            if (selected.has(i)) {
                this.table.selection.add(i.filteredPosition);
            }
        }
        if (focused && focused.isFiltered) {
            this.table.focusRow = focused.filteredPosition;
            this.table.once("updated", () => {
                if (focused && focused.isFiltered) {
                    this.table.scrollIntoView(focused.filteredPosition);
                }
            });
        }
        this.emit("changed");
    }
    add(items) {
        if (!Array.isArray(items)) {
            items = [items];
        }
        const cur = this.filtered.length;
        items = items.filter(item => {
            item.position = this.items.push(item) - 1;
            this.emit("added", item);
            if (this.filters.length && !this.filters.every(f => f.allow(item))) {
                delete item.filteredPosition;
                return false;
            }
            item.filteredPosition = this.filtered.push(item) - 1;
            return true;
        });
        if (items.length) {
            this.table.rowCountChanged(cur, items.length);
            this.emit("changed");
        }
    }
    set(items) {
        this.items = items.map((item, pos) => {
            item.position = pos;
            return item;
        });
        this.recalculate();
    }
    _reinsert(item) {
        if (item.isFiltered) {
            return;
        }
        // Find insertion point
        const idx = this.filtered.findIndex(i => i.position > item.position);
        if (idx <= 0) {
            // last item
            item.filteredPosition = this.filtered.push(item) - 1;
            this.table.rowCountChanged(item.filteredPosition, 1);
            return;
        }
        this.filtered.splice(idx - 1, 0, item);
        this._reassignPositions();
        this.table.rowCountChanged(item.filteredPosition, 1);
        this.emit("changed");
    }
    _remove(item) {
        if (!item.isFiltered) {
            return;
        }
        this.filtered.splice(item.filteredPosition, 1);
        this._reassignPositions();
        delete item.filteredPosition;
        this.table.rowCountChanged(item.filteredPosition, -1);
        this.emit("changed");
    }
    recalculateItem(item) {
        if (this.filters.length && !this.filters.every(f => f.allow(item))) {
            this._remove(item);
        }
        else {
            this._reinsert(item);
        }
    }
    /**
     * Sort all items
     *
     * @param {Function} keyfn How to derivce sort keys
     * @param {boolean} [descending] Sort descending
     * @param {boolean} [natural] Sort naturally
     */
    sort(keyfn, descending = false, natural = false) {
        const cmp = natural ? sorting_1.naturalCaseCompare : sorting_1.defaultCompare;
        let cmpfn = cmp;
        if (descending) {
            cmpfn = (a, b) => -cmp(a, b);
        }
        this.set(sorting_1.sort(this.items, keyfn, cmpfn));
        this.emit("sorted");
    }
    mapFilteredToAbsolute(indexes) {
        return indexes.map(i => this.filtered[i].position);
    }
    moveTop(indexes) {
        let swapped = false;
        this.mapFilteredToAbsolute(indexes).reverse().forEach((id, idx) => {
            id += idx;
            if (id === 0) {
                return;
            }
            const [item] = this.items.splice(id, 1);
            this.items.unshift(item);
            swapped = true;
        });
        if (swapped) {
            this.set(this.items);
            this.emit("sorted");
        }
    }
    moveBottom(indexes) {
        let swapped = false;
        const { length } = this.items;
        this.mapFilteredToAbsolute(indexes).forEach((id, idx) => {
            id -= idx;
            if (id >= length - 1) {
                return;
            }
            const [item] = this.items.splice(id, 1);
            this.items.push(item);
            swapped = true;
        });
        if (swapped) {
            this.set(this.items);
            this.emit("sorted");
        }
    }
    moveUp(indexes) {
        let swapped = false;
        this.mapFilteredToAbsolute(indexes).forEach((id, idx) => {
            if (id - idx === 0) {
                return;
            }
            const tmp = this.items[id - 1];
            this.items[id - 1] = this.items[id];
            this.items[id] = tmp;
            swapped = true;
        });
        if (swapped) {
            this.set(this.items);
            this.emit("sorted");
        }
    }
    moveDown(indexes) {
        const { length } = this.items;
        let swapped = false;
        this.mapFilteredToAbsolute(indexes).reverse().forEach((id, idx) => {
            if (id + idx === length - 1) {
                return;
            }
            const tmp = this.items[id + 1];
            this.items[id + 1] = this.items[id];
            this.items[id] = tmp;
            swapped = true;
        });
        if (swapped) {
            this.set(this.items);
            this.emit("sorted");
        }
    }
    invalidateIcons() {
        this.items.forEach(item => item.clearFontIcons());
        this.recalculate();
    }
}
exports.FilteredCollection = FilteredCollection;
module.exports = {
    TextFilter,
    UrlMenuFilter,
    StateMenuFilter,
    SizeMenuFilter,
    FilteredCollection
};


/***/ }),

/***/ "./windows/manager/port.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// License: MIT
const events_1 = __webpack_require__("./lib/events.ts");
// eslint-disable-next-line no-unused-vars
const browser_1 = __webpack_require__("./lib/browser.ts");
const windowstate_1 = __webpack_require__("./windows/windowstate.ts");
const PORT = new class Port extends events_1.EventEmitter {
    constructor() {
        super();
        this.port = browser_1.runtime.connect(null, { name: "manager" });
        if (!this.port) {
            throw new Error("Could not connect");
        }
        new windowstate_1.WindowState(this.port);
        addEventListener("beforeunload", () => {
            if (this.port) {
                this.port.postMessage({
                    msg: "unload",
                    left: window.screenX,
                    top: window.screenY
                });
            }
        });
        this.port.onMessage.addListener((msg) => {
            if (typeof msg === "string") {
                this.emit(msg);
                return;
            }
            const { msg: message = null } = msg;
            if (message) {
                this.emit(message, msg.data);
            }
        });
    }
    post(msg, data) {
        if (!this.port) {
            return;
        }
        this.port.postMessage(Object.assign({ msg }, data));
    }
    disconnect() {
        if (!this.port) {
            return;
        }
        this.port.disconnect();
        this.port = null;
    }
}();
exports.default = PORT;


/***/ }),

/***/ "./windows/manager/removaldlg.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFilesDialog = exports.RemovalModalDialog = void 0;
const tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
// License: MIT
const modal_1 = tslib_1.__importDefault(__webpack_require__("./uikit/lib/modal.ts"));
const i18n_1 = __webpack_require__("./lib/i18n.ts");
const prefs_1 = __webpack_require__("./lib/prefs.ts");
const keys_1 = __webpack_require__("./windows/keys.ts");
const winutil_1 = __webpack_require__("./windows/winutil.ts");
class RemovalModalDialog extends modal_1.default {
    constructor(text, pref) {
        super();
        this.text = text;
        this.pref = `confirmations.${pref}`;
        this.check = null;
    }
    async getContent() {
        const content = winutil_1.$("#removal-template").
            content.cloneNode(true);
        await i18n_1.localize(content);
        this.check = content.querySelector(".removal-remember");
        winutil_1.$(".removal-text", content).textContent = this.text;
        return content;
    }
    get buttons() {
        return [
            {
                title: i18n_1._("remove-downloads"),
                value: "ok",
                default: true,
                dismiss: false,
            },
            {
                title: i18n_1._("cancel"),
                value: "cancel",
                default: false,
                dismiss: true,
            }
        ];
    }
    async show() {
        if (await prefs_1.Prefs.get(this.pref)) {
            return "ok";
        }
        keys_1.Keys.suppressed = true;
        try {
            const res = await super.show();
            if (this.check && this.check.checked) {
                await prefs_1.Prefs.set(this.pref, true);
            }
            return res;
        }
        finally {
            keys_1.Keys.suppressed = false;
        }
    }
    shown() {
        this.focusDefault();
    }
}
exports.RemovalModalDialog = RemovalModalDialog;
class DeleteFilesDialog extends modal_1.default {
    constructor(paths) {
        super();
        this.paths = paths;
    }
    async getContent() {
        const content = winutil_1.$("#deletefiles-template").
            content.cloneNode(true);
        await i18n_1.localize(content);
        const list = winutil_1.$(".deletefiles-list", content);
        for (const path of this.paths) {
            const li = document.createElement("li");
            li.textContent = path;
            list.appendChild(li);
        }
        return content;
    }
    get buttons() {
        return [
            {
                title: i18n_1._("deletefiles_button"),
                value: "ok",
                default: true,
                dismiss: false,
            },
            {
                title: i18n_1._("cancel"),
                value: "cancel",
                default: false,
                dismiss: true,
            }
        ];
    }
    async show() {
        keys_1.Keys.suppressed = true;
        try {
            return await super.show();
        }
        finally {
            keys_1.Keys.suppressed = false;
        }
    }
    shown() {
        this.focusDefault();
    }
}
exports.DeleteFilesDialog = DeleteFilesDialog;


/***/ }),

/***/ "./windows/manager/state.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StateIcons = exports.StateClasses = exports.StateTexts = exports.DownloadState = void 0;
const tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
// License: MIT
const _DownloadState = tslib_1.__importStar(__webpack_require__("./lib/manager/state.ts"));
const i18n_1 = __webpack_require__("./lib/i18n.ts");
exports.DownloadState = _DownloadState;
exports.StateTexts = i18n_1.locale.then(() => Object.freeze(new Map([
    [exports.DownloadState.QUEUED, i18n_1._("queued")],
    [exports.DownloadState.RUNNING, i18n_1._("running")],
    [exports.DownloadState.FINISHING, i18n_1._("finishing")],
    [exports.DownloadState.RETRYING, i18n_1._("paused")],
    [exports.DownloadState.PAUSED, i18n_1._("paused")],
    [exports.DownloadState.DONE, i18n_1._("done")],
    [exports.DownloadState.CANCELED, i18n_1._("canceled")],
    [exports.DownloadState.MISSING, i18n_1._("missing")],
])));
exports.StateClasses = Object.freeze(new Map([
    [exports.DownloadState.QUEUED, "queued"],
    [exports.DownloadState.RUNNING, "running"],
    [exports.DownloadState.FINISHING, "finishing"],
    [exports.DownloadState.PAUSED, "paused"],
    [exports.DownloadState.RETRYING, "retrying"],
    [exports.DownloadState.DONE, "done"],
    [exports.DownloadState.CANCELED, "canceled"],
    [exports.DownloadState.MISSING, "missing"],
]));
exports.StateIcons = Object.freeze(new Map([
    [exports.DownloadState.QUEUED, "icon-pause"],
    [exports.DownloadState.RUNNING, "icon-go"],
    [exports.DownloadState.FINISHING, "icon-go"],
    [exports.DownloadState.PAUSED, "icon-pause"],
    [exports.DownloadState.RETRYING, "icon-pause"],
    [exports.DownloadState.DONE, "icon-done"],
    [exports.DownloadState.CANCELED, "icon-error"],
    [exports.DownloadState.MISSING, "icon-failed"],
]));


/***/ }),

/***/ "./windows/manager/stats.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
// License: MIT
const NUM_VALUES = 20;
class Sequence {
    constructor() {
        this.values = new Uint32Array(NUM_VALUES);
    }
    get validValues() {
        return this.full ? this.values : this.values.slice(0, this.fill);
    }
    get current() {
        return this.fill ? this.values[this.fill - 1] : 0;
    }
    clear() {
        this.fill = 0;
        this.full = false;
    }
    add(value) {
        if (!this.full) {
            this.values[this.fill++] = value;
            this.full = this.fill === NUM_VALUES;
        }
        else {
            this.values.copyWithin(0, 1);
            this.values[NUM_VALUES - 1] = value;
        }
    }
}
class Stats extends Sequence {
    constructor() {
        super();
        this.avgs = new Sequence();
        this.clear();
        Object.seal(this);
    }
    clear() {
        super.clear();
        this.avgs.clear();
        this.avg = 0;
        this.lastTime = 0;
    }
    add(value) {
        const now = Date.now();
        if (this.lastTime) {
            const diff = now - this.lastTime;
            value = (value / diff * 1000) | 0;
        }
        this.lastTime = now;
        super.add(value);
        const valid = this.validValues;
        const cavg = valid.reduce((p, c) => p + c, 0) / valid.length;
        if (this.avg < 1000) {
            this.avg = cavg;
        }
        else {
            // eslint-disable-next-line no-magic-numbers
            this.avg = this.avg * 0.85 + cavg * 0.15;
        }
        this.avgs.add(this.avg);
    }
}
exports.Stats = Stats;


/***/ }),

/***/ "./windows/manager/table.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadTable = exports.DownloadItem = void 0;
const tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
// License: MIT
const table_1 = __webpack_require__("./uikit/lib/table.ts");
const contextmenu_1 = __webpack_require__("./windows/contextmenu.ts");
const windowutils_1 = __webpack_require__("./lib/windowutils.ts");
const formatters_1 = __webpack_require__("./lib/formatters.ts");
const filters_1 = __webpack_require__("./lib/filters.ts");
const i18n_1 = __webpack_require__("./lib/i18n.ts");
const events_1 = __webpack_require__("./lib/events.ts");
const prefs_1 = __webpack_require__("./lib/prefs.ts");
// eslint-disable-next-line no-unused-vars
const util_1 = __webpack_require__("./lib/util.ts");
const keys_1 = __webpack_require__("./windows/keys.ts");
const broadcaster_1 = __webpack_require__("./windows/broadcaster.ts");
const icons_1 = __webpack_require__("./windows/icons.ts");
const buttons_1 = __webpack_require__("./windows/manager/buttons.ts");
const itemfilters_1 = __webpack_require__("./windows/manager/itemfilters.ts");
const itemfilters_2 = __webpack_require__("./windows/manager/itemfilters.ts");
const removaldlg_1 = __webpack_require__("./windows/manager/removaldlg.ts");
const stats_1 = __webpack_require__("./windows/manager/stats.ts");
const port_1 = tslib_1.__importDefault(__webpack_require__("./windows/manager/port.ts"));
const state_1 = __webpack_require__("./windows/manager/state.ts");
const tooltip_1 = __webpack_require__("./windows/manager/tooltip.ts");
__webpack_require__("./lib/util.ts");
const constants_1 = __webpack_require__("./uikit/lib/constants.ts");
const browser_1 = __webpack_require__("./lib/browser.ts");
const winutil_1 = __webpack_require__("./windows/winutil.ts");
const iconcache_1 = __webpack_require__("./lib/iconcache.ts");
const imex = tslib_1.__importStar(__webpack_require__("./lib/imex.ts"));
const TREE_CONFIG_VERSION = 2;
const RUNNING_TIMEOUT = 1000;
const SIZES_TIMEOUT = 150;
const COL_URL = 0;
const COL_DOMAIN = 1;
const COL_PROGRESS = 2;
const COL_PER = 3;
const COL_SIZE = 4;
const COL_ETA = 5;
const COL_SPEED = 6;
const COL_MASK = 7;
const COL_SEGS = 8;
const HIDPI = window.matchMedia &&
    window.matchMedia("(min-resolution: 2dppx)").matches;
const ICON_BASE_SIZE = 16;
const ICON_REAL_SIZE = !browser_1.CHROME && HIDPI ? ICON_BASE_SIZE * 2 : ICON_BASE_SIZE;
// eslint-disable-next-line no-magic-numbers
const LARGE_ICON_BASE_SIZE = browser_1.CHROME ? 32 : 64;
// eslint-disable-next-line no-magic-numbers
const MAX_ICON_BASE_SIZE = browser_1.CHROME ? 32 : 127;
const LARGE_ICON_REAL_SIZE = HIDPI ? MAX_ICON_BASE_SIZE : LARGE_ICON_BASE_SIZE;
let TEXT_SIZE_UNKNOWM = "unknown";
let REAL_STATE_TEXTS = Object.freeze(new Map());
state_1.StateTexts.then(v => {
    REAL_STATE_TEXTS = v;
});
const prettyNumber = (function () {
    const rv = new Intl.NumberFormat(undefined, {
        style: "decimal",
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    return rv.format.bind(rv);
})();
class ShowUrlsWatcher extends prefs_1.PrefWatcher {
    constructor(table) {
        super("show-urls", false);
        this.table = table;
    }
    changed(prefs, name, value) {
        const rv = super.changed(prefs, name, value);
        this.table.invalidate();
        return rv;
    }
}
class DownloadItem extends events_1.EventEmitter {
    constructor(owner, raw, stats) {
        super();
        Object.assign(this, raw);
        this.updateURL();
        this.stats = stats || new stats_1.Stats();
        this.owner = owner;
        this.owner.updatedState(this, undefined, this.state);
        this.lastWritten = 0;
    }
    get icon() {
        if (this.iconField) {
            return this.iconField;
        }
        this.iconField = this.owner.icons.get(windowutils_1.iconForPath(this.currentName, ICON_BASE_SIZE));
        if (this.ext) {
            iconcache_1.IconCache.get(this.ext, ICON_REAL_SIZE).then(icon => {
                if (icon) {
                    this.iconField = this.owner.icons.get(icon);
                    if (typeof this.filteredPosition !== undefined) {
                        this.owner.invalidateCell(this.filteredPosition, COL_URL);
                    }
                }
            });
        }
        return this.iconField || "";
    }
    get largeIcon() {
        if (this.largeIconField) {
            return this.largeIconField;
        }
        this.largeIconField = this.owner.icons.get(windowutils_1.iconForPath(this.currentName, LARGE_ICON_BASE_SIZE));
        if (this.ext) {
            iconcache_1.IconCache.get(this.ext, LARGE_ICON_REAL_SIZE).then(icon => {
                if (icon) {
                    this.largeIconField = this.owner.icons.get(icon);
                }
                this.emit("largeIcon");
            });
        }
        return this.largeIconField || "";
    }
    get eta() {
        const { avg } = this.stats;
        if (!this.totalSize || !avg) {
            return TEXT_SIZE_UNKNOWM;
        }
        const remain = this.totalSize - this.written;
        return formatters_1.formatTimeDelta(remain / avg);
    }
    get isFiltered() {
        return typeof this.filteredPosition !== "undefined";
    }
    get percent() {
        if (this.state === state_1.DownloadState.DONE) {
            return 1;
        }
        if (!this.totalSize) {
            return 0;
        }
        return this.written / this.totalSize;
    }
    get fmtName() {
        if (this.owner.showUrls.value) {
            return this.usable;
        }
        return this.currentName;
    }
    get fmtSize() {
        if (this.state & (state_1.DownloadState.RUNNING | state_1.DownloadState.PAUSED)) {
            if (!this.written) {
                return TEXT_SIZE_UNKNOWM;
            }
            if (!this.totalSize) {
                return formatters_1.formatSize(this.written);
            }
            return i18n_1._("size-progress", formatters_1.formatSize(this.written), formatters_1.formatSize(this.totalSize));
        }
        if (!this.totalSize) {
            return TEXT_SIZE_UNKNOWM;
        }
        return formatters_1.formatSize(this.totalSize);
    }
    get fmtPercent() {
        return `${(this.percent * 100).toFixed(0)}%`;
    }
    get fmtETA() {
        if (this.state === state_1.DownloadState.RUNNING) {
            return this.eta;
        }
        if (this.state === state_1.DownloadState.RETRYING) {
            if (this.error) {
                return i18n_1._("retrying_error", i18n_1._(this.error) || this.error);
            }
            return i18n_1._("retrying");
        }
        if (this.error) {
            return i18n_1._(this.error) || this.error;
        }
        return REAL_STATE_TEXTS.get(this.state) || "";
    }
    get fmtSpeed() {
        return this.state === state_1.DownloadState.RUNNING ?
            formatters_1.formatSpeed(this.stats.avg) :
            "";
    }
    get fmtDomain() {
        return this.domain;
    }
    updateDownload(raw) {
        if (("position" in raw) && raw.position !== this.position) {
            console.warn("position mismatch", raw.position, this.position);
            port_1.default.post("all");
            return;
        }
        if (("ext" in raw) && raw.ext !== this.ext) {
            this.clearIcons();
        }
        delete raw.position;
        delete raw.owner;
        const oldState = this.state;
        Object.assign(this, raw);
        if (raw.url) {
            this.updateURL();
        }
        if (this.state !== oldState) {
            this.stats.clear();
            this.owner.updatedState(this, oldState, this.state);
        }
        this.owner.updatedDownload(this);
        this.emit("update");
    }
    async queryState() {
        const [state] = await browser_1.downloads.search({ id: this.manId });
        return state;
    }
    adoptSize(state) {
        const { bytesReceived, totalBytes, fileSize } = state;
        this.written = Math.max(0, bytesReceived);
        this.totalSize = Math.max(0, fileSize >= 0 ? fileSize : totalBytes);
    }
    async updateSizes() {
        if (!this.manId) {
            return;
        }
        const state = await this.queryState();
        if (!this.manId) {
            return;
        }
        this.adoptSize(state);
        if (this.isFiltered) {
            this.owner.invalidateCell(this.filteredPosition, COL_PROGRESS);
            this.owner.invalidateCell(this.filteredPosition, COL_PER);
            this.owner.invalidateCell(this.filteredPosition, COL_SIZE);
        }
    }
    async updateStats() {
        if (this.state !== state_1.DownloadState.RUNNING) {
            return -1;
        }
        let v = 0;
        try {
            if (this.manId) {
                const state = await this.queryState();
                if (!this.manId) {
                    return -1;
                }
                this.adoptSize(state);
                if (!this.lastWritten) {
                    this.lastWritten = Math.max(0, this.written);
                    return -1;
                }
                v = Math.max(0, this.written - this.lastWritten);
                this.lastWritten = Math.max(0, this.written);
            }
        }
        catch (ex) {
            console.error("failed to stat", ex);
        }
        this.stats.add(v);
        if (this.isFiltered) {
            this.owner.invalidateRow(this.filteredPosition);
        }
        this.emit("stats");
        return this.stats.avg;
    }
    updateURL() {
        this.uURL = new URL(this.url);
        this.domain = this.uURL.domain;
        this.emit("url");
    }
    clearIcons() {
        this.iconField = undefined;
        this.largeIconField = undefined;
    }
    clearFontIcons() {
        if (this.iconField && this.iconField.startsWith("icon-")) {
            this.iconField = undefined;
        }
        if (this.largeIconField && this.largeIconField.startsWith("icon-")) {
            this.largeIconField = undefined;
        }
    }
}
exports.DownloadItem = DownloadItem;
class DownloadTable extends table_1.VirtualTable {
    constructor(treeConfig) {
        super("#items", treeConfig, TREE_CONFIG_VERSION);
        TEXT_SIZE_UNKNOWM = i18n_1._("size-unknown");
        this.finished = 0;
        this.running = new Set();
        this.runningTimer = null;
        this.globalStats = new stats_1.Stats();
        this.showUrls = new ShowUrlsWatcher(this);
        this.updateCounts = util_1.debounce(this.updateCounts.bind(this), 100);
        this.onIconCached = util_1.debounce(this.onIconCached.bind(this), 1000);
        this.downloads = new itemfilters_2.FilteredCollection(this);
        this.downloads.on("changed", () => this.updateCounts());
        this.downloads.on("added", () => this.updateCounts());
        this.downloads.on("sorted", () => {
            port_1.default.post("sorted", { sids: this.downloads.items.map(i => i.sessionId) });
        });
        this.updateCounts();
        new itemfilters_1.TextFilter(this.downloads);
        const menufilters = new Map([
            ["colURL", new itemfilters_1.UrlMenuFilter(this.downloads)],
            ["colETA", new itemfilters_1.StateMenuFilter(this.downloads, REAL_STATE_TEXTS)],
            ["colSize", new itemfilters_1.SizeMenuFilter(this.downloads)],
        ]);
        this.on("column-clicked", (id, evt, col) => {
            const mf = menufilters.get(id);
            const { left, bottom } = col.elem.getBoundingClientRect();
            if (!mf) {
                return undefined;
            }
            mf.show({ clientX: left, clientY: bottom });
            return true;
        });
        const filterforColumn = new Map(Array.from(menufilters.entries()).map(([col, f]) => [f.id, col]));
        this.downloads.on("filter-active", filter => {
            const name = filterforColumn.get(filter);
            if (!name) {
                return;
            }
            const col = this.getColumnByName(name);
            if (!col) {
                return;
            }
            col.iconElem.classList.add("icon-filter");
        });
        this.downloads.on("filter-inactive", filter => {
            const name = filterforColumn.get(filter);
            if (!name) {
                return;
            }
            const col = this.getColumnByName(name);
            if (!col) {
                return;
            }
            col.iconElem.classList.remove("icon-filter");
        });
        iconcache_1.IconCache.on("cached", this.onIconCached.bind(this));
        this.sids = new Map();
        this.icons = new icons_1.Icons(winutil_1.$("#icons"));
        const ctx = this.contextMenu = new contextmenu_1.ContextMenu("#table-context");
        keys_1.Keys.adoptContext(ctx);
        keys_1.Keys.adoptButtons(winutil_1.$("#toolbar"));
        this.on("config-changed", () => {
            prefs_1.Prefs.set("tree-config-manager", JSON.stringify(this));
        });
        keys_1.Keys.on("ACCEL-KeyA", (event) => {
            const target = event.target;
            if (target.localName === "input") {
                return false;
            }
            this.selectAll();
            return true;
        });
        keys_1.Keys.on("ACCEL-KeyI", () => {
            this.selectToggle();
            return true;
        });
        keys_1.Keys.on("Delete", (event) => {
            const target = event.target;
            if (target.localName === "input") {
                return false;
            }
            this.removeDownloads();
            return true;
        });
        keys_1.Keys.on("ALT-Delete", (event) => {
            const target = event.target;
            if (target.localName === "input") {
                return false;
            }
            this.removeMissingDownloads();
            return true;
        });
        keys_1.Keys.on("SHIFT-Delete", (event) => {
            const target = event.target;
            if (target.localName === "input") {
                return false;
            }
            this.removeCompleteDownloads(false);
            return true;
        });
        ctx.on("ctx-remove-all", () => this.removeAllDownloads());
        ctx.on("ctx-remove-complete-all", () => this.removeCompleteDownloads(false));
        ctx.on("ctx-remove-complete-selected", () => this.removeCompleteDownloads(true));
        ctx.on("ctx-remove-domain", () => this.removeDomainDownloads(false));
        ctx.on("ctx-remove-complete-domain", () => this.removeDomainDownloads(true));
        ctx.on("ctx-remove-failed", () => this.removeFailedDownloads());
        ctx.on("ctx-remove-paused", () => this.removePausedDownloads());
        ctx.on("ctx-remove-batch", () => this.removeBatchDownloads());
        ctx.on("ctx-import", () => this.importDownloads());
        ctx.on("ctx-export-text", () => this.exportDownloads(imex.textExporter));
        ctx.on("ctx-export-aria2", () => this.exportDownloads(imex.aria2Exporter));
        ctx.on("ctx-export-metalink", () => this.exportDownloads(imex.metalinkExporter));
        ctx.on("dismissed", () => this.table.focus());
        this.on("contextmenu", (tree, event) => {
            this.showContextMenu(event);
            return true;
        });
        ctx.on("clicked", e => this.handleFilterRemove(e));
        const toolbar = new buttons_1.Buttons("#toolbar");
        toolbar.on("btn-add", () => port_1.default.post("showSingle"));
        this.resumeAction = new broadcaster_1.Broadcaster("btn-resume", "ctx-resume");
        this.resumeAction.onaction = this.resumeDownloads.bind(this, false);
        this.forceAction = new broadcaster_1.Broadcaster("ctx-force-download");
        this.forceAction.onaction = this.resumeDownloads.bind(this, true);
        this.pauseAction = new broadcaster_1.Broadcaster("btn-pause", "ctx-pause");
        this.pauseAction.onaction = this.pauseDownloads.bind(this);
        this.cancelAction = new broadcaster_1.Broadcaster("btn-cancel", "ctx-cancel");
        this.cancelAction.onaction = this.cancelDownloads.bind(this);
        this.openFileAction = new broadcaster_1.Broadcaster("ctx-open-file");
        this.openFileAction.onaction = this.openFile.bind(this);
        this.on("dblclick", () => this.openFile());
        this.openDirectoryAction = new broadcaster_1.Broadcaster("ctx-open-directory");
        this.openDirectoryAction.onaction = this.openDirectory.bind(this);
        this.deleteFilesAction = new broadcaster_1.Broadcaster("ctx-delete-files");
        this.deleteFilesAction.onaction = this.deleteFiles.bind(this);
        const moveAction = (method) => {
            if (this.selection.empty) {
                return;
            }
            const d = this.downloads;
            d[method](Array.from(this.selection));
        };
        this.moveTopAction = new broadcaster_1.Broadcaster("btn-top", "ctx-move-top");
        this.moveTopAction.onaction = moveAction.bind(this, "moveTop");
        this.moveUpAction = new broadcaster_1.Broadcaster("btn-up", "ctx-move-up");
        this.moveUpAction.onaction = moveAction.bind(this, "moveUp");
        this.moveDownAction = new broadcaster_1.Broadcaster("btn-down", "ctx-move-down");
        this.moveDownAction.onaction = moveAction.bind(this, "moveDown");
        this.moveBottomAction = new broadcaster_1.Broadcaster("btn-bottom", "ctx-move-bottom");
        this.moveBottomAction.onaction = moveAction.bind(this, "moveBottom");
        this.disableSet = new Set([
            this.resumeAction,
            this.forceAction,
            this.pauseAction,
            this.cancelAction,
            this.moveTopAction,
            this.moveUpAction,
            this.moveDownAction,
            this.moveBottomAction,
            this.openFileAction,
            this.openDirectoryAction,
            this.deleteFilesAction,
        ]);
        this.on("selection-changed", util_1.debounce(this.selectionChanged.bind(this), 10));
        this.selection.clear();
        this.tooltip = null;
        const tooltipWatcher = new prefs_1.PrefWatcher("tooltip", true);
        this.on("hover", info => {
            if (!document.hasFocus()) {
                return;
            }
            if (!tooltipWatcher.value) {
                return;
            }
            const item = this.downloads.filtered[info.rowid];
            if (!item) {
                return;
            }
            if (this.tooltip) {
                this.tooltip.dismiss();
            }
            this.tooltip = new tooltip_1.Tooltip(item, info);
        });
        this.on("hover-change", info => {
            if (!this.tooltip) {
                return;
            }
            this.tooltip.adjust(info);
        });
        this.on("hover-done", () => this.dismissTooltip());
        this.downloads.on("changed", () => this.dismissTooltip());
        this.contextMenu.on("showing", () => this.dismissTooltip());
        addEventListener("scroll", () => this.dismissTooltip(), { passive: true });
        addEventListener("wheel", () => this.dismissTooltip(), { passive: true });
        addEventListener("keydown", () => this.dismissTooltip(), { passive: true });
    }
    get rowCount() {
        return this.downloads.filtered.length;
    }
    updateCounts() {
        const { length: total } = this.downloads.items;
        const fTotal = prettyNumber(total);
        const fFin = prettyNumber(this.finished);
        const fDisp = prettyNumber(this.rowCount);
        const fRunning = prettyNumber(this.running.size);
        winutil_1.$("#statusItems").textContent = i18n_1._("manager-status-items", fFin, fTotal, fDisp, fRunning);
        if (total) {
            document.title = `[${fFin}/${fTotal}] - ${i18n_1._("manager.title")}`;
        }
        else {
            document.title = i18n_1._("manager.title");
        }
    }
    async updateSizes() {
        for (const r of this.running) {
            await r.updateSizes();
        }
    }
    async updateRunning() {
        let sum = 0;
        for (const r of this.running) {
            const v = await r.updateStats();
            if (v >= 0) {
                sum += v;
            }
        }
        this.globalStats.add(sum);
        winutil_1.$("#statusSpeed").textContent = formatters_1.formatSpeed(this.globalStats.avg);
    }
    dismissTooltip() {
        if (!this.tooltip) {
            return;
        }
        this.tooltip.dismiss();
        this.tooltip = null;
    }
    async showContextMenu(event) {
        const { contextMenu: ctx } = this;
        const filts = await filters_1.filters();
        const prepareMenu = (prefix) => {
            const rem = ctx.get(prefix).menu;
            prefix += "-filter-";
            Array.from(rem).
                filter(e => e.startsWith(prefix)).
                forEach(e => rem.remove(e));
            for (const filt of filts.all) {
                if (typeof filt.id !== "string" || filt.id === "deffilter-all") {
                    continue;
                }
                const mi = new contextmenu_1.MenuItem(rem, `${prefix}-${filt.id}`, filt.label, {
                    icon: this.icons.get(windowutils_1.iconForPath(`file.${filt.icon || "bin"}`, ICON_BASE_SIZE))
                });
                rem.add(mi);
            }
        };
        prepareMenu("ctx-remove-complete");
        prepareMenu("ctx-remove");
        ctx.show(event);
    }
    setItems(items) {
        const savedStats = new Map(Array.from(this.running).map(item => [item.sessionId, item.stats]));
        this.running.clear();
        this.sids.clear();
        this.downloads.set(items.map(item => {
            const rv = new DownloadItem(this, item, savedStats.get(item.sessionId));
            this.sids.set(rv.sessionId, rv);
            return rv;
        }));
    }
    getSelectedItems() {
        const { filtered } = this.downloads;
        return Array.from(this.selection).map(e => filtered[e]);
    }
    getSelectedSids(allowedStates) {
        const { filtered } = this.downloads;
        const selected = Array.from(this.selection);
        const allowedItems = selected.filter(i => allowedStates & filtered[i].state);
        return allowedItems.map(i => filtered[i].sessionId);
    }
    selectionChanged() {
        this.dismissTooltip();
        const { empty } = this.selection;
        if (empty) {
            for (const d of this.disableSet) {
                d.disabled = true;
            }
            return;
        }
        for (const d of this.disableSet) {
            d.disabled = false;
        }
        const items = this.getSelectedItems();
        const states = items.reduce((p, c) => p |= c.state, 0);
        if (!(states & state_1.DownloadState.PAUSEABLE)) {
            this.pauseAction.disabled = true;
        }
        if (!(states & state_1.DownloadState.RESUMABLE)) {
            this.resumeAction.disabled = true;
        }
        if (!(states & state_1.DownloadState.FORCABLE)) {
            this.forceAction.disabled = true;
        }
        if (!(states & state_1.DownloadState.CANCELABLE)) {
            this.cancelAction.disabled = true;
        }
        if (!(states & state_1.DownloadState.DONE)) {
            this.deleteFilesAction.disabled = true;
        }
        const item = this.focusRow >= 0 ?
            this.downloads.filtered[this.focusRow] :
            null;
        const canOpen = item && item.manId && item.state === state_1.DownloadState.DONE;
        const canOpenDirectory = item && item.manId;
        this.openFileAction.disabled = !canOpen;
        this.openDirectoryAction.disabled = !canOpenDirectory;
    }
    resumeDownloads(forced = false) {
        const sids = this.getSelectedSids(forced ? state_1.DownloadState.FORCABLE : state_1.DownloadState.RESUMABLE);
        if (!sids.length) {
            return;
        }
        port_1.default.post("resume", { sids, forced });
    }
    pauseDownloads() {
        const sids = this.getSelectedSids(state_1.DownloadState.PAUSEABLE);
        if (!sids.length) {
            return;
        }
        port_1.default.post("pause", { sids });
    }
    cancelDownloads() {
        const sids = this.getSelectedSids(state_1.DownloadState.CANCELABLE);
        if (!sids.length) {
            return;
        }
        port_1.default.post("cancel", { sids });
    }
    async openFile() {
        this.dismissTooltip();
        const { focusRow } = this;
        if (focusRow < 0) {
            return;
        }
        const item = this.downloads.filtered[focusRow];
        if (!item || !item.manId || item.state !== state_1.DownloadState.DONE) {
            return;
        }
        item.opening = true;
        try {
            this.invalidateRow(focusRow);
            await browser_1.downloads.open(item.manId);
        }
        catch (ex) {
            console.error(ex, ex.toString(), ex);
            port_1.default.post("missing", { sid: item.sessionId });
        }
        finally {
            setTimeout(() => {
                item.opening = false;
                this.invalidateRow(focusRow);
            }, 500);
        }
    }
    async openDirectory() {
        if (this.focusRow < 0) {
            return;
        }
        const item = this.downloads.filtered[this.focusRow];
        if (!item || !item.manId) {
            return;
        }
        try {
            await browser_1.downloads.show(item.manId);
        }
        catch (ex) {
            console.error(ex, ex.toString(), ex);
            port_1.default.post("missing", { sid: item.sessionId });
        }
    }
    async deleteFiles() {
        const items = [];
        for (const rowid of this.selection) {
            const item = this.downloads.filtered[rowid];
            if (item.state === state_1.DownloadState.DONE && item.manId) {
                items.push(item);
            }
        }
        if (!items.length) {
            return;
        }
        const sids = items.map(i => i.sessionId);
        const paths = items.map(i => i.destFull);
        await new removaldlg_1.DeleteFilesDialog(paths).show();
        await Promise.all(items.map(async (item) => {
            try {
                if (item.manId && item.state === state_1.DownloadState.DONE) {
                    await browser_1.downloads.removeFile(item.manId);
                }
            }
            catch {
                // ignored
            }
        }));
        this.removeDownloadsInternal(sids);
    }
    removeDownloadsInternal(sids) {
        if (!sids) {
            sids = [];
            for (const rowid of this.selection) {
                sids.push(this.downloads.filtered[rowid].sessionId);
            }
        }
        if (!sids.length) {
            return;
        }
        port_1.default.post("removeSids", { sids });
    }
    removeDownloadsByState(state, selectionOnly = false) {
        const branch = selectionOnly ? "filtered" : "items";
        const items = this.downloads[branch].filter(item => {
            if (selectionOnly && !this.selection.contains(item.filteredPosition)) {
                return false;
            }
            return item.state === state;
        }).map(i => i.sessionId);
        if (!items.length) {
            return;
        }
        this.removeDownloadsInternal(items);
    }
    async removeDownloads() {
        await new removaldlg_1.RemovalModalDialog(i18n_1._("remove-download.question"), "remove-selected").show();
        this.removeDownloadsInternal();
    }
    async removeAllDownloads() {
        await new removaldlg_1.RemovalModalDialog(i18n_1._("remove-all-downloads.question"), "remove-selected-all").show();
        this.removeDownloadsInternal(this.downloads.items.map(e => e.sessionId));
    }
    async removeCompleteDownloads(selected = false) {
        await new removaldlg_1.RemovalModalDialog(selected ?
            i18n_1._("remove-selected-complete-downloads.question") :
            i18n_1._("remove-complete-downloads.question"), selected ?
            "remove-selected-complete" :
            "remove-complete").show();
        this.removeDownloadsByState(state_1.DownloadState.DONE, selected);
    }
    async removeFailedDownloads() {
        await new removaldlg_1.RemovalModalDialog(i18n_1._("remove-failed-downloads.question"), "remove-failed").show();
        this.removeDownloadsByState(state_1.DownloadState.CANCELED, false);
    }
    async removePausedDownloads() {
        await new removaldlg_1.RemovalModalDialog(i18n_1._("remove-paused-downloads.question"), "remove-paused").show();
        this.removeDownloadsByState(state_1.DownloadState.PAUSED, false);
    }
    async removeMissingDownloads() {
        await new removaldlg_1.RemovalModalDialog(i18n_1._("remove-missing-downloads.question"), "remove-missing").show();
        this.removeDownloadsByState(state_1.DownloadState.MISSING, false);
    }
    async removeDomainDownloads(complete = false) {
        if (this.focusRow < 0) {
            return;
        }
        const item = this.downloads.filtered[this.focusRow];
        if (!item) {
            return;
        }
        const { domain } = item;
        await new removaldlg_1.RemovalModalDialog(complete ?
            i18n_1._("remove-domain-complete-downloads.question", domain) :
            i18n_1._("remove-domain-downloads.question", domain), complete ?
            "remove-domain-complete" :
            "remove-domain").show();
        const items = this.downloads.items.filter(item => {
            if (complete && item.state !== state_1.DownloadState.DONE) {
                return false;
            }
            return item.domain === domain;
        }).map(i => i.sessionId);
        if (!items.length) {
            return;
        }
        this.removeDownloadsInternal(items);
    }
    async removeBatchDownloads(complete = false) {
        if (this.focusRow < 0) {
            return;
        }
        const item = this.downloads.filtered[this.focusRow];
        if (!item) {
            return;
        }
        const { batch } = item;
        await new removaldlg_1.RemovalModalDialog(complete ?
            i18n_1._("remove-batch-complete-downloads.question", batch) :
            i18n_1._("remove-batch-downloads.question", batch), complete ?
            "remove-batch-complete" :
            "remove-batch").show();
        const items = this.downloads.items.filter(item => {
            if (complete && item.state !== state_1.DownloadState.DONE) {
                return false;
            }
            return item.batch === batch;
        }).map(i => i.sessionId);
        if (!items.length) {
            return;
        }
        this.removeDownloadsInternal(items);
    }
    async handleFilterRemove(event) {
        const [prefix, id] = event.split("--", 2);
        if (!prefix || !id) {
            return;
        }
        let all = false;
        let branch;
        switch (prefix) {
            case "ctx-remove-filter":
                all = true;
                branch = "remove-filter-downloads";
                break;
            case "ctx-remove-complete-filter":
                all = false;
                branch = "remove-complete-filter-downloads";
                break;
            default:
                return;
        }
        const filter = (await filters_1.filters()).get(id);
        if (!filter || typeof filter.id !== "string") {
            return;
        }
        await new removaldlg_1.RemovalModalDialog(i18n_1._(`${branch}.question`, filter.label), `${branch}-${filter.id}`).show();
        const items = this.downloads.items.filter(item => {
            if (!all && item.state !== state_1.DownloadState.DONE) {
                return false;
            }
            return filter.match(item.usable);
        }).map(i => i.sessionId);
        if (!items.length) {
            return;
        }
        this.removeDownloadsInternal(items);
    }
    updateItems(items) {
        const newDownloads = [];
        for (const i of items) {
            const item = this.sids.get(i.sessionId);
            if (!item) {
                const rv = new DownloadItem(this, i);
                this.sids.set(rv.sessionId, rv);
                newDownloads.push(rv);
                continue;
            }
            item.updateDownload(i);
        }
        if (newDownloads) {
            this.downloads.add(newDownloads);
        }
    }
    updatedDownload(item) {
        this.downloads.recalculateItem(item);
        if (item.isFiltered) {
            this.invalidateRow(item.filteredPosition);
        }
    }
    updatedState(item, oldState, newState) {
        switch (oldState) {
            case state_1.DownloadState.RUNNING:
                this.running.delete(item);
                if (!this.running.size && this.runningTimer && this.sizesTimer) {
                    clearInterval(this.runningTimer);
                    this.runningTimer = null;
                    clearInterval(this.sizesTimer);
                    this.sizesTimer = null;
                    winutil_1.$("#statusSpeedContainer").classList.add("hidden");
                }
                break;
            case state_1.DownloadState.DONE:
                this.finished--;
                break;
        }
        switch (newState) {
            case state_1.DownloadState.RUNNING:
                this.running.add(item);
                if (!this.runningTimer) {
                    this.runningTimer = window.setInterval(this.updateRunning.bind(this), RUNNING_TIMEOUT);
                    this.sizesTimer = window.setInterval(this.updateSizes.bind(this), SIZES_TIMEOUT);
                    this.updateRunning();
                    this.updateSizes();
                    winutil_1.$("#statusSpeedContainer").classList.remove("hidden");
                }
                if (item.manId && item.ext) {
                    iconcache_1.IconCache.set(item.ext, item.manId).catch(console.error);
                }
                break;
            case state_1.DownloadState.DONE:
                this.finished++;
                if (item.manId && item.ext) {
                    iconcache_1.IconCache.set(item.ext, item.manId).catch(console.error);
                }
                break;
        }
        this.selectionChanged();
        this.updateCounts();
    }
    removedItems(sids) {
        const ssids = new Set(sids);
        const items = this.downloads.items.filter(i => {
            if (!ssids.has(i.sessionId)) {
                return true;
            }
            this.running.delete(i);
            this.sids.delete(i.sessionId);
            if (i.state === state_1.DownloadState.DONE) {
                this.finished--;
            }
            return false;
        });
        this.downloads.set(items);
    }
    selectAll() {
        this.selection.add(0, this.rowCount - 1);
    }
    selectToggle() {
        this.selection.toggle(0, this.rowCount - 1);
    }
    importDownloads() {
        const picker = document.createElement("input");
        picker.setAttribute("type", "file");
        picker.setAttribute("accept", "text/*,.txt,.lst,.metalink,.meta4");
        picker.onchange = () => {
            if (!picker.files || !picker.files.length) {
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                if (!reader.result) {
                    return;
                }
                const items = imex.importText(reader.result);
                if (!items || !items.length) {
                    return;
                }
                port_1.default.post("import", { items });
            };
            reader.readAsText(picker.files[0], "utf-8");
        };
        picker.click();
    }
    exportDownloads(exporter) {
        const items = this.getSelectedItems();
        if (!items.length) {
            return;
        }
        const text = exporter.getText(items);
        const enc = new TextEncoder();
        const data = enc.encode(text);
        const url = URL.createObjectURL(new Blob([data], { type: "text/plain" }));
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", exporter.fileName);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    getRowClasses(rowid) {
        const item = this.downloads.filtered[rowid];
        if (!item) {
            return null;
        }
        if (item.opening) {
            return ["opening"];
        }
        const cls = state_1.StateClasses.get(item.state);
        if (cls && item.opening) {
            return [cls, "opening"];
        }
        if (item.opening) {
            return ["opening"];
        }
        return cls && [cls] || null;
    }
    getCellIcon(rowid, colid) {
        if (!this.downloads.filtered.length) {
            return null;
        }
        const item = this.downloads.filtered[rowid];
        if (colid === COL_URL) {
            return item.icon;
        }
        if (colid === COL_PROGRESS) {
            return state_1.StateIcons.get(item.state) || null;
        }
        return null;
    }
    getCellType(rowid, colid) {
        if (colid === COL_PROGRESS) {
            return constants_1.CellTypes.TYPE_PROGRESS;
        }
        return constants_1.CellTypes.TYPE_TEXT;
    }
    getCellText(rowid, colid) {
        const item = this.downloads.filtered[rowid];
        if (!item) {
            return "";
        }
        switch (colid) {
            case COL_URL:
                return item.fmtName;
            case COL_DOMAIN:
                return item.fmtDomain;
            case COL_PER:
                return item.fmtPercent;
            case COL_SIZE:
                return item.fmtSize;
            case COL_ETA:
                return item.fmtETA;
            case COL_SPEED:
                return item.fmtSpeed;
            case COL_SEGS:
                return ""; // item.fmtSegments;
            case COL_MASK:
                return item.mask;
        }
        return "";
    }
    getCellProgress(rowid) {
        const item = this.downloads.filtered[rowid];
        if (!item) {
            return -1;
        }
        switch (item.state) {
            case state_1.DownloadState.QUEUED:
                return item.percent;
            case state_1.DownloadState.RUNNING:
                return item.percent || -1;
            case state_1.DownloadState.PAUSED:
                return item.percent || -1;
            case state_1.DownloadState.FINISHING:
                return 1;
            case state_1.DownloadState.DONE:
                return 1;
            case state_1.DownloadState.CANCELED:
                return 1;
            default:
                return -1;
        }
    }
    onIconCached() {
        this.downloads.invalidateIcons();
    }
}
exports.DownloadTable = DownloadTable;


/***/ }),

/***/ "./windows/manager/tooltip.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable no-magic-numbers */

Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const formatters_1 = __webpack_require__("./lib/formatters.ts");
const state_1 = __webpack_require__("./windows/manager/state.ts");
const rect_1 = __webpack_require__("./uikit/lib/rect.ts");
function createInnerShadowGradient(ctx, w, colors) {
    const g = ctx.createLinearGradient(0, 0, 0, w);
    g.addColorStop(0, colors[0]);
    g.addColorStop(3.0 / w, colors[1]);
    g.addColorStop(4.0 / w, colors[2]);
    g.addColorStop(1, colors[3]);
    return g;
}
function makeRoundedRectPath(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
}
function createVerticalGradient(ctx, height, c1, c2) {
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, c1);
    g.addColorStop(1, c2);
    return g;
}
function drawSpeedPass(ctx, h, step, pass, speeds) {
    let y = h + pass.y;
    let x = pass.x + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    y -= speeds[0];
    if (pass.f) {
        ctx.lineTo(x, y);
    }
    else {
        ctx.moveTo(x, y);
    }
    let slope = (speeds[1] - speeds[0]);
    x += step * 0.7;
    y -= slope * 0.7;
    ctx.lineTo(x, y);
    for (let j = 1, e = speeds.length - 1; j < e; ++j) {
        y -= slope * 0.3;
        slope = (speeds[j + 1] - speeds[j]);
        y -= slope * 0.3;
        ctx.quadraticCurveTo(step * j, h + pass.y - speeds[j], (x + step * 0.6), y);
        x += step;
        y -= slope * 0.4;
        ctx.lineTo(x, y);
    }
    x += step * 0.3;
    y -= slope * 0.3;
    ctx.lineTo(x, y);
    if (pass.f) {
        ctx.lineTo(x, h);
        ctx.fillStyle = createVerticalGradient(ctx, h - 7, pass.f[0], pass.f[1]);
        ctx.fill();
    }
    if (pass.s) {
        ctx.lineWidth = pass.sw || 1;
        ctx.strokeStyle = pass.s;
        ctx.stroke();
    }
}
const speedPasses = Object.freeze([
    { x: 4, y: 0, f: ["#EADF91", "#F4EFB1"] },
    { x: 2, y: 0, f: ["#DFD58A", "#D3CB8B"] },
    { x: 1, y: 0, f: ["#D0BA70", "#DFCF6F"] },
    { x: 0, y: 0, f: ["#FF8B00", "#FFDF38"], s: "#F98F00" }
]);
const avgPass = Object.freeze({ x: 0, y: 0, s: "rgba(0,0,200,0.3", sw: 2 });
const ELEMS = [
    "icon",
    "infos", "name", "from", "size", "date", "eta", "etalabel",
    "speedbox", "speedbar", "current", "average",
    "progressbar", "progress"
];
class Tooltip {
    constructor(item, pos) {
        this.update = this.update.bind(this);
        this.item = item;
        this.item.on("largeIcon", this.update);
        const tmpl = (document.querySelector("#tooltip-template"));
        if (!tmpl) {
            throw new Error("template failed");
        }
        const el = tmpl.content.firstElementChild;
        if (!el) {
            throw new Error("invalid template");
        }
        this.elem = el.cloneNode(true);
        this.adjust(pos);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        ELEMS.forEach(e => {
            self[e] = this.elem.querySelector(`#tooltip-${e}`);
        });
        document.body.appendChild(this.elem);
        this.item.on("stats", this.update);
        this.item.on("update", this.update);
        this.speedbar.width = this.speedbar.clientWidth;
        this.speedbar.height = this.speedbar.clientHeight;
        this.update();
        this.adjust(pos);
    }
    update() {
        const { item } = this;
        if (!item.isFiltered) {
            this.dismiss();
            return;
        }
        const icon = item.largeIcon;
        this.icon.className = icon;
        this.name.textContent = item.currentFull;
        this.from.textContent = item.usable;
        this.size.textContent = item.fmtSize;
        this.date.textContent = new Date(item.startDate).toLocaleString();
        this.eta.textContent = item.fmtETA;
        const running = item.state === state_1.DownloadState.RUNNING;
        const hidden = this.speedbox.classList.contains("hidden");
        if (!running && !hidden) {
            this.eta.classList.add("single");
            this.etalabel.classList.add("hidden");
            this.speedbox.classList.add("hidden");
            this.progressbar.classList.add("hidden");
            this.adjust(null);
        }
        if (!running) {
            return;
        }
        if (hidden) {
            this.eta.classList.remove("single");
            this.etalabel.classList.remove("hidden");
            this.speedbox.classList.remove("hidden");
            this.progressbar.classList.remove("hidden");
            this.adjust(null);
        }
        this.progress.style.width = `${item.percent * 100}%`;
        this.current.textContent = formatters_1.formatSpeed(item.stats.current);
        this.average.textContent = formatters_1.formatSpeed(item.stats.avg);
        this.drawSpeeds();
    }
    drawSpeeds() {
        const { stats } = this.item;
        const { speedbar: canvas } = this;
        let w = canvas.width;
        let h = canvas.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Cannot acquire 2d context");
        }
        --w;
        --h;
        const boxFillStyle = createInnerShadowGradient(ctx, h, ["#B1A45A", "#F1DF7A", "#FEEC84", "#FFFDC4"]);
        const boxStrokeStyle = createInnerShadowGradient(ctx, 8, ["#816A1D", "#E7BE34", "#F8CC38", "#D8B231"]);
        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.translate(0.5, 0.5);
        ctx.lineWidth = 1;
        ctx.strokeStyle = boxStrokeStyle;
        ctx.fillStyle = boxFillStyle;
        // draw container chunks back
        ctx.fillStyle = boxFillStyle;
        makeRoundedRectPath(ctx, 0, 0, w, h, 5);
        ctx.fill();
        let speeds = Array.from(stats.validValues);
        let avgs = Array.from(stats.avgs.validValues);
        if (speeds.length > 1) {
            let [maxH] = speeds;
            let [minH] = speeds;
            speeds.forEach(s => {
                maxH = Math.max(maxH, s);
                minH = Math.min(minH, s);
            });
            if (minH === maxH) {
                speeds = speeds.map(() => 12);
            }
            else {
                const r = (maxH - minH);
                speeds = speeds.map(function (speed) {
                    return 3 + Math.round((h - 6) * (speed - minH) / r);
                });
                avgs = avgs.map(function (speed) {
                    return 3 + Math.round((h - 6) * (speed - minH) / r);
                });
            }
            ctx.save();
            ctx.clip();
            const step = w / (speeds.length - 1);
            for (const pass of speedPasses) {
                drawSpeedPass(ctx, h, step, pass, speeds);
            }
            drawSpeedPass(ctx, h, step, avgPass, avgs);
            ctx.restore();
        }
        makeRoundedRectPath(ctx, 0, 0, w, h, 3);
        ctx.stroke();
        ctx.restore();
    }
    adjust(pos) {
        if (pos) {
            this.lastPos = pos;
        }
        else {
            pos = this.lastPos;
        }
        const { clientWidth, clientHeight } = this.elem;
        if (!clientWidth) {
            this.elem.style.left = `${pos.x + 10}px`;
            this.elem.style.top = `${pos.y + 10}px`;
            return;
        }
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const r = new rect_1.Rect(pos.x + 10, pos.y + 10, 0, 0, clientWidth, clientHeight);
        if (r.right > w) {
            r.offset(-clientWidth - 20, 0);
        }
        if (r.left < 0) {
            r.offset(-r.left, 0);
        }
        if (r.bottom > h) {
            r.offset(0, -clientHeight - 20);
        }
        this.elem.style.left = `${r.left}px`;
        this.elem.style.top = `${r.top}px`;
    }
    dismiss() {
        if (this.elem.parentElement) {
            this.elem.parentElement.removeChild(this.elem);
        }
        this.item.off("stats", this.update);
        this.item.off("update", this.update);
        this.item.off("largeIcon", this.update);
    }
}
exports.Tooltip = Tooltip;


/***/ }),

/***/ "crypto":
/***/ (function(module, exports) {

module.exports = crypto;

/***/ })

/******/ });
//# sourceMappingURL=manager.js.map