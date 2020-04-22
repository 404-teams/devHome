$(document).ready(function(){
    $(window).scroll(function() { // check if scroll event happened
      if ($(document).scrollTop() > 20) { // check if user scrolled more than 50 from top of the browser window
        $("#color-change a").css("color", "black");
        $("#log-in-section").css("color","blue");
        $("header").css("background-color", "white"); 
        $('#logo-swap').css({"background-image": "url(https://www.mint.com/sites/all/themes/custom/mint_2014/img/icons/normal-sa1f1c7ac3f.png)", "background-position": "0 -2623px"});  
        // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
      } else {
        $("header").css("background-color", "transparent"); // if not, change it back to transparent
        $("#color-change a").css("color", "white");
        $("#log-in-section").css("color","white");
        $('#logo-swap').css({"background-image": "url(https://www.mint.com/sites/all/themes/custom/mint_2014/img/icons/normal-sa1f1c7ac3f.png)", "background-position": "0 -2480px"});  

      }
    });
  });