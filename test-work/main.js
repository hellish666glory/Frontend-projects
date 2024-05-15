document.addEventListener('DOMContentLoaded', () => {
    onScroll();
    const header = document.querySelector('.header');
    const pageChooser = document.querySelector('.choose-page__block')

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
        })
    }
});