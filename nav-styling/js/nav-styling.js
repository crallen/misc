(function(window, $) {

  jQuery.easing.def = "easeOutSine";

  var NavStylingDemo = function() {
    this._navLinks = $("nav ul > li");

    this._indicatorDefaultState = {
      height: 0
    };
    this._indicatorActiveState = {
      height: 8
    };

    this.init();
  };

  NavStylingDemo.prototype = {
    init: function() {
      this._createIndicators();
      this._attachEvents();
    },

    _createIndicators: function() {
      this._navLinks.each($.proxy(function(i, el) {
        var indicator = $("<div/>", { "class": "indicator" });
        indicator.css(this._indicatorDefaultState);
        $(el).append(indicator);
      }, this));
    },

    _attachEvents: function() {
      this._navLinks
        .mouseover( $.proxy(this._activateIndicator, this) )
        .mouseout( $.proxy(this._deactivateIndicator, this) );
    },

    _activateIndicator: function(event) {
      var indicator = $(event.target).find(".indicator");

      $(event.target).addClass("active");
      $(indicator).stop().animate(this._indicatorActiveState, 100);
    },

    _deactivateIndicator: function(event) {
      var indicator = $(event.target).find(".indicator");

      $(event.target).removeClass("active");
      $(indicator).stop().animate(this._indicatorDefaultState, 100);
    }
  };

  window.demoController = new NavStylingDemo();

}(window, window.jQuery));