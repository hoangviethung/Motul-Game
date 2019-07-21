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
// BANNER SLIDER
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

// CLICK CHỌN FILE
function file() {
    $('.home-section-3 .button-choose-file').on('click', function () {
        console.log('OK');
        $(this).parent().find('input').click();
    });
}

// LẤY HÌNH ẢNH TỪ INPUT FILE
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.button-choose-file').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

// ĐỔI ẢNH ĐÃ LẤY ĐƯỢC TỪ URL
$("#imgInp").change(function () {
    readURL(this);
});

// VOTED
function voteRating() {
    $('[data-vote]').each(function () {
        var vote = $(this).attr('data-vote');
        if (vote == 'true') {
            $(this).find('.heart-full').toggleClass('active');
        }
        $(this).on('click', function () {
            $(this).find('.heart-full').toggleClass('active');
            if ($(this).find('.heart-full').hasClass('active')) {
                vote = true;
            } else {
                vote = false;
            }
            $(this).attr('data-vote', vote)
        });
    })
}

// GET THUMBNAIL YOUTUBE
function _getThumbnailYoutobe() {
    $(".button-play-video").each(function () {
        var src = $(this).attr("href");
        var youtube_video_id = src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
        if (youtube_video_id.length == 11) {
            $(this).siblings("img").attr("src", "https://img.youtube.com/vi/" + youtube_video_id + "/mqdefault.jpg");
        }
    })
}

function _scrollMenuFixed() {
    var scroll = $(window).scrollTop();
    var heightHeader = $('header').height();
    if (scroll >= heightHeader) {
        $('header').addClass('active');
        console.log('OKKKKKKKKKK');
    } else {
        $('header').removeClass('active');
    }
}





$(document).ready(function () {
    // Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
    objectFitImages("img.object-fit-cover");
    // Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
    addClassLazyload();
    bannerSlider();
    file();
    voteRating();
    _getThumbnailYoutobe();
})

$(window).on('scroll', function () {
    _scrollMenuFixed();
});

$(document).ajaxComplete(function () {
    // Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
    objectFitImages("img.object-fit-cover");
    // Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
    addClassLazyload();
})