(function() {

  var nodes = {
    body: $(document.body),
    robot: $('.js-robot'),
    program: $('.js-program'),
    controls: $('.js-controls'),
    loop: $('.js-loop')
  };

  var variables = {
    newLoop: []
  };

  var methods = {
    setEvents: function() {

      nodes.robot.on({
        click: function() {
          $(this).toggleClass('is-select');
        }
      });

      nodes.robot.on({
        click: function(event) {
          event.preventDefault();
          event.stopPropagation();
          var type = $(this).data('action');
          var newAction = '<div class="panel-program__action js-program-action" data-action="' + type + '"></div>';
          nodes.program.find('.js-program-actions').append(newAction);
        }
      }, '.js-robot-action');

      nodes.program.on({
        click: function() {
          if ($(this).parents('.js-program-loop').length) {
            return;
          }
          $(this).toggleClass('is-loopy');
          methods.openLoopControl();
          variables.newLoop.push($(this).removeClass('is-loop'));
        }
      }, '.js-program-action');

      nodes.loop.on({
        click: function() {
          var newLoop;
          var loopyEl    = nodes.program.find('.js-program-action.is-loopy');
          var loopyFirst = loopyEl.first();
          var loopSteps  = nodes.controls.find('.js-loop-slider-element.is-active').data('index');

          loopyFirst
            .before('<div class="panel-program__loop js-program-loop is-new" data-index="'+ loopSteps +'">'
              +'<div class="panel-program__loop-angle js-program-loop-angle">'
              +'<div class="panel-program__loop-horizontal"></div>'
              +'<div class="panel-program__loop-vertical js-program-loop-angle-vertical"></div>'
              +'<div class="panel-program__loop-title js-program-loop-angle-title"></div>'
              +'</div></div>');

          newLoop = nodes.program.find('.js-program-loop.is-new');
          newLoop.append(loopyEl.removeClass('is-loopy'));

          nodes.controls.removeClass('is-loop');

          setTimeout(function() {         
            newLoop.find('.js-program-loop-angle-title').append('ПОВТОРИТЬ x' + loopSteps);
            newLoop.find('.js-program-loop-angle').addClass('is-open');
            newLoop.find('.js-program-loop-angle-vertical')
              .css('min-height', (48 + 40 * loopyEl.length) + 'px');
            newLoop.removeClass('is-new');
          }, 500);

        }
      }, '.js-loop-submit');

      nodes.loop.on({
        click: function() {
          variables.newLoop = [];
          nodes.controls.removeClass('is-loop');
        }
      }, '.js-loop-cancel');

    },

    openLoopControl: function() {
      var actions = nodes.program.find('.js-program-action.is-loopy');
      if (actions.length > 0) {
        nodes.controls.addClass('is-loop');
      } else {
        nodes.controls.removeClass('is-loop');
      }
    }
    
  };

  methods.setEvents();

})();