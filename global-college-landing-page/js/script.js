// Grab important elemens
const navigationMenu = document.querySelector(".nav-links");

// Functions for open and close menu
const openMenu = () => {
  console.log("click");

  navigationMenu.style.right = "0";
};
const closeMenu = () => {
  console.log("click");

  navigationMenu.style.right = "-300px";
};
