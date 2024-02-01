// ==UserScript==
// @name         Boo.World Image Lightbox
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  boo app image lightboox modal window
// @author       orknist
// @match        https://boo.world/*/match
// @match        https://boo.world/*/soul/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    console.log('Boo.World Image Lightbox Loaded');
    'use strict';

    const featherlightScript = document.createElement('script');
    featherlightScript.src = '//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.js';
    document.head.appendChild(featherlightScript);

    const featherlightStyles = document.createElement('link');
    featherlightStyles.rel = 'stylesheet';
    featherlightStyles.href = 'https://cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.css';
    document.head.appendChild(featherlightStyles);

    const customStyles = `
        .featherlight .featherlight-content {
            padding: 0px;
        }
    `;
    GM_addStyle(customStyles);

    const targetSelector = 'div.user-picture';
    function setfeatherLight($currentTargetElement) {
        var backgroundImage = $currentTargetElement.css('background-image');
        var backgroundImageUrl = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
        if (backgroundImageUrl && backgroundImageUrl[1]) {
            var imageUrl = backgroundImageUrl[1];
            $currentTargetElement.attr('data-featherlight', imageUrl);
        }
    }

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                var $targetElements = $(node).find(targetSelector);
                $targetElements.each(function(index, element) {
                    setfeatherLight($(this));
                });
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    $(targetSelector).each(function(index, element) {
        setfeatherLight($(this));
    });

})();
