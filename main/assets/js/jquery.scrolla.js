(function($) {
  var methods;
  methods = {
    init: function(elements, options) {
      $(window).scroll(function() {
        methods.animate(elements, options);
      });
      $(window).trigger('scroll');
    },
    animate: function(elements, options) {
      var viewBottom, viewHeight, viewTop;
      viewHeight = $(window).height();
      viewTop = $(window).scrollTop();
      viewBottom = viewTop + viewHeight;
      $.each(elements, function() {
        var elementAnimated, elementAnimation, elementBottom, elementDelay, elementDuration, elementHeight, elementIteration, elementOffset, elementTop;
        elementAnimated = 'animated';
        elementAnimation = $(this).data('animate');
        elementOffset = $(this).data('offset');
        elementDuration = $(this).data('duration');
        elementDelay = $(this).data('delay');
        elementIteration = $(this).data('iteration');
        elementHeight = $(this).outerHeight();
        elementTop = $(this).offset().top;
        elementBottom = elementTop + elementHeight;
        if (elementOffset) {
          elementTop = elementTop + elementOffset;
          elementBottom = elementBottom - elementOffset;
        }
        if (options.animateCssVersion === 4) {
          elementAnimated = 'animate__animated';
          elementAnimation = 'animate__' + elementAnimation;
        }
        $(this).css({
          '-webkit-animation-duration': elementDuration,
          'animation-duration': elementDuration
        });
        $(this).css({
          '-webkit-animation-delay': elementDelay,
          'animation-delay': elementDelay
        });
        $(this).css({
          '-webkit-animation-iteration-count': elementIteration,
          'animation-iteration-count': elementIteration
        });
        if (elementBottom >= viewTop && elementTop <= viewBottom) {
          $(this).css('visibility', 'visible');
          $(this).addClass(elementAnimation);
          $(this).addClass(elementAnimated);
        } else {
          if (options.once === false) {
            $(this).css('visibility', 'hidden');
            $(this).removeClass(elementAnimation);
            $(this).removeClass(elementAnimated);
          }
        }
      });
    }
  };
  jQuery.fn.scrolla = function(options) {
    options = $.extend({
      mobile: false,
      once: false,
      animateCssVersion: 4
    }, options);
    if (options.mobile === false) {
      if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return false;
      }
    }
    methods.init(this, options);
  };
})(jQuery);