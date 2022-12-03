/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./windows/popup.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_locales/all.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"ar\":\"العربية [ar]\",\"bg\":\"Български [bg]\",\"cs\":\"Čeština (CZ) [cs]\",\"da\":\"Dansk [da]\",\"de\":\"Deutsch [de]\",\"el\":\"Ελληνικά [el]\",\"en\":\"English (US) [en]\",\"es\":\"Español (España) [es]\",\"et\":\"Eesti keel [et]\",\"fa\":\"فارسی [fa]\",\"fr\":\"Français [fr]\",\"hu\":\"Magyar (HU) [hu]\",\"id\":\"Bahasa Indonesia [id]\",\"it\":\"Italiano [it]\",\"ja\":\"日本語 (JP) [ja]\",\"ko\":\"한국어 [ko]\",\"lt\":\"Lietuvių [lt]\",\"nl\":\"Nederlands [nl]\",\"pl\":\"Polski [pl]\",\"pt\":\"Português (Brasil) [pt]\",\"pt-PT\":\"Português (Portugal) [pt-PT]\",\"ru\":\"Русский [ru]\",\"sv\":\"Svenska (SV) [sv]\",\"tr\":\"Türkçe TR) [tr]\",\"zh_CN\":\"中文（简体） [zh_CN]\",\"zh_TW\":\"正體中文 (TW) [zh_TW]\"}");

/***/ }),

/***/ "./_locales/en/messages.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"CRASH\":{\"description\":\"Error Message\",\"message\":\"Internal Browser Error\"},\"FILE_FAILED\":{\"description\":\"Error Message\",\"message\":\"File Access Error\"},\"NETWORK_FAILED\":{\"description\":\"Error Message\",\"message\":\"Network Failure\"},\"SERVER_BAD_CONTENT\":{\"description\":\"Error message\",\"message\":\"Not Found\"},\"SERVER_FAILED\":{\"description\":\"Error message\",\"message\":\"Server Error\"},\"SERVER_FORBIDDEN\":{\"description\":\"Error message\",\"message\":\"Forbidden\"},\"SERVER_UNAUTHORIZED\":{\"description\":\"Error message\",\"message\":\"Unauthorized\"},\"USER_CANCELED\":{\"description\":\"Error message\",\"message\":\"User Canceled\"},\"add_download\":{\"description\":\"Action for adding a download\",\"message\":\"Add Download\"},\"add_new\":{\"description\":\"Button text (adding filters, limits and such)\",\"message\":\"Add New\"},\"add_paused_once\":{\"description\":\"Checkbox label\",\"message\":\"Only add paused this time\"},\"add_paused_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remember this decision and always add new downloads paused from now on?\"},\"add_paused_title\":{\"description\":\"Title for the add-paused dialog\",\"message\":\"Always add paused?\"},\"addpaused\":{\"description\":\"Action: Add paused\",\"message\":\"Add paused\"},\"ask_again_later\":{\"description\":\"Button text\",\"message\":\"Ask me again later\"},\"batch_batch\":{\"description\":\"Button text\",\"message\":\"Batch Download\"},\"batch_desc\":{\"description\":\"\",\"message\":\"The current URL seems to contain instructions for a batch download.\"},\"batch_items\":{\"description\":\"Messagebox info text for batch confirmations\",\"message\":\"Number of items:\"},\"batch_preview\":{\"description\":\"Messagebox info text for batch confirmations\",\"message\":\"Preview:\"},\"batch_question\":{\"description\":\"Messagebox info text for batch confirmations\",\"message\":\"Do you want to add this as a batch or as a single download?\"},\"batch_single\":{\"description\":\"Button text for batch confirmation\",\"message\":\"Single Download\"},\"batch_title\":{\"description\":\"Messagebox title for batch confirmations\",\"message\":\"Batch Download\"},\"cancel\":{\"description\":\"Button text: Cancel\",\"message\":\"Cancel\"},\"cancel_download\":{\"description\":\"Action to cancel downloads, e.g. from the context menu\",\"message\":\"Cancel\"},\"canceled\":{\"description\":\"Download status text\",\"message\":\"Canceled\"},\"cannot_be_empty\":{\"description\":\"Error message when an input field is empty but has to have a value\",\"message\":\"This field cannot be empty\"},\"change_later_reminder\":{\"description\":\"Checkbox label text for decision confirmations\",\"message\":\"You can later change this decision in the Preferences\"},\"check_selected_items\":{\"description\":\"Menu text\",\"message\":\"Check Selected Items\"},\"colConnections\":{\"description\":\"Table column in prefs/network\",\"message\":\"Concurrent Connections\"},\"colDomain\":{\"description\":\"Table column in manager\",\"message\":\"Domain\"},\"colETA\":{\"description\":\"Table column in manager\",\"message\":\"Est. Time\"},\"colNameURL\":{\"description\":\"Table column in manager\",\"message\":\"Name/URL\"},\"colPercent\":{\"description\":\"Table column in manager\",\"message\":\"%\"},\"colProgress\":{\"description\":\"Table column in manager\",\"message\":\"Progress\"},\"colSegments\":{\"description\":\"Table column in manager\",\"message\":\"Segments\"},\"colSize\":{\"description\":\"Table column in manager\",\"message\":\"Size\"},\"colSpeed\":{\"description\":\"Table column in manager\",\"message\":\"Speed\"},\"conflict_overwrite\":{\"description\":\"Option text; prefs/general\",\"message\":\"Overwrite\"},\"conflict_prompt\":{\"description\":\"Option text; prefs/general\",\"message\":\"Prompt\"},\"conflict_rename\":{\"description\":\"Option text; prefs/general\",\"message\":\"Rename\"},\"create_filter\":{\"description\":\"Button text; Create filter dialog; prefs/filters\",\"message\":\"Create Filter\"},\"custom_filename\":{\"description\":\"Label text; single window\",\"message\":\"Custom Filename\"},\"deffilter_all\":{\"description\":\"Filter label for the All files filter\",\"message\":\"All files\"},\"deffilter_arch\":{\"description\":\"Filter label for the Archives filter\",\"message\":\"Archives (zip, rar, 7z, …)\"},\"deffilter_aud\":{\"description\":\"Filter label for the Audio filter\",\"message\":\"Audio (mp3, flac, wav, …)\"},\"deffilter_bin\":{\"description\":\"Filter label for the Software filter\",\"message\":\"Software (exe, msi, …)\"},\"deffilter_doc\":{\"description\":\"Filter label for the Documents filter\",\"message\":\"Documents (pdf, odf, docx, …)\"},\"deffilter_img\":{\"description\":\"Filter label for the Images filter\",\"message\":\"Images (jpeg, png, gif, …)\"},\"deffilter_imggif\":{\"description\":\"Filter label for the GIF filter\",\"message\":\"GIF Images\"},\"deffilter_imgjpg\":{\"description\":\"Filter label for the JPEG filter\",\"message\":\"JPEG Images\"},\"deffilter_imgpng\":{\"description\":\"Filter label for the PNG filter\",\"message\":\"PNG Images\"},\"deffilter_vid\":{\"description\":\"Filter label for the Videos filter\",\"message\":\"Videos (mp4, webm, mkv, …)\"},\"delete\":{\"description\":\"button text\",\"message\":\"Delete\"},\"deletefiles\":{\"description\":\"menu action\",\"message\":\"Delete Files\"},\"deletefiles_button\":{\"description\":\"button text\",\"message\":\"Delete\"},\"deletefiles_text\":{\"description\":\"messagebox text\",\"message\":\"Are you sure you want to delete the following files?\"},\"deletefiles_title\":{\"description\":\"messagebox title\",\"message\":\"Delete Files\"},\"description\":{\"description\":\"Description (keep it short); e.g. the description column in select\",\"message\":\"Description\"},\"disable_other_filters\":{\"description\":\"Checkbox label. Keep it short\",\"message\":\"Disable others\"},\"donate\":{\"description\":\"Donate button\",\"message\":\"Donate!\"},\"done\":{\"description\":\"Status text\",\"message\":\"Done\"},\"download\":{\"description\":\"Download (noun); e.g. Download column in select\",\"message\":\"Download\"},\"download_verb\":{\"description\":\"Download (verb/action); e.g. in single and select buttons\",\"message\":\"Download\"},\"dta_regular\":{\"description\":\"Regular dta action; Menu text\",\"message\":\"DownThemAll!\"},\"dta_regular_all\":{\"description\":\"Menu text\",\"message\":\"DownThemAll! - All Tabs\"},\"dta_regular_image\":{\"description\":\"Menu text\",\"message\":\"Save Image with DownThemAll!\"},\"dta_regular_link\":{\"description\":\"Menu text\",\"message\":\"Save Link with DownThemAll!\"},\"dta_regular_media\":{\"description\":\"Menu text\",\"message\":\"Save Media with DownThemAll!\"},\"dta_regular_selection\":{\"description\":\"Menu text\",\"message\":\"Save Selection with DownThemAll!\"},\"dta_turbo\":{\"description\":\"OneClick! action; Menu text\",\"message\":\"OneClick!\"},\"dta_turbo_all\":{\"description\":\"Menu text\",\"message\":\"OneClick! - All Tabs\"},\"dta_turbo_image\":{\"description\":\"Menu text\",\"message\":\"Save Image with OneClick!\"},\"dta_turbo_link\":{\"description\":\"Menu text\",\"message\":\"Save Link with OneClick!\"},\"dta_turbo_media\":{\"description\":\"Menu text\",\"message\":\"Save Media with OneClick!\"},\"dta_turbo_selection\":{\"description\":\"Menu text\",\"message\":\"Save Selection with OneClick!\"},\"error_invalidMask\":{\"description\":\"Error message; single/select window\",\"message\":\"Invalid Renaming Mask\"},\"error_invalidReferrer\":{\"description\":\"Error message; single window\",\"message\":\"Invalid Referrer\"},\"error_invalidURL\":{\"description\":\"Error message; single window\",\"message\":\"Invalid URL\"},\"error_noItemsSelected\":{\"description\":\"Error Message; select window\",\"message\":\"No items selected\"},\"error_noabsolutepath\":{\"description\":\"Error Message; select/single window\",\"message\":\"Absolute paths for subfolders are not supported by browsers\"},\"error_nodotsinpath\":{\"description\":\"Error Message; select/single window\",\"message\":\"Dots (.) in subfolders are not supported by browsers\"},\"export\":{\"description\":\"menu text\",\"message\":\"Export To File\"},\"export_aria2\":{\"description\":\"menu text\",\"message\":\"Export As aria2 List\"},\"export_metalink\":{\"description\":\"menu text\",\"message\":\"Export As Metalink\"},\"export_text\":{\"description\":\"menu text\",\"message\":\"Export As Text\"},\"extensionDescription\":{\"description\":\"DownThemAll! tagline, displayed in about:addons; Please do NOT refer to a specific browser such as firefox, as we will probably support more than one\",\"message\":\"The Mass Downloader for your browser\"},\"fastfilter_placeholder\":{\"description\":\"Placeholder for fastfilter inputs\",\"message\":\"Wildcard expression or regular expression\"},\"fastfiltering\":{\"description\":\"Label for Fast Filtering input\",\"message\":\"Fast Filtering\"},\"filter_at_least_one\":{\"description\":\"Error message when no filter types are selected for a filter in the preferences UI\",\"message\":\"You must select at least one filter type!\"},\"filter_create_title\":{\"description\":\"Message box title\",\"message\":\"Create New Filter\"},\"filter_expression\":{\"description\":\"Message box label\",\"message\":\"Filter-Expression\"},\"filter_label\":{\"description\":\"Message box label\",\"message\":\"Filter-Label\"},\"filter_type_link\":{\"description\":\"Message box checkbox label\",\"message\":\"Link Filter\"},\"filter_type_media\":{\"description\":\"Message box checkbox label\",\"message\":\"Media Filter\"},\"filter_types\":{\"description\":\"Message box label\",\"message\":\"Filter-Types\"},\"finishing\":{\"description\":\"Status text\",\"message\":\"Finishing\"},\"force_start\":{\"description\":\"Menu text\",\"message\":\"Force Start\"},\"import\":{\"description\":\"menu text\",\"message\":\"Import From File\"},\"information_title\":{\"description\":\"Used in message boxes\",\"message\":\"Information\"},\"invalid_domain_pref\":{\"description\":\"Error message in prefs/network\",\"message\":\"Invalid domain\"},\"invert_selection\":{\"description\":\"Menu text\",\"message\":\"Invert selection\"},\"key_alt\":{\"description\":\"Short for Alt-Key\",\"message\":\"Alt\"},\"key_ctrl\":{\"description\":\"Short for Ctrl-Key\",\"message\":\"Ctrl\"},\"key_delete\":{\"description\":\"Short for Delete-key\",\"message\":\"Del\"},\"key_end\":{\"description\":\"Short for End-key\",\"message\":\"End\"},\"key_home\":{\"description\":\"Short for home key\",\"message\":\"Home\"},\"key_pagedown\":{\"description\":\"Short for pagedown-key\",\"message\":\"PageDown\"},\"key_pageup\":{\"description\":\"Short for PageUp-key\",\"message\":\"PageUp\"},\"language\":{\"description\":\"Lanuage Name in your language\",\"message\":\"English (US)\"},\"language_code\":{\"description\":\"Language code the locale will use, e.g. de or en-GB or pt-BR\",\"message\":\"en\"},\"limited_to\":{\"description\":\"Label text; used in prefs/network\",\"message\":\"Limited to\"},\"links\":{\"description\":\"Links tab label (short); select window\",\"message\":\"Links\"},\"manager_short\":{\"description\":\"Menu text\",\"message\":\"Manager\"},\"manager_status_items\":{\"description\":\"Status bar text; manager\",\"message\":\"Completed $COMPLETE$ of $TOTAL$ downloads ($SHOWING$ displayed), $RUNNING$ running\",\"placeholders\":{\"complete\":{\"content\":\"$1\",\"example\":\"10\"},\"running\":{\"content\":\"$4\",\"example\":\"4\"},\"showing\":{\"content\":\"$3\",\"example\":\"90\"},\"total\":{\"content\":\"$2\",\"example\":\"100\"}}},\"manager_title\":{\"description\":\"Window/tab title\",\"message\":\"DownThemAll! Manager\"},\"mask\":{\"description\":\"Renaming mask (short); used in e.g. select\",\"message\":\"Mask\"},\"mask_default\":{\"description\":\"Status text; Used in the mask column, select window\",\"message\":\"Default Mask\"},\"media\":{\"description\":\"Media label (short)\",\"message\":\"Media\"},\"missing\":{\"description\":\"Status text in manager\",\"message\":\"Missing\"},\"move_bottom\":{\"description\":\"Action for moving a download to the bottom\",\"message\":\"Bottom\"},\"move_down\":{\"description\":\"Action for moving a download down\",\"message\":\"Down\"},\"move_top\":{\"description\":\"Action for moving a download to the top\",\"message\":\"Top\"},\"move_up\":{\"description\":\"Action for moving a download up\",\"message\":\"Up\"},\"nagging_message\":{\"description\":\"Donation nagging message; displayed as a notification bar in manager\",\"message\":\"You've added $DOWNLOADS$ downloads with DownThemAll! so far! As a regular user you might want to consider a donation to support further development. Thanks!\",\"placeholders\":{\"downloads\":{\"content\":\"$1\",\"example\":\"\"}}},\"never_ask_again\":{\"description\":\"Donation button\",\"message\":\"Do not ask me again\"},\"no_links\":{\"description\":\"Notification text\",\"message\":\"No links found!\"},\"noitems_label\":{\"description\":\"Status bar text in select\",\"message\":\"No items selected\"},\"numitems_label\":{\"description\":\"Status bar text in select; Number of items selected (label)\",\"message\":\"$ITEMS$ items selected...\",\"placeholders\":{\"items\":{\"content\":\"$1\",\"example\":\"1000\"}}},\"ok\":{\"description\":\"Button text; Used in message boxes\",\"message\":\"OK\"},\"open_directory\":{\"description\":\"Menu text; manager context\",\"message\":\"Open Directory\"},\"open_file\":{\"description\":\"Menu text; manager context\",\"message\":\"Open File\"},\"open_link\":{\"description\":\"Menu text; select window\",\"message\":\"Open Link\"},\"options_filters\":{\"description\":\"Pref tab text\",\"message\":\"Filters\"},\"options_general\":{\"description\":\"Pref tab text\",\"message\":\"General\"},\"options_network\":{\"description\":\"Pref tab text\",\"message\":\"Network\"},\"pause_download\":{\"description\":\"Action for pausing a download\",\"message\":\"Pause\"},\"paused\":{\"description\":\"Status text; manager\",\"message\":\"Paused\"},\"pref_add_paused\":{\"description\":\"Preferences/General\",\"message\":\"Add new downloads paused, instead of starting them immediately\"},\"pref_button_type\":{\"description\":\"label\",\"message\":\"DownThemAll! button:\"},\"pref_button_type_dta\":{\"description\":\"label\",\"message\":\"DownThemAll! selection\"},\"pref_button_type_manager\":{\"description\":\"label\",\"message\":\"Open Manager\"},\"pref_button_type_popup\":{\"description\":\"label\",\"message\":\"Popup menu\"},\"pref_button_type_turbo\":{\"description\":\"label\",\"message\":\"OneClick!\"},\"pref_concurrent_downloads\":{\"description\":\"Preferences/Network\",\"message\":\"Concurrent downloads\"},\"pref_finish_notification\":{\"description\":\"Preferences/General\",\"message\":\"Show a notification when the queue finishes downloading\"},\"pref_hide_context\":{\"description\":\"Preferences/General\",\"message\":\"Do not show general context menu items\"},\"pref_manager\":{\"description\":\"Preferences/General; group text\",\"message\":\"Manager\"},\"pref_manager_in_popup\":{\"description\":\"checkbox text\",\"message\":\"Open manager in a new popup window\"},\"pref_manager_tooltip\":{\"description\":\"Preferences/General\",\"message\":\"Show tooltips in Manager tabs\"},\"pref_netglobal\":{\"description\":\"Preferences/General; group text\",\"message\":\"Global Network Limits\"},\"pref_open_manager_on_queue\":{\"description\":\"Preferences/General\",\"message\":\"Open the Manager tab after queuing some downloads\"},\"pref_queue_notification\":{\"description\":\"Preferences/General\",\"message\":\"Show a notification when queuing new downloads\"},\"pref_queueing\":{\"description\":\"Preferences/General; group text\",\"message\":\"Queuing Downloads\"},\"pref_remove_missing_on_init\":{\"description\":\"Preferences/General\",\"message\":\"Remove missing downloads after a restart\"},\"pref_retries\":{\"description\":\"pref text\",\"message\":\"Number of retries of downloads on temporary errors\"},\"pref_retry_time\":{\"description\":\"pref text\",\"message\":\"Retry every (in minutes)\"},\"pref_show_urls\":{\"description\":\"Preferences/General\",\"message\":\"Show URLs instead of Names\"},\"pref_sounds\":{\"description\":\"checkbox text\",\"message\":\"Play sounds\"},\"pref_text_links\":{\"description\":\"Preferences/General\",\"message\":\"Try to find links in the website text (slower)\"},\"pref_theme\":{\"description\":\"label text\",\"message\":\"Theme:\"},\"pref_theme_dark\":{\"description\":\"option text\",\"message\":\"Dark\"},\"pref_theme_default\":{\"description\":\"option text\",\"message\":\"System/Browser\"},\"pref_theme_light\":{\"description\":\"option text\",\"message\":\"Light\"},\"pref_ui\":{\"description\":\"Preferences/General; group text\",\"message\":\"User Interface\"},\"prefs_conflicts\":{\"description\":\"Preferences/General; group text\",\"message\":\"When a file exists\"},\"prefs_short\":{\"description\":\"Menu text; Preferences\",\"message\":\"Preferences\"},\"prefs_title\":{\"description\":\"Window/tab title; Preferences\",\"message\":\"DownThemAll! Preferences\"},\"queue_finished\":{\"description\":\"Notification text\",\"message\":\"The download queue has finished\"},\"queued\":{\"description\":\"Status text\",\"message\":\"Queued\"},\"queued_download\":{\"description\":\"Notification text; single download\",\"message\":\"Queued 1 download!\"},\"queued_downloads\":{\"description\":\"Notification text; multiple downloads\",\"message\":\"Queued $COUNT$ downloads!\",\"placeholders\":{\"count\":{\"content\":\"$1\",\"example\":\"100\"}}},\"referrer\":{\"description\":\"Label for \\\"Referrer\\\"\",\"message\":\"Referrer\"},\"remember\":{\"description\":\"Checkbox text for confirmation, e.g. when removing a download in manager\",\"message\":\"Remember this decision\"},\"remove_all_complete_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove All Complete\"},\"remove_all_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove All\"},\"remove_all_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove ALL downloads?\"},\"remove_batch_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove Current Batch\"},\"remove_batch_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove all downloads from the same batch as the currently selected download?\"},\"remove_complete_downloads\":{\"description\":\"Action for removing complete downloads\",\"message\":\"Remove Complete Downloads\"},\"remove_complete_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove all complete downloads?\"},\"remove_complete_filter_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove all complete downloads matching the '$FILTER$' filter?\",\"placeholders\":{\"filter\":{\"content\":\"$1\",\"example\":\"JPEG Images\"}}},\"remove_complete_selection_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove all complete downloads in the current selection?\"},\"remove_domain_complete_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove Complete From Current Domain\"},\"remove_domain_complete_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove all complete downloads from domain '$DOMAIN$'?\",\"placeholders\":{\"domain\":{\"content\":\"$1\",\"example\":\"example.org\"}}},\"remove_domain_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove Current Domain\"},\"remove_domain_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove all downloads from domain '$DOMAIN$'?\",\"placeholders\":{\"domain\":{\"content\":\"$1\",\"example\":\"example.org\"}}},\"remove_download\":{\"description\":\"Action for removing a download, no matter what state\",\"message\":\"Remove Download\"},\"remove_download_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove selected downloads?\"},\"remove_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove Downloads\"},\"remove_downloads_title\":{\"description\":\"Messagebox title; manager\",\"message\":\"Are you sure you want to remove downloads?\"},\"remove_failed_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove Failed\"},\"remove_failed_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove all failed downloads?\"},\"remove_filter_downloads_question\":{\"description\":\"Mesagebox text\",\"message\":\"Do you want to remove all downloads matching the '$FILTER$' filter?\",\"placeholders\":{\"filter\":{\"content\":\"$1\",\"example\":\"JPEG Images\"}}},\"remove_missing\":{\"description\":\"Menu text\",\"message\":\"Clear Missing Downloads\"},\"remove_missing_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to clear all missing downloads?\"},\"remove_paused_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove Paused\"},\"remove_paused_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove all paused downloads?\"},\"remove_selected_complete_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove Complete In Selection\"},\"remove_selected_complete_downloads_question\":{\"description\":\"Messagebox text\",\"message\":\"Do you want to remove all complete downloads in the current selection?\"},\"remove_selected_downloads\":{\"description\":\"Menu text\",\"message\":\"Remove Selected\"},\"rename\":{\"description\":\"UI for renaming; currently unused\",\"message\":\"Rename\"},\"renamer_batch\":{\"description\":\"Mask text; see mask button\",\"message\":\"Batch Number\"},\"renamer_d\":{\"description\":\"Mask text; see mask button\",\"message\":\"Date Added - Day\"},\"renamer_date\":{\"description\":\"Mask text; see mask button\",\"message\":\"Date Added\"},\"renamer_domain\":{\"description\":\"Mask text; see mask button\",\"message\":\"Domain Name (TLD)\"},\"renamer_ext\":{\"description\":\"Mask text; see mask button\",\"message\":\"File Extension\"},\"renamer_hh\":{\"description\":\"Mask text; see mask button\",\"message\":\"Date Added - Hour\"},\"renamer_host\":{\"description\":\"Mask text; see mask button\",\"message\":\"Host Name\"},\"renamer_idx\":{\"description\":\"Mask text; see mask button\",\"message\":\"Item Number within Batch\"},\"renamer_info\":{\"description\":\"Mask text; see mask button; do NOT translate any mentions of \\\"flat\\\"!\",\"message\":\"Adding 'flat', such as *flatsubdirs* will replace all slashes in the value, thus not creating directories\"},\"renamer_pagetitle\":{\"description\":\"Mask text; see mask button\",\"message\":\"Page title text\"},\"renamer_m\":{\"description\":\"Mask text; see mask button\",\"message\":\"Date Added - Month\"},\"renamer_mm\":{\"description\":\"Mask text; see mask button\",\"message\":\"Date Added - Minute\"},\"renamer_name\":{\"description\":\"Mask text; see mask button\",\"message\":\"File Name\"},\"renamer_num\":{\"description\":\"Mask text; see mask button\",\"message\":\"Alias for *batch*\"},\"renamer_qstring\":{\"description\":\"Mask text; see mask button\",\"message\":\"Query String\"},\"renamer_ref\":{\"description\":\"Mask text; see mask button\",\"message\":\"Referrer\"},\"renamer_refdomain\":{\"description\":\"Mask text; see mask button\",\"message\":\"Referrer Domain Name (TLD)\"},\"renamer_refext\":{\"description\":\"Mask text; see mask button\",\"message\":\"Referrer File Extension\"},\"renamer_refhost\":{\"description\":\"Mask text; see mask button\",\"message\":\"Referrer Host Name\"},\"renamer_refname\":{\"description\":\"Mask text; see mask button\",\"message\":\"Referrer File Name\"},\"renamer_refqstring\":{\"description\":\"Mask text; see mask button\",\"message\":\"Referrer Query String\"},\"renamer_refsubdirs\":{\"description\":\"Mask text; see mask button\",\"message\":\"Referrer Path\"},\"renamer_refurl\":{\"description\":\"Mask text; see mask button\",\"message\":\"Referrer URL (without protocol)\"},\"renamer_ss\":{\"description\":\"Mask text; see mask button\",\"message\":\"Date Added - Second\"},\"renamer_subdirs\":{\"description\":\"Mask text; see mask button\",\"message\":\"Path\"},\"renamer_tags\":{\"description\":\"Mask text; see mask button\",\"message\":\"Renaming Mask Tags\"},\"renamer_text\":{\"description\":\"Mask text; see mask button\",\"message\":\"Description Text\"},\"renamer_title\":{\"description\":\"Mask text; see mask button\",\"message\":\"Title Text\"},\"renamer_url\":{\"description\":\"Mask text; see mask button\",\"message\":\"URL (without protocol)\"},\"renamer_y\":{\"description\":\"Mask text; see mask button\",\"message\":\"Date Added - Year\"},\"renmask\":{\"description\":\"Renaming mask (long)\",\"message\":\"Renaming mask\"},\"reset\":{\"description\":\"Button text; pref window\",\"message\":\"Reset\"},\"reset_confirmations\":{\"description\":\"Button text; pref/General\",\"message\":\"Reset remembered confirmations\"},\"reset_confirmations_done\":{\"description\":\"Messagebox text; pref/General\",\"message\":\"All previously remembered confirmations have been reset!\"},\"reset_layouts\":{\"description\":\"Button text; pref/General\",\"message\":\"Reset user interface customizations\"},\"reset_layouts_done\":{\"description\":\"Messagebox text; pref/General\",\"message\":\"All previously remembered layout customizations have been reset! You may need to reload windows/tabs.\"},\"resume_download\":{\"description\":\"Action for resuming a download\",\"message\":\"Resume\"},\"retrying\":{\"description\":\"Status text\",\"message\":\"Retrying\"},\"retrying_error\":{\"description\":\"status text\",\"message\":\"Retrying - $ERROR$\",\"placeholders\":{\"error\":{\"content\":\"$1\",\"example\":\"Server Error\"}}},\"running\":{\"description\":\"Status text\",\"message\":\"Running\"},\"save\":{\"description\":\"Button text; e.g. prefs/Network\",\"message\":\"Save\"},\"search\":{\"description\":\"Placeholder text; manager status search field\",\"message\":\"Search…\"},\"select_all\":{\"description\":\"Menu text; e.g. select context\",\"message\":\"Select All\"},\"select_checked\":{\"description\":\"Menu text; select context\",\"message\":\"Select Checked\"},\"select_none\":{\"description\":\"Menu text; select context\",\"message\":\"Select None\"},\"select_title\":{\"description\":\"Title of the select window\",\"message\":\"DownThemAll! - Select your Downloads\"},\"set_mask\":{\"description\":\"Menu text; select window\",\"message\":\"Set Renaming Mask\"},\"set_mask_text\":{\"description\":\"dialog text\",\"message\":\"Set a new renaming mask\"},\"set_referrer\":{\"description\":\"menu text\",\"message\":\"Set Referrer\"},\"set_referrer_text\":{\"description\":\"dialog text\",\"message\":\"Set a new referrer\"},\"single_batchexamples\":{\"description\":\"Header text; single window\",\"message\":\"Batches are supported, e.g.:\"},\"single_header\":{\"description\":\"Header text; single window\",\"message\":\"Enter a download URL (link) and other options\"},\"single_title\":{\"description\":\"Title of single window\",\"message\":\"DownThemAll! - Add a link\"},\"sizeB\":{\"description\":\"Size formatting; bytes\",\"message\":\"$S$B\",\"placeholders\":{\"s\":{\"content\":\"$1\",\"example\":\"100b\"}}},\"sizeGB\":{\"description\":\"Size formatting; giga bytes\",\"message\":\"$S$GB\",\"placeholders\":{\"s\":{\"content\":\"$1\",\"example\":\"100.200GB\"}}},\"sizeKB\":{\"description\":\"Size formatting; kilo bytes\",\"message\":\"$S$KB\",\"placeholders\":{\"s\":{\"content\":\"$1\",\"example\":\"100.2KB\"}}},\"sizeMB\":{\"description\":\"Size formatting; mega bytes\",\"message\":\"$S$MB\",\"placeholders\":{\"s\":{\"content\":\"$1\",\"example\":\"100.22MB\"}}},\"sizePB\":{\"description\":\"Size formatting; peta bytes (you never know)\",\"message\":\"$S$PB\",\"placeholders\":{\"s\":{\"content\":\"$1\",\"example\":\"100.212PB\"}}},\"sizeTB\":{\"description\":\"Size formatting; tera bytes (you never know)\",\"message\":\"$S$TB\",\"placeholders\":{\"s\":{\"content\":\"$1\",\"example\":\"100.002TB\"}}},\"size_progress\":{\"description\":\"Status text; manager size column\",\"message\":\"$WRITTEN$ of $TOTAL$\",\"placeholders\":{\"total\":{\"content\":\"$2\",\"example\":\"\"},\"written\":{\"content\":\"$1\",\"example\":\"\"}}},\"size_unknown\":{\"description\":\"Status text; manager size column\",\"message\":\"Unknown\"},\"sizes_huge\":{\"description\":\"Menu text; manager size column dropdown\",\"message\":\"Huge (> $HIGH$)\",\"placeholders\":{\"high\":{\"content\":\"$1\",\"example\":\"1GB\"}}},\"sizes_large\":{\"description\":\"Menu text; manager size column dropdown\",\"message\":\"Large ($LOW$ - $HIGH$)\",\"placeholders\":{\"high\":{\"content\":\"$2\",\"example\":\"10MB\"},\"low\":{\"content\":\"$1\",\"example\":\"1MB\"}}},\"sizes_medium\":{\"description\":\"Menu text; manager size column dropdown\",\"message\":\"Medium ($LOW$ - $HIGH$)\",\"placeholders\":{\"high\":{\"content\":\"$2\",\"example\":\"10MB\"},\"low\":{\"content\":\"$1\",\"example\":\"1MB\"}}},\"sizes_small\":{\"description\":\"Menu text; manager size column dropdown\",\"message\":\"Small ($LOW$ - $HIGH$)\",\"placeholders\":{\"high\":{\"content\":\"$2\",\"example\":\"10MB\"},\"low\":{\"content\":\"$1\",\"example\":\"1MB\"}}},\"speedB\":{\"description\":\"Speed formatting; bytes\",\"message\":\"$SPEED$b/s\",\"placeholders\":{\"speed\":{\"content\":\"$1\",\"example\":\"100b/s\"}}},\"speedKB\":{\"description\":\"Speed formatting; kilo bytes\",\"message\":\"$SPEED$KB/s\",\"placeholders\":{\"speed\":{\"content\":\"$1\",\"example\":\"100.1KB/s\"}}},\"speedMB\":{\"description\":\"Speed formatting; mega bytes\",\"message\":\"$SPEED$MB/s\",\"placeholders\":{\"speed\":{\"content\":\"$1\",\"example\":\"100.20MB/s\"}}},\"statusNetwork_active_title\":{\"description\":\"Status bar tooltip; manager network icon\",\"message\":\"New Downloads will be started\"},\"statusNetwork_inactive_title\":{\"description\":\"Status bar tooltip; manager network icon\",\"message\":\"No new Downloads will be started\"},\"subfolder\":{\"description\":\"label text\",\"message\":\"Subfolder:\"},\"subfolder_placeholder\":{\"description\":\"placeholder text within an input box\",\"message\":\"Place files in this subfolder within your downloads directory\"},\"title\":{\"description\":\"Column text; Title label (short)\",\"message\":\"Title\"},\"toggle_selected_items\":{\"description\":\"Menu text; select\",\"message\":\"Toggle Check for Selected Items\"},\"tooltip_date\":{\"description\":\"Tooltip text; manager/downloads\",\"message\":\"Date added:\"},\"tooltip_eta\":{\"description\":\"Tooltip text; manager/downloads; Time\",\"message\":\"Remaining:\"},\"tooltip_from\":{\"description\":\"Tooltip text; manager/downloads; source URL\",\"message\":\"From:\"},\"tooltip_size\":{\"description\":\"Tooltip text; manager/downloads\",\"message\":\"Size:\"},\"tooltip_speed_average\":{\"description\":\"Tooltip text; manager/downloads\",\"message\":\"Average:\"},\"tooltip_speed_current\":{\"description\":\"Tooltip text; manager/downloads\",\"message\":\"Current:\"},\"uncheck_selected_items\":{\"description\":\"Menu text; select\",\"message\":\"Uncheck Selected Items\"},\"unlimited\":{\"description\":\"Option text; Prefs/Network\",\"message\":\"Unlimited\"},\"useonlyonce\":{\"description\":\"Label for Use-Once checkboxes\",\"message\":\"Use Once\"}}");

/***/ }),

/***/ "./data/prefs.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"button-type\":\"popup\",\"manager-in-popup\":false,\"concurrent\":4,\"queue-notification\":true,\"finish-notification\":true,\"sounds\":true,\"open-manager-on-queue\":true,\"text-links\":true,\"add-paused\":false,\"hide-context\":false,\"conflict-action\":\"uniquify\",\"nagging\":0,\"nagging-next\":7,\"tooltip\":true,\"show-urls\":false,\"remove-missing-on-init\":false,\"retries\":5,\"retry-time\":10,\"theme\":\"default\",\"limits\":[{\"domain\":\"*\",\"concurrent\":-1}]}");

/***/ }),

/***/ "./lib/browser.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERA = exports.CHROME = exports.theme = exports.windows = exports.webRequest = exports.webNavigation = exports.tabs = exports.storage = exports.sessions = exports.runtime = exports.notifications = exports.menus = exports.history = exports.extension = exports.downloads = exports.contextMenus = exports.browserAction = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const polyfill = __webpack_require__("./node_modules/webextension-polyfill/dist/browser-polyfill.js");
exports.browserAction = polyfill.browserAction;
exports.contextMenus = polyfill.contextMenus;
exports.downloads = polyfill.downloads;
exports.extension = polyfill.extension;
exports.history = polyfill.history;
exports.menus = polyfill.menus;
exports.notifications = polyfill.notifications;
exports.runtime = polyfill.runtime;
exports.sessions = polyfill.sessions;
exports.storage = polyfill.storage;
exports.tabs = polyfill.tabs;
exports.webNavigation = polyfill.webNavigation;
exports.webRequest = polyfill.webRequest;
exports.windows = polyfill.windows;
exports.theme = polyfill.theme;
exports.CHROME = navigator.appVersion.includes("Chrome/");
exports.OPERA = navigator.appVersion.includes("OPR/");


/***/ }),

/***/ "./lib/events.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// License: MIT
var events_1 = __webpack_require__("./uikit/lib/events.ts");
Object.defineProperty(exports, "EventEmitter", { enumerable: true, get: function () { return events_1.EventEmitter; } });


/***/ }),

/***/ "./lib/i18n.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCustomLocale = exports.localize = exports._ = exports.locale = exports.getCurrentLanguage = exports.ALL_LANGS = void 0;
const tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
// License: MIT
const memoize_1 = __webpack_require__("./lib/memoize.ts");
const all_json_1 = tslib_1.__importDefault(__webpack_require__("./_locales/all.json"));
const messages_json_1 = tslib_1.__importDefault(__webpack_require__("./_locales/en/messages.json"));
const sorting_1 = __webpack_require__("./lib/sorting.ts");
const localforage_1 = tslib_1.__importDefault(__webpack_require__("./node_modules/localforage/dist/localforage.js"));
exports.ALL_LANGS = Object.freeze(new Map(sorting_1.sorted(Object.entries(all_json_1.default), e => {
    return [e[1], e[0]];
}, sorting_1.naturalCaseCompare)));
let CURRENT = "en";
function getCurrentLanguage() {
    return CURRENT;
}
exports.getCurrentLanguage = getCurrentLanguage;
const CUSTOM_KEY = "_custom_locale";
const normalizer = /[^A-Za-z0-9_]/g;
class Entry {
    constructor(entry) {
        if (!entry.message.includes("$")) {
            throw new Error("Not entry-able");
        }
        let hit = false;
        this.message = entry.message.replace(/\$[A-Z0-9]+\$/g, (r) => {
            hit = true;
            const id = r.slice(1, -1).toLocaleLowerCase();
            const placeholder = entry.placeholders[id];
            if (!placeholder || !placeholder.content) {
                throw new Error(`Invalid placeholder: ${id}`);
            }
            return `${placeholder.content}$`;
        });
        if (!hit) {
            throw new Error("Not entry-able");
        }
    }
    localize(args) {
        return this.message.replace(/\$\d+\$/g, (r) => {
            const idx = parseInt(r.slice(1, -1), 10) - 1;
            return args[idx] || "";
        });
    }
}
class Localization {
    constructor(baseLanguage, ...overlayLanguages) {
        this.strings = new Map();
        const mapLanguage = (lang) => {
            for (const [id, entry] of Object.entries(lang)) {
                if (!id || !entry || !entry.message) {
                    continue;
                }
                try {
                    if (entry.message.includes("$")) {
                        this.strings.set(id, new Entry(entry));
                    }
                    else {
                        this.strings.set(id, entry.message);
                    }
                }
                catch (ex) {
                    this.strings.set(id, entry.message);
                }
            }
        };
        mapLanguage(baseLanguage);
        overlayLanguages.forEach(mapLanguage);
    }
    localize(id, ...args) {
        const entry = this.strings.get(id.replace(normalizer, "_"));
        if (!entry) {
            return "";
        }
        if (typeof entry === "string") {
            return entry;
        }
        if (args.length === 1 && Array.isArray(args)) {
            [args] = args;
        }
        return entry.localize(args);
    }
}
function checkBrowser() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    if (typeof browser !== "undefined" && browser.i18n) {
        return;
    }
    if (typeof chrome !== "undefined" && chrome.i18n) {
        return;
    }
    throw new Error("not in a webext");
}
async function fetchLanguage(code) {
    try {
        if (code === "en") {
            return messages_json_1.default;
        }
        const resp = await fetch(`/_locales/${code}/messages.json`);
        const json = await resp.json();
        if (!json || !json.CRASH || !json.CRASH.message) {
            throw new Error(`Fetch returned invalid locale for: ${code}`);
        }
        return json;
    }
    catch (ex) {
        console.error("bad locale", code, ex);
        return null;
    }
}
async function loadRawLocales() {
    // en is the base locale, always to be loaded
    // The loader will override string from it with more specific string
    // from other locales
    const langs = new Set(["en"]);
    const uiLang = (typeof browser !== "undefined" ? browser : chrome).
        i18n.getUILanguage();
    // Chrome will only look for underscore versions of locale codes,
    // while Firefox will look for both.
    // So we better normalize the code to the underscore version.
    // However, the API seems to always return the dash-version.
    // Add all base locales into ascending order of priority,
    // starting with the most unspecific base locale, ending
    // with the most specific locale.
    // e.g. this will transform ["zh", "CN"] -> ["zh", "zh_CN"]
    uiLang.split(/[_-]/g).reduce((prev, curr) => {
        prev.push(curr);
        langs.add(prev.join("_"));
        return prev;
    }, []);
    if (CURRENT && CURRENT !== "default") {
        langs.delete(CURRENT);
        langs.add(CURRENT);
    }
    const valid = Array.from(langs).filter(e => exports.ALL_LANGS.has(e));
    const fetched = await Promise.all(Array.from(valid, fetchLanguage));
    return fetched.filter(e => !!e);
}
async function load() {
    try {
        checkBrowser();
        try {
            let currentLang = "";
            if (typeof browser !== "undefined") {
                currentLang = await browser.storage.sync.get("language");
            }
            else {
                currentLang = await new Promise(resolve => chrome.storage.sync.get("language", resolve));
            }
            if ("language" in currentLang) {
                currentLang = currentLang.language;
            }
            if (!currentLang || !currentLang.length) {
                currentLang = "default";
            }
            CURRENT = currentLang;
            // en is the base locale
            const valid = await loadRawLocales();
            if (!valid.length) {
                throw new Error("Could not load ANY of these locales");
            }
            const custom = await localforage_1.default.getItem(CUSTOM_KEY);
            if (custom) {
                try {
                    valid.push(JSON.parse(custom));
                }
                catch (ex) {
                    console.error(ex);
                    // ignored
                }
            }
            const base = valid.shift();
            const rv = new Localization(base, ...valid);
            return rv;
        }
        catch (ex) {
            console.error("Failed to load locale", ex.toString(), ex.stack, ex);
            return new Localization(messages_json_1.default);
        }
    }
    catch {
        return new Localization(messages_json_1.default);
    }
}
exports.locale = load();
let loc;
let memoLocalize = null;
exports.locale.then(l => {
    loc = l;
    memoLocalize = memoize_1.memoize(loc.localize.bind(loc), 10 * 1000, 10);
});
/**
 * Localize a message
 * @param {string} id Identifier of the string to localize
 * @param {string[]} [subst] Message substitutions
 * @returns {string} Localized message
 */
function _(id, ...subst) {
    if (!loc || !memoLocalize) {
        console.trace("TOO SOON");
        throw new Error("Called too soon");
    }
    if (!subst.length) {
        return memoLocalize(id);
    }
    return loc.localize(id, subst);
}
exports._ = _;
function localize_(elem) {
    for (const tmpl of elem.querySelectorAll("template")) {
        localize_(tmpl.content);
    }
    for (const el of elem.querySelectorAll("*[data-i18n]")) {
        const { i18n: i } = el.dataset;
        if (!i) {
            continue;
        }
        for (let piece of i.split(",")) {
            piece = piece.trim();
            if (!piece) {
                continue;
            }
            const idx = piece.indexOf("=");
            if (idx < 0) {
                let childElements;
                if (el.childElementCount) {
                    childElements = Array.from(el.children);
                }
                el.textContent = _(piece);
                if (childElements) {
                    childElements.forEach(e => el.appendChild(e));
                }
                continue;
            }
            const attr = piece.substring(0, idx).trim();
            piece = piece.slice(idx + 1).trim();
            el.setAttribute(attr, _(piece));
        }
    }
    for (const el of document.querySelectorAll("*[data-l18n]")) {
        console.error("wrong!", el);
    }
    return elem;
}
/**
 * Localize a DOM
 * @param {Element} elem DOM to localize
 * @returns {Element} Passed in element (fluent)
 */
async function localize(elem) {
    await exports.locale;
    return localize_(elem);
}
exports.localize = localize;
async function saveCustomLocale(data) {
    if (!data) {
        await localforage_1.default.removeItem(CUSTOM_KEY);
        return;
    }
    new Localization(JSON.parse(data));
    await localStorage.setItem(CUSTOM_KEY, data);
}
exports.saveCustomLocale = saveCustomLocale;


/***/ }),

/***/ "./lib/memoize.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.identity = exports.memoize = exports.clearCaches = exports.filterCaches = void 0;
// License: MIT
const DEFAULT_LIMIT = 3000;
let memoes = [];
function filterCaches(c) {
    if (!c) {
        return false;
    }
    c.clear();
    return true;
}
exports.filterCaches = filterCaches;
function clearCaches() {
    memoes = memoes.filter(filterCaches);
}
exports.clearCaches = clearCaches;
/**
 * Decorate a function with a memoization wrapper, with a limited-size cache
 * to reduce peak memory utilization.
 *
 * The memoized function may have any number of arguments, but they must be
 * be serializable.  It's safest to use this only on functions that accept
 * primitives.
 *
 * A memoized function is not thread-safe, but so is JS,  nor re-entrant-safe!
 *
 * @param {Function} func The function to be memoized
 * @param {Number} [limit] Optional. Cache size (default: 3000)
 * @param {Number} [numArgs] Options. Number of arguments the function expects
 * (default: func.length)
 * @returns {Function} Memoized function
 */
function memoize(func, limit, numArgs) {
    const climit = limit && limit > 0 ? limit : DEFAULT_LIMIT;
    numArgs = numArgs || func.length;
    const cache = new Map();
    memoes.push(cache);
    const keylist = [];
    const args = [];
    let key;
    let result;
    switch (numArgs) {
        case 0:
            throw new Error("memoize does not support functions without arguments");
        case 1:
            return function memoizeOne(a) {
                key = a.spec || a;
                if (cache.has(key)) {
                    return cache.get(key);
                }
                result = func(a);
                cache.set(key, result);
                if (keylist.push(key) > climit) {
                    cache.delete(keylist.shift());
                }
                return result;
            };
        case 2:
            return function memoizeTwo(a, b) {
                args[0] = a;
                args[1] = b;
                key = JSON.stringify(args);
                args.length = 0;
                if (cache.has(key)) {
                    return cache.get(key);
                }
                const result = func(a, b);
                cache.set(key, result);
                if (keylist.push(key) > climit) {
                    cache.delete(keylist.shift());
                }
                return result;
            };
        case 3:
            return function memoizeThree(a, b, c) {
                args[0] = a;
                args[1] = b;
                args[2] = c;
                key = JSON.stringify(args);
                args.length = 0;
                if (cache.has(key)) {
                    return cache.get(key);
                }
                const result = func(a, b, c);
                cache.set(key, result);
                if (keylist.push(key) > climit) {
                    cache.delete(keylist.shift());
                }
                return result;
            };
        case 4:
            return function memoizeFour(a, b, c, d) {
                args[0] = a;
                args[1] = b;
                args[2] = c;
                args[3] = d;
                key = JSON.stringify(args);
                args.length = 0;
                if (cache.has(key)) {
                    return cache.get(key);
                }
                const result = func(a, b, c, d);
                cache.set(key, result);
                if (keylist.push(key) > climit) {
                    cache.delete(keylist.shift());
                }
                return result;
            };
        default:
            return function (...args) {
                const key = JSON.stringify(args);
                if (cache.has(key)) {
                    return cache.get(key);
                }
                const result = func(...args);
                cache.set(key, result);
                if (keylist.push(key) > climit) {
                    cache.delete(keylist.shift());
                }
                return result;
            };
    }
}
exports.memoize = memoize;
exports.identity = memoize(function (o) {
    return o;
});


/***/ }),

/***/ "./lib/objectoverlay.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOverlay = exports.overlay = void 0;
// License: MIT
const browser_1 = __webpack_require__("./lib/browser.ts");
function toJSON(overlay, object) {
    const result = {};
    for (const key of Object.keys(overlay)) {
        const val = overlay[key];
        if (val !== object[val]) {
            result[key] = val;
        }
    }
    return result;
}
function isOverridden(overlay, object, name) {
    return name in overlay && name in object && overlay[name] !== object[name];
}
class Handler {
    constructor(base) {
        this.base = base;
    }
    "has"(target, name) {
        if (name === "toJSON") {
            return true;
        }
        if (name === "isOverridden") {
            return true;
        }
        return name in target || name in this.base;
    }
    "get"(target, name) {
        if (name === "toJSON") {
            return toJSON.bind(null, target, this.base);
        }
        if (name === "isOverridden") {
            return isOverridden.bind(null, target, this.base);
        }
        if (name === "reset") {
            return () => {
                Object.keys(target).forEach(k => delete target[k]);
            };
        }
        if (name in target) {
            return target[name];
        }
        if (name in this.base) {
            return this.base[name];
        }
        return null;
    }
    getOwnPropertyDescriptor(target, name) {
        let res = Object.getOwnPropertyDescriptor(target, name);
        if (!res) {
            res = Object.getOwnPropertyDescriptor(this.base, name);
        }
        if (res) {
            res.enumerable = res.writable = res.configurable = true;
        }
        return res;
    }
    "set"(target, name, value) {
        target[name] = value;
        return true;
    }
    ownKeys(target) {
        const result = Object.keys(target);
        result.push(...Object.keys(this.base));
        return Array.from(new Set(result));
    }
}
function overlay(top) {
    return new Proxy(top, new Handler(this));
}
exports.overlay = overlay;
async function loadOverlay(storageKey, sync, defaults) {
    const bottom = Object.freeze(defaults);
    const top = await browser_1.storage[sync ? "sync" : "local"].get(storageKey);
    return overlay.call(bottom, top[storageKey] || {});
}
exports.loadOverlay = loadOverlay;
Object.defineProperty(Object.prototype, "overlay", {
    value: overlay
});
Object.defineProperty(Object, "loadOverlay", {
    value: loadOverlay
});


/***/ }),

/***/ "./lib/prefs.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefWatcher = exports.Prefs = void 0;
const tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
// License: MIT
const prefs_json_1 = tslib_1.__importDefault(__webpack_require__("./data/prefs.json"));
const events_1 = __webpack_require__("./lib/events.ts");
const objectoverlay_1 = __webpack_require__("./lib/objectoverlay.ts");
const browser_1 = __webpack_require__("./lib/browser.ts");
const PREFS = Symbol("PREFS");
const PREF_STORAGE = "prefs";
const TIMEOUT_SAVE = 100;
exports.Prefs = new class extends events_1.EventEmitter {
    constructor() {
        super();
        this.save = this.save.bind(this);
        this[PREFS] = objectoverlay_1.loadOverlay(PREF_STORAGE, false, prefs_json_1.default).then(r => {
            browser_1.storage.onChanged.addListener((changes, area) => {
                if (area !== "local" || !("prefs" in changes)) {
                    return;
                }
                for (const [k, v] of Object.entries(changes.prefs.newValue)) {
                    if (JSON.stringify(r[k]) === JSON.stringify(v)) {
                        continue;
                    }
                    r[k] = v;
                    this.scheduleSave();
                    this.emit(k, this, k, v);
                }
            });
            return this[PREFS] = r;
        }).catch(ex => {
            console.error("Failed to load prefs", ex.toString(), ex.stack);
            this[PREFS] = null;
            throw ex;
        });
    }
    async "get"(key, defaultValue) {
        const prefs = await this[PREFS];
        return prefs[key] || defaultValue;
    }
    *[Symbol.iterator]() {
        yield* Object.keys(this[PREFS]);
    }
    async "set"(key, value) {
        if (typeof key === "undefined" || typeof value === "undefined") {
            throw Error("Tried to set undefined to a pref, probably a bug");
        }
        const prefs = await this[PREFS];
        prefs[key] = value;
        this.scheduleSave();
        this.emit(key, this, key, value);
    }
    async reset(key) {
        if (typeof key === "undefined") {
            throw Error("Tried to set undefined to a pref, probably a bug");
        }
        const prefs = await this[PREFS];
        delete prefs[key];
        this.scheduleSave();
        this.emit(key, this, key, prefs[key]);
    }
    scheduleSave() {
        if (this.scheduled) {
            return;
        }
        this.scheduled = setTimeout(this.save, TIMEOUT_SAVE);
    }
    async save() {
        this.scheduled = 0;
        const prefs = (await this[PREFS]).toJSON();
        await browser_1.storage.local.set({ prefs });
    }
}();
class PrefWatcher {
    constructor(name, defaultValue) {
        this.name = name;
        this.value = defaultValue;
        this.changed = this.changed.bind(this);
        exports.Prefs.on(name, this.changed);
        exports.Prefs.get(name, defaultValue).then(val => this.changed(exports.Prefs, name, val));
    }
    changed(prefs, key, value) {
        this.value = value;
    }
}
exports.PrefWatcher = PrefWatcher;


/***/ }),

/***/ "./lib/sorting.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sorted = exports.sort = exports.arrayCompare = exports.naturalCaseCompare = exports.naturalCompare = exports.defaultCompare = void 0;
// License: MIT
const RE_TOKENIZE = /(0x[0-9a-f]+|[+-]?[0-9]+(?:\.[0-9]*(?:e[+-]?[0-9]+)?)?|\d+)/i;
const RE_HEX = /^0x[0-9a-z]+$/i;
const RE_TRIMMORE = /\s+/g;
/**
 * Compare two values using the usual less-than-greater-than rules
 * @param {*} a First value
 * @param {*} b Second value
 * @returns {number} Comparision result
 */
function defaultCompare(a, b) {
    return a < b ? -1 : (a > b ? 1 : 0);
}
exports.defaultCompare = defaultCompare;
function parseToken(chunk) {
    chunk = chunk.replace(RE_TRIMMORE, " ").trim();
    if (RE_HEX.test(chunk)) {
        return parseInt(chunk.slice(2), 16);
    }
    const val = parseFloat(chunk);
    return Number.isNaN(val) ? chunk : val;
}
function filterTokens(str) {
    return str && str.trim();
}
function tokenize(val) {
    if (typeof val === "number") {
        return [[`${val}`], [val]];
    }
    const tokens = `${val}`.split(RE_TOKENIZE).filter(filterTokens);
    const numeric = tokens.map(parseToken);
    return [tokens, numeric];
}
/**
 * Natural Sort algorithm for es6
 * @param {*} a First term
 * @param {*} b Second term
 * @returns {Number} Comparison result
 */
function naturalCompare(a, b) {
    const [xTokens, xNumeric] = tokenize(a);
    const [yTokens, yNumeric] = tokenize(b);
    // natural sorting through split numeric strings and default strings
    const { length: xTokenLen } = xTokens;
    const { length: yTokenLen } = yTokens;
    const maxLen = Math.min(xTokenLen, yTokenLen);
    for (let i = 0; i < maxLen; ++i) {
        // find floats not starting with '0', string or 0 if not defined
        const xnum = xNumeric[i];
        const ynum = yNumeric[i];
        const xtype = typeof xnum;
        const xisnum = xtype === "number";
        const ytype = typeof ynum;
        const sameType = xtype === ytype;
        if (!sameType) {
            // Proper numbers go first.
            // We already checked sameType above, so we know only one is a number.
            return xisnum ? -1 : 1;
        }
        // sametype follows...
        if (xisnum) {
            // both are numbers
            // Compare the numbers and if they are the same, the tokens too
            const res = defaultCompare(xnum, ynum) ||
                defaultCompare(xTokens[i], yTokens[i]);
            if (!res) {
                continue;
            }
            return res;
        }
        // both must be stringey
        // Compare the actual tokens.
        const res = defaultCompare(xTokens[i], yTokens[i]);
        if (!res) {
            continue;
        }
        return res;
    }
    return defaultCompare(xTokenLen, yTokenLen);
}
exports.naturalCompare = naturalCompare;
/**
 * Natural Sort algorithm for es6, case-insensitive version
 * @param {*} a First term
 * @param {*} b Second term
 * @returns {Number} Comparison result
 */
function naturalCaseCompare(a, b) {
    return naturalCompare(`${a}`.toUpperCase(), `${b}`.toUpperCase());
}
exports.naturalCaseCompare = naturalCaseCompare;
/**
 * Array-enabled compare: If both operands are an array, compare individual
 * elements up to the length of the smaller array. If all elements match,
 * consider the array with fewer items smaller
 * @param {*} a First item to compare (either PoD or Array)
 * @param {*} b Second item to compare (either PoD or Array)
 * @param {cmpf} [cmp] Compare function or default_compare
 * @returns {number} Comparison result
 */
function arrayCompare(a, b, cmp) {
    cmp = cmp || defaultCompare;
    if (Array.isArray(a) && Array.isArray(b)) {
        const { length: alen } = a;
        const { length: blen } = b;
        const len = Math.min(alen, blen);
        for (let i = 0; i < len; ++i) {
            const rv = arrayCompare(a[i], b[i], cmp);
            if (rv) {
                return rv;
            }
        }
        return defaultCompare(alen, blen);
    }
    return cmp(a, b);
}
exports.arrayCompare = arrayCompare;
function mappedCompare(fn, a, b) {
    const { key: ka } = a;
    const { key: kb } = b;
    return arrayCompare(ka, kb, fn) ||
        /* stable */ defaultCompare(a.index, b.index);
}
/**
 * Tranform a given value into a key for sorting. Keys can be either PoDs or
 * an array of PoDs.
 * @callback keyfn
 * @param {*} item Array item to map
 * @returns {*} Key for sorting
 */
/**
 * Compare to items with each other, returning <0, 0, >0.
 * @callback cmpfn
 * @param {*} item Array item to map
 * @returns {number} Comparision result
 */
/**
 * Sort an array by a given key function and comparision function.
 * This sort is stable, but and in-situ
 * @param {*[]} arr Array to be sorted
 * @param {keyfn} [key] How to make keys. If ommitted, use value as key.
 * @param {cmpfn} [cmp] How to compare keys. If omitted, use default cmp.
 * @returns {*[]} New sorted array
 */
function sort(arr, key, cmp) {
    cmp = cmp || defaultCompare;
    const carr = arr;
    if (key) {
        arr.forEach((value, index) => {
            carr[index] = { value, key: key(value), index };
        });
    }
    else {
        arr.forEach((value, index) => {
            carr[index] = { value, key: value, index };
        });
    }
    arr.sort(mappedCompare.bind(null, cmp));
    carr.forEach((i, idx) => {
        arr[idx] = i.value;
    });
    return arr;
}
exports.sort = sort;
/**
 * Sort an array by a given key function and comparision function.
 * This sort is stable, but NOT in-situ, it will rather leave the
 * original array untoched and return a sorted copy.
 * @param {*[]} arr Array to be sorted
 * @param {keyfn} [key] How to make keys. If ommitted, use value as key.
 * @param {cmpfn} [cmp] How to compare keys. If omitted, use default cmp.
 * @returns {*[]} New sorted array
 */
function sorted(arr, key, cmp) {
    cmp = cmp || defaultCompare;
    let carr;
    if (key) {
        carr = arr.map((value, index) => {
            return { value, key: key(value), index };
        });
    }
    else {
        carr = arr.map((value, index) => {
            return { value, key: value, index };
        });
    }
    carr.sort(mappedCompare.bind(null, cmp));
    return carr.map(v => v.value);
}
exports.sorted = sorted;


/***/ }),

/***/ "./node_modules/localforage/dist/localforage.js":
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb || !idb.open) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support
        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
        // Safari 10.1 shipped with fetch, we can use that to detect it.
        // Note: this creates issues with `window.fetch` polyfills and
        // overrides; see:
        // https://github.com/localForage/localForage/issues/856
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            var db = openreq.result;
            db.onversionchange = function (e) {
                // Triggered when the database is modified (e.g. adding an objectStore) or
                // deleted (even when initiated by other sessions in different tabs).
                // Closing the connection here prevents those operations from being blocked.
                // If the database is accessed again later by this instance, the connection
                // will be reopened or the database recreated as needed.
                e.target.close();
            };
            resolve(db);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback returns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(req.error);
                    };

                    req.onblocked = function () {
                        // Closing all open connections in onversionchange handler should prevent this situation, but if
                        // we do get here, it just means the request remains pending - eventually it will succeed or error
                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./node_modules/webextension-polyfill/dist/browser-polyfill.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (module) {
  /* webextension-polyfill - v0.5.0 - Thu Sep 26 2019 22:22:26 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)";

    // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.
    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }

      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */
      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }
      }

      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */
      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };

      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.rejection
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function}
       *        The generated callback function.
       */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(extensionAPIs.runtime.lastError);
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";

      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */
      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({ resolve, reject }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);

                target[name](...args);

                // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.
                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;

                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({ resolve, reject }, metadata));
            }
          });
        };
      };

      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */
      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }
        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */
      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.

              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,
                get() {
                  return target[prop];
                },
                set(value) {
                  target[prop] = value;
                }
              });

              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }
            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }
        };

        // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.
        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };

      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */
      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }
      });

      // Keep track if the deprecation warning has been logged at least once.
      let loggedSendResponseDeprecationWarning = false;

      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */
        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;

          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }
              didCallSendResponse = true;
              resolve(response);
            };
          });

          let result;
          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result);

          // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.
          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          }

          // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).
          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;
              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          };

          // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.
          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          }

          // Let Chrome know that the listener is replying.
          return true;
        };
      });

      const wrappedSendMessageCallback = ({ reject, resolve }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(extensionAPIs.runtime.lastError);
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, { resolve, reject });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", { minArgs: 1, maxArgs: 3 })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", { minArgs: 2, maxArgs: 3 })
        }
      };
      const settingMetadata = {
        clear: { minArgs: 1, maxArgs: 1 },
        get: { minArgs: 1, maxArgs: 1 },
        set: { minArgs: 1, maxArgs: 1 }
      };
      apiMetadata.privacy = {
        network: {
          networkPredictionEnabled: settingMetadata,
          webRTCIPHandlingPolicy: settingMetadata
        },
        services: {
          passwordSavingEnabled: settingMetadata
        },
        websites: {
          hyperlinkAuditingEnabled: settingMetadata,
          referrersEnabled: settingMetadata
        }
      };

      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
      throw new Error("This script should only be loaded in a browser extension.");
    }

    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ }),

/***/ "./uikit/lib/events.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
// License: MIT
const EventKeys = Symbol();
/**
 * Yis, yet another event emitter implementation!
 */
class EventEmitter {
    constructor() {
        this[EventKeys] = new Map();
    }
    /**
     * Listen to events.
     *
     * @param {string} event
     *   Event type to which to listen.
     * @param {function(...args)} cb
     *   Your callback to execute when an event is emitted. Should return a
     *   boolean-ey value some emitters can use to determine if the event was
     *   handled and act accordingly.
     */
    on(event, cb) {
        let handlers = this[EventKeys].get(event);
        if (!handlers) {
            this[EventKeys].set(event, handlers = new Set());
        }
        handlers.add(cb);
    }
    /**
     * Remove your listener again
     *
     * @param {string} event
     *   Event type to which to not listen anymore.
     * @param {function(...args)} cb
     *   Your callback as you previously registered with the emitter.
     */
    off(event, cb) {
        const keys = this[EventKeys];
        const handlers = keys.get(event);
        if (!handlers) {
            return;
        }
        handlers.delete(cb);
        if (!handlers.size) {
            keys.delete(event);
        }
    }
    /**
     * Listen to an event, but only once, next time it is fired.
     * @see EventEmitter.on
     *
     * @param {string} event
     *   Event type to which to listen once.
     * @param {function(...args)} cb
     *   Your callback to execute when an event is emitted.
     */
    once(event, cb) {
        const wrapped = (...args) => {
            try {
                // eslint-disable-next-line prefer-spread
                return cb.apply(null, args);
            }
            finally {
                this.off(event, wrapped);
            }
        };
        this.on(event, wrapped);
    }
    /**
     * Check if some event has listeners.
     *
     * @param {string} event
     * @returns {boolean}
     */
    hasListeners(event) {
        return this[EventKeys].has(event);
    }
    /**
     * Emits an event, calling all registered listeners with the provided
     * arguments.
     *
     * @param {string} event
     *   Event type to emit.
     * @param {*} args
     *   Arguments to pass to listeners.
     *
     * @returns {boolean}
     *   Whether one or more listeners indicated they handled the event.
     */
    emit(event, ...args) {
        let handled = false;
        const handlers = this[EventKeys].get(event);
        if (!handlers) {
            return handled;
        }
        for (const e of Array.from(handlers)) {
            try {
                // eslint-disable-next-line prefer-spread
                handled = !!e.apply(null, args) || handled;
            }
            catch (ex) {
                console.error(`Event handler ${e} for ${event} failed`, ex.toString(), ex.stack, ex);
            }
        }
        return handled;
    }
    /**
     * Emits an event, but not just now.
     * @see EventEmitter.emit
     *
     * @param {string} event
     * @param {*} args
     */
    emitSoon(event, ...args) {
        setTimeout(() => this.emit(event, ...args));
    }
}
exports.EventEmitter = EventEmitter;


/***/ }),

/***/ "./windows/popup.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// License: MIT
const i18n_1 = __webpack_require__("./lib/i18n.ts");
__webpack_require__("./windows/theme.ts");
const runtime = typeof browser !== "undefined" ?
    browser.runtime :
    chrome.runtime;
function handler(e) {
    e.preventDefault();
    let target = e.target;
    if (!target) {
        return;
    }
    while (target) {
        const { action } = target.dataset;
        if (!action) {
            target = target.parentElement;
            continue;
        }
        runtime.sendMessage(action);
        close();
        return;
    }
}
addEventListener("DOMContentLoaded", () => {
    i18n_1.localize(document.documentElement);
    document.body.addEventListener("contextmenu", handler);
    document.body.addEventListener("click", handler);
});


/***/ }),

/***/ "./windows/theme.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable no-magic-numbers */

Object.defineProperty(exports, "__esModule", { value: true });
exports.THEME = void 0;
// License: MIT
const prefs_1 = __webpack_require__("./lib/prefs.ts");
const browser_1 = __webpack_require__("./lib/browser.ts");
const memoize_1 = __webpack_require__("./lib/memoize.ts");
const resolveColor = memoize_1.memoize(function (color) {
    try {
        const el = document.createElement("div");
        el.style.backgroundColor = color;
        el.style.display = "none";
        document.body.appendChild(el);
        try {
            const resolved = window.getComputedStyle(el, null).backgroundColor;
            return resolved;
        }
        finally {
            document.body.removeChild(el);
        }
    }
    catch {
        return undefined;
    }
}, 10, 1);
exports.THEME = new class Theme extends prefs_1.PrefWatcher {
    constructor() {
        super("theme", "default");
        if (browser_1.theme && browser_1.theme.onUpdated) {
            browser_1.theme.onUpdated.addListener(this.onThemeUpdated.bind(this));
            browser_1.theme.getCurrent().then((theme) => this.onThemeUpdated({ theme }));
        }
        this.themeDark = undefined;
        const query = window.matchMedia("(prefers-color-scheme: dark)");
        this.systemDark = query.matches;
        query.addListener(e => {
            this.systemDark = e.matches;
            this.recalculate();
        });
        this.recalculate();
    }
    get dark() {
        if (this.value === "dark") {
            return true;
        }
        if (this.value === "light") {
            return false;
        }
        if (typeof this.themeDark === "undefined") {
            return this.systemDark;
        }
        return this.themeDark;
    }
    changed(prefs, key, value) {
        const rv = super.changed(prefs, key, value);
        this.recalculate();
        return rv;
    }
    onThemeUpdated({ theme }) {
        try {
            if (!theme) {
                this.themeDark = undefined;
                return;
            }
            const { colors } = theme;
            if (!colors) {
                this.themeDark = undefined;
                return;
            }
            const color = resolveColor(colors.toolbar || colors.popup || colors.ntp_background);
            if (!color) {
                this.themeDark = undefined;
                return;
            }
            const pieces = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            if (!pieces) {
                this.themeDark = undefined;
                return;
            }
            const r = parseInt(pieces[1], 10);
            const g = parseInt(pieces[2], 10);
            const b = parseInt(pieces[3], 10);
            // HSP (Highly Sensitive Poo) equation from
            // http://alienryderflex.com/hsp.html
            const hsp = Math.sqrt(0.299 * (r * r) +
                0.587 * (g * g) +
                0.114 * (b * b));
            this.themeDark = hsp < 128;
        }
        finally {
            this.recalculate();
        }
    }
    recalculate() {
        document.documentElement.classList[this.dark ? "add" : "remove"]("dark");
    }
}();


/***/ })

/******/ });
//# sourceMappingURL=content-popup.js.map