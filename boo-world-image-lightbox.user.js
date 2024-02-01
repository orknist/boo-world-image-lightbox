// ==UserScript==
// @name         Boo.World Image Lightbox
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  boo app image lightboox modal window
// @author       orknist
// @match        https://boo.world/*/match
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    console.log('Boo.World Image Lightbox Loaded');
    'use strict';

    var featherlightScript = document.createElement('script');
    featherlightScript.src = '//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.js';
    document.head.appendChild(featherlightScript);

    var featherlightStyles = document.createElement('link');
    featherlightStyles.rel = 'stylesheet';
    featherlightStyles.href = 'https://cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.css';
    document.head.appendChild(featherlightStyles);

    var customStyles = `
        .featherlight .featherlight-content {
            padding: 0px;
        }
    `;
    GM_addStyle(customStyles);

    var targetSelector = 'div.user-picture';
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                var $targetElements = $(node).find(targetSelector);
                $targetElements.each(function(index, element) {
                    var $currentTargetElement = $(this);
                    var backgroundImage = $currentTargetElement.css('background-image');
                    var backgroundImageUrl = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
                    if (backgroundImageUrl && backgroundImageUrl[1]) {
                        var imageUrl = backgroundImageUrl[1];
                        $currentTargetElement.attr('data-featherlight', imageUrl);
                    }
                });
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();
