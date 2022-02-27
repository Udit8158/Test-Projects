console.log("Welcome to my TODO");

// Grab the elements

const addListItemBtn = document.querySelector(".add-list-item-btn");
const addListItemInput = document.querySelector(".add-list-item-input");

const myLists = document.querySelector(".my-lists");

const myTodoSection = document.querySelector(".my-todo-section");

const todoHeading = document.querySelector("#todo-heading");
const taskRemainingElement = document.querySelector(".task-remaining-element");
const todoLists = document.querySelector(".todo-lists");
const addTodoListItemInput = document.querySelector(
  ".add-todo-list-item-input"
);
const addTodoListItem = document.querySelector(".add-todo-list-item");

const deletIcons = document.querySelectorAll(".fa-trash");

//Define important variables

// localStorage.setItem(
//   "myTodos",
//   JSON.stringify([{ myListItem: "Tasks", myTodos: ["coding"] }])
// );

let myTodos = localStorage.getItem("myTodos");
let activeIndex;

//Define functions

// Functon to show list items
const showList = () => {
  if (myTodos != null) {
    myTodoArr = JSON.parse(myTodos);
    let html = "";
    myTodoArr.forEach((element, index) => {
      html += `
      <li class="listItems " id="${index}">${element.myListItem}</li>
      `;
      myLists.innerHTML = html;
    });
  }
  activeListDefiner();
};

// Function to give active class on the list items
const activeListDefiner = () => {
  Array.from(myLists.children).forEach((e) => {
    e.addEventListener("click", () => {
      // Execute only after first time click. Means not execute in first time.

      if (activeIndex != null) {
        newFilteredArr = Array.from(myLists.children).filter(
          (element) => element.id == activeIndex
        );
        newFilteredArr.forEach((e) => e.classList.remove("active"));
      }

      activeIndex = e.id;
      e.classList.add("active");
    });
  });
};

// Function to render the todo-section
const rednerTodoSection = () => {
  Array.from(myLists.children).forEach((listItem) => {
    listItem.addEventListener("click", () => {
      let html = "";
      console.log(myTodoArr, activeIndex);

      // Manupulate the dom of todos
      myTodoArr[activeIndex].myTodos.forEach((element, index) => {
        html += `
          <div class="tasks task-1">
              <input class="task-checkbox" type="checkbox" id="task1" />
              <label for="task1">
                <span class="custom-checkbox"></span>
               ${element}
              </label>
              <i class="fa fa-trash" id = "${index}"></i>
              <hr class="complete-task-hr" />
              <hr class="todo-list-items-hr" />
            </div>
          `;
        todoLists.innerHTML = html;
      });

      // Function to add todos in the todo list and manupulate the dom.
      addTodos();

      // Function to delete the individual todos
      deleteTodos();
    });
  });
};

// Function to add todos in the todo list section
const addTodos = () => {
  //Remove class hide after click
  myTodoSection.classList.remove("hide");

  addTodoListItem.addEventListener("click", () => {
    todoInputVal = addTodoListItemInput.value;

    myTodoArr[activeIndex].myTodos.push(todoInputVal);
    localStorage.setItem("myTodos", JSON.stringify(myTodoArr));

    // Refresh the page
    document.location.reload();
  });
};

const deleteTodos = () => {
  Array.from(deletIcons).forEach((deletIcon, index) => {
    deletIcon.addEventListener("click", () => {
      console.log("clicked");
    });
  });
};
// Event Listners

//Click event to generate the list item in the left side
addListItemBtn.addEventListener("click", () => {
  if (myTodos == null) {
    myTodoArr = [];
  } else {
    myTodoArr = JSON.parse(myTodos);
  }
  console.log(myTodoArr);
  let addListItemInputVal = addListItemInput.value;
  myObj = {
    myListItem: addListItemInputVal,
    myTodos: [],
  };
  myTodoArr.push(myObj);
  localStorage.setItem("myTodos", JSON.stringify(myTodoArr));

  // Manupulate DOM
  showList();

  setTimeout(() => {
    document.location.reload();
  }, 500);
});

// localStorage.clear();

// Calling the functions
showList();
rednerTodoSection();
