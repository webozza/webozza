/*-- menu toggle js --*/
$(function(){
    $(".mobile-toggle, .mobile-menu ul li a").on("click", function () {
        $(".menu-bar").slideToggle();
    });
    $('.mobile-toggle .menu-bar').on('click', function(e){
        e.stopPropagation();
    });
})


// header animate js
$(document).on("scroll", function(){
	if
		($(document).scrollTop() >= 100){
			$(".header").addClass("shrink");
		}
		else
		{
			$(".header").removeClass("shrink");
		}
	});

// section animation target js
$(document).ready(function(){
	$('.menu-bar a[href^="#"], .logo a, .footer-bar  a[href^="#"]').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').animate({
			'scrollTop': ($target.offset().top - 80)
		}, 1000, 'swing');
	});
});
// $(document).ready(function() {
// 	var pathname = window.location.pathname;
// 	$('.menu-bar > li > a[href="'+pathname+'"]').parent().addClass('menu-active');
// });
$(document).ready(function(){
  $('.menu-bar li a').click(function(){
    $('li a').removeClass("menu-active");
    $(this).addClass("menu-active");
});
});
// $(window).scroll(function() {
// 		var scrollDistance = $(window).scrollTop();
// $('.animate-section').each(function(i) {
// 				if ($(this).position().top <= scrollDistance) {
// 						$('.menu-bar a.menu-active, .logo a.menu-active').removeClass('menu-active');
// 						$('.menu-bar a, .logo a').eq(i).addClass('menu-active');
// 				}
// 		});
// }).scroll();


// dashboard accordian js
$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#accordion'), false);
});


/*-- menu toggle js --*/
// $(function(){
//     $(".toggle-accordin").on("click", function () {
//         $("#accordion").slideToggle();
//     });
//     // $('.accordion').on('click', function(e){
//     //     e.stopPropagation();
//     // });
// })