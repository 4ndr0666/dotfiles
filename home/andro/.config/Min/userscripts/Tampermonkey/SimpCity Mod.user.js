// ==UserScript==
// @name         SimpCity Mod
// @namespace    c0d3m0nk3y
// @version      1.0
// @description  Clean up forum
// @author       c0d3m0nk3y
// @match        https://simpcity.su/*
// @match        https://simpcity.su/threads/*
// @icon         https://simpcity.su/data/assets/logo/simpcityIcon192.png
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

/*
run basic file server
http-server -p 8083
 */


const _tbaymodurl = 'http://localhost:8000/tbay/';

/** @param {jQuery} jq jQuery */
(function (jq) {
    'use strict';

    const _gearImage = 'data:image/png;base64,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';
    const _readBGColor = 'coral';
    const _priorityBGColor = '#7b452a';
    const _btnHighlightBGColor = '#7b452a';
    const _ignoreBGColor = 'black';
    const _MinRead4Annot = 3;
    const _log = 'TBayMod LOG: %s';
    const _err = 'TBayMod ERR: %s';

    const _settingsConf = {
        autoProgress: {
            type: 'boolean',
            label: 'Auto Progress',
            default: true
        },
        unmarkedOnly: {
            type: 'boolean',
            label: 'Only Show Unmarked',
            default: false
        },
        showIgnored: {
            type: 'boolean',
            label: 'Show Ignored',
            default: false
        },
        showMaybes: {
            type: 'boolean',
            label: 'Show Maybes',
            default: false
        },
        showPriority: {
            type: 'boolean',
            label: 'Show Priority',
            default: true
        },
        showMissing: {
            type: 'boolean',
            label: 'Show Missing',
            default: true
        }
    }

    let _settings = null;
    let _threads = null;
    let _isThreadPage = false;
    let _allRead = false;

    class Thread {
        constructor(element, id, href, labels, thumbimg, unread, latest) {
            this.element = element;
            this.id = id;
            this.href = href;
            this.labels = labels;
            this.thumbimg = thumbimg;
            this.unread = unread;
            this.latest = latest;
            this.data = {};
        }

        get missing() {
            return !(this.data.priority || this.data.maybe || this.data.ignore);
        }
    }


    function nextPage() {
        let href = jq('.pageNav-jump--next').attr('href');

        if (href) window.location = href;
    }

    function labelsToArray(labels) {
        return Object.keys(labels)
            .filter(k => !isNaN(k))
            .map(k => jq(labels[k]).html());
    }

    function getThreads() {
        let threads = [];

        for (let e of jq('.js-threadList > .structItem--thread')) {
            let t = jq(e);
            let unread = t.hasClass('is-unread');
            let a = t.find('.structItem-title a[class=""]');

            if (!a) {
                console.error(_err, 'title anchor');
                continue;
            }

            let href = a.attr('href');

            if (!href) {
                console.error(_err, 'title anchor href');
                continue;
            }

            let thumb = t.find('.structItem-cell--icon .DC_ThreadThumbnail_image');

            if (!thumb) {
                console.error(_err, 'thumb');
                continue;
            }

            let id = thumb.attr('href').replace(/^\/threads\/([^\/]+)\/?$/, '$1');

            if (!thumb) {
                console.error(_err, 'parse id');
                continue;
            }

            let labels = labelsToArray(t.find('.structItem-title .labelLink .label'));
            let thumbimg = thumb.find('img')
                .css('background-image')
                .replace(/url\("([^"]+)"\)/, '$1');
            let latest = t.find('.structItem-cell--latest time').data('time');

            threads.push(new Thread(t, id, href, labels, thumbimg, unread, latest));
        }

        return threads;
    }

    function apiCall(path, verb, data, to) {
        return new Promise((res, rej) => {
            jq.ajax({
                type: verb,
                url: _tbaymodurl + path,
                data: data ? JSON.stringify(data) : null,
                contentType: "application/json; charset=utf-8",
                success: (result, status, jqXHR) => res({result, status, jqXHR}),
                error: (jqXHR, status, error) => rej({error, status, jqXHR}),
                timeout: to
            });
        });
    }

    let _settingsPromise = null;

    function saveSettings() {
        if (_settingsPromise === null) {
            _settingsPromise = apiCall('settings/tbay', 'PUT', _settings);

            return _settingsPromise
                .then(_ => {
                    let a = '';
                })
                .catch(e => {
                    _settingsPromise = null;
                    alert('Settings save failed');
                    console.error(_err, 'Settings save failed');
                    console.error(e);
                })
                .finally(() => _settingsPromise = null);
        }
    }

    function getSettings() {
        return apiCall('settings/tbay', 'GET', null)
            .then(r => {
                _settings = r.result;
                for (let k of Object.keys(_settingsConf)) {
                    let conf = _settingsConf[k];

                    if (_settings[k] === undefined) _settings[k] = conf.default;
                }
            })
            .catch(e => {
                console.error(_err, 'API is dead');
                console.error(e);
                throw 'API is dead';
            });
    }

    function checkThreads(threads) {
        console.log(_log, `Calling checkThreads`);
        return apiCall('threads', 'POST', threads.map(t => t.id))
            .then(r => {
                if (typeof (r.result) === 'object') {
                    let resultKeys = Object.keys(r.result);

                    console.log(_log, `Got thread data. Found ${resultKeys.length} threads`);
                    for (let t of threads) {
                        for (let k of resultKeys) {
                            if (t.id === k) {
                                t.data = r.result[k];
                                t.data.priority = t.data.priority || false;
                                t.data.maybe = t.data.maybe || false;
                                t.data.ignore = t.data.ignore || false;
                                break;
                            }
                        }

                        if (!t.data) {
                            t.data = {
                                ignore: false,
                                priority: false,
                                maybe: false
                            };
                        }

                        t.data.href = t.href;
                        t.data.labels = t.labels;
                        t.data.thumbimg = t.thumbimg;
                        t.data.latest = t.latest;
                    }

                    _threads = threads;
                } else throw 'Bad result from checkThreads';
            })
            .catch(e => {
                console.error(_err, 'Failed to retrieve threads data');
                console.error(e.error);
            });
    }

    function ignorePage() {
        let payload = {};

        for (let t of _threads.filter(t => t.missing && !t.data.priority && !t.data.maybe && !t.data.ignore)) {
            t.data.ignore = true;
            payload[t.id] = t.data;
        }

        apiCall('threads/bulk', 'PUT', payload)
            .then(r => {
                console.log(_log, `Threads ignored: ${payload.length}`);
                applyMods(true);
            })
            .catch(e => {
                console.error(_err, 'Failed to set thread ignore data');
                console.error(e.error);
            });
    }

    function setIgnoreThread(thread) {
        thread.data.ignore = !thread.data.ignore;
        return apiCall('threads?key=' + thread.id, 'PUT', thread.data)
            .then(r => {
                console.log(_log, `Thread ignore: ${thread.data.ignore} ${thread.id}`);
                if (!_isThreadPage) applyModsToThread(thread);
            })
            .catch(e => {
                console.error(_err, 'Failed to set thread ignore data');
                console.error(e.error);
            });
    }

    function setPriorityThread(thread) {
        thread.data.priority = !thread.data.priority;
        return apiCall('threads?key=' + thread.id, 'PUT', thread.data)
            .then(r => {
                console.log(_log, `Thread priority: ${thread.data.priority} ${thread.id}`);
                if (!_isThreadPage) applyModsToThread(thread);
            })
            .catch(e => {
                console.error(_err, 'Failed to set thread priority data');
                console.error(e.error);
            });
    }

    function setMaybeThread(thread) {
        thread.data.maybe = !thread.data.maybe;
        return apiCall('threads?key=' + thread.id, 'PUT', thread.data)
            .then(r => {
                console.log(_log, `Thread priority: ${thread.data.maybe} ${thread.id}`);
                if (!_isThreadPage) applyModsToThread(thread);
            })
            .catch(e => {
                console.error(_err, 'Failed to set thread priority data');
                console.error(e.error);
            });
    }

    function applyIgnore(t) {
        t.element.find('.tbm-priority').hide();
        t.element.find('.tbm-maybe').hide();
        t.element.find('.tbm-ignore').show();
        t.element.css({
            'background-color': _ignoreBGColor
        });
        if (_settings.showIgnored && !_settings.unmarkedOnly) t.element.show();
        else t.element.hide();
    }

    function applyPriority(t) {
        t.element.find('.tbm-priority').show();
        t.element.find('.tbm-maybe').hide();
        t.element.find('.tbm-ignore').hide();
        t.element.css({
            'background-color': _priorityBGColor
        });
        if (_settings.showPriority && !_settings.unmarkedOnly) t.element.show();
        else t.element.hide();
    }

    function applyMaybe(t) {
        t.element.find('.tbm-priority').hide();
        t.element.find('.tbm-maybe').show();
        t.element.find('.tbm-ignore').hide();
        t.element.css({
            'background-color': ''
        });
        if (_settings.showMaybes && !_settings.unmarkedOnly) t.element.show();
        else t.element.hide();
    }

    function applyMissing(t) {
        t.element.find('.tbm-priority').show();
        t.element.find('.tbm-maybe').show();
        t.element.find('.tbm-ignore').show();
        if (_settings.unmarkedOnly || _settings.showMissing) t.element.show();
        else t.element.hide();
    }

    function applyRead(t) {
        t.element.css({
            'border-top-width': '15px',
            "border-top-color": _readBGColor
        });
    }

    function applyModsToThread(t) {
        if (t.missing) applyMissing(t);
        else if (t.data.ignore) applyIgnore(t);
        else if (t.data.priority) applyPriority(t);
        else if (t.data.maybe) applyMaybe(t);
    }

    function applyMods(skipAutoProgress) {
        for (let t of _threads) {
            applyModsToThread(t);
        }
        let lastRead = null;
        let totalRead = 0;

        for (let i = _threads.length - 1; i >= 0; i--) {
            let t = _threads[i];

            if (!t.data.ignore) {
                if (t.unread) break;
                else {
                    lastRead = t;
                    totalRead++;
                }
            }
        }

        if (totalRead >= _MinRead4Annot) applyRead(lastRead);

        updateStats();

        if (skipAutoProgress !== true && _settings.autoProgress) {
            //let goNext = _threads.filter(t => t.unread && t.element.is(':visible')).length === 0 && !_allRead;
            let goNext = _threads.filter(t => t.element.is(':visible')).length === 0 && !_allRead;

            if (goNext && window.location.href.match(/page\-\d+($|\?)/)) {
                nextPage();
                return;
            }
        }
    }

    function batchOpen(urls) {
        console.log(_log, `Opening ${urls.length} tabs`);
        const bs = 5;
        const toi = 100;
        const runBatch = b => {
            for (let u of b) {
                window.open(u, '_blank');
            }
        }
        let to = 50;
        let b = [];

        for (let i = 0; i < urls.length; i++) {
            b.push(urls[i]);

            if (b.length === bs) {
                let bc = [...b];

                setTimeout(_ => runBatch(bc), to);
                to += toi;
                b = [];
            }
        }

        if (b.length > 0) setTimeout(_ => runBatch(b), to);
    }

    function updateStats() {
        let stats = jq('.tbm-stats');
        let hidden = stats.find('#tbm-hidden');
        let hiddenCnt = (_settings.unmarkedOnly ? 'Hidden: ' : 'Ignored: ') + jq('.js-threadList > .structItem--thread').filter(':hidden').length;

        if (hidden.length === 0) stats.append(jq(`<span id="tbm-hidden" style="padding-left: 15px;">${hiddenCnt}</span>`));
        else hidden.html(hiddenCnt);

        if (_settings.unmarkedOnly) {
            let shown = stats.find('#tbm-shown');
            let shownCnt = `Shown: ${jq('.js-threadList > .structItem--thread').filter(':visible').length}`;

            if (shown.length === 0) stats.append(jq(`<span id="tbm-shown" style="padding-left: 15px;">${shownCnt}</span>`));
            else shown.html(shownCnt);
        } else {
            let unmarked = stats.find('#tbm-unmarked');
            let unmarkedCnt = `Unmarked: ${_threads.filter(t => t.missing).length}`;

            if (unmarked.length === 0) stats.append(jq(`<span id="tbm-shown" style="padding-left: 15px;">${unmarkedCnt}</span>`));
            else unmarked.html(unmarkedCnt);
        }

        let allRead = stats.find('#tbm-allread');

        if (allRead.length === 0 && _allRead) stats.append(jq(`<span id="tbm-allread" style="padding-left: 15px;">All Read</span>`));
        else if (allRead.length > 0 && ~_allRead) allRead.remove();
    }

    function addControls() {
        for (let t of _threads) {
            let actions = jq(`<div class="structItem-cell structItem-cell--meta"></div>`)

            t.element.append(actions);

            let ignore = jq(`<div class="tbm-ignore" style="cursor: pointer;margin-bottom: 5px;">Ignore</div>`)

            actions.append(ignore);
            ignore.on('click', _ => setIgnoreThread(t));

            let priority = jq(`<div class="tbm-priority" style="cursor: pointer;margin-bottom: 5px;">Priority</div>`)
            let maybe = jq(`<div class="tbm-maybe" style="cursor: pointer;">Maybe</div>`)

            actions.append(priority);
            actions.append(maybe);
            priority.on('click', _ => setPriorityThread(t));
            maybe.on('click', _ => setMaybeThread(t));
        }

        _allRead = _threads.filter(t => t.unread).length === 0;

        let alertsBtn = jq('.p-navgroup.p-account a.p-navgroup-link--alerts');
        let gearBtn = jq(`
<a class="p-navgroup-link u-ripple p-navgroup-link--iconic rippleButton" title="TBay Mods Settings">
    <image src="${_gearImage}" style="height: 18px;"/>
</a>`);

        let settingsPane = jq(_snippets.settings);
        let settingsList = settingsPane.find('ol');

        for (let k of Object.keys(_settingsConf)) {
            let conf = _settingsConf[k];
            let funcs = _settingsFuncs[conf.type];
            let li = jq(_snippets['setting_' + conf.type]);

            li.find('input').attr('id', 'tbm-' + k);
            li.find('.tbm-setting-label').html(conf.label);
            li.on('click', e => {
                if (_settingsPromise === null) {
                    funcs.onClick(e, k);
                    saveSettings()
                        .then(_ => applyMods(true));
                }
                e.stopPropagation();
            });
            settingsList.append(li);

            funcs.setValue(li, _settings[k]);
        }

        alertsBtn.after(gearBtn);
        jq('body').append(settingsPane);

        gearBtn.on('click', _ => {
            let pane = jq('#tbm-settings');

            if (pane.hasClass('is-active')) pane.removeClass('is-active');
            else pane.addClass('is-active');
        });

        let threadHeader = jq('.js-threadList').prev();
        let buttons = jq(`
<div class="block-outer" style="padding-top: 15px;">
    <div class="block-outer-main tbm-stats">

    </div>
    <div class="block-outer-opposite">
        <div class="buttonGroup">

        </div>
    </div>
</div>`);

        threadHeader.after(buttons);
        buttons = buttons.find('.buttonGroup');
        let ignoreAll = jq(`
<div class="button--link button rippleButton" style="cursor: pointer;">
    <span class="button-text">Ignore Unmarked</span>
</div>`);
        let openUnmarked = jq(`
<div class="button--link button rippleButton" style="cursor: pointer;">
    <span class="button-text">Open Unmarked</span>
</div>`);

        buttons.append(openUnmarked);
        buttons.append(ignoreAll);
        ignoreAll.on('click', _ => {
            ignorePage();
            if (_settings.unmarkedOnly && _settings.autoProgress) {
                setTimeout(nextPage, 2000);
            }
        });
        openUnmarked.on('click', _ => {
            batchOpen(
                _threads
                    .filter(t => t.missing)
                    .map(t => {
                        let href = t.href;

                        if (href.startsWith('/')) href = href.substring(1);

                        return `https://simpcity.su/${href}`;
                    }));
        });

        console.log(_log, 'added controls');
    }

    function threadPageConstructControls(thread) {
        let ignore = jq(`
<div class="button--link button rippleButton tbm-tp-ignore" style="cursor: pointer;">
    <span class="button-text">Ignore</span>
</div>`);
        let priority = jq(`
<div class="button--link button rippleButton tbm-tp-priority" style="cursor: pointer;">
    <span class="button-text">Priority</span>
</div>`);
        let maybe = jq(`
<div class="button--link button rippleButton tbm-tp-maybe" style="cursor: pointer;">
    <span class="button-text">Maybe</span>
</div>`);

        if (thread.data.ignore) ignore.css({'background-color': _btnHighlightBGColor});
        if (thread.data.priority) priority.css({'background-color': _btnHighlightBGColor});
        if (thread.data.maybe) maybe.css({'background-color': _btnHighlightBGColor});

        ignore.on('click', _ => {
            setIgnoreThread(thread)
                .then(_ => {
                    jq('.tbm-tp-ignore').css({'background-color': thread.data.ignore ? _btnHighlightBGColor : ''});
                });
        });
        priority.on('click', _ => {
            setPriorityThread(thread)
                .then(_ => {
                    jq('.tbm-tp-priority').css({'background-color': thread.data.priority ? _btnHighlightBGColor : ''});
                });
        });
        maybe.on('click', _ => {
            setMaybeThread(thread)
                .then(_ => {
                    jq('.tbm-tp-maybe').css({'background-color': thread.data.maybe ? _btnHighlightBGColor : ''});
                });
        });

        return {ignore, priority, maybe};
    }

    function threadPageAddControls(thread) {
        let buttons = jq('.block-outer-opposite .buttonGroup');
        let upper = threadPageConstructControls(thread);

        buttons.append(upper.priority);
        buttons.append(upper.maybe);
        buttons.append(upper.ignore);

        let lowerNav = jq('.block-outer--after .block-outer-main');
        let lowerBtnGroup;

        if (lowerNav.length > 0) {
            let lowerBtnGroup = jq('.block-outer--after .block-outer-main .block-outer-opposite');

            lowerBtnGroup.remove();
        } else {
            $('.block-container.lbContainer').after(`
<div class="block-outer block-outer--after">
    <div class="block-outer-main">

    </div>
</div>`);
            lowerNav = jq('.block-outer--after .block-outer-main');
        }


        lowerBtnGroup = jq(`
<div class="block-outer-opposite">
    <div class="buttonGroup">

    </div>
</div>`);
        let lower = threadPageConstructControls(thread);

        lowerNav.after(lowerBtnGroup);
        lowerBtnGroup = lowerBtnGroup.find('.buttonGroup');

        lowerBtnGroup.append(lower.priority);
        lowerBtnGroup.append(lower.maybe);
        lowerBtnGroup.append(lower.ignore);
        console.log(_log, 'added controls');
    }

    function threadPageGetData() {
        let id = window.location.href.replace(/^.*?\/threads\/([^\/]+)\/?.*?$/, '$1');

        return apiCall('threads', 'POST', [id])
            .then(r => {
                let res = r.result[id];

                if (res) {
                    res = {
                        id,
                        missing: false,
                        data: res
                    };
                } else {
                    res = {
                        id,
                        missing: true,
                        data: {
                            ignore: false,
                            priority: false,
                            maybe: false
                        }
                    };
                }

                res.data.href = window.location.href;
                res.data.labels = labelsToArray(jq('.labelLink .label'));

                return res;
            });
    }

    if (window.location.href.match(/simpcity.su\/forums\//)) {
        if (jq('.js-threadList > .structItem--thread').length > 0) {
            getSettings()
                .then(_ => checkThreads(getThreads()))
                .then(addControls)
                .then(applyMods)
                .catch(err => console.error(_err, 'Failed to mod'));
        } else console.error(_err, 'Page not loaded');
    } else if (window.location.href.match(/simpcity.su\/threads\//)) {
        _isThreadPage = true;
        if (jq('.block-outer-opposite .buttonGroup').length > 0) {
            getSettings()
                .then(threadPageGetData)
                .then(threadPageAddControls)
                .catch(err => console.error(_err, 'Failed to mod'));
        } else console.error(_err, 'Page not loaded');
    } else console.log(_log, 'Nothing to do on this page');

    let _snippets = {
        settings: `
<div id="tbm-settings" class="menu menu--structural menu--medium menu--potentialFixed menu--right" style="z-index: 500; left: 1064.13px; top: 152.467px;" tabindex="-1">
    <div class="menu-content">
        <h3 class="menu-header">TBay Mod Settings</h3>
        <div class="js-alertsMenuBody">
            <div class="menu-scroller">
                <ol class="listPlain">

                </ol>
            </div>
        </div>
    </div>
</div>`,
        setting_boolean: `
<li class="menu-row menu-row--separated menu-row--clickable inputChoices-choice">
    <div class="fauxBlockLink">
        <div class="contentRow">
            <div class="contentRow-figure"></div>
            <div class="contentRow-main contentRow-main--close">
                <label class="iconic">
                    <input type="checkbox" disabled>
                    <i aria-hidden="true"></i>
                    <span class="iconic-label tbm-setting-label tbm-click-handle" style="vertical-align: text-top;"></span>
                </label>
            </div>
        </div>
    </div>
</li>`
    }

    let _settingsFuncs = {
        boolean: {
            onClick: (e, k) => {
                let cb = jq(e.currentTarget).find('input');

                if (cb.prop('checked')) cb.prop('checked', false);
                else cb.prop('checked', true);

                _settings[k] = cb.prop('checked');
            },
            setValue: (li, val) => {
                let cb = li.find('input');

                if (val === true) cb.prop('checked', true);
                else cb.prop('checked', false);
            }
        }
    }
})(window.jQuery.noConflict(true));