const mobileHamburger = document.querySelector("#mobile");
const sidePannel = document.querySelector(".side-pannel");
// const previewContainere = document.querySelector(".preview-container");
mobileHamburger.addEventListener("click", () => {
  if (sidePannel.style.display === "none") {
    sidePannel.style.display = "inline-block";
    previewContainer.style.display = "none";
  } else {
    sidePannel.style.display = "none";
    previewContainer.style.display = "inline-block";
  }
});
