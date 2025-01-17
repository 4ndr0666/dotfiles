// ==UserScript==
// @name         hCaptcha Solver by noCaptchaAi BETA
// @name:ar      noCaptchaAI hCaptcha Solver حلال
// @name:ru      noCaptchaAI Решатель капчи hCaptcha
// @name:sh-CN   noCaptchaAI 验证码求解器
// @namespace    https://nocaptchaai.com
// @version      3.9.1
// @run-at       document-start
// @description  hCaptcha Solver automated Captcha Solver bypass Ai service. Free 6000 🔥solves/month! 50x⚡ faster than 2Captcha & others
// @description:ar تجاوز برنامج Captcha Solver الآلي لخدمة hCaptcha Solver خدمة Ai. 6000 🔥 حل / شهر مجاني! 50x⚡ أسرع من 2Captcha وغيرها
// @description:ru hCaptcha Solver автоматизирует решение Captcha Solver в обход сервиса Ai. Бесплатно 6000 🔥решений/месяц! В 50 раз⚡ быстрее, чем 2Captcha и другие
// @description:zh-CN hCaptcha Solver 自动绕过 Ai 服务的 Captcha Solver。 免费 6000 🔥解决/月！ 比 2Captcha 和其他人快 50x⚡
// @author       noCaptcha AI, Diego and Subcode
// @match        https://newassets.hcaptcha.com/captcha/*
// @match        https://www.google.com/recaptcha/api2/*
// @match        https://config.nocaptchaai.com/*
// @match        https://diegosawyer.github.io/hCaptchaSolver.user.js/popup.html
// @icon         https://avatars.githubusercontent.com/u/110127579
// @updateURL    https://github.com/noCaptchaAi/hCaptchaSolver.user.js/raw/main/hCaptchaSolverBeta.user.js
// @downloadURL  https://github.com/noCaptchaAi/hCaptchaSolver.user.js/raw/main/hCaptchaSolverBeta.user.js
// @grant        GM_addValueChangeListener
// @grant        GM_registerMenuCommand
// @grant        GM_listValues
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @license      MIT
// ==/UserScript==
const searchParams = new URLSearchParams(location.search);
const isWidget = /#frame=checkbox/.test(location.hash);
const sitekey = searchParams.get("k");
const isAnchor = sitekey && searchParams.has("ar");
const open = XMLHttpRequest.prototype.open;
const cfg = new config({
    APIKEY: "",
    PLAN: "free",
    DEBUG_LOGS: false,
    HCAPTCHA_LOOP: false,
    RECAPTCHA_LOOP: false,
    HCAPTCHA_AUTO_SOLVE: true,
    RECAPTCHA_AUTO_SOLVE: true,
    HCAPTCHA_CHECKBOX_AUTO_OPEN: true,
    RECAPTCHA_CHECKBOX_AUTO_OPEN: true,
});
const isApikeyEmpty = !cfg.get("APIKEY") || !cfg.get("PLAN");
let wait = 777; //temp

XMLHttpRequest.prototype.open = function() {
    this.addEventListener("load", async function() {
        if(isApikeyEmpty || this.responseType === "arraybuffer" || !this.responseText) {
            return;
        }

        try {
            const data = JSON.parse(this.responseText.replace(")]}\'\n", ""));
            if (this.responseURL.startsWith("https://hcaptcha.com/getcaptcha/") && cfg.get("HCAPTCHA_AUTO_SOLVE")) {
                const is = string => data.request_type.includes(string);
                const answers = data.requester_restricted_answer_set;
                const body = {
                    images: {},
                    target: data.requester_question.en,
                    type: is("multiple") ? "multi" : is("binary") ? "grid" : "bbox",
                    choices: is("multiple") ? Object.keys(answers).map(answer => answers[answer].en) : [],
                    method: "hcaptcha_base64",
                }
                for(let i = 0; i < data.tasklist.length; i++) {
                    body.images[i] = await getBase64FromUrl(data.tasklist[i].datapoint_uri);
                }
                const apidata = await solve(body);
                await (is("multiple") ? multiple : is("binary") ? binary : area)(apidata);
            } else if (this.responseURL.startsWith("https://www.google.com/recaptcha/api2/") && cfg.get("RECAPTCHA_AUTO_SOLVE")) {
                const type = data.at(5);
                const p = data.at(9);
                if (type === "audio") {
                    return audio("https://www.google.com/recaptcha/api2/payload/audio.mp3?p="+ p +"&k=" + sitekey);
                } else if (type === "imageselect" || type === "dynamic") {
                    const image = await getBase64FromUrl("https://www.google.com/recaptcha/api2/payload?p="+ p +"&k="+ sitekey)
                    const base = data.at(4).at(1);
                    return imageselect(image, 33, base.at(6), type === "dynamic", base.at(2))
                } else if(type === "multicaptcha" || type === "tileselect") {
                    return multicaptcha()
                } else if (type === "nocaptcha") {
                    return;
                }
            }
        } catch (e) {
            log(e);
            // console.error(this.responseText);
        }
    });
    open.apply(this, arguments);
}

addMenu("⚙️ Settings", cfg.open, !isApikeyEmpty);
addMenu(isApikeyEmpty ? "Login" : "📈 Dashboard/ 💰 Buy Plan / 👛 Balance info", "https://dash.nocaptchaai.com")
addMenu("🏠 HomePage", "https://nocaptchaai.com");
addMenu("📄 Api Docs", "https://docs.nocaptchaai.com/category/api-methods");
addMenu("❓ Discord", "https://discord.gg/E7FfzhZqzA");
addMenu("❓ Telegram", "https://t.me/noCaptchaAi");

if(isWidget || isAnchor) {
    log("loop running in bg", document.hasFocus());
    GM_addValueChangeListener("APIKEY", function(key, oldValue, newValue, remote) {
        log("The value of the '" + key + "' key has changed from '" + oldValue + "' to '" + newValue + "'");
        location = location.href;
    });
} else {
    if (searchParams.has("apikey") && searchParams.has("plan") && document.referrer === "https://dash.nocaptchaai.com/") {
        cfg.set("APIKEY", searchParams.get("apikey"));
        cfg.set("PLAN", searchParams.get("plan"));
        //jsNotif("noCaptchaAi.com \n Config Saved Successfully.");
        history.replaceState({}, document.title, "/");
    }
    window.addEventListener("load", function() {
        const inputs = document.querySelectorAll("input");
        for(const input of inputs) {
            const type = input.type === "checkbox" ? "checked" : "value";
            input[type] = cfg.get(input.id);
            input.addEventListener("change", function(e) {
                jsNotif("Your change has been saved");
                cfg.set(input.id, e.target[type])
            })
        }
    })
}

while(!(!navigator.onLine || isApikeyEmpty)) {
    await sleep(1000);

    if (cfg.get("HCAPTCHA_CHECKBOX_AUTO_OPEN") && isWidget) {
        if(isSolved() && !cfg.get("HCAPTCHA_LOOP")) {
            log("found solved");
            break;
        }
        fireMouseEvents(document.querySelector("#checkbox"))
    } else if (cfg.get("RECAPTCHA_CHECKBOX_AUTO_OPEN") && isAnchor) {
        if(isSolved() && !cfg.get("RECAPTCHA_LOOP")) {
            log("found solved");
            break;
        }
        fireMouseEvents(document.querySelector("#recaptcha-anchor"))
    }
}

function isSolved() {
    return document.querySelector("[role=checkbox]").ariaChecked === "true";
}
//hcaptcha
function hCaptcha() {} // todo
async function multiple(data, index = 0) {
    const image = document.querySelector(".image")?.style.backgroundImage.replace(/url\("|"\)/g, "");
    const answer = data.answer?.at(index);
    if (!answer) return;
    const element = [...document.querySelectorAll(".answer-text")].find(element => element.textContent === answer)
    await sleep(wait);
    fireMouseEvents(element);
    await sleep(wait);
    fireMouseEvents(document.querySelector(".button-submit"))
    await sleep(wait);
    multiple({ansswer: data.answer}, index + 1);
}
async function binary(data) {
    const solutions = data.solution;
    const solution = solutions.filter(index => index > 8);
    const cells = document.querySelectorAll(".task-image .image");
    for (const index of solutions) {
        await sleep(wait);
        fireMouseEvents(cells[index]);
    }
    const sent = random(700, 800);
    log((solutions.length * wait) + sent, sent);
    await sleep(sent);
    log("☑️ sent!");
    fireMouseEvents(document.querySelector(".button-submit"));
    if (solution[0] && solutions[0] !== solution[0]) {
        binary({ solution })
    }
}
async function area(data) {
    //     function clickOnCanvas(canvas, x, y) {
    //         const rect = canvas.getBoundingClientRect();
    //         const events = ["mouseover", "mousedown", "mouseup", "click"];
    //         const options = {
    //             clientX: x + rect.left,
    //             clientY: y + rect.top,
    //             bubbles: true
    //         };

    //         for (let i = 0; i < events.length; i++) {
    //             const event = new MouseEvent(events[i], options);
    //             canvas.dispatchEvent(event);
    //         }
    //     }


    //     const canvas = document.querySelector("canvas");
    //     const d = canvas.toDataURL("image/jpeg").split(";base64,")[1];
    //     log(d);
    //     canvas.addEventListener("mousedown", function (e) {
    //         const rect = canvas.getBoundingClientRect();
    //         const x = event.clientX - rect.left;
    //         const y = event.clientY - rect.top;
    //         log("x: " + x + " y: " + y, data.answer);
    //     });

    //     //512 , 512 //415x 340
    //     const [x, y] = data.answer;
    //     clickOnCanvas(canvas, x, y);
}

//recaptcha
function reCaptcha() {} // todo
async function multicaptcha() {
    const target = document.querySelector(".rc-imageselect-desc-no-canonical strong")?.textContent
    const cells = document.querySelectorAll(".rc-image-tile-wrapper img");
    const image = document.querySelector(".rc-image-tile-44")?.src;
    const data = await apiFetch({
        images:{
            0: await getBase64FromUrl(image)
        },
        target,
        type: "44",
        method: "recaptcha2",
    })
    if (data.solution.length == 0) {
        return submit()
    }
    for (const index of data.solution) {
        fireMouseEvents(cells[index]);
        await sleep(wait);
    }
    fireMouseEvents(document.querySelector("#recaptcha-verify-button"));
    await sleep(wait);
    return multicaptcha();
}
async function imageselect(image, type, target, isDynamic, min = 2) {
    const htmlTarget = document.querySelector(".rc-imageselect-desc-no-canonical strong")?.textContent;
    log(target, htmlTarget);
    const data = await apiFetch({
        images: {
            0: image
        },
        target: target || htmlTarget,
        type,
        method: "recaptcha2",
    });
    const cells = document.querySelectorAll(".rc-image-tile-wrapper");
    if (min <= data.solution.length) {
        return recapReload();
    }
    for (const index of data.solution) {
        fireMouseEvents(cells[index]);
        await sleep(wait);
    }
    if (isDynamic) {
        return split33(target, data.solution);
    }

}
function submit() {
    fireMouseEvents(document.querySelector("#recaptcha-verify-button"))
}
function recapReload() {
    fireMouseEvents(document.querySelector("#recaptcha-reload-button"));
}
async function split33(target, array) {
    if (array.length === 0) {
        return recapReload();;
    }
    while (document.querySelectorAll(".rc-image-tile-11, rc-imageselect-dynamic-selected").length < array.length) {
        await sleep(100);
    }

    let cells = document.querySelectorAll(".rc-image-tile-wrapper img");
    const images = {}
    for (const index of array) {
        images[index] = await getBase64FromUrl(cells[index].src)
    }
    const data = await apiFetch({
        images,
        target,
        type: "split_33",
        method: "recaptcha2",
    });
    if (data.solution.length == 0) {
        return submit();
    }

    for (const index of data.solution) {
        cells[index].click();
        await sleep(wait);
    }
    split33(target, data.solution)
}
async function audio(url) {
    const arrayBuffer = await fetch(url).then(response => response.arrayBuffer());
    const body = new FormData();
    body.append("audio", new Blob([arrayBuffer], { type: "audio/mp3" }), "audio.mp3");
    const data = await apiFetch(body, "audio")
    document.querySelector("#audio-response").value = data.solution;
}

// global
async function solve(body) {
    let data = await apiFetch(body);
    switch(data.status) {
        case "new":
            log("⏳ waiting a second");
            await sleep(1000);
            data = await apiFetch({}, "status?id=" + data.id, "GET")
            break;
        case "solved":
            break;
        case "skip":
            log("⚠️ Seems this a new challenge, please contact noCaptchaAi!");
            break;
        default:
            log("😨 Unknown status", data.status);
    }
    return data;
}
async function getBase64FromUrl(url) {
    const blob = await (await fetch(url)).blob();
    return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.addEventListener("loadend", function() {
            resolve(reader.result.replace(/^data:image\/(png|jpeg);base64,/, ""));
        });
        reader.addEventListener("error", function() {
            reject("❌ Failed to convert url to base64");
        });
    });
}
async function apiFetch(body, v = "solve", method = "POST") {
    //until free and pro are available
    const sub = body?.method === "recaptcha2" ? "beta" : cfg.get("PLAN");
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            apikey: cfg.get("APIKEY"),
            softid: "UserScript " + GM_info.script.version
        }
    }

    if (method !== "GET") {
        options.body = JSON.stringify(body)
    }
    const response = await fetch("https://" + sub + ".nocaptchaai.com/" + v, options)
    const data = await response.json();
    log(data);
    return data;
}
function addMenu(name, url, check = true) {
    if(!check) return;

    GM_registerMenuCommand(name, function() {
        const func = typeof url === "function" ? url : GM_openInTab
        func(url, {
            active: true,
            setParent: true
        });
    });
}
function fireMouseEvents(element) {
    if(!document.contains(element)) {
        return;
    }
    for (const eventName of ["mouseover", "mousedown", "mouseup", "click"]) {
        const eventObject = document.createEvent("MouseEvents"); //todo update
        eventObject.initEvent(eventName, true, false);
        element.dispatchEvent(eventObject);
    }
}
function config(data) {
    let openWin;

    function get(name) {
        return GM_getValue(name, "")
    }

    function set(name, value) {
        GM_setValue(name, value);
    }

    function open() {
        const windowFeatures = {
            location: "no",
            status: "no",
            left: window.screenX,
            top: window.screenY,
            width: 500,
            height: 500
        };

        const featuresArray = Object.keys(windowFeatures).map(key => key + "=" + windowFeatures[key]);
        //https://config.nocaptchaai.com/popup.html
        openWin = window.open("https://diegosawyer.github.io/hCaptchaSolver.user.js/popup.html", cfg.get("APIKEY") + "," + cfg.get("PLAN"), featuresArray.join(","));
        if (!openWin) {
            return alert("allow popup");
        }
        openWin.moveBy(Math.round((window.outerWidth - openWin.outerWidth) / 2), Math.round((window.outerHeight - openWin.outerHeight) / 2));
    }

    function close() {
        openWin?.close();
        openWin = undefined;
    }

    const storedKeys = GM_listValues();

    for(const name in data) {
        if (storedKeys.includes(name)) {
            set(name, get(name));
        } else if (data[name] !== undefined) {
            set(name, data[name]);
        } else {
            set(name, "");
        }
    }

    return { get, set, open, close };
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function log() {
    cfg.get("DEBUG_LOGS") && console.log.apply(this, arguments)
}
