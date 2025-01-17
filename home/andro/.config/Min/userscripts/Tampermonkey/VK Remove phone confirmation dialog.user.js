// ==UserScript==
// @name         VK Remove phone confirmation dialog
// @version      0.3
// @description  Remove annoying phone confirmation dialog randomly blocking some VK pages (it has no close button anymore)
// @author       makise-homura
// @match        https://vk.com/*
// @grant        none
// ==/UserScript==

new MutationObserver((m) =>
{
    m.forEach(() =>
    {
        var e = document.querySelector('#react_rootCheckValidationPhone')
        if (e !== null)
        {
            e.parentElement.removeChild(e);
        }
    });
}).observe(document.body, {childList: true});

new MutationObserver((m) =>
{
    m.forEach(() =>
    {
        if (document.body.style.position == 'fixed')
        {
            document.body.style.position = '';
        }
    });
}).observe(document.body, {attributes: true, attributeFilter: ['style']});
