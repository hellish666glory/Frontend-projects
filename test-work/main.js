document.addEventListener('DOMContentLoaded', () => {
    onScroll();
    const header = document.querySelector('.header');
    const pageChooser = document.querySelector('.choose-page__block')

    function onScroll(){
        document.addEventListener('scroll', () => {
            let y = window.scrollY
            y > 100 ? pageChooser.classList.add('visually-hidden') : pageChooser.classList.remove('visually-hidden')
        })
    }
});