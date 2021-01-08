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
