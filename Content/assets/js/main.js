(function () {
    "use strict";

    /**
     * Init AOS
     */
    function initAOS() {
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 600,
                easing: "ease-out",
                once: true
            });
        }
    }

    /**
     * Init Swiper sliders
     */
    function initSwiper() {
        if (typeof Swiper === "undefined") {
            return;
        }

        document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
            const configElement = swiperElement.querySelector(".swiper-config");

            if (!configElement) {
                return;
            }

            let config;

            try {
                config = JSON.parse(configElement.textContent.trim());
            } catch (error) {
                console.error("Swiper configuration error:", error);
                return;
            }

            if (
                swiperElement.classList.contains("swiper-tab") &&
                typeof initSwiperWithCustomPagination === "function"
            ) {
                initSwiperWithCustomPagination(swiperElement, config);
            } else {
                new Swiper(swiperElement, config);
            }
        });
    }

    /**
     * Init GLightbox
     */
    function initGLightbox() {
        if (
            typeof GLightbox !== "undefined" &&
            document.querySelector(".glightbox")
        ) {
            GLightbox({
                selector: ".glightbox"
            });
        }
    }

    /**
     * Initialize everything
     */
    window.addEventListener("load", function () {
        initAOS();
        initSwiper();
        initGLightbox();
    });
})();