document.addEventListener('DOMContentLoaded', () => {
    onScroll();
    const header = document.querySelector('.header');
    const pageChooser = document.querySelector('.choose-page__block');
    const btns = document.querySelectorAll('.contact-sales-btn');
    const cookie = document.querySelector('.cookie-block');
    const closeCookie = document.querySelector('.close-cookie');
    const cookieBtns = document.querySelectorAll('.cookie__btn');

    cookieBtns.forEach((btn) => {
        btn.addEventListener('mouseup', () => {
            cookie.classList.add('visually-hidden')
        });
    });

    cookie.classList.remove('visually-hidden');

    closeCookie.addEventListener('mouseup', () => {
        cookie.classList.add('visually-hidden');
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
                pageChooser.classList.add('visually-hidden');
                header.classList.add('fixed');
            } else{
                pageChooser.classList.remove('visually-hidden');
                header.classList.remove('fixed');
            }
        });
    }
});