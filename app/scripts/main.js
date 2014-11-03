;(function(window, undefined){
  'use strict';

  var isAnimating = false;

  function setup (ctx) {
    console.debug('setup', ctx);
  }

  function draw (ctx) {
    console.debug('draw', ctx);
  }

  var f = force(setup, draw);

  window.addEventListener('click', function() {
      if(isAnimating === true){
        f.stop();

      } else {
        f.start();
      }

    isAnimating = !isAnimating;
  });

})(window);
