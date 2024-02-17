const options = {
  cutoutPercentage: 65,
  animation: {
    easing: 'easeOutQuint' },

  animateScale: true,
  tooltips: {
    enabled: false },

  events: [] };


const skills = [
{
  id: "html_css",
  values: [94, 6] },

{
  id: "sass",
  values: [90, 10] },

{
  id: "jquery",
  values: [90, 10] },

{
  id: "rails",
  values: [80, 20] },

{
  id: "backbone",
  values: [87, 13] },

{
  id: "photoshop",
  values: [78, 22] }];



let offset = 0;

for (const skill of skills) {
  const canvas = document.querySelector(`#${skill.id}`);
  if (!canvas) {continue;}

  const ctx = canvas.getContext('2d');

  setTimeout(() => {
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: skill.values,
          backgroundColor: [
          'hsl(120, 40%, 60%)',
          'hsl(0, 0%, 95%)'] }] },



      options: options });

  }, offset);

  offset += 250;
}










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
        /*##### GLOWING NAVBAR EFFECT ####*/
    if (scroll) {
      $(".navbar").addClass("navbar-scroll");
    } else {
      $(".navbar").removeClass("navbar-scroll");
    }
      });
    });
    


    /*###### SKILLS SECTION ######*/

  

    
  }); // -- End window scroll --
});




// Projects
$(document).ready(function(){
  $(".navigation-list-item").on("click",function(){
    removeActive();
    var panel = $(this).data("nav");
    $(this).addClass("active");
    $(panel).addClass("active");
  });
  function removeActive() {
    console.log("Remove current active navigation item and active panel");
    $(".navigation-list").find(".active").removeClass("active");
    $(".panels").find(".active").removeClass("active");
  }
});

