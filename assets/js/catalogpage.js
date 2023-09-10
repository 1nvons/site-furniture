function pagesListNav() {
    const pages = document.querySelectorAll(".page__cards"),
          btnNums = document.querySelectorAll(".page__list-item");
    btnNums[0].classList.add("page__list-item--active")
    pages[0].classList.add("page__cards--active")
    btnNums.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            let tmp = 0;
            tmp = e.target.textContent;
            for(let i = 0; i < pages.length; i++) {
                btnNums[i].classList.remove("page__list-item--active")
                pages[i].classList.remove("page__cards--active")   
            }
            if(tmp == '...') {
                console.log("hello")
            }else {
                tmp = +tmp - 1;
            }

            btnNums[tmp].classList.toggle("page__list-item--active")
            pages[tmp].classList.toggle("page__cards--active")
        })
    })
}

pagesListNav()
function dropFilter() {
    const parentClickFilter = document.getElementById("catalogfilters")
    const dropFilter = Array.from(document.querySelectorAll(".drop-list"))
    const filterTitle = document.querySelectorAll(".filters-list__title")
    parentClickFilter.addEventListener("click", (e) => {
        let indexClick = +e.target.getAttribute("data-index")
        if(e.target.nodeName == "LABEL"){
            dropFilter.forEach((item, index) => {
                if(indexClick != index) {
                    item.classList.remove("drop-list__item--dropped")
                }
            })

            if(indexClick == 5) {
                dropFilter[indexClick].style.right = "0"
            }
            dropFilter[indexClick].classList.toggle("drop-list__item--dropped")
        }
    })  

    const choice = Array.from(document.querySelectorAll(".drop-list__item-choice"))
    const listChoicePrice = Array.from(document.querySelectorAll(".price__filter"))
    document.addEventListener("click", (e) => {
        let indexClick = e.target.getAttribute("data-index")
        let target = e.target;
        let indexListClick = choice.indexOf(target.parentElement)
        let indexListInputClick = listChoicePrice.indexOf(target)
        for(let i = 0; i < dropFilter.length; i++) {
            if(dropFilter[i].classList.contains("drop-list__item--dropped")) {
                if(target.parentElement != choice[indexListClick] && target != filterTitle[indexClick] && target != listChoicePrice[indexListInputClick]) {
                    dropFilter.forEach(item => {
                        item.classList.remove("drop-list__item--dropped")
                    })
                }else {
                }
            }
        }
    })

}

function activeCheckBox() {
    const choice = document.querySelectorAll(".drop-list__item-choice"),
          checkBox = document.querySelectorAll(".drop-list__item-input");
    choice.forEach((item, index) => {
        item.addEventListener("click", (e) => {          
            if(checkBox[index].checked) {
                checkBox[index].checked = false;
            }else {
                checkBox[index].checked = true
            }
        })
    })
}

function dropListSort() {
    const sortTitle = document.querySelector(".select__title"),
            sortDrop = document.querySelector(".drop"),
            sortDropVariants = document.querySelectorAll(".drop__select-item"),
            sortSelectButton = document.querySelector(".select"),
            sortArrow = document.querySelector(".select__arrow");

    let tmp = String;
    function sortSelectButtonClick() {
        sortArrow.classList.toggle("sort__arrow--active")
        sortDrop.classList.toggle("drop--dropped")

    }

    sortSelectButton.addEventListener("click", (e) => { 
        sortSelectButtonClick()
    })

    document.addEventListener("click", (e) => {
        let its__sortSelect = e.target == sortSelectButton || sortSelectButton.contains(e.target)
        let its__active = sortDrop.classList.contains("drop--dropped")
        if(!its__sortSelect && its__active) {
            sortSelectButtonClick()
        }
    })



    sortDropVariants.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            sortDropVariants.forEach(item => {
                item.classList.remove("select__list-item--selected")
            })
            tmp = item.textContent
            item.classList.toggle("select__list-item--selected")
            sortTitle.innerHTML = tmp;
        })
    })
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
dropListSort()
activeCheckBox() 
dropFilter()