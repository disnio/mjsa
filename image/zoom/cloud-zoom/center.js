      $.fn.center = function() {
          return this.each(function() {
              var $this = $(this),
                  parent = $this.parent(),
                  topPos,
                  topMargin,
                  leftMargin,
                  resizeTimeout;               

              if ($this.css("position") === "absolute" || $this.css("position") === "fixed") {
                  topPos = "50%";
                  topMargin = "-" + Math.round($this.outerHeight() / 2) + "px";
                  leftMargin = "-" + Math.round($this.outerWidth() / 2) + "px";
                  $this.css({
                      "left": "50%",
                      "margin-left": leftMargin,
                      "top": topPos,
                      "margin-top": topMargin
                  });
              } else {
                  topPos = Math.floor((parent.height() - $this.outerHeight()) / 2);
                  topMargin = "auto";
                  $this.css({
                      "position": "relative",
                      "margin-left": "auto",
                      "margin-right": "auto"
                  });
              }
              $this.css({
                  "top": topPos,
                  "margin-top": topMargin
              });
          });
      }
