//Controll the menu with the hamburger in the mobile version

const menu = document.querySelector('nav ul');
// console.log(menu);
const hamburger = document.querySelector('.mobile');

hamburger.addEventListener('click',() => {
    if (menu.style.visibility == "visible"){
        menu.style.visibility = "hidden";
    } else{
        menu.style.visibility = "visible";
    }
})