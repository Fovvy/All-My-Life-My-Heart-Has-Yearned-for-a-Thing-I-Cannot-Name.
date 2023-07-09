$(document).ready(function() {
  // Main variables
  var $aboutTitle = $(".about-myself .content h2");
  var $developmentWrapper = $(".development-wrapper");
  var developmentIsVisible = false;



    
  /* ####### HERO SECTION ####### */

  $(".hero .content .header").delay(500).animate(
    {
      opacity: "1",
      top: "50%"
    },
    1000
  );

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var bottom_of_window = scroll + $(window).height();

    /* ##### ABOUT MYSELF SECTION #### */
    if (bottom_of_window > $aboutTitle.offset().top + $aboutTitle.outerHeight()) {
      $(".about-myself .content h2").addClass("aboutTitleVisible");
    }

    /* ##### EXPERIENCE SECTION #### */

    // Check the location of each element hidden
    $(".experience .content .hidden").each(function(i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();

      // If the object is completely visible in the window, fadeIn it
      if (bottom_of_window > bottom_of_object) {
        $(this).animate(
          {
            opacity: "1",
            "margin-left": "0"
          },
          600
        );
      }
    });
    $(document).ready(function() {
      $(window).scroll(function() {
        var scrollPos = $(window).scrollTop();

// 




    // ####### NAVBAR CHANGING COLOR THING ########
        // Adjust the scroll threshold as needed
        var scrollThreshold = 870;
    
        if (scrollPos > scrollThreshold) {
          $('.navbar').addClass('navbar-solid');
        } else {
          $('.navbar').removeClass('navbar-solid');
        }
      });
    });
    


    /*###### SKILLS SECTION ######*/

    var middle_of_developmentWrapper =
      $developmentWrapper.offset().top + $developmentWrapper.outerHeight() / 2;

    if (bottom_of_window > middle_of_developmentWrapper && !developmentIsVisible) {
      $(".skills-bar-container li").each(function() {
        var $barContainer = $(this).find(".bar-container");
        var dataPercent = parseInt($barContainer.data("percent"));
        var elem = $(this).find(".progressbar");
        var percent = $(this).find(".percent");
        var width = 0;

        var id = setInterval(frame, 15);

        function frame() {
          if (width >= dataPercent) {
            clearInterval(id);
          } else {
            width++;
            elem.css("width", width + "%");
            percent.html(width + " %");
          }
        }
      });
      developmentIsVisible = true;
    }

    /*##### GLOWING NAVBAR EFFECT ####*/
    if (scroll) {
      $(".navbar").addClass("navbar-scroll");
    } else {
      $(".navbar").removeClass("navbar-scroll");
    }
  }); // -- End window scroll --
});
