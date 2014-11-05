;(function(window, undefined) {
  'use strict';

  var Walker = function(ctx, canvas, position){
      var x = position.x,
        y = position.y;

      this.step = function(){
        var direction = Math.random(),
        screenH = canvas.height,
          screenW = canvas.width;

        if(direction < 0.4){
            x -= 2;

            if(x < 0){
              x = screenW;
            }
        } else if(direction < 0.7){
            x += 2;

            if(x >= screenW){
              x = 0;
            }
        } else if(direction < 0.9){
            y -= 2;

            if(y < 0){
              y = screenH;
            }
        } else {
            y += 2;

            if(y >= screenH){
              y = 0;
            }
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
