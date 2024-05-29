document.addEventListener('DOMContentLoaded', () => {
    onScroll();
    const header = document.querySelector('.header');
    const pageChooser = document.querySelector('.choose-page__block');
    const btns = document.querySelectorAll('.contact-sales-btn');
    const cookie = document.querySelector('.cookie-block');
    const closeCookie = document.querySelector('.close-cookie');
    const cookieBtns = document.querySelectorAll('.cookie__btn');
    const burgerOpener = document.querySelector('#toggle');
    revialElement(cookie)

    function hideElement(elem){
        elem.classList.add('visually-hidden');
    }

    function revialElement(elem){
        elem.classList.remove('visually-hidden');
    }

    burgerOpener.addEventListener('change', function() {
        if (this.checked) {
            hideElement(pageChooser);
        } else {
            revialElement(pageChooser);
        }
    });

    cookieBtns.forEach((btn) => {
        btn.addEventListener('mouseup', () => {
            hideElement(cookie);
        });
    });

    closeCookie.addEventListener('mouseup', () => {
        hideElement(cookie);
    });

    btns.forEach((btn) => {
        btn.addEventListener('mouseup', () => {
            btn.classList.add('btn-loading');
            setTimeout(() => {
                btn.classList.remove('btn-loading')
            }, 5000)
        });
    });

    function onScroll(){
        document.addEventListener('scroll', () => {
            let y = window.scrollY
            if (y > 38){
                hideElement(pageChooser);
                header.classList.add('fixed');
            } else{
                revialElement(pageChooser);
                header.classList.remove('fixed');
            }
        });
    }
});