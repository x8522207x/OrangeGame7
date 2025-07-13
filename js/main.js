let startY = 0;

$(document).ready(() => {
    window.addEventListener('resize', updateMaxVH);

    $('.modal_wrap').css('display', 'none');
    setTimeout(() => {
        $('.loading').remove();
        $('.modal').toggleClass('hide');
        $('.modal_wrap').css('display', '');
    }, 1000);

    ['.event_banner', '.event_gnb_menu'].forEach(ele => $(ele).on('click', () => {
        $('.event_banner').toggleClass('-open');
    }));

    $('.event_gnb_gamestart').on('click', () => {
        window.open("https://galaxy.beanfun.com/webapi/view/login/twp?redirect_url=https://warsofprasia.beanfun.com/Main");
    });

    $('.modal_close').on('click', () => {
        $('.plate_modal').toggleClass('-active');
        $('.modal.type--youtube').toggleClass('hide');
        $('.modal_box_veil').toggleClass('-hide');
        $('.modal').css('opacity', '0');
        $('.youtube--2').remove();
    });

    $('._video-button').on('click', () => {
        openVideo('POTYvJrDwp4');
    });

    function pcTouchMove(swiper) {
        return (e) => {
            if ($(window).height() < 911) {
                handleSmallHeight(swiper, e);
            } else {
                swiper.allowTouchMove = true;
            }
        };
    }

    let pcSwiperPage, pcWheelHandler, pcTouchMoveHandler, mobileSwiperPage;

    function pcTouchStart(e) {
        startY = e.touches[0].clientY;
    }

    function pcWheel(swiper) {
        return e => {
            e.stopPropagation();
            const currentSlide = swiper.slides[swiper.activeIndex];
            const slideScrollTop = currentSlide.scrollTop;
            const scrollHeight = currentSlide.scrollHeight;
            const clientHeight = currentSlide.clientHeight;
            const isAtTop = slideScrollTop === 0;
            const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);
            if (swiper.realIndex === 0) {
                if (isAtBottom && e.deltaY > 0) {
                    swiper.slideTo(swiper.realIndex + 1);
                }
            } else if ([1].includes(swiper.realIndex)) {
                if (isAtTop && e.deltaY < 0) {
                    swiper.slideTo(swiper.realIndex - 1);
                } else if (isAtBottom && e.deltaY > 0) {
                    swiper.slideTo(swiper.realIndex + 1);
                }
            } else {
                if (isAtTop && e.deltaY < 0) {
                    swiper.slideTo(swiper.realIndex - 1);
                }
            }
        };
    }

    const pcSwiper = () => {
        pcSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
            },
            loop: false,
            freeMode: false,
            noSwiping: true,
            noSwipingSelector: 'button',
            autoHeight: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            watchSlidesProgress: true,
            allowTouchMove: false,
            on: {
                init: (swiper) => {
                    pcTouchMoveHandler = pcTouchMove(swiper);
                    pcWheelHandler = pcWheel(swiper);
                    $('.UNI-footer').clone().appendTo('.section--contest');
                    $('.UNI-footer')[1]?.remove();
                    $('.UNI-footer').css('z-index', 100).css('position', 'absolute').css('width', '100%').css('height', 80).css('bottom', 0);

                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                        swiper.slides.forEach(slide => {
                            slide.scrollTop = 0;
                        })
                    });

                    $('._scroll').on('click', () => {
                        swiper.slideTo(1);
                    });

                    $('.UNI-footer').css('display', 'none');

                    document.querySelectorAll('.swiper-slide').forEach(node => {
                        node.addEventListener('wheel', pcWheelHandler, { passive: true });
                        node.addEventListener('touchmove', pcTouchMoveHandler, { passive: true });
                        node.addEventListener('touchstart', pcTouchStart, { passive: true });
                    });
                },
                slideChange: (swiper) => {
                    ['-active'].forEach(cl => ['.depth_1'].forEach(ele => $(ele).removeClass(cl)));
                    $('.depth_1')[swiper.realIndex].classList.add('-active');
                    $('.swiper-slide').off('scroll');
                    $('.swiper-slide').removeClass('scrollable');
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');
                    $('.swiper-slide')[swiper.realIndex].classList.add('scrollable');

                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    const g = gsap.timeline({
                        defaults: {
                            clearProps: "all",
                            ease: "power2.out",
                            duration: .7,
                            overwrite: !0
                        }
                    });

                    const visual = $(".area__visual");
                    const title = $("._title");
                    const desc = $("._description");
                    const period = $("._period");
                    const content = $("._content");
                    if (swiper.realIndex === 0) {
                        const videoBtn = $("._video-button");
                        const item = $("._item");
                        g.from(visual, {
                            opacity: .8,
                            filter: "brightness(1.5) contrast(1.2)",
                            duration: 4
                        }, 0);
                        g.from(title, {
                            opacity: 0,
                            duration: 1.2,
                            y: -20,
                            filter: "blur(10px)",
                            ease: "power2.out",
                            scale: .9
                        }, .2);
                        g.from(period, {
                            opacity: 0,
                            duration: .7,
                            y: 20
                        }, .4);
                        g.from(videoBtn, {
                            opacity: 0,
                            duration: .7,
                            y: 20
                        }, .6);
                        g.from(item, {
                            opacity: 0,
                            duration: .7,
                            y: 20
                        }, .8);
                    } else if (swiper.realIndex === 1) {
                        const link = $("._detail-link");
                        g.from(visual, {
                            opacity: .8,
                            filter: "brightness(1.5) contrast(1.2)",
                            duration: 4
                        }, 0);
                        g.from(title, {
                            opacity: 0,
                            y: -20
                        }, .4);
                        g.from(desc, {
                            opacity: 0,
                            y: 20
                        }, .6);
                        g.from(period, {
                            opacity: 0,
                            y: 20
                        }, .7);
                        g.from(content, {
                            opacity: 0,
                            y: 30,
                            filter: "blur(30px)"
                        }, .9);
                        g.from(link, {
                            opacity: 0,
                            duration: .5,
                            y: 20
                        }, 1.2);
                    } else if (swiper.realIndex === 2) {
                        g.from(visual, {
                            opacity: .8,
                            filter: "brightness(1.5) contrast(1.2)",
                            duration: 4
                        }, 0);
                        g.from(title, {
                            opacity: 0,
                            y: -20
                        }, .4);
                        g.from(desc, {
                            opacity: 0,
                            y: 20
                        }, .6);
                        g.from(period, {
                            opacity: 0,
                            y: 20
                        }, .7);
                        g.from(content, {
                            opacity: 0,
                            y: 30,
                            filter: "blur(30px)"
                        }, .9);
                        $('.UNI-footer').css('display', 'block');
                    }
                },
            }
        });

        $('.swiper-slide')[0].classList.add('scrollable');
        pcSwiperPage.slideTo(0);
        $('.depth_1')[0].classList.add('-active');

        for (let i = 0; i < 3; i++) {
            addPageClick(i, pcSwiperPage);
        }
    };

    const mbSwiper = () => {
        mobileSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            slidesPerView: "auto",
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
                enabled: true,
            },
            loop: false,
            freeMode: {
                enabled: true,
                sticky: false,
                momentumBounce: false,
            },
            autoHeight: true,
            speed: 0,
            passiveListeners: true,
            allowTouchMove: true,
            on: {
                init: (swiper) => {
                    $('.UNI-footer').clone().appendTo('.section--contest');
                    $('.UNI-footer')[1]?.remove();
                    $('.UNI-footer').css('z-index', 100).css('position', 'absolute').css('width', '100%').css('height', 80).css('bottom', 0);

                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                        swiper.slides.forEach(slide => {
                            slide.scrollTop = 0;
                        })
                    });

                    $('._scroll').on('click', () => {
                        swiper.slideTo(1);
                    });

                    $('.UNI-footer').css('display', 'none');
                },
                slideChange: (swiper) => {
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');

                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if (swiper.realIndex === 2) {
                        $('.UNI-footer').css('display', 'block');
                    }
                },
            }
        });

        mobileSwiperPage.slideTo(0);
    };

    if ($(window).width() > 768) {
        $('.event_gnb').addClass('type_clear');
        $('.event_gnb').removeClass('type_default');
        pcSwiper();
        $('.fullpage-section').removeClass('-disabled');
    } else {
        $('.event_gnb').removeClass('type_clear');
        $('.event_gnb').addClass('type_default');
        $('.fullpage-section').addClass('-disabled');
        mbSwiper();
    }

    function updateMaxVH() {
        const root = document.documentElement;
        const newMaxVh = `${window.innerHeight}px`;
        root.style.setProperty('--maxvh', newMaxVh);
        if ($(window).width() > 768) {
            if (mobileSwiperPage) {
                mobileSwiperPage.destroy(true, true); // 銷毀 Swiper 實例
                mobileSwiperPage = null; // 重置為 null
            }

            $('.event_gnb').addClass('type_clear');
            $('.event_gnb').removeClass('type_default');
            $('.fullpage-section').removeClass('-disabled');

            if (pcSwiperPage) {
                pcSwiperPage.update();
            } else {
                setTimeout(() => pcSwiper());
            }
        } else {
            if (pcSwiperPage) {
                pcSwiperPage.destroy(true, true); // 銷毀 Swiper 實例
                pcSwiperPage = null; // 重置為 null
                document.querySelectorAll('.swiper-slide').forEach(node => {
                    node.removeEventListener('wheel', pcWheelHandler, { passive: true });
                    node.removeEventListener('touchmove', pcTouchMoveHandler, { passive: true });
                    node.removeEventListener('touchstart', pcTouchStart, { passive: true });
                });
            }

            if (mobileSwiperPage) {
                mobileSwiperPage.update();
            } else {
                setTimeout(() => mbSwiper());
            }
            $('.event_gnb').removeClass('type_clear');
            $('.event_gnb').addClass('type_default');
            $('.fullpage-section').addClass('-disabled');
        }
    }
});

const handleSmallHeight = (swiper, event) => {
    swiper.allowTouchMove = false;
    event.stopPropagation();

    const currentY = event.touches[0].clientY;
    let direction = '';
    if (currentY > startY) {
        direction = 'down';  // 向下移动
    } else if (currentY < startY) {
        direction = 'up';    // 向上移动
    }

    const currentSlide = swiper.slides[swiper.activeIndex];
    const slideScrollTop = currentSlide.scrollTop;
    const scrollHeight = currentSlide.scrollHeight;
    const clientHeight = currentSlide.clientHeight;
    const isAtTop = slideScrollTop === 0;
    const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);

    if (isAtTop) {
        if (swiper.realIndex !== 0) {
            swiper.allowTouchMove = true;
            if (direction === 'down') {
                swiper.slideTo(swiper.realIndex - 1);
            }
        }
    } else if (isAtBottom) {
        swiper.allowTouchMove = true;
        if (direction === 'up') {
            swiper.slideTo(swiper.realIndex + 1);
        }
    }
};

const addPageClick = (index, swiper) => {
    $(`.page_p${index + 1}`).on('click', () => {
        swiper.slideTo(index);
    });
};

const openVideo = (video, path) => {
    $('.plate_modal').toggleClass('-active');
    $('.modal').css('opacity', '1').css('visibility', 'inherit');
    $('.modal.type--youtube').toggleClass('hide');
    $('.modal_box_veil').toggleClass('-hide');
    if (video) {
        $('.modal_source').append(
            `<iframe width="auto" height="auto" class="modal_youtube youtube--2"
        src="https://www.youtube.com/embed/${video}?autoplay=1"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>`);
    } else if (path) {
        $('.modal_source').append(
            `<video class="modal_youtube youtube--2" loop autoplay playsinline controls controlslist="nodownload" preload="metadata"><source src=${path} type="video/mp4"></video>`);
    }
};

