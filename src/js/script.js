"use strict";

// Script by Chris Johnson
// http://chrisltd.com

import { consoleSafe } from "./helpers.js";

(function($) {

  consoleSafe();

  console.log('Hello World!');

  // Smooth scrolling
  $('a[href*=#]:not([href=#])').click(function() {
    console.log('smooth scroll!');
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      smoothScrollTo( target );
    }
  });

  // Toggle active
  $('[data-toggle-active]').click(function(event) {
    event.preventDefault();
    var $toggleTarget = $( $(this).data('toggle-active') );
    $toggleTarget.toggleClass('active');
  });

})(jQuery);
