class Book {
  constructor(bookIndex, name, author, price) {
    (this.bookIndex = bookIndex),
      (this.name = name),
      (this.author = author),
      (this.price = price);
  }
}

// Grab element
const bookName = document.querySelector(".bookName");
const authorName = document.querySelector(".authorName");
const bookPrice = document.querySelector(".bookPrice");
const sumbmitBtn = document.querySelector(".submitBtn");

const alert = document.querySelector(".alert");

const tableBody = document.querySelector(".tableBody");

// Getting booksArr form localstorage if not then create a blank array.
let booksArr = JSON.parse(localStorage.getItem("bookList"));

if (booksArr == null) {
  booksArr = [];
}

// Event listner on submit
sumbmitBtn.addEventListener("click", () => {
  // Creating bookObj from the data of form
  bookObj = new Book(index, bookName.value, authorName.value, bookPrice.value);

  booksArr.push(bookObj);
  localStorage.setItem("bookList", JSON.stringify(booksArr));

  // Show books
  showBooks();

  // Reload is very important
  location.reload();
  // setTimeout(() => {
  //   alert.classList.remove("d-none");
  //   alert.innerText = "You added the book succesfully in you libery.";
  // }, 3000);
});

function showBooks() {
  if (booksArr !== null) {
    let html = "";
    index = 0;
    booksArr.forEach((book) => {
      index++;
      html += `
    <tr>
            <th scope="row">${index}</th>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.price} Rs.</td>
            <td><i class="fa-solid fa-xmark crossMark" id=${index - 1}></i></td>
          </tr>
    `;
    });
    tableBody.innerHTML += html;
    removeBooks();
  }
}

function removeBooks() {
  const crossMarks = document.querySelectorAll(".crossMark");
  crossMarks.forEach((e) => {
    console.log(e);
    e.addEventListener("click", () => {
      // Remove desire book from the booksarr
      booksArr.splice(e.id, 1);

      // Setting local storage with modifying array
      localStorage.setItem("bookList", JSON.stringify(booksArr));
      // Reload
      location.reload();
    });
  });
}
showBooks();
// localStorage.clear();
