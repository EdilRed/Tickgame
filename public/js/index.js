(function ($) {

	"use strict";

	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});

})(jQuery);

// const loginForm = document.querySelector('.form--login');

// if (loginForm) {

// 	loginForm.addEventListener('submit', e => {
// 		// e.preventDefault();
// 		const name = document.getElementById('email').value;
// 		console.log(name);

// 		// login(email, password);
// 	});
// };