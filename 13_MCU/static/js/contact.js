document.querySelector('.contact').classList.add('active');

const menu = document.querySelector('nav ul');
const hamburger = document.querySelector('.mobile');

hamburger.addEventListener('click', () => {
    if (menu.style.visibility == 'hidden') {
        console.log('clicked')
        console.log(menu)
        menu.style.visibility = 'visible';
    } else {
        console.log('clicked again')
        console.log(menu)
        menu.style.visibility = 'hidden';
    }
});






