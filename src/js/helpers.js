// make it safe to use console.log always
export function consoleSafe() {
  (function (a) {
    function b() {
    }

    for (var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), d; !!(d = c.pop());) {
      a[d] = a[d] || b;
    }
  })
  (function () {
    try {
      console.log();
      return window.console;
    } catch (a) {
      return (window.console = {});
    }
  }());
}

// Debounce http://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

// jQuery Smooth Scroll Helper
export function smoothScrollTo($target){
  if ($target.length) {
    var scrollValue = $target.offset().top;
    $('html,body').animate({ scrollTop: scrollValue }, 1000);
    return false;
  }
}