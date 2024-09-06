document.addEventListener("DOMContentLoaded", () => {
    const publishBtns = document.querySelectorAll(".add__btn");

    publishBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelector('.main__screen').style.display = 'none'
            document.querySelector('.publish__screen').style.display = 'block'
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        })
    })

    document.querySelector(".submit__btn").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('.publish__screen').style.display = 'none'
        document.querySelector('.main__screen').style.display = 'block'
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    })

    const btnUp = document.querySelector(".page-up__btn");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btnUp.style.display = "flex";
        } else {
            btnUp.style.display = "none";
        }
    })

    btnUp.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    })

    const showTab = (elTabBtn) => {
        if (elTabBtn.classList.contains('tab--active')){
            return;
        }
        const targetId = elTabBtn.dataset.targetId;
        const elTabPanel = document.querySelector(`.tab[data-id="${targetId}"]`);
        if (elTabPanel){
            const elTabBtnActive = document.querySelector('.tab--active');
            elTabBtnActive.classList.remove('tab--active');
            const elTabPanelShown = document.querySelector('.tab--show');
            elTabPanelShown.classList.remove('tab--show');
            elTabBtn.classList.add('tab--active');
            elTabPanel.classList.add('tab--show');
        }
        if (targetId == '2'){
            document.querySelector('.tab__container').style.borderRadius = '20px';
        } else {
            document.querySelector('.tab__container').style.borderRadius = '0 20px 20px 20px';
        }
    }

    document.addEventListener('mouseup', (e) => {
        if (e.target && !e.target.closest('.tab__link')){
            return;
        }
        const elTabBtn = e.target.closest('.tab__link');
        showTab(elTabBtn);
    })
})