
  // Saves options to chrome.storage
function save_options() {
  var shortcuts = document.getElementById('shortcuts').checked;
  var settings = document.getElementById('settings').checked;
  var devtools = document.getElementById('devtools').checked;
  var about = document.getElementById('about').checked;
  var review = document.getElementById('review').checked;
  chrome.storage.sync.set({
    shortcuts: shortcuts,
    settings: settings,
    devtools: devtools,
    about: about,
    review: review
  })};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    shortcuts: true,
    settings: true,
    devtools: true,
    about: true,
    review: true
  }, function(items) {
    document.getElementById('shortcuts').checked = items.shortcuts;
    document.getElementById('settings').checked = items.settings;
    document.getElementById('devtools').checked = items.devtools;
    document.getElementById('about').checked = items.about;
    document.getElementById('review').checked = items.review;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('click', save_options);

