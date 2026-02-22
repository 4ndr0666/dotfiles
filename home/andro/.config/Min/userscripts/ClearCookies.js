// ==UserScript==
// @name Clear History Context Menu
// @description Adds the !clearhistory command to the context menu in Min Browser
// @match http*://*
// @run-at context-menu
// ==/UserScript==

// Function to execute the !clearhistory command
function clearHistory() {
    window.location.href = 'min://run-command/!clearhistory';  // Simulates running the !clearhistory command
}

// Add an option to the context menu
document.addEventListener('contextmenu', function (event) {
    const clearHistoryOption = document.createElement('div');
    clearHistoryOption.textContent = "Clear History";
    clearHistoryOption.style.cssText = "position: fixed; top: " + event.clientY + "px; left: " + event.clientX + "px; background: #333; color: white; padding: 5px; border-radius: 3px; cursor: pointer; z-index: 9999;";
    
    // Trigger the clearHistory function on click
    clearHistoryOption.addEventListener('click', clearHistory);

    document.body.appendChild(clearHistoryOption);

    // Remove the option after clicking elsewhere
    document.addEventListener('click', function () {
        clearHistoryOption.remove();
    }, { once: true });
});
