(function() {
  var node           = $('.js-loop-slider');
  var sliderLeft     = node.find('.js-loop-slider-left');
  var sliderRight    = node.find('.js-loop-slider-right');
  var sliderElements = node.find('.js-loop-slider-elements');
  var sliderElement;

  var body = $(document.body);

  var currentElement;
  var currentIndex;
  var newElement;

  var checkIfEnd;
  var actionFinished = true;

  body.on({
    click: function() {
      if (checkIfEnd() !== 'right-false' && actionFinished) {
        actionFinished = false;
        sliderElement = node.find('.js-loop-slider-element');
        for (var i = 0; i < sliderElement.length; i++) {
          if (sliderElement.eq(i).hasClass('is-active')) {
            currentElement = sliderElement.eq(i);
            currentIndex = currentElement.data('index');
            newElement = '<div class="panel-buttons__loop-element js-loop-slider-element is-active" data-index="'+ (currentIndex + 1) +'">'+ (currentIndex + 1) +'</div>';
            currentElement.css('marginLeft', '-100%').removeClass('is-active').addClass('is-left');
            sliderElements.append(newElement);
          }
          else if (sliderElement.eq(i).hasClass('is-left') || sliderElement.eq(i).hasClass('is-right')) {
            sliderElement.eq(i).remove();
          }
        }
        checkIfEnd();
      }
    }
  }, '.js-loop-slider-right');

  body.on({
    click: function() {
      if (checkIfEnd() !== 'left-false' && actionFinished) {
        actionFinished = false;
        sliderElement = node.find('.js-loop-slider-element');
        for (var i = 0; i < sliderElement.length; i++) {
          if (sliderElement.eq(i).hasClass('is-active')) {
            currentElement = sliderElement.eq(i);
            currentIndex = currentElement.data('index');
            newElement = '<div class="panel-buttons__loop-element js-loop-slider-element is-active is-margin-left" data-index="'+ (currentIndex - 1) +'">'+ (currentIndex - 1) +'</div>';
            sliderElements.prepend(newElement);
            currentElement.removeClass('is-active').addClass('is-right');
            setTimeout(function(){            
              node.find('.is-margin-left').removeClass('is-margin-left');              
            }, 2);
          }
          else if (sliderElement.eq(i).hasClass('is-left') || sliderElement.eq(i).hasClass('is-right')) {
            sliderElement.eq(i).remove();
          }
        }
        checkIfEnd();
      }
    }
  }, '.js-loop-slider-left');

  body.on({
    transitionend: function() {
      actionFinished = true;
    }
  }, '.js-loop-slider-element');

  checkIfEnd = function() {
    sliderElement = node.find('.js-loop-slider-element');
    for (var i = 0; i < sliderElement.length; i++) {
      if (sliderElement.eq(i).hasClass('is-active')) {
        if (sliderElement.eq(i).data('index') === 1) {
          sliderLeft.addClass('is-disabled');
          return 'left-false'
        } else if (sliderElement.eq(i).data('index') === 20) {
          sliderRight.addClass('is-disabled');
          return 'right-false'
        }
      } else {
        sliderLeft.removeClass('is-disabled');
        sliderRight.removeClass('is-disabled');
      }
    }
  };

  checkIfEnd();
})();
(function() {
  var program        = $('.js-panel-program');
  var programActions = program.find('.js-panel-program-content');

  var win            = $(window);
  var body           = $(document.body);
  
  var getVisibleHeight;
  var setSize;
  var init;
  var windowHeight;
  var clientScrollTop;
  var clientScrollBot;

  getVisibleHeight = function(item) {
    var itemTop           = item.offset().top;
    var itemBottom        = itemTop + item.outerHeight();
    var itemVisibleTop    = itemTop < clientScrollTop ? clientScrollTop : itemTop;
    var itemVisibleBottom = itemBottom > clientScrollBot ? clientScrollBot : itemBottom;
    
    return (itemVisibleBottom - itemVisibleTop);
  };

  setSize = function() {
    windowHeight    = win.height();
    clientScrollTop = win.scrollTop();
    clientScrollBot = clientScrollTop + windowHeight;
    programActionsHeight = programActions.height();
  };

  init = function() {
    setSize();
  };

  body.on({
    mousemove: function(event) {
      var e = event || window.event;

      var diff;
      var currentCursorPosition;
      var clientMovePersentage;
      var programAreaHeight = getVisibleHeight(program);

      if (programAreaHeight > programActionsHeight) {
        diff = 0;
      } else {
        currentCursorPosition = e.clientY - 100;
        clientMovePersentage = currentCursorPosition / (programAreaHeight - 100);

        diff = - ((programActionsHeight - programAreaHeight) * clientMovePersentage);

        if (diff > 0) {
          diff = 0;
        }
        programActions.css({marginTop: diff});
      }
    }
  }, '.js-panel-program');

  win.on('scroll resize', setSize); 
   
  init();
})();
$(document).ready(function() {
  setTimeout(function() {
    $('.js-angle').addClass('is-open');
    $('.js-hor').addClass('is-open');
    $('.js-ver').addClass('is-open');
  }, 500);
});