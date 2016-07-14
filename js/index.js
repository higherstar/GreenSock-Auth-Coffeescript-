(function() {
  var Form, f;

  Form = (function() {
    function Form() {
      this.tlLogo = new TimelineMax({
        repeat: false,
        yoyo: true
      });
      this.tlStep = new TimelineMax();
    }

    Form.prototype.i = function() {
      this.handlers();
      return this.strokeAnimation();
    };

    Form.prototype.handlers = function() {
      var _t;
      _t = this;
      $('.screen__inner').on('mousemove', (function(_this) {
        return function(ev) {
          return _this.formTransform(ev);
        };
      })(this));
      $('.btn.btn-db').on('click', (function(_this) {
        return function(ev) {
          return _this.nextStep(ev, '.step--two');
        };
      })(this));
      $('.btn-single').on('click', (function(_this) {
        return function(ev) {
          return _this.nextStep(ev, '.step--one');
        };
      })(this));
      return $('.input__field').on('change', function() {
        return _t.floatLabel(this);
      });
    };

    Form.prototype.formTransform = function(e) {
      var dx, dxp, dy, dyp, newTransformRotateXY, x, y;
      x = e.pageX - $('.stage').position().left;
      y = e.pageY - $('.stage').position().top;
      dx = $('.stage').innerWidth() / 2 - x;
      dy = $('.stage').innerHeight() / 2 - y;
      dxp = dx / ($('.stage').innerWidth() / 2);
      dyp = dy / ($('.stage').innerHeight() / 2);
      newTransformRotateXY = "rotateY(" + -15 * Math.tan(dxp) + "deg) rotateX(" + +2 * Math.tan(dyp) + "deg)";
      return $('.screen').css({
        '-webkit-transform': newTransformRotateXY
      });
    };

    Form.prototype.strokeAnimation = function() {
      var shapes;
      shapes = $('circle, path');
      this.tlLogo.staggerFromTo('.step--one', .5, {
        opacity: 0
      }, {
        opacity: 1
      });
      return this.tlLogo.staggerFromTo(shapes, 1, {
        drawSVG: 0
      }, {
        drawSVG: '100%'
      });
    };

    Form.prototype.nextStep = function(ev, nextScreen) {
      var $overlay, $stage, _t, newElement, trfOffset;
      _t = this;
      $overlay = $('.step-overlay');
      $stage = $('.stage');
      newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
      $overlay[0].appendChild(newElement);
      $overlay.show();
      trfOffset = 40;
      return this.tlStep.set(newElement, {
        attr: {
          fill: '#8C44D1',
          cx: ((ev.pageX / $stage.outerWidth()) * 100) + "%",
          cy: (((ev.pageY + trfOffset) / $stage.outerHeight()) * 100) + "%",
          r: 0
        }
      }).to(newElement, .5, {
        attr: {
          r: $stage.outerHeight()
        },
        transformOrigin: "center center",
        ease: Power4.easeInOut,
        onComplete: function() {
          _t.showScreen(nextScreen);
          return _t.tlLogo.restart();
        }
      }).to(newElement, .5, {
        css: {
          opacity: 0
        },
        onComplete: function() {
          newElement.remove();
          return $overlay.hide();
        }
      });
    };

    Form.prototype.showScreen = function(step) {
      var $nextStep;
      $('.step').removeClass('show');
      $nextStep = $('.step').filter(step);
      return $nextStep.addClass('show');
    };

    Form.prototype.floatLabel = function(el) {
      var $inp, val;
      val = $(el).val().length;
      $inp = $(el).closest('.input');
      if (val) {
        return $inp.addClass('float-label');
      } else {
        return $inp.removeClass('float-label');
      }
    };

    return Form;

  })();

  f = new Form();

  f.i();

}).call(this);