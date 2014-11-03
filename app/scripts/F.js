;(function(window, undefined){
  'use strict';

  window.force = function (setupFn, drawFn) {
    var canvas = document.getElementById('force'),
      ctx = canvas.getContext('2d'),
      requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame,
      animationFrameId,
      pauzeLoop = false;

      window.addEventListener('resize', resizeCanvas, false);

    // checks
    if(typeof setupFn !== 'function' || typeof drawFn !== 'function'){
      console.error('force: Oops, need a setup and draw function.');
      return;
    }

    /**
     * The animation loop
     */
    function loop () {
      if(pauzeLoop === false){
        console.debug('force: Start draw');

        drawFn(ctx);

        console.debug('force: End draw');
      }

      animationFrameId = requestAnimationFrame(loop);
      console.debug('force: New animationFrameId', animationFrameId);
    }
    /**
     * Start the loop
     */
    function start () {
      if(animationFrameId === undefined){
        console.info('force: Start loop');
        animationFrameId = requestAnimationFrame(loop);
      }
    }

    /**
     * Stop the loop
     */
    function stop () {
      if(animationFrameId !== undefined){
        console.info('force: Stop loop', animationFrameId);
        cancelAnimationFrame(animationFrameId);

        // reset
        animationFrameId = undefined;
        pauzeLoop = false;
      }
    }

    /**
     * pauze the loop
     */
    function pauze () {
      console.info('force: Pauze loop', !pauzeLoop);
      pauzeLoop = !pauzeLoop;
    }

    function resizeCanvas() {
      var h = window.innerHeight,
        w = window.innerWidth;

      console.debug('force: resize canvas', h, w);

      canvas.width = w;
      canvas.height = h;
    }

    /**
     * init the Force
     */
    function init() {
      console.debug('force: Init');

      resizeCanvas();
      setupFn(ctx);
    }

    init();

    return {
      start: start,
      stop: stop,
      pauze: pauze
    };
  };
})(window);
