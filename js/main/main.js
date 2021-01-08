$(document).ready(function () {
    Date.prototype.getMonthNameShort = function (lang) {
        lang = lang && (lang in Date.locale) ? lang : 'en';
        return Date.locale[lang].month_names_short[this.getMonth()];
    };
    Date.locale = {
        en: {
            month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    };

    var currentDay = new Date();
    var currentMothWithName = new Date().getMonthNameShort();
    var currentDayNumber = currentDay.getDate();
    var currentFullYear = currentDay.getFullYear();
    var stringYear = String(currentMothWithName + " " + currentDayNumber + ", " + currentFullYear + " " + "23:59:59");
    var setCurrentDay = new Date(stringYear);
    var countDownDate = setCurrentDay.getTime();
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var objectSend = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
        generateTemplate(objectSend);

        if (distance < 0) {
            clearInterval(x);
        }
    }, 1000);

    function generateTemplate(obj) {
        var result = '';
        var elementsTimeArray = document.querySelectorAll('.time');
        for (var item in obj) {
            if (obj[item] < 10) {
                result += '<li class="time-bg">0' + obj[item] + '</li><li class="time-bg__dot">:</li>';
            } else {
                result += '<li class="time-bg">' + obj[item] + '</li><li class="time-bg__dot">:</li>';
            }
        }
        for (var i = 0; i < elementsTimeArray.length; i++) {
            var itemElement = elementsTimeArray[i];
            itemElement.innerHTML = result
        }
    }


});

$(document).ready(function () {
    $("[data-fancybox]").fancybox({
        loop: true
    });


    var $window = $(window),
        win_height_padded = $window.height() * 1.1;
    if (window.innerWidth > 480) {
        $window.on('scroll', revealOnScroll);
    } else {
        $(".block_animated:not(.block_show)").each(function () {
            $(this).addClass('block_show');
        });
    }

    function revealOnScroll() {
        var scrolled = $window.scrollTop(),
            win_height_padded = $window.height() / 1.2;

        $(".block_animated:not(.block_show)").each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded >= offsetTop) {
                $this.addClass('block_show');
            }
        });
    }

    if (window.innerWidth > 480) {
        revealOnScroll();
    }


    svg4everybody();

    objectFitImages();
});


$ (document).ready (function () {
    var topMenu = $ (".header__menu"),
        topMenuHeight = $ ('.header').outerHeight (),
        menuItems = $('.js__scroll__to');


    menuItems.on ('click',function (e) {
        e.preventDefault ();
        var mobileVersion = window.innerWidth <= 1023;

        var $this = $ (this);
        var dataHref = mobileVersion ? $this.attr ("data-header-mobile") : $this.attr ("data-header-desktop");

        var offsetTop = $ ('#' + dataHref).offset ().top;
        $ ('html, body').stop ().animate ({
            scrollTop: mobileVersion ? offsetTop -100 : offsetTop
        }, 900);
        changeClassHeader (offsetTop);
        
    });
    document.addEventListener ("mousewheel", onWheel);
    function onWheel (e) {
        changeClassHeader ($ (window).scrollTop ());
        changeClassOnScroll ()
    }
    $(window).on("keypress", onPress);
    function onPress (e) {
        changeClassHeader ($ (window).scrollTop ());
        changeClassOnScroll ()
    }

    changeClassHeader ($ (window).scrollTop ());
    function setActiveClassHeader (currentName, state) {
        $ ('.header a.active').removeClass ('active');
        state = state || false;
        if (state) {
            $ ('[data-header="' + currentName + '"]').addClass ('active');
        } else {
            currentName.addClass ('active');
        }
    }

    function changeClassHeader (offsetTop) {
        if (offsetTop > 0) {
            $ ('.header').addClass ('header_scroll');
        } else {
            $ ('.header').removeClass ('header_scroll');
        }
    }

    function changeClassOnScroll () {
        $ ('section').each (function () {
            var currentElement = $ (this).offset ().top;
            if (currentElement <= $ (window).scrollTop () && currentElement + $ (this).height () >= $ (window).scrollTop ()) {
                var currentClass = $ (this).attr ('class');
                setActiveClassHeader (currentClass, true)
            }
        });
    }


});


document.addEventListener("DOMContentLoaded", function () {
    var elementPopupWrapper = document.querySelector('.popup__show-video-item');

    function togglePopup(ClassName) {
        var popupClose = document.querySelector(ClassName);
        popupClose.classList.toggle('popup_show');
    }

    function closePopup() {
        var popupClose = document.querySelectorAll('.popup');
        for (var i = 0; i < popupClose.length; i++) {
            var obj2 = popupClose[i];
            obj2.classList.remove('popup_show');
        }
    }

    function showPopupEvent() {
        var btnsItems = document.querySelectorAll('.js__show-popup');
        for (var i = 0; i < btnsItems.length; i++) {
            var obj3 = btnsItems[i];
            obj3.addEventListener('click', function (e) {
                e.preventDefault();
                var currentPopup = this.getAttribute('data-popup');
                togglePopup('.' + currentPopup);
                addIframeIfSrcExist(this);
            });
        }
    }

    showPopupEvent();

    function closeBtns() {
        var closeButton = document.querySelectorAll('.js__close-popup');
        for (var i = 0; i < closeButton.length; i++) {
            var obj2 = closeButton[i];
            obj2.addEventListener('click', function (e) {
                e.preventDefault();
                closePopup();
                clearPopupContainer()
            })
        }
    }

    closeBtns();

    function addIframeIfSrcExist(selfPopup) {
        var currentPopupSrc = selfPopup.getAttribute('data-src');
        if (!currentPopupSrc || !elementPopupWrapper) {
            return false;
        }
        var iframeElement = document.createElement('iframe');
        iframeElement.setAttribute('allow', 'autoplay')
        iframeElement.setAttribute('allowfullscreen', 'allowfullscreen')
        iframeElement.src = currentPopupSrc;
        clearPopupContainer();
        elementPopupWrapper.appendChild(iframeElement);
    }

    function clearPopupContainer(){
        elementPopupWrapper.innerHTML = ''
    }
});



document.addEventListener("DOMContentLoaded", function () {
    sliderInit.init()
});

var sliderInit = {
    init: function () {
        this.reviewSlider();
    },

    reviewSlider: function () {
        var self = this;
        var reviewSlider = new Swiper('.review__slider .swiper-container', {
            speed: 400,
            spaceBetween: 25,
            loop: true,
            // loopedSlides:2,
            slidesPerView: 2,
            navigation: {
                nextEl: '.review__button-next',
                prevEl: '.review__button-prev',
            },
            pagination: {
                el: '.review__swiper-pagination',
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return self.addZero(current) + ' / ' + self.addZero( total);
                }

            },
            breakpoints:{
                // when window width is >= 320px
                320:{
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                980:{
                    slidesPerView: 2,
                    spaceBetween: 25,
                }
            }
        });

    },


    addZero: function(number){
        if(number < 10){
            return number = '0' + number
        }
        return number
    },
};
