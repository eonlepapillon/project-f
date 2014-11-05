;(function(window, undefined) {
  'use strict';

  var Walker = function(ctx, canvas, position){
      var x = position.x,
        y = position.y;

      this.step = function(){
        var direction = Math.floor(Math.random() * 4),
        screenH = canvas.height,
          screenW = canvas.width;

        switch(direction){
          case 0:
            x -= 2;

            if(x < 0){
              x = screenW;
            }

            break;
          case 1:
            x += 2;

            if(x >= screenW){
              x = 0;
            }

            break;
          case 2:
            y -= 2;

            if(y < 0){
              y = screenH;
            }

            break;
          case 3:
            y += 2;

            if(y >= screenH){
              y = 0;
            }

            break;
        }

      };

      function getRandomColor () {
        return 'rgba(' +
        Math.floor(Math.random() * 255) + ',' +
        Math.floor(Math.random() * 255) + ',' +
        Math.floor(Math.random() * 255) + ', 1)';
      }

      this.draw = function() {
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(x, y, 2, 2);
      };

      this.toString = function() {
        return 'Walker: start position: {' + position.x + ',' + position.y + '}, current position: {'+ x + ',' + y + '}';
      };
    };

  if(window.force){
    force().add('Walker', Walker);
  } else {
    console.error('force: can\'t find the force', window.force);
  }
})(window);
