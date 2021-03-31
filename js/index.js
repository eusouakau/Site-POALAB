//
const header = document.querySelector('.header');
const main = document.querySelector('#main');

const rect = main.getBoundingClientRect().bottom;
const tamanhoHeader = 60;

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
    const to = getScrollTopByHref(event.target) - tamanhoHeader; //focar no elemento
    scrollToPosition(to);
}

function scrollToPosition(to) {
    // window.scroll({
    //   top: to,
    //   behavior: "smooth",
    // });
    smoothScrollTo(0, to, 1000);
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

// animar ao scroll

const debounce = function(func, wait, immediate) { //regula o número de repetição de uma function.
    let timeout;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const targetAnime = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight) * 0.75); //calculo para a animação acontecer numa região especifica indiferente do tamanho da tela.
    targetAnime.forEach(function(element) {
        if ((windowTop) > element.offsetTop) {
            element.classList.add(animationClass);
        } else {
            element.classList.remove(animationClass);
        }
    })
}

animeScroll(); // executar a função ao entrar no site;

if (targetAnime.length) { //verifica se tem item no targetAnime, caso não, ele não executa a função.
    window.addEventListener('scroll', debounce(function() {
        animeScroll();
    }, 200));
}

// set no slide 1

window.location = "#slide-1";