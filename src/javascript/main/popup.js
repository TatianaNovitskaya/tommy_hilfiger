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


