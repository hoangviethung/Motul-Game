// Function thêm class lazyload vào các thẻ <img> có thuộc tính [data-src]
const addClassLazyload = () => {
	let imgList = document.querySelectorAll("img[data-src]")
	Array.prototype.forEach.call(imgList, function (el, i) {
		if (el.className.length > 0) {
			el.className = el.className + " lazyload"
		} else {
			el.className = "lazyload"
		}
	});
}

function bannerSlider() {
	var swiper = new Swiper('.home_banner .swiper-container', {
		spaceBetween: 30,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})
}







$(document).ready(function () {
	// Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
	objectFitImages("img.object-fit-cover");
	// Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
	addClassLazyload();
	bannerSlider();
})

$(document).ajaxComplete(function () {
	// Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
	objectFitImages("img.object-fit-cover");
	// Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
	addClassLazyload();


})