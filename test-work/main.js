document.addEventListener('DOMContentLoaded', () => {
    onScroll();
    const header = document.querySelector('.header');
    const pageChooser = document.querySelector('.choose-page__block');
    const btns = document.querySelectorAll('.contact-sales-btn-load');
    const cookie = document.querySelector('.cookie-block');
    const closeCookie = document.querySelector('.close-cookie');
    const cookieBtns = document.querySelectorAll('.cookie__btn');
    const burgerOpener = document.querySelector('#toggle');
    const modal = document.querySelector('.modal');
    const invalidText = document.createElement('span');
    const closeModal = document.querySelector('.close-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop')
    invalidText.classList.add('invalid-text');
    invalidText.textContent += 'This field is required.'
    revealElement(cookie);

    closeModal.addEventListener('mouseup', () => {
        hideElement(modal);
        hideElement(modalBackdrop)
    })

    function hideElement(elem){
        elem.classList.add('visually-hidden');
    }

    function revealElement(elem){
        elem.classList.remove('visually-hidden');
    }

    burgerOpener.addEventListener('change', function() {
        if (this.checked) {
            hideElement(pageChooser);
        } else {
            revealElement(pageChooser);
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
                btn.classList.remove('btn-loading');
                revealElement(modal);
                revealElement(modalBackdrop);
                const labels = document.querySelectorAll('.modal_label');
                labels.forEach((label) => {
                    const input = label.querySelector('input');
                    const text = label.querySelector('.label__text')
                    if (input.disabled){
                        text.classList.add('disabled');
                    } else {
                        text.classList.remove('disabled');
                    }
                })
                modal.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const labels = document.querySelectorAll('.modal_label');
                    labels.forEach((label) => {
                        const input = label.querySelector('input');
                        const alertBlock = label.querySelector('.alert-block');
                        if (input.classList.contains('required') && input.value.trim() === ""){
                            alertBlock.append(invalidText);
                            input.classList.add('invalid');
                        } if (input.classList.contains('required') && !(input.value.trim() === ""))  {
                            input.classList.remove('invalid');
                            invalidText.remove();
                        }
                    })
                })
            }, 2000)
        });
    });

    function onScroll(){
        document.addEventListener('scroll', () => {
            let y = window.scrollY
            if (y > 38){
                hideElement(pageChooser);
                header.classList.add('fixed');
            } else{
                revealElement(pageChooser);
                header.classList.remove('fixed');
            }
        });
    }
});