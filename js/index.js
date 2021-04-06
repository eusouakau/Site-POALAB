//
const header = document.querySelector('.header');
const main = document.querySelector('#oqueeh');

const rect = main.getBoundingClientRect().bottom;
const tamanhoHeader = 57.33
console.log(tamanhoHeader);

function showHeader() {

    if ((window.pageYOffset > 0) && (window.pageYOffset < rect - tamanhoHeader)) {
        header.classList.add("fixed-header");

    } else if (window.pageYOffset >= rect - tamanhoHeader) {
        header.classList.add("fixed-header");

        header.classList.add("fixed-background");
        labLogo.classList.remove("lab-menu-img");
    } else {
        header.classList.remove("fixed-header");
        header.classList.remove("fixed-background");
        labLogo.classList.add("lab-menu-img");
    }
}

//scroll pelo menu

const menuItems = document.querySelectorAll('.menu a[href^="#"]'); //[href^="#"] para pegar somente os href com #.

menuItems.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
})

function getScrollTopByHref(element) {
    const id = element.getAttribute('href'); //busca o valor do atributo do elemento
    return document.querySelector(id).offsetTop; // busca a seção
}

function scrollToIdOnClick(event) { //verificar qual item recebeu click
    event.preventDefault(); //retira o padrão.
    var to = getScrollTopByHref(event.target) - (tamanhoHeader); //focar no elemento
    // if(to > window.pageYOffset)
    // {
    //     to = to - (2 * tamanhoHeader) ;
    // }
    // else if (to < window.pageYOffset)
    // {
    //     to = to - tamanhoHeader;
    // }
    
    scrollToPosition(to);
}

function scrollToPosition(to) {
    // window.scroll({
    //   top: to,
    //   behavior: "smooth",
    // });
    smoothScrollTo(0, to, 1500);
}

/** CODIGO PRONTO
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
};

/* carrossel */

var slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
}

/* fim carrossel */