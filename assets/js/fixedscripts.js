let scrollToUp = 0;

window.addEventListener("scroll", (e) => {
    scrollToUp = window.pageYOffset;
    arrowToTop(e)
}, {passive: true});


window.addEventListener("resize", innerHeaderText())

function closeModal(bodySroll, overlay, classModal, classForRemove) {
    const closeBtn = document.querySelector(".feedback__leave-close"),
          closeBtnImg = document.querySelector("close-img");

    closeBtn.addEventListener("click", (e) => {
        console.log(e.target === closeBtn || e.target === closeBtnImg)
        bodySroll.classList.remove("no-scroll")
        classModal.classList.remove(`${classForRemove}`)
        overlay.classList.remove("overlay--active")

        classModal.remove()

    })
}

function overlayButtonCloseModal(bodyScroll, classModal, classForRemove) {
    const overlay = document.querySelector(".overlay");

    overlay.addEventListener("click", (e) => {
        if(e.target === overlay) {
            overlay.classList.remove("overlay--active")
            bodyScroll.classList.remove("no-scroll")
            classModal.classList.remove(classForRemove)

            classModal.remove()
        }
    })
}

function burgerMenu() {
    const burger = document.querySelector(".burger"),
          navMenu = document.querySelector(".menu"),
          headerBurger = document.querySelector(".header__burger"),
          menuItems = Array.from(document.querySelectorAll(".menu__item")),
          menuPage = document.querySelector(".menu__list");

    burger.addEventListener("click", (e) => {
        burger.classList.toggle("active")
        navMenu.classList.toggle("nav__block--open")
    })

    document.addEventListener("click", (e) => {
        let getIndexClick = menuItems.indexOf(e.target.parentElement)
        let itsMenu = e.target == menuPage
        let itsBurger = e.target.parentElement == burger || e.target.parentElement == headerBurger;

        if(e.target.parentElement != menuItems[getIndexClick] && !itsMenu && !itsBurger) {
            burger.classList.remove("active")
            navMenu.classList.remove("nav__block--open")
        }
    })

}

function innerHeaderText() {
    const innerTextHeader = document.querySelectorAll(".buttons-main__title")
    let textForInner = ['Замерщик', 'Проект']
    if(screen.width <= 950) {
        innerTextHeader[1].innerHTML = textForInner[0];
    }
    if(screen.width <= 500) {
        innerTextHeader[0].innerHTML = textForInner[1];
    }
}

function footerList() {
    const buttonChoice = document.querySelectorAll(".option__content-title"),
          contentChoice = document.querySelectorAll(".choice__footer"),
          contentArrows = document.querySelectorAll(".option__arrow")
          console.log(buttonChoice)
    buttonChoice.forEach((item, index) => {
        item.addEventListener("click", () => {
            console.log(true)
            contentChoice[index].classList.toggle("choice__footer--active")
            contentArrows[index].classList.toggle("option__arrow--active")
        })
    }) 
} 

function modalPopUp() {
       
    const projectandmeasurerBtn = document.querySelectorAll(".buttons__item"),
            bodyNoScroll = document.querySelector("body"),
            overlay = document.querySelector(".overlay");


    const measurerModalT = document.createElement("div"),
          templateMeasurer = `
          
          <div class="feedback__leave-close"> <img class="close-img" src="/assets/images/close.svg" alt=""/></div>
            <div class="modal__content"> 
                <div class="modal__content-title"> 
                <div class="title__logo"> <img src="/assets/images/headericon1.svg" alt=""/></div>
                <div class="content__title-f wrap--text">
                    Вызвать замерщика 
                    с образцами
                </div>
                </div>
                <div class="modal__content-inputs"> 
                <div class="content__get">
                    <label class="get__input">
                    <div class="input__text">Представьтесь</div>
                    <input class="get__form" type="text" placeholder="Ваше имя"/>
                    </label>
                    <label class="get__input">
                    <div class="input__text">Телефон</div>
                    <input class="get__form number__phone" type="text" placeholder="+7(000) 000-00-00"/>
                    </label>
                </div>
                </div>
                <div class="content__button-mod"> 
                <div class="content__button-btn-mod" id="measurer">Вызвать</div>
                </div>
            </div>
          
          `

    const projectModalT = document.createElement("div"),
          templateProject = `
          
            <div class="feedback__leave-close"> <img class="close-img" src="/assets/images/close.svg" alt=""/></div>
            <div class="modal__content"> 
                <div class="modal__content-title"> 
                <div class="title__logo"> <img src="/assets/images/headericon.svg" alt=""/></div>
                <div class="content__title-f">Проект + Расчет</div>
                </div>
                <div class="modal__content-inputs"> 
                <div class="content__get">
                    <label class="get__input">
                    <div class="input__text">Представьтесь</div>
                    <input class="get__form" type="text" placeholder="Ваше имя"/>
                    </label>
                    <label class="get__input">
                    <div class="input__text">Телефон</div>
                    <input class="get__form number__phone" type="text" placeholder="+7(000) 000-00-00"/>
                    </label>
                    <label class="get__input-file" for="get__file">
                    <div class="get__input-icon"> <img src="/assets/images/photoformmodal.svg" alt=""/></div>
                    <div class="get__input-text">
                        <div class="get__input-title">Не забудьте добавить фото</div>
                        <div class="get__input-formats">.jpg, .jpeg, .png менее 10 МБ    </div>
                        <input class="get__file" id="get__file" type="file" multiple="multiple"/>
                    </div>
                    </label>
                </div>
                </div>
                <div class="content__button-mod"> 
                <div class="content__button-btn-mod" id="projectcalc">Расчитать</div>
                </div>
            </div>
          
          `

    projectModalT.classList.add("project__modal")
    measurerModalT.classList.add("measurer__modal")
    console.log(overlay)

    projectandmeasurerBtn[0].addEventListener("click", (e) => {
        bodyNoScroll.append(projectModalT)
        projectModalT.innerHTML = templateProject;
        projectModalT.style.top = `${scrollToUp + 60}px`
        projectModalT.classList.toggle("project__modal--active")
        overlay.style.top = `${scrollToUp}px`
        overlay.classList.toggle("overlay--active")
        bodyNoScroll.classList.toggle("no-scroll")

        inputMask()

        if(projectModalT.classList.contains("project__modal--active")) {
            overlayButtonCloseModal(bodyNoScroll, projectModalT, "project__modal--active")

            closeModal(bodyNoScroll, overlay, projectModalT, "project__modal--active")
        }
    })

    projectandmeasurerBtn[1].addEventListener("click", (e) => {
        bodyNoScroll.append(measurerModalT)
        measurerModalT.innerHTML = templateMeasurer;
        measurerModalT.style.top = `${scrollToUp + 60}px`
        measurerModalT.classList.toggle("measurer__modal--active")
        overlay.style.top = `${scrollToUp}px`
        overlay.classList.toggle("overlay--active")
        bodyNoScroll.classList.toggle("no-scroll")

        inputMask()

        if(measurerModalT.classList.contains("measurer__modal--active")) {
            overlayButtonCloseModal(bodyNoScroll, measurerModalT, "measurer__modal--active")

            closeModal(bodyNoScroll, overlay, measurerModalT, "measurer__modal--active")
        }
    })

    projectandmeasurerBtn[2].addEventListener("click", (e) => {
        bodyNoScroll.append(projectModalT)
        projectModalT.innerHTML = templateProject;
        projectModalT.style.top = `${scrollToUp + 60}px`
        projectModalT.classList.toggle("project__modal--active")
        overlay.style.top = `${scrollToUp}px`
        overlay.classList.toggle("overlay--active")
        bodyNoScroll.classList.toggle("no-scroll")

        inputMask()

        if(projectModalT.classList.contains("project__modal--active")) {
            overlayButtonCloseModal(bodyNoScroll, projectModalT, "project__modal--active")

            closeModal(bodyNoScroll, overlay, projectModalT, "project__modal--active")
        }
    })

    projectandmeasurerBtn[3].addEventListener("click", (e) => {
        bodyNoScroll.append(measurerModalT)
        measurerModalT.innerHTML = templateMeasurer;
        measurerModalT.style.top = `${scrollToUp + 60}px`
        measurerModalT.classList.toggle("measurer__modal--active")
        overlay.style.top = `${scrollToUp}px`
        overlay.classList.toggle("overlay--active")
        bodyNoScroll.classList.toggle("no-scroll")

        inputMask()

        if(measurerModalT.classList.contains("measurer__modal--active")) {
            overlayButtonCloseModal(bodyNoScroll, measurerModalT, "measurer__modal--active")

            closeModal(bodyNoScroll, overlay, measurerModalT, "measurer__modal--active")
        }
    })
}

function arrowToTop(e) {
    const buttonArrowToTop = document.querySelector(".arrow-top")
    if(scrollToUp > 600) {
        buttonArrowToTop.classList.add("arrow-top--visible");
    }else {
        buttonArrowToTop.classList.remove("arrow-top--visible");
    }
    scrollToTop()
}

function scrollToTop() {
    const buttonArrowToTop = document.querySelector(".arrow-top")
    buttonArrowToTop.addEventListener("click", (e) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    })
}

function inputMask() {
    const inputNumber = document.querySelectorAll(".number__phone")
    let initText = '+7'
    inputNumber.forEach((item, index) => {
        item.addEventListener("focus", (e) => {
            if(!e.target.value.startsWith(initText)) {
                e.target.value = initText;
            }
        })
        item.addEventListener("blur", (e) => {
            if(e.target.value === initText) {
                e.target.value = "";
            }
        })
        })
}

footerList()

modalPopUp()

burgerMenu()