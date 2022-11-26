function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {

    /* --------
     *  cookie
     * -------- */

    function setCookie(cName, cValue, exDays) {
        var d = new Date();
        d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
    }

    function getCookie(cName) {
        var name = cName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(";");
        for (var i = 0; i < cookieArray.length; i++) {
            var anyCookie = cookieArray[i];
            while (anyCookie.charAt(0) === ' ') {
                anyCookie = anyCookie.substring(1);
            }
            if (anyCookie.indexOf(name) === 0) {
                return anyCookie.substring(name.length, anyCookie.length);
            }
        }
        return "";
    }

    if (document.querySelector('#alert-cookie button') !== null) {
        document.querySelector('#alert-cookie button').addEventListener('click', function() {
            var dataCookie = document.getElementById('alert-cookie').getAttribute('data-cookie');
            setCookie(dataCookie, '1', '10000');
            document.getElementById('alert-cookie').remove();
        });
    }

    if (document.getElementById('alert-cookie') !== null) {
        if (getCookie('be-okCookie') === '1') {
            document.getElementById('alert-cookie').remove();
        } else {
            document.getElementById('alert-cookie').style.display = 'flex';
        }
    }

    /* ----------------------------
     *  input file change to image
     * ---------------------------- */

    var imageForInputs = document.getElementsByClassName('image-for-input');
    for (var i = 0; i < imageForInputs.length; i++) {
        imageForInputs[i].style.display = 'none';
        imageForInputs[i].nextElementSibling.addEventListener('click', function () {
            this.previousElementSibling.click();
        });
        imageForInputs[i].addEventListener('change', function () {
            var aktImageForInput = this;
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    aktImageForInput.nextElementSibling.setAttribute('src', e.target.result);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    /* ------------------------------
     *  select form item placeholder
     * ------------------------------ */

    var selects = document.getElementsByClassName('form-select');
    for (var i = 0; i < selects.length; i++) {
        if (selects[i].hasAttribute('required') && selects[i].firstElementChild.value === '') {
            selects[i].firstElementChild.setAttribute('hidden', 'hidden');
        }
        if (selects[i].options[selects[i].selectedIndex].text !== selects[i].firstElementChild.innerHTML) {
            selects[i].classList.add('normalColor');
        }
        selects[i].addEventListener('change', function () {
            if (!this.classList.contains('normalColor')) {
                this.classList.add('normalColor');
            }
        });
    }

    /* ------------
     *  hover-zoom
     * ------------ */

    var hoverZoomDiv = document.querySelectorAll('.hover-zoom');
    var hoverZoomImages = document.querySelectorAll('.hover-zoom img');
    for (var i = 0; i < hoverZoomImages.length; i++) {
        hoverZoomBox = document.createElement('div');
        hoverZoomBox.classList.add('o-hidden');
        hoverZoomBox.innerHTML = hoverZoomImages[i].outerHTML;
        hoverZoomDiv[i].replaceChild(hoverZoomBox, hoverZoomImages[i]);
    }

    /* ----------------
     *  offcanvas menu
     * ---------------- */

    if (document.querySelectorAll('.modal.from-right .modal-content').length > 0) {
        var offCanvasModalContent = document.querySelectorAll('.modal.from-right .modal-content')[0];
        setoffCanvasModalContentHeight();
        window.addEventListener('resize', setoffCanvasModalContentHeight);

        function setoffCanvasModalContentHeight() {
            offCanvasModalContent.style.height = window.innerHeight + 'px';
        }

        var offCanvasModalMenuItems = document.querySelectorAll('.modal.from-right .nav-link');
        for (var i = 0; i < offCanvasModalMenuItems.length; i++) {
            offCanvasModalMenuItems[i].addEventListener('click', function () {
                var closeBtn = document.querySelectorAll('.modal.from-right .btn-close')[0];
                closeBtn.click();
            });
        }

        var offCanvasModal = document.querySelectorAll('.modal.from-right')[0];
        offCanvasModal.addEventListener('hidden.bs.modal', function (event) {
            offCanvasModal.style.display = 'block';
            var offCanvasTimer = setTimeout(function () {
                offCanvasModal.style.display = 'none';
            }, 600);
        });
    }
    
    /* ----------
     *  parallax
     * ---------- */

    var parallaxes = document.querySelectorAll('.parallax');
    for (var i = 0; i < parallaxes.length; i++) {
        parallaxes[i].style.backgroundImage = 'url('+parallaxes[i].getAttribute('data-img-src')+')';
    }

    parallaxScroll();
    window.addEventListener('scroll', parallaxScroll);
    window.addEventListener('resize', parallaxScroll);

    function parallaxScroll() {
        for (var i = 0; i < parallaxes.length; i++) {
            if (parallaxes[i].getAttribute('data-speed') < 0 || parallaxes[i].getAttribute('data-speed') > 1) {
                parallaxes[i].setAttribute('data-speed', 0);
            }
            parallaxes[i].originalPosY = parallaxes[i].offsetTop;
            parallaxes[i].style.backgroundPositionY = -parallaxes[i].getAttribute('data-speed') * (window.pageYOffset - parallaxes[i].originalPosY) + 'px';
        }
    }

    /* -------
     *  toTop
     * ------- */

    if (document.getElementById('toTop') !== null) {
        var toTopStyle = getComputedStyle(document.getElementById('toTop'));
        var toTopDiv = document.getElementById('toTop');
        var toTopInnerDiv = document.createElement('div');

        toTopInnerDiv.style.width = "0px";
        toTopInnerDiv.style.height = "0px";
        toTopInnerDiv.style.borderBottom = "solid "+toTopStyle.color+" 20px";
        toTopInnerDiv.style.borderLeft = "solid transparent 10px";
        toTopInnerDiv.style.borderRight = "solid transparent 10px";
        toTopDiv.innerHTML = toTopInnerDiv.outerHTML;

        toTopDiv.style.position = "fixed";
        toTopDiv.style.right = "0px";
        toTopDiv.style.bottom = "0px";
        toTopDiv.style.zIndex = "100000";
        toTopDiv.style.display = "none";

        var toTopLink = document.createElement('a');
        toTopLink.setAttribute('href', '#');
        toTopDiv.before(toTopLink);
        toTopLink.appendChild(toTopDiv);

        setToTop();
        window.addEventListener("scroll", setToTop);

        function setToTop() {
            toTopDiv.style.display = window.scrollY >= 200 ? "block" : "none";
        }
    }

    /* ----------
     *  whitebox
     * ---------- */

    var wbLinks = document.getElementsByClassName('wb-link');

    for (var i = 0; i < wbLinks.length; i++) {
        wbLinks[i].addEventListener('click', function (event) {
            event.preventDefault();
            document.body.style.overflow = 'hidden';

            lgImgFadeInTimer = setInterval(function () {}, 1);
            lgImgFadeOutTimer = setInterval(function () {}, 1);
            lgImgLoadTimer = setInterval(function () {}, 1);

            var firstScriptTag = document.getElementsByTagName('script')[0];

            // WhiteBox Container
            var whiteBoxContainer = document.createElement('div');
            whiteBoxContainer.setAttribute('id', 'wb-container');
            whiteBoxContainer.style.position = 'absolute';
            whiteBoxContainer.style.top = window.scrollY + 'px';
            whiteBoxContainer.style.left = 0;
            whiteBoxContainer.style.width = '100%';
            whiteBoxContainer.style.height = '100%';
            whiteBoxContainer.style.zIndex = 10000;
            document.body.insertBefore(whiteBoxContainer, firstScriptTag);

            // Background
            var wbBg = document.createElement('div');
            wbBg.setAttribute('id', 'wb-bg');
            wbBg.style.position = 'absolute';
            wbBg.style.top = 0;
            wbBg.style.left = 0;
            wbBg.style.width = '100%';
            wbBg.style.height = '100%';
            wbBg.style.backgroundColor = 'rgba(0, 0, 0, 1)';
            wbBg.style.zIndex = 10001;
            document.body.insertBefore(wbBg, firstScriptTag);
            whiteBoxContainer.appendChild(wbBg);

            // Wait
            var wbWait = document.createElement('div');
            wbWait.classList.add('spinner-grow');
            wbWait.classList.add('text-light');
            wbWait.setAttribute('role', 'status');
            wbWait.style.position = 'absolute';
            wbWait.style.left = 'calc(50% - 25px)';
            wbWait.style.top = 'calc(50% - 25px)';
            wbWait.style.width = '50px';
            wbWait.style.height = '50px';
            wbWait.style.zIndex = 10008;
            wbWait.style.display = 'none';
            whiteBoxContainer.appendChild(wbWait);

            // wbData
            var lgImgLink = event.target.parentElement;
            var wbGroupName = lgImgLink.getAttribute('data-whitebox'); // pl. #group-1, #group-2...
            wbGroupName = wbGroupName.substring(1); // pl. group-1, group-2...
            var wbData = [];
            var j = 0;
            for (var i = 0; i < wbLinks.length; i++) {
                if (wbLinks[i].getAttribute('data-whitebox') === '#' + wbGroupName) {
                    wbData.push({href: wbLinks[i].getAttribute('href'), title: wbLinks[i].getAttribute('title')});
                    if (wbLinks[i].getAttribute('href') === lgImgLink.getAttribute('href')) {
                        var aktImgNum = j;
                    }
                    j++;
                }
            }

            // Close Button
            var wbCloseBtn = document.createElement('button');
            wbCloseBtn.classList.add('btn-close');
            wbCloseBtn.classList.add('btn-close-white');
            wbCloseBtn.style.position = 'absolute';
            wbCloseBtn.style.right = '2%';
            wbCloseBtn.style.top = '3%';
            wbCloseBtn.style.zIndex = 10005;
            whiteBoxContainer.appendChild(wbCloseBtn);
            wbCloseBtn.addEventListener('click', function () {
                onLoad = false;
                clearInterval(lgImgLoadTimer);
                clearInterval(lgImgFadeInTimer);
                clearInterval(lgImgFadeOutTimer);
                window.removeEventListener('resize', setLgImg);
                whiteBoxContainer.remove();
                document.body.style.overflow = 'auto';
            });

            // Left Button
            var wbLeftBtn = document.createElement('a');
            wbLeftBtn.classList.add('carousel-control-prev-icon');
            wbLeftBtn.style.position = 'absolute';
            wbLeftBtn.style.left = '2%';
            wbLeftBtn.style.top = 'calc(50% - 13px)';
            wbLeftBtn.style.cursor = 'pointer';
            wbLeftBtn.style.zIndex = 10006;
            whiteBoxContainer.appendChild(wbLeftBtn);
            wbLeftBtn.addEventListener('click', function () {
                aktImgNum -= 1;
                if (aktImgNum < 0) {
                    aktImgNum = wbData.length - 1;
                }
                clearInterval(lgImgFadeInTimer);
                clearInterval(lgImgFadeOutTimer);
                lgImgFadeOutTimer = setInterval(function () {
                    lgImg.style.opacity = parseFloat(lgImg.style.opacity) - 0.02;
                    if (parseFloat(lgImg.style.opacity) <= 0) {
                        lgImg.style.opacity = 0;
                        clearInterval(lgImgFadeOutTimer);
                        refreshLgImg();
                    }
                }, 10);
            });

            // Right Button
            var wbRightBtn = document.createElement('a');
            wbRightBtn.classList.add('carousel-control-next-icon');
            wbRightBtn.style.position = 'absolute';
            wbRightBtn.style.right = '2%';
            wbRightBtn.style.top = 'calc(50% - 13px)';
            wbRightBtn.style.cursor = 'pointer';
            wbRightBtn.style.zIndex = 10007;
            whiteBoxContainer.appendChild(wbRightBtn);
            wbRightBtn.addEventListener('click', function () {
                aktImgNum += 1;
                if (aktImgNum > wbData.length - 1) {
                    aktImgNum = 0;
                }
                clearInterval(lgImgFadeInTimer);
                clearInterval(lgImgFadeOutTimer);
                lgImgFadeOutTimer = setInterval(function () {
                    lgImg.style.opacity = parseFloat(lgImg.style.opacity) - 0.02;
                    if (parseFloat(lgImg.style.opacity) <= 0) {
                        lgImg.style.opacity = 0;
                        clearInterval(lgImgFadeOutTimer);
                        refreshLgImg();
                    }
                }, 10);
            });

            // Title
            var wbTitle = document.createElement('p');
            wbTitle.classList.add('wb-title');
            wbTitle.style.textAlign = 'center';
            wbTitle.style.width = '100%';
            wbTitle.style.position = 'absolute';
            wbTitle.style.left = 0;
            wbTitle.style.zIndex = 10003;
            whiteBoxContainer.appendChild(wbTitle);

            // Number Label
            var wbNumberLabel = document.createElement('p');
            wbNumberLabel.classList.add('wb-numberlabel');
            wbNumberLabel.style.textAlign = 'center';
            wbNumberLabel.style.width = '100%';
            wbNumberLabel.style.position = 'absolute';
            wbNumberLabel.style.left = 0;
            wbNumberLabel.style.zIndex = 10004;
            whiteBoxContainer.appendChild(wbNumberLabel);

            var lgImg = document.createElement('img');
            window.addEventListener('resize', setLgImg);
            refreshLgImg();

            function refreshLgImg() {
                lgImg.remove();
                wbWait.style.display = 'block';
                lgImg = document.createElement('img');

                wbTitle.innerHTML = wbData[aktImgNum].title;
                wbNumberLabel.innerHTML = (aktImgNum + 1) + ' / ' + wbData.length;

                // Large Image
                lgImg.style.display = 'none';
                lgImg.style.opacity = 0;
                lgImg.setAttribute('src', wbData[aktImgNum].href);
                lgImg.setAttribute('alt', wbData[aktImgNum].title);
                lgImg.style.position = 'absolute';
                lgImg.style.border = 'solid 6px #fff';
                lgImg.style.width = 'auto';
                lgImg.style.zIndex = 10002;
                whiteBoxContainer.appendChild(lgImg);

                clearInterval(lgImgFadeInTimer);
                clearInterval(lgImgFadeOutTimer);

                onLoad = true;
                setLgImg();
            }

            function setLgImg() {
                clearInterval(lgImgLoadTimer);
                lgImgLoadTimer = setInterval(function () {
                    if (lgImg.naturalWidth > 0) {
                        if (onLoad) {
                            onLoad = false;
                            clearInterval(lgImgLoadTimer);
                            clearInterval(lgImgFadeInTimer);
                            clearInterval(lgImgFadeOutTimer);
                            lgImgFadeInTimer = setInterval(function () {
                                lgImg.style.opacity = parseFloat(lgImg.style.opacity) + 0.02;
                                if (parseFloat(lgImg.style.opacity) >= 1) {
                                    lgImg.style.opacity = 1;
                                    clearInterval(lgImgFadeInTimer);
                                }
                            }, 10);
                        }
                        wbWait.style.display = 'none';
                        lgImg.style.maxWidth = 4/5 * window.innerWidth + 'px';
                        lgImg.style.maxHeight = 4/5 * window.innerHeight + 'px';
                        lgImg.style.display = 'block';
                        lgImg.style.top = Math.round((window.innerHeight - lgImg.clientHeight) / 2) - 6 + 'px';
                        lgImg.style.left = Math.round((window.innerWidth - lgImg.clientWidth) / 2 - 6) + 'px';
                        wbNumberLabel.style.top = Math.round((window.innerHeight - lgImg.clientHeight) / 2 - 50) + 'px';
                        wbTitle.style.top = Math.round(lgImg.clientHeight + (window.innerHeight - lgImg.clientHeight) / 2 + 10) + 'px';
                        whiteBoxContainer.style.top = Math.round(window.scrollY) + 'px';
                    }
                }, 10);
            }
        });
    }

});