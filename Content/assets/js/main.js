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
     * Service Tabs
     */
    function initServiceTabs() {
        const tabs = document.querySelectorAll('input[name="svc"]');
        const tabLabels = document.querySelectorAll(".tab-label");
        const tabPanels = document.querySelectorAll(".tab-panel");

        if (!tabs.length || !tabLabels.length || !tabPanels.length) {
            return;
        }

        function updateTabs() {
            tabs.forEach((tab, index) => {
                const panel = document.getElementById(`panel${index + 1}`);
                const label = document.querySelector(`.tab-label[for="${tab.id}"]`);

                if (tab.checked) {
                    panel?.classList.add("active");
                    label?.classList.add("active");
                } else {
                    panel?.classList.remove("active");
                    label?.classList.remove("active");
                }
            });
        }

        tabs.forEach((tab) => {
            tab.addEventListener("change", updateTabs);
        });

        updateTabs();
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
        initServiceTabs();
        initGLightbox();
    });
})();