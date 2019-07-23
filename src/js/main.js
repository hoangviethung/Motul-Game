$(document).on('click', '.start-video', function () {
    $(this).hide();
    $("#player").show();
    $("#thumbnail_container").hide();
    player_2.playVideo();
});

// Get youtube ID from URL
const getYoutubeID = (e) => {
    var url = $(e).attr("data-url");

    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
        return match[7];
    } else {
        return false;
    }
}
// END Get youtube ID from URL

// Youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player, player_1, player_2;

function onYouTubeIframeAPIReady() {

    if ($(".home_banner #video").length > 0) {
        let id = getYoutubeID(".home_banner #video");
        player = new YT.Player('video', {
            height: '390',
            width: '640',
            videoId: id,
            events: {
                'onReady': onPlayerReady
            },
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'rel': 0,
                'fs': 0,
            }
        });
    }

    if ($(".list-same-item #player_1").length > 0) {
        let id_1 = getYoutubeID("#player_1");
        player_1 = new YT.Player('player_1', {
            height: '244',
            width: '434',
            videoId: id_1, // youtube video id
            playerVars: {
                'autoplay': 0,
                'rel': 0,
                'showinfo': 0
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });

    }

    if ($(".list-same-item #player_2").length > 0) {
        let id_2 = getYoutubeID("#player_2");
        player_2 = new YT.Player('player_2', {
            height: '244',
            width: '434',
            videoId: id_2, // youtube video id
            playerVars: {
                'autoplay': 0,
                'rel': 0,
                'showinfo': 0
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
}
//Functions to stop-pause Video  

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        $('.start-video').fadeIn('normal');
    }
}

function onPlayerReady(event) {
    if ($(".home_banner #video").parent().index() === 0) {
        console.log(" oke first run")
        event.target.playVideo();
    }
}

function stopVideo() {
    player.stopVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function playVideo() {
    player.playVideo();
}
// END youtube API


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
        slidesPerView: 1,
        fadeEffect: {
            crossFade: true
        },
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.home_banner .swiper-button-next',
            prevEl: '.home_banner .swiper-button-prev',
        },
    })

    swiper.on("slideChangeTransitionEnd", function () {
        if ($(".swiper-container .swiper-slide-active #video").length > 0) {
            playVideo();
        } else {
            pauseVideo();
        }
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
function _getThumbnailYoutube() {
    $(".button-play-video").each(function () {
        var src = $(this).attr("href");
        var youtube_video_id = src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
        if (youtube_video_id.length == 11) {
            $(this).siblings("img").attr("src", "https://img.youtube.com/vi/" + youtube_video_id + "/mqdefault.jpg");
        }
    })
}

// MENU FIXED
function _scrollMenuFixed() {
    var scroll = $(window).scrollTop();
    var heightHeader = $('header').height();
    if (scroll >= heightHeader) {
        $('header').addClass('active');
    } else {
        $('header').removeClass('active');
    }
}

// SCROLL MENU BY ID
function _scrollMenuById() {
    $(".list-menu .item-menu").on('click', function () {

        let id = $(this).find('a').attr("href");
        if ($('#' + id).length > 0) {
            //Scroll tới vị trí click
            $('html, body').animate({
                scrollTop: $('#' + id).offset().top - $('header').height()
            }, 500);
        }

    });
}

// XỬ LÍ BUTTON MENU TOGGLE MOBILE
function _toggle_button_menu() {
    const moblietoggle = $('#mobile-toggle');
    if (!moblietoggle) { return false }
    moblietoggle.on('click', function () {
        const btnline1 = $('#btn_line1');
        const btnline2 = $('#btn_line2');
        const btnline3 = $('#btn_line3');
        if ((!btnline3) || (!btnline2) || (!btnline1)) { return }
        btnline1.toggleClass('line-close-1');
        btnline2.toggleClass('line_hidden');
        btnline3.toggleClass('line-close-3');
        const ellistmenuMB = $('#menu-mb');
        if (!ellistmenuMB) { return }
        ellistmenuMB.toggleClass('active-menu-mb');
    })
}

// SHOW MENU MOBILE
function showMenuMobile() {
    $('#mobile-toggle').on('click', function () {
        $('.list-menu').toggleClass('active');
    });
}

// ĐÓNG NÚT MOBILE
function closeMenuMobile() {
    $('.item-menu').on('click', function (e) {
        console.log('OKKK')
        $('.list-menu').removeClass('active');


        const btnline1 = $('#btn_line1');
        const btnline2 = $('#btn_line2');
        const btnline3 = $('#btn_line3');
        btnline1.removeClass('line-close-1');
        btnline2.removeClass('line_hidden');
        btnline3.removeClass('line-close-3');
    });
}

function fixScroll() {
    $('[data-fancybox]').fancybox({
        afterShow: function (instance, slide) {
            setTimeout(() => {
                document.getElementsByClassName("fancybox-content")[0].scrollTop = 0
                $('.fancybox-inner').fadeIn(200);
                instance.update();
            }, 300);
        }
    })
}




$(document).ready(function () {
    // Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
    objectFitImages("img.object-fit-cover");
    // Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
    addClassLazyload();
    bannerSlider();
    file();
    voteRating();
    _getThumbnailYoutube();
    _scrollMenuById();
    _toggle_button_menu();
    showMenuMobile();
    closeMenuMobile();
    fixScroll();
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