// ==UserScript==
// @name        Enhanced YouTube Element Blocker
// @description Block specific elements of YouTube with a customizable interface
// @version     1.0
// @license     MIT
// @author      Enhanced by Assistant
// @match       *://*.youtube.com/*
// @run-at      document-end
// @grant       none
// ==/UserScript==

(function() {
  const settingsKey = 'ytElementBlockerSettings';
  let generalSettings = JSON.parse(localStorage.getItem(settingsKey)) || {
    hideFeed: false,
    hideGuideDrawer: false,
    hideRelated: false,
    hideChat: false,
    hideSidebar: false,
    hideMerch: false,
    hideComments: false,
    hideMasthead: false,
    hideSkipNavButton: false,
  };

  function saveSettings() {
    localStorage.setItem(settingsKey, JSON.stringify(generalSettings));
  }

  function createSettingsUI() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '10px';
    container.style.right = '10px';
    container.style.backgroundColor = 'white';
    container.style.border = '1px solid black';
    container.style.padding = '10px';
    container.style.zIndex = '10000';

    Object.keys(generalSettings).forEach(key => {
      const label = document.createElement('label');
      label.textContent = key;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = generalSettings[key];
      checkbox.onchange = () => {
        generalSettings[key] = checkbox.checked;
        saveSettings();
        applySettings();
      };
      label.appendChild(checkbox);
      container.appendChild(label);
      container.appendChild(document.createElement('br'));
    });

    document.body.appendChild(container);
  }

  function applySettings() {
    const cssRules = {
      hideFeed: '#feed, ytd-browse[page-subtype=home] { display: none !important; }',
      hideGuideDrawer: '#appbar-guide-menu, app-drawer#guide, ytd-mini-guide-renderer { display: none !important; }',
      hideRelated: '.ytp-endscreen-content, .ytp-ce-video { display: none !important; }',
      hideChat: 'ytd-live-chat-frame { display: none !important; }',
      hideSidebar: '#watch7-sidebar-contents, #related { display: none !important; }',
      hideMerch: '.ytd-merch-shelf-renderer { display: none !important; }',
      hideComments: '#watch-discussion, #comments { display: none !important; }',
      hideMasthead: '#container.ytd-masthead { display: none !important; }',
      hideSkipNavButton: '#skip-navigation.ytd-masthead { display: none !important; }',
    };

    const style = document.createElement('style');
    Object.keys(generalSettings).forEach(key => {
      if (generalSettings[key]) {
        style.textContent += cssRules[key] || '';
      }
    });

    const existingStyle = document.getElementById('ytElementBlockerStyle');
    if (existingStyle) {
      existingStyle.remove();
    }
    style.id = 'ytElementBlockerStyle';
    document.head.appendChild(style);
  }

  createSettingsUI();
  applySettings();
})();
