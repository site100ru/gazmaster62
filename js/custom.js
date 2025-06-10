// JavaScript Document for FlatDuplex Landingpage

jQuery(document).ready(function(){
	
	// put your address here
	var gmapAddress = '3861 Sepulveda Blvd., Culver City, CA 90230';
	
	// Navigation
	jQuery(document).scroll(function () {
 	    var y = jQuery(this).scrollTop();
 	    if (y > 300) {
 	        jQuery('.navbar').fadeIn();
 	    } else {
 	        jQuery('.navbar').fadeOut();
 	    }

 	});
	
	jQuery('.scroll').click(function(){
		var mark = jQuery(this).attr('id');
		var position = jQuery('.'+mark).offset().top;
		jQuery('html, body').animate({scrollTop:position - 90}, 'slow');
		return false;
		});
	
	// Header Slider
	jQuery('.flexslider.notebookslider').flexslider({
		controlNav: true,
		directionNav: false
	});

	// Download Button Shake every 5 sec.
	setInterval(function(){
	    	jQuery('#download-button').toggleClass("shake");
		}, 5000);
	
	// Info Slider
	jQuery('.flexslider.infoslider').flexslider({
		controlNav: false,
		animation: "slide",
		slideshowSpeed: 20000,
	});
	
	// Testimonials Slider
	jQuery('.flexslider.testimonialslider').flexslider({
		controlNav: false,
		directionNav: false
	});
	
	// Gallery Slider
	jQuery('.flexslider.galleryslider').flexslider({
		controlNav: true,
		animation: "slide",
		slideshow: false,
		directionNav: true
	});
	
	// Gallery Lightbox
	jQuery('.gallery-img').magnificPopup({
		delegate: 'a', // child items selector, by clicking on it popup will open
		type: 'image'
	});
	
	// Google Map
	jQuery('.gmap').gmap3({
		 map: {
		    options: {
		      maxZoom: 16,
		      mapTypeControl: false,
		      navigationControl: false,
		      scrollwheel: false,
		      streetViewControl: false
		    }
		
		 },
		 marker:{
		    address: gmapAddress,
		 }
		},
		"autofit" );
	
	
	// Hover Actions
	jQuery('.hover').css('opacity', '1');
	  jQuery('.hover').hover(
	    function () {
	       jQuery(this).stop().animate({ opacity: 0.7 }, 'slow');
	    },
	    function () {  
	       jQuery(this).stop().animate({ opacity: 1 }, 'slow');
	  });
	  
	  // About Profile Hover
	  jQuery('.profile').hover(
			  function(){
				  jQuery(this).find('.profile-image').addClass('profile-image-hover');
				  jQuery(this).find('.profile-border-arrow').addClass('profile-border-arrow-hover');
			  },
			  function(){
				  jQuery(this).find('.profile-image').removeClass('profile-image-hover');
				  jQuery(this).find('.profile-border-arrow').removeClass('profile-border-arrow-hover');
			  }
		
	  );
	  
	  // Pricing Table Hover
	  jQuery('.column').hover(
			  function(){
				  jQuery(this).addClass('column-hover');
			  },
			  function(){
				  jQuery(this).removeClass('column-hover');
			  }
		
	  );
	  
	  // Gallery Overlay
	  jQuery('.gallery-img a').hover(
			  function(){
				  jQuery(this).find('.img-overlay').animate({'top': '0'}, 'fast');
			  },
			  function(){
				  jQuery(this).find('.img-overlay').animate({'top': '100%'}, 'fast');
			  }
		
	  );
	  
	  // Scroll Top Button
	  jQuery('.scroll-top').click(function(){
		  jQuery("html, body").animate({ scrollTop: 0 }, 'slow');
		  return false;
	  });
	  
	  
	  // Disable form submit on enter
	  jQuery(window).keydown(function(event){
		    if(event.keyCode == 13) {
		      event.preventDefault();
		      return false;
		    }
		  });
	  
	  
	  // Newsletter validate and send
	  var emailReg = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}jQuery/;

	  // Validate
	  function validateNewsletterEmail(email,regex){
		  if (!regex.test(email.val()))
				{
					email.addClass('validation-error',500);
					jQuery('#newsletter-form').addClass('validation-error',500);
					return false;
				}
				else
				{
					email.removeClass('validation-error',500);
					jQuery('#newsletter-form').removeClass('validation-error',500);
					return true;
				}
	  }
	  

	  // Check and Send
	  jQuery('#send-newsletter').click(function(){
		  // result of action
		  var result=true;

		  //Get the data from all the fields
		  var email = jQuery('input[name=newsletter-email]');
		  var type = jQuery('input[name=type]');

		  // validate of name input
		  if(!validateNewsletterEmail(email,emailReg)) result=false;

		  if(result==false) return false;

		  var data = 'email=' + email.val() + '&type=' + type.val();

		  //start the ajax
		  jQuery.ajax({
			  //this is the php file that processes the data and send mail
			  url: "submit-forms.php", 
			  //POST method is used
			  type: "POST",
			  //pass the data     
			  data: data,   
			  //Do not cache the page
			  cache: false,
			  //success
			  success: function(data) {
				  jQuery('.newsletter-form').html('<h3 class="subscribe-message">Thanks for subscribe!</h3>');
			  }
		  });

		  return false;

	  });
		
	  // Highlight Input Field
	  jQuery('input[name=newsletter-email]').blur(function(){
		  validateNewsletterEmail(jQuery(this),emailReg); 
	  });
	  
	  
	  // Contact validate and send
	  var emailReg = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}jQuery/;

	  // Validate
	  function validateEmail(email,regex){
		  if (!regex.test(email.val()))
				{
					email.addClass('validation-error',500);
					return false;
				}
				else
				{
					email.removeClass('validation-error',500);
					return true;
				}
	  }
	  
	  function validateName(name){
		  if (name.val()=='') 
          	{
            	name.addClass('validation-error',500);
            	return false;
            }
            else
            {
            	name.removeClass('validation-error',500);
            	return true;
            }
       }
	  

	  // Check and Send
	  jQuery('#send-contact').click(function(){
		  // result of action
		  var result=true;

		  //Get the data from all the fields
		  var name = jQuery('input[name=name]');
		  var email = jQuery('input[name=email]');
		  var subject = jQuery('input[name=subject]');
		  var message = jQuery('#contact-message');
		  var type = jQuery('input[name=type]');

		  // validate of name input
		  if(!validateName(name)) result=false;
		  if(!validateEmail(email,emailReg)) result=false;

		  if(result==false) return false;

		  var data = 'name=' + name.val() + '&email=' + email.val() + '&subject=' + subject.val() + '&message=' + message.val() + '&type=' + type.val();

		  //start the ajax
		  jQuery.ajax({
			  //this is the php file that processes the data and send mail
			  url: "submit-forms.php", 
			  //POST method is used
			  type: "POST",
			  //pass the data     
			  data: data,   
			  //Do not cache the page
			  cache: false,
			  //success
			  success: function(data) {
				  jQuery('.contact-success').fadeIn("slow");
			  }
		  });

		  return false;

	  });
		
	  // Highlight Input Field
	  jQuery('input[name=email]').blur(function(){
		  validateEmail(jQuery(this),emailReg); 
	  });
	  
	  jQuery('input[name=name]').blur(function(){
		  validateName(jQuery(this)); 
	  });
	  
	  

});