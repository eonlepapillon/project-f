;(function(window, undefined){
  'use strict';

  var f,
    walkers;

  function setup (ctx, elm) {
    console.debug('setup', ctx);

    var Walker = force().get('Walker');

    console.log('Walker', Walker);

    walkers = [
        new Walker(ctx, elm, {
          x: elm.width / 4,
          y: elm.height / 4
        }),
        new Walker(ctx, elm, {
          x: (elm.width / 4) * 3,
          y: elm.height / 4
        }),
        new Walker(ctx, elm, {
          x: elm.width / 4,
          y: (elm.height / 4) * 3
        }),
        new Walker(ctx, elm, {
          x: (elm.width / 4) * 3,
          y: (elm.height / 4) * 3
        })
      ];
  }

  function draw (ctx) {
    console.debug('draw', ctx);

    walkers.forEach(function(w) {
      w.step();
      w.draw();
    });
  }

  f = force(setup, draw);

  f.start();

  window.addEventListener('click', function() {
    f.stop();
  });

})(window);
