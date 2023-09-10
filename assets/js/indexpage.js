window.addEventListener("resize", introSlider())

function dotSlider() {
    const portfSliderLine = document.querySelector(".portfus-slider"),
    portfTrackViewer = document.querySelector(".portfus-slider__viewer"),
    dots = document.querySelectorAll(".dots__nav"),
    portfSlider = document.querySelectorAll(".iframe")

    let pSliderIndex, pCount, pWidth = 0;
    pCount = portfSlider.length;
    pWidth = portfSliderLine.offsetWidth

    if(screen.width < 1024) {
        portfTrackViewer.style.width = pWidth * pCount + "px";

        dots[0].classList.add("dots__nav--active")
        dots.forEach((item, index) => {
            item.addEventListener("click", () => {
                for(let i = 0; i < dots.length; i++) {
                    dots[i].classList.remove("dots__nav--active")
                }
                pSliderIndex = index;
        
                dots[index].classList.add("dots__nav--active")
                portfTrackViewer.style.transform = "translate(-" + pSliderIndex * pWidth + "px)";
            })
            
        })
    }
}


function introSlider() {
    let slider = document.querySelector('.intro__inner'),
        sliderList = slider.querySelector('.intro__slider'),
        sliderTrack = slider.querySelector('.viewport__sl'),
        slides = slider.querySelectorAll('.slider'),
        arrowPrev = slider.querySelector('.arrow-left'),
        arrowNext = slider.querySelector('.arrow-right'),
        width,
        count = slides.length,
        slideWidth = sliderList.offsetWidth,
        slideIndex = 0,
        posInit = 0,
        posX1 = 0,
        posX2 = 0,
        posY1 = 0,
        posY2 = 0,
        posFinal = 0,
        isSwipe = false,
        isScroll = false,
        allowSwipe = true,
        transition = true,
        nextTrf = 0,
        prevTrf = 0,
        lastTrf = --slides.length * slideWidth,
        posThreshold = slides[0].offsetWidth * 0.35,
        trfRegExp = /([-0-9.]+(?=px))/,
        swipeStartTime,
        swipeEndTime,
    getEvent = function() {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slide = function() {
        if (transition) {
        sliderTrack.style.transition = 'transform .5s';
        }
        sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
    },
    swipeStart = function() {
        let evt = getEvent();

        if (allowSwipe) {

        swipeStartTime = Date.now();
        
        transition = true;

        nextTrf = (slideIndex + 1) * -slideWidth;
        prevTrf = (slideIndex - 1) * -slideWidth;

        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;

        sliderTrack.style.transition = '';

        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);

        sliderList.classList.remove('grab');
        sliderList.classList.add('grabbing');
        }
    },
    swipeAction = function() {

        let evt = getEvent(),
        style = sliderTrack.style.transform,
        transform = +style.match(trfRegExp)[0];

        posX2 = posX1 - evt.clientX;
        posX1 = evt.clientX;

        posY2 = posY1 - evt.clientY;
        posY1 = evt.clientY;

        if (!isSwipe && !isScroll) {
        let posY = Math.abs(posY2);
        if (posY > 7 || posX2 === 0) {
            isScroll = true;
            allowSwipe = false;
        } else if (posY < 7) {
            isSwipe = true;
        }
        }

        if (isSwipe) {
        if (slideIndex === 0) {
            if (posInit < posX1) {
            setTransform(transform, 0);
            return;
            } else {
            allowSwipe = true;
            }
        }

        // запрет ухода вправо на последнем слайде
        if (slideIndex === --slides.length) {
            if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
            } else {
            allowSwipe = true;
            }
        }

        if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
            reachEdge();
            return;
        }

        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
        }

    },
    swipeEnd = function() {
        posFinal = posInit - posX1;

        isScroll = false;
        isSwipe = false;

        document.removeEventListener('touchmove', swipeAction);
        document.removeEventListener('mousemove', swipeAction);
        document.removeEventListener('touchend', swipeEnd);
        document.removeEventListener('mouseup', swipeEnd);

        sliderList.classList.add('grab');
        sliderList.classList.remove('grabbing');

        if (allowSwipe) {
        swipeEndTime = Date.now();
        if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
            if (posInit < posX1) {
            slideIndex--;
            } else if (posInit > posX1) {
            slideIndex++;
            }
        }

        if (posInit !== posX1) {
            allowSwipe = false;
            slide();
        } else {
            allowSwipe = true;
        }

        } else {
        allowSwipe = true;
        }

    },
    setTransform = function(transform, comapreTransform) {
        if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
            sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
        }
        allowSwipe = false;
    },
    reachEdge = function() {
        transition = false;
        swipeEnd();
        allowSwipe = true;
    };

    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    sliderList.classList.add('grab');

    sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
    slider.addEventListener('touchstart', swipeStart);
    slider.addEventListener('mousedown', swipeStart);

    arrowPrev.addEventListener('click', function() {
        if(slideIndex < count - 2) {
            slideIndex = slides.length - 1;
        }else {
            slideIndex--;
        }

    slide();
    })
    arrowNext.addEventListener('click', function() {
        if(slideIndex >= count - 1) {
            slideIndex = 0;
        }else {
            slideIndex++;
        }
        slide();
    })
    function resWidth() {
    width = document.querySelector('.intro__slider').offsetWidth;
    sliderTrack.style.width = width * slides.length + 'px';

    } 
    resWidth()
}

function showSlides(index, slideIndexW, trackWidth, sliderLine) {
    console.log(index)
    return sliderLine[index].style.transform = `translate3d(-${slideIndexW * trackWidth}px, 0px, 0px)`
}

function nextSlide(slideIndexW) {
    if(slideIndexW >= 2) {
        return slideIndexW = 0;
    }else {
        return ++slideIndexW;
    }
    
}

function prevSlide(slideIndexW) {
    if(slideIndexW <= 0) {
        return slideIndexW = 2;
    }else {
        return --slideIndexW;
    }
}

function sliderFeedback() {
    const sliderLine = document.querySelectorAll(".feedback__track")
    const arrowsLeft = document.querySelectorAll(".f__arrows-left")
    const arrowsRight = document.querySelectorAll(".f__arrows-right")
    const slidesT = document.querySelectorAll(".slide");

    let trackWidth;
    let countF = 3;
    let slideIndexW = 0;

    trackWidth = document.querySelector(".feedback__slider").offsetWidth;
    for(let i = 0; i < sliderLine.length; i++) {
        sliderLine[i].style.width = trackWidth * countF + 'px'
    }

    arrowsLeft.forEach((item, index) => {
        item.addEventListener("click", () => {
            slideIndexW = prevSlide(slideIndexW)
            showSlides(index, slideIndexW, trackWidth, sliderLine)
        })
    })

    arrowsRight.forEach((item, index) => {
        item.addEventListener("click", () => {
            slideIndexW = nextSlide(slideIndexW)
            showSlides(index, slideIndexW, trackWidth, sliderLine)
        })
    })
}   

sliderFeedback()

introSlider()
dotSlider()