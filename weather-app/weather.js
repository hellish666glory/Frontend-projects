document.addEventListener('DOMContentLoaded', () => {

    let input = document.querySelector('input');
    let form = document.querySelector('form');
    let svg = document.querySelector('img.svg');
    let button = document.querySelector('button.text-field_aicon')

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(input.value.trim());
    });

    const activateCloseButton = () => {
        svg.src = 'public/close.svg'
        button.addEventListener('mouseover', mouseOver);
        button.addEventListener('mouseout', mouseOut);
    }

    const mouseOver = () => {
        svg.src = 'public/close-active.svg'
    }

    const mouseOut = () => {
        svg.src = 'public/close.svg'
    }
    input.addEventListener('focus', activateCloseButton);
    input.addEventListener('blur', () => {
        let textThere = input.value.trim();
        if (!textThere){
            svg.src = 'public/search.svg'
            button.removeEventListener('mouseover', mouseOver);
            button.removeEventListener('mouseout', mouseOut);
        }
    });
});