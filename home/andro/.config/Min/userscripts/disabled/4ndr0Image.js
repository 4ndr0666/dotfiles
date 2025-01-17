// ==UserScript==
// @name Eza's Image Glutton for Min
// @match https://www.reddit.com/*
// @run-at document-start
// ==/UserScript==

// Redirects to high-res images on Reddit, skipping past descriptions and comments

// Logic for handling Reddit images
function handleRedditImages() {
    // Find all images on the page
    let images = document.querySelectorAll('img');
    images.forEach(img => {
        // Change the source of the image to its high-resolution version
        img.src = img.src.replace('preview', 'original');
    });
}

// Run the function to handle Reddit images
handleRedditImages();
