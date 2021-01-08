
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

