(function($, window, document) {

    window.YEOLAB = window.YEOLAB || {};

    YEOLAB.init = function() {

    	this.buttonClass = '.button-more';

    	$(this.buttonClass).on('click', function(e) {
    		e.preventDefault();
    		var scrollTarget = $(this).attr('href');
    		$('body, html').animate({
    			scrollTop: $(scrollTarget).offset().top
    		}, 500, 'linear', function(){
    			window.location.hash = scrollTarget;
    		});
    	});

    };

    $(document).ready(function() {
        YEOLAB.init();
    }); 

})(jQuery, window, document);