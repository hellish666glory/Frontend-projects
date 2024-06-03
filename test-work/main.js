document.addEventListener('DOMContentLoaded', () => {
    onScroll();
    const header = document.querySelector('.header');
    const pageChooser = document.querySelector('.choose-page__block');
    const btns = document.querySelectorAll('.contact-sales-btn-load');
    const cookie = document.querySelector('.cookie-block');
    const closeCookie = document.querySelector('.close-cookie');
    const cookieBtns = document.querySelectorAll('.cookie__btn');
    const burgerOpener = document.querySelector('#toggle');
    const modal = document.querySelector('.modal')
    const modalForm = document.querySelector('.modal__form');
    const closeModal = document.querySelector('.close-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop')
    const thxBlock = document.querySelector('.thank-you__modal')
    revealElement(cookie);

    closeModal.addEventListener('mouseup', () => {
        hideElement(modal);
        hideElement(modalBackdrop);
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
            input.value = ''
            input.classList.remove('invalid');
        })
        const invalidText = document.querySelectorAll('.invalid-text');
        invalidText.forEach((text) => {
            text.remove();
        })
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
                const inputBlock = modalForm.querySelector('.modal__input-block');
                const insertText = document.createElement('span');
                insertText.classList.add('fill-in-text')
                insertText.textContent += 'Please fill in all required fields'
                modalForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    validator();
                    if (!validator() && !document.querySelector('.fill-in-text')){
                        inputBlock.append(insertText);
                    } 
                    if (validator() && document.querySelector('.fill-in-text')) {
                        insertText.remove();
                    }
                    if (validator()){
                        hideElement(modalForm);
                        thxBlock.classList.remove('none');
                        const superBtn = document.querySelector('#super');
                        superBtn.addEventListener('mouseup', () => {
                            hideElement(modal);
                            hideElement(modalBackdrop);
                        })
                    }
                })
                const validatorInputs = modalForm.querySelectorAll('input');
                validatorInputs.forEach((input) => {
                    input.addEventListener('input', () => {
                        validator();
                        if (!validator() && !document.querySelector('.fill-in-text')){
                            inputBlock.append(insertText);
                        } 
                        if (validator() && document.querySelector('.fill-in-text')) {
                            insertText.remove();
                        }
                    })
                })
            }, 2000)
        });
    });

    function validator(){
        modalBtn = modalForm.querySelector('button');
        const labels = document.querySelectorAll('.modal_label');
        let allInputsFilled = false;
        labels.forEach((label) => {
            let input = label.querySelector('input');
            let invalidText = label.querySelector('.invalid-text')
            if (input.classList.contains('required') && input.value.trim() === ""){
                revealElement(invalidText);
                input.classList.add('invalid');
                modalBtn.disabled = true;
                allInputsFilled = false;
            } if (input.classList.contains('required') && !(input.value.trim() === ""))  {
                input.classList.remove('invalid');
                hideElement(invalidText);
                modalBtn.disabled = false;
                allInputsFilled = true;
            }
        })

        return allInputsFilled;
    }

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