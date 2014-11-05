;(function(window, undefined){
  'use strict';

  var library = {},
      requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  window.force = function (setupFn, drawFn) {
    var canvas = document.getElementById('force'),
      ctx = canvas.getContext('2d'),
      animationFrameId,
      pauzeLoop = false;

    /**
     * The animation loop
     */
    function loop () {
      if(pauzeLoop === false){
        console.debug('force: Start draw');

        drawFn(ctx, canvas);

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
     * Adds a thin to the library
     * @param  {String} name  Name of the thing
     * @param  {Object} thing The thing
     * @return {Undefined}
     */
    function addToLib (name, thing) {
      if(library[name]){
        console.error('force: name %s is allready in use', name);
        return;

      } else {
        console.info('force: added %s to the library', name);
        library[name] = thing;
      }
    }

    /**
     * Returns a thing from the library
     * @param  {String} name Name of the thing
     * @return {Undefined|Object}      The thing
     */
    function getFromLib (name) {
      if(!library[name]){
        console.warn('force: thing with name %s doesn\'t exist in library', name);
        return;

      } else {
        console.debug('force: returned %s from the library', name);
        return library[name];
      }
    }

    /**
     * Checks
     */
    if(typeof setupFn !== 'function' || typeof drawFn !== 'function'){
      console.info('force: Force need a setup and drawn function. Now you can only fill the library.');

      // Functions only to fill the library
      return {
        add: addToLib,
        get: getFromLib
      };
    }

    /**
     * init the Force
     */
    function init() {
      console.debug('force: Init');

      window.addEventListener('resize', resizeCanvas, false);

      resizeCanvas();
      setupFn(ctx, canvas);
    }

    init();

    return {
      start: start,
      stop: stop,
      pauze: pauze,
      library: {
        add: addToLib,
        get: getFromLib
      },
    };
  };
})(window);
