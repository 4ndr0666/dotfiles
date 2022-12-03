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
/******/ 		5: 0
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
/******/ 	deferredModules.push(["./windows/prefs.ts",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./windows/prefs.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
// License: MIT
const i18n_1 = __webpack_require__("./lib/i18n.ts");
const prefs_1 = __webpack_require__("./lib/prefs.ts");
const util_1 = __webpack_require__("./lib/util.ts");
const filters_1 = __webpack_require__("./lib/filters.ts");
const limits_1 = __webpack_require__("./lib/manager/limits.ts");
// eslint-disable-next-line no-unused-vars
const modal_1 = tslib_1.__importDefault(__webpack_require__("./uikit/lib/modal.ts"));
const constants_1 = __webpack_require__("./lib/constants.ts");
const windowutils_1 = __webpack_require__("./lib/windowutils.ts");
const table_1 = __webpack_require__("./uikit/lib/table.ts");
const icons_1 = __webpack_require__("./windows/icons.ts");
const winutil_1 = __webpack_require__("./windows/winutil.ts");
const browser_1 = __webpack_require__("./lib/browser.ts");
__webpack_require__("./windows/theme.ts");
const ICON_BASE_SIZE = 16;
class UIPref extends prefs_1.PrefWatcher {
    constructor(id, pref) {
        super(pref);
        this.id = id;
        this.pref = pref;
        this.elem = winutil_1.$(`#${id}`);
        if (!this.elem) {
            throw new Error(`Invalid id: ${id}`);
        }
    }
    async save(value) {
        await prefs_1.Prefs.set(this.pref, value);
    }
}
class BoolPref extends UIPref {
    constructor(id, pref) {
        super(id, pref);
        this.elem.addEventListener("change", this.change.bind(this));
    }
    change() {
        this.save(!!this.elem.checked);
    }
    changed(prefs, key, value) {
        this.elem.checked = !!value;
        return super.changed(prefs, key, value);
    }
}
class IntPref extends UIPref {
    constructor(id, pref) {
        super(id, pref);
        this.elem.addEventListener("change", this.change.bind(this));
    }
    change() {
        if (!this.elem.checkValidity()) {
            return;
        }
        this.save(this.elem.value);
    }
    changed(prefs, key, value) {
        this.elem.value = value;
        return super.changed(prefs, key, value);
    }
}
class OptionPref extends UIPref {
    constructor(id, pref) {
        super(id, pref);
        this.options = Array.from(this.elem.querySelectorAll(`*[name='${id}']`));
        this.options.forEach(o => {
            o.addEventListener("change", () => this.change());
        });
    }
    change() {
        const opt = this.options.find(e => e.checked);
        if (opt && opt.value) {
            this.save(opt.value);
        }
    }
    changed(prefs, key, value) {
        const opt = this.options.find(e => e.value === value);
        if (opt) {
            opt.checked = true;
        }
        return super.changed(prefs, key, value);
    }
}
class CreateFilterDialog extends modal_1.default {
    getContent() {
        const rv = winutil_1.$("#create-filter-template").
            content.cloneNode(true);
        this.label = winutil_1.$("#filter-create-label", rv);
        this.expr = winutil_1.$("#filter-create-expr", rv);
        this.link = winutil_1.$("#filter-create-type-link", rv);
        this.media = winutil_1.$("#filter-create-type-media", rv);
        return rv;
    }
    get buttons() {
        return [
            {
                title: i18n_1._("create-filter"),
                value: "ok",
                default: true
            },
            {
                title: i18n_1._("cancel"),
                value: "cancel",
                dismiss: true
            }
        ];
    }
    shown() {
        this.label.focus();
    }
    done(b) {
        if (!b || !b.default) {
            return super.done(b);
        }
        const label = this.label.value.trim();
        const expr = this.expr.value.trim();
        let type = 0;
        if (this.link.checked) {
            type |= constants_1.TYPE_LINK;
        }
        if (this.media.checked) {
            type |= constants_1.TYPE_MEDIA;
        }
        let valid = true;
        if (!label) {
            valid = false;
            this.label.setCustomValidity(i18n_1._("cannot-be-empty"));
        }
        else {
            this.label.setCustomValidity("");
        }
        if (!expr) {
            valid = false;
            this.expr.setCustomValidity(i18n_1._("cannot-be-empty"));
        }
        else {
            this.expr.setCustomValidity("");
        }
        if (!type) {
            valid = false;
            this.link.setCustomValidity(i18n_1._("filter-at-least-one"));
            this.media.setCustomValidity(i18n_1._("filter-at-least-one"));
        }
        else {
            this.link.setCustomValidity("");
            this.media.setCustomValidity("");
        }
        if (!valid) {
            return undefined;
        }
        filters_1.filters().then(async (filters) => {
            await filters.create(label, expr, type);
        }).catch(console.error);
        return super.done(b);
    }
    async show() {
        await super.show();
    }
}
class FiltersUI extends table_1.VirtualTable {
    constructor() {
        super("#filters", null);
        this.filters = [];
        this.icons = new icons_1.Icons(winutil_1.$("#icons"));
        const filter = null;
        this.edit = {
            label: winutil_1.$("#filter-edit-label"),
            expr: winutil_1.$("#filter-edit-expr"),
            link: winutil_1.$("#filter-edit-type-link"),
            media: winutil_1.$("#filter-edit-type-media"),
            filter,
            row: filter,
        };
        this.edit.label.addEventListener("input", () => {
            if (!this.edit.filter) {
                return;
            }
            if (!this.edit.label.checkValidity() ||
                this.edit.label.value.length <= 0) {
                return;
            }
            this.edit.filter.label = this.edit.label.value;
            this.ignoreNext = true;
            this.saveFilter(this.edit.filter, this.edit.row);
        }, true);
        this.edit.expr.addEventListener("input", () => {
            if (!this.edit.filter) {
                return;
            }
            if (!this.edit.expr.checkValidity() || this.edit.expr.value.length <= 0) {
                return;
            }
            this.edit.filter.expr = this.edit.expr.value;
            this.ignoreNext = true;
            this.saveFilter(this.edit.filter, this.edit.row);
        }, true);
        const updateTypes = () => {
            if (!this.edit.filter) {
                return;
            }
            const link = this.edit.link.checked ? constants_1.TYPE_LINK : 0;
            const media = this.edit.media.checked ? constants_1.TYPE_MEDIA : 0;
            const type = link | media;
            if (!type) {
                return;
            }
            this.edit.filter.type = type;
            this.ignoreNext = true;
            this.saveFilter(this.edit.filter, this.edit.row);
        };
        this.edit.link.addEventListener("change", updateTypes);
        this.edit.media.addEventListener("change", updateTypes);
        this.on("selection-changed", () => {
            this.edit.filter = null;
            if (this.selection.empty) {
                this.resetEdits();
                return;
            }
            this.edit.row = this.selection.first;
            const f = this.edit.filter = this.filters[this.edit.row];
            if (!this.edit.filter) {
                this.resetEdits();
                return;
            }
            winutil_1.$("#filter-edit").classList.remove("hidden");
            this.edit.label.value = f.label;
            this.edit.expr.value = f.expr;
            this.edit.link.checked = !!(f.type & constants_1.TYPE_LINK);
            this.edit.media.checked = !!(f.type & constants_1.TYPE_MEDIA);
            if (this.edit.filter.custom) {
                winutil_1.$("#filter-delete").classList.remove("hidden");
                winutil_1.$("#filter-reset").classList.add("hidden");
            }
            else {
                winutil_1.$("#filter-delete").classList.add("hidden");
                winutil_1.$("#filter-reset").classList.remove("hidden");
            }
        });
        winutil_1.$("#filter-delete").addEventListener("click", () => {
            if (!this.edit.filter) {
                return;
            }
            this.edit.filter.delete().
                then(this.reload.bind(this)).
                catch(console.error);
        });
        winutil_1.$("#filter-reset").addEventListener("click", () => {
            if (!this.edit.filter) {
                return;
            }
            this.edit.filter.reset().
                then(this.reload.bind(this)).
                catch(console.error);
        });
        this.reload().catch(console.error);
        winutil_1.$("#filter-create-button").addEventListener("click", () => {
            new CreateFilterDialog().show().catch(console.error);
        });
        filters_1.filters().then(filters => {
            filters.on("changed", () => {
                this.reload().catch(console.error);
            });
        });
    }
    async reload() {
        if (this.ignoreNext) {
            return;
        }
        this.ignoreNext = false;
        this.resetEdits();
        this.filters = (await filters_1.filters()).all;
        this.init();
        this.invalidate();
    }
    resetEdits() {
        this.edit.label.value = "";
        this.edit.expr.value = "";
        this.edit.link.checked = false;
        this.edit.media.checked = false;
        winutil_1.$("#filter-delete").classList.add("hidden");
        winutil_1.$("#filter-reset").classList.add("hidden");
        winutil_1.$("#filter-edit").classList.add("hidden");
    }
    async saveFilter(filter, row) {
        try {
            this.invalidateRow(row);
            await filter.save();
        }
        catch (ex) {
            console.error(ex);
        }
    }
    get rowCount() {
        return this.filters.length;
    }
    getCellIcon(rowid, colid) {
        if (!colid) {
            const f = this.filters[rowid];
            if (!f) {
                return null;
            }
            const icon = windowutils_1.iconForPath(`file${f.icon ? `.${f.icon}` : ""}`, ICON_BASE_SIZE);
            return this.icons.get(icon);
        }
        return null;
    }
    getCellText(rowid, colid) {
        const f = this.filters[rowid];
        if (!f) {
            return null;
        }
        switch (colid) {
            case 0:
                return f.label;
            case 1:
                return f.expr;
            case 2:
                return [constants_1.TYPE_LINK, constants_1.TYPE_MEDIA].
                    map(t => f.type & t ? i18n_1._(`filter-type-${t === constants_1.TYPE_LINK ? "link" : "media"}`) : 0).
                    filter(e => e).
                    join(", ");
            default:
                return "";
        }
    }
}
class LimitsUI extends table_1.VirtualTable {
    constructor() {
        super("#limits", null);
        this.limits = [];
        limits_1.Limits.on("changed", () => {
            this.limits = Array.from(limits_1.Limits);
            this.invalidate();
            this.resetEdits();
        });
        limits_1.Limits.load().then(() => {
            this.limits = Array.from(limits_1.Limits);
            this.invalidate();
        });
        this.edit = {
            limit: null,
            domain: winutil_1.$("#limit-edit-domain"),
            conlimited: winutil_1.$("#limit-edit-concurrent-limited"),
            conunlimited: winutil_1.$("#limit-edit-concurrent-unlimited"),
            conlimit: winutil_1.$("#limit-edit-concurrent-limit"),
            save: winutil_1.$("#limit-save"),
            delete: winutil_1.$("#limit-delete"),
            row: -1,
        };
        this.on("selection-changed", () => {
            this.edit.limit = null;
            if (this.selection.empty) {
                this.resetEdits();
                return;
            }
            this.edit.row = this.selection.first;
            const l = this.edit.limit = this.limits[this.edit.row];
            if (!l) {
                this.resetEdits();
                return;
            }
            winutil_1.$("#limit-edit").classList.remove("hidden");
            this.edit.domain.value = l.domain;
            this.edit.domain.setAttribute("readonly", "readonly");
            if (l.concurrent <= 0) {
                this.edit.conunlimited.checked = true;
                this.edit.conlimit.value = "3";
            }
            else {
                this.edit.conlimited.checked = true;
                this.edit.conlimit.value = l.concurrent;
            }
            if (l.domain === "*") {
                this.edit.delete.classList.add("hidden");
            }
            else {
                this.edit.delete.classList.remove("hidden");
            }
        });
        winutil_1.$("#limit-create").addEventListener("click", () => {
            this.selection.clear();
            this.resetEdits();
            this.edit.delete.classList.add("hidden");
            winutil_1.$("#limit-edit").classList.remove("hidden");
            this.edit.domain.focus();
        });
        this.edit.save.addEventListener("click", () => {
            let domain;
            try {
                if (this.edit.domain.value !== "*") {
                    domain = util_1.hostToDomain(this.edit.domain.value);
                }
                else {
                    domain = "*";
                }
                if (!domain) {
                    this.edit.domain.setCustomValidity(i18n_1._("invalid-domain-pref"));
                    return;
                }
            }
            catch (ex) {
                console.error(ex.message, ex.stack, ex);
                this.edit.domain.setCustomValidity(i18n_1._("invalid-domain-pref"));
                this.edit.domain.setCustomValidity(ex.message || ex.toString());
                return;
            }
            if (this.edit.conlimited.checked && !this.edit.conlimit.checkValidity()) {
                return;
            }
            const concurrent = this.edit.conunlimited.checked ?
                -1 :
                parseInt(this.edit.conlimit.value, 10);
            limits_1.Limits.saveEntry(domain, {
                domain,
                concurrent
            });
        });
        this.edit.delete.addEventListener("click", () => {
            if (!this.edit.limit) {
                return;
            }
            limits_1.Limits.delete(this.edit.limit.domain);
        });
    }
    resetEdits() {
        this.edit.limit = null;
        this.edit.domain.removeAttribute("readonly");
        this.edit.domain.value = "";
        this.edit.domain.setCustomValidity("");
        this.edit.conunlimited.checked = true;
        this.edit.conlimit.value = "3";
        this.edit.delete.classList.add("hidden");
        winutil_1.$("#limit-edit").classList.add("hidden");
    }
    get rowCount() {
        return this.limits.length;
    }
    getCellText(rowid, colid) {
        const f = this.limits[rowid];
        if (!f) {
            return null;
        }
        switch (colid) {
            case 0:
                return f.domain;
            case 1:
                return f.concurrent <= 0 ? i18n_1._("unlimited") : f.concurrent;
            default:
                return "";
        }
    }
}
addEventListener("DOMContentLoaded", async () => {
    await i18n_1.localize(document.documentElement);
    // General
    new BoolPref("pref-manager-in-popup", "manager-in-popup");
    new BoolPref("pref-queue-notification", "queue-notification");
    new BoolPref("pref-finish-notification", "finish-notification");
    // XXX: #125
    const sounds = new BoolPref("pref-sounds", "sounds");
    if (browser_1.OPERA) {
        const sp = sounds.elem.parentElement;
        if (sp) {
            sp.style.display = "none";
        }
    }
    new BoolPref("pref-hide-context", "hide-context");
    new BoolPref("pref-tooltip", "tooltip");
    new BoolPref("pref-open-manager-on-queue", "open-manager-on-queue");
    new BoolPref("pref-text-links", "text-links");
    new BoolPref("pref-add-paused", "add-paused");
    new BoolPref("pref-show-urls", "show-urls");
    new BoolPref("pref-remove-missing-on-init", "remove-missing-on-init");
    new OptionPref("pref-button-type", "button-type");
    new OptionPref("pref-theme", "theme");
    new OptionPref("pref-conflict-action", "conflict-action");
    winutil_1.$("#reset-confirmations").addEventListener("click", async () => {
        for (const k of prefs_1.Prefs) {
            if (!k.startsWith("confirmations.")) {
                continue;
            }
            await prefs_1.Prefs.reset(k);
        }
        await modal_1.default.inform(i18n_1._("information.title"), i18n_1._("reset-confirmations.done"), i18n_1._("ok"));
    });
    winutil_1.$("#reset-layout").addEventListener("click", async () => {
        for (const k of prefs_1.Prefs) {
            if (!k.startsWith("tree-config-")) {
                continue;
            }
            await prefs_1.Prefs.reset(k);
        }
        for (const k of prefs_1.Prefs) {
            if (!k.startsWith("window-state-")) {
                continue;
            }
            await prefs_1.Prefs.reset(k);
        }
        await modal_1.default.inform(i18n_1._("information.title"), i18n_1._("reset-layouts.done"), i18n_1._("ok"));
    });
    const langs = winutil_1.$("#languages");
    const currentLang = i18n_1.getCurrentLanguage();
    for (const [code, lang] of i18n_1.ALL_LANGS.entries()) {
        const langEl = document.createElement("option");
        langEl.textContent = lang;
        langEl.value = code;
        if (code === currentLang) {
            langEl.selected = true;
        }
        langs.appendChild(langEl);
    }
    langs.addEventListener("change", async () => {
        await browser_1.storage.sync.set({ language: langs.value });
        if (langs.value === currentLang) {
            return;
        }
        // eslint-disable-next-line max-len
        if (confirm("Changing the selected translation requires restarting the extension.\nDo you want to restart the extension now?")) {
            browser_1.runtime.reload();
        }
    });
    // Filters
    windowutils_1.visible("#filters").then(() => new FiltersUI());
    // Network
    new IntPref("pref-concurrent-downloads", "concurrent");
    new IntPref("pref-retries", "retries");
    new IntPref("pref-retry-time", "retry-time");
    windowutils_1.visible("#limits").then(() => new LimitsUI());
    const customLocale = winutil_1.$("#customLocale");
    winutil_1.$("#loadCustomLocale").addEventListener("click", () => {
        customLocale.click();
    });
    winutil_1.$("#clearCustomLocale").
        addEventListener("click", async () => {
        await i18n_1.saveCustomLocale(undefined);
        browser_1.runtime.reload();
    });
    customLocale.addEventListener("change", async () => {
        if (!customLocale.files || !customLocale.files.length) {
            return;
        }
        const [file] = customLocale.files;
        if (!file || file.size > (5 << 20)) {
            return;
        }
        try {
            const text = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsText(file);
            });
            await i18n_1.saveCustomLocale(text);
            if (confirm("Imported your file.\nWant to reload the extension now?")) {
                browser_1.runtime.reload();
            }
        }
        catch (ex) {
            console.error(ex);
            alert(`Could not load your translation file:\n${ex.toString()}`);
        }
    });
});


/***/ }),

/***/ "crypto":
/***/ (function(module, exports) {

module.exports = crypto;

/***/ })

/******/ });
//# sourceMappingURL=prefs.js.map