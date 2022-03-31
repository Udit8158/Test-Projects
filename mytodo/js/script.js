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

const deleteIcons = document.getElementsByClassName("delete-icons");

const deleteList = document.querySelector(".delete-list");

const checkboxes = document.getElementsByClassName("task-checkbox");

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
      // deleteTodos();
    });
  });
};

// Function to render the todo-section
const rednerTodoSection = () => {
  Array.from(myLists.children).forEach((listItem) => {
    listItem.addEventListener("click", () => {
      let html = "";
      // console.log(myTodoArr, activeIndex);

      // Manupulate the dom of todos
      myTodoArr[activeIndex].myTodos.forEach((element, index) => {
        html += `
          <div class="tasks task-${index + 1}">
              <input class="task-checkbox" type="checkbox" id="task${
                index + 1
              }" />
              <label class="labels" for="task${index + 1}">
                <span class="custom-checkbox"></span>
               ${element}
              </label>
              <i class="fa fa-trash delete-icons" id = "${index}"></i>
              <hr class="complete-task-hr hide-hr" id = "${index} />
              <hr class="todo-list-items-hr" />
            </div>
          `;
        todoLists.innerHTML = html;
      });

      // Function to add todos in the todo list and manupulate the dom.
      addTodos();

      // completedTodo();
      // Function to delete the individual todos
      deleteTodos();

      // Function to count remaining todos
      remainingTaskCount();
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

// Function to delete a particular todo.
const deleteTodos = () => {
  Array.from(deleteIcons).forEach((deleteIcon, index) => {
    // console.log(deleteIcon);
    deleteIcon.addEventListener("click", function () {
      // console.log("clicked", myTodoArr, activeIndex, this);
      myTodoArr[activeIndex].myTodos.splice(this.id, 1);

      localStorage.setItem("myTodos", JSON.stringify(myTodoArr));

      // Refresh the page
      document.location.reload();
    });
  });
};

// const completedTodo = () => {
//   checkboxesArr = Array.from(checkboxes);

//   checkboxesArr.forEach((checkBox) => {
//     checkBox.addEventListener("click", function () {
//       this.classList.toggle("completed");

//       console.log(
//         this.nextElementSibling.nextElementSibling.nextElementSibling
//       );
//       thisHr = this.nextElementSibling.nextElementSibling.nextElementSibling;
//       thisHr.classList.remove("hide-hr");
//     });
//   });
// };

// Function to count the remaining number of tasks
const remainingTaskCount = () => {
  // Make checkboxes array
  checkboxesArr = Array.from(checkboxes);

  checkboxesArr.forEach((checkBox) => {
    checkBox.addEventListener("click", function () {
      this.classList.toggle("completed");

      completedTodoElement = this;
      console.log(completedTodoElement);

      completedTodoName =
        completedTodoElement.nextSibling.nextSibling.innerText;

      if (
        myTodoArr[activeIndex].completedMyTodos.includes(completedTodoName) ==
          false &&
        completedTodoElement.classList.contains("completed")
      ) {
        myTodoArr[activeIndex].completedMyTodos.push(completedTodoName);
      }

      localStorage.setItem("myTodos", JSON.stringify(myTodoArr));

      console.log(
        myTodoArr[activeIndex].myTodos.length -
          myTodoArr[activeIndex].completedMyTodos.length
      );

      console.log(myTodoArr[activeIndex].myTodos.length);

      taskRemainingElement.innerText = `${
        myTodoArr[activeIndex].myTodos.length -
        myTodoArr[activeIndex].completedMyTodos.length
      } Task remaining`;
      // myTodoArr[activeIndex].completedMyTodos = [];
      completedTodoElement.style.pointerEvents = "none";
    });
  });
};

// Function to delete a particular entire task list
const deleteTaskList = () => {
  console.log("clicked");
  myTodoArr.splice(activeIndex, 1);

  localStorage.setItem("myTodos", JSON.stringify(myTodoArr));

  document.location.reload();
};
// Event Listners

//Click event to generate the list item in the left side
addListItemBtn.addEventListener("click", () => {
  // Fundamental logic

  if (myTodos == null) {
    myTodoArr = [];
  } else {
    myTodoArr = JSON.parse(myTodos);
  }
  console.log(myTodoArr);
  let addListItemInputVal = addListItemInput.value;

  // TODO: Change from this

  // Making main object
  totalTodosObj = {
    myListItem: addListItemInputVal,
    myTodos: [],
    completedMyTodos: [],
  };

  myTodoArr.push(totalTodosObj);
  localStorage.setItem("myTodos", JSON.stringify(myTodoArr));

  // Manupulate DOM
  showList();

  setTimeout(() => {
    document.location.reload();
  }, 500);
});

// Click event listner to delete a particular entire list
deleteList.addEventListener("click", deleteTaskList);

// localStorage.clear();

// Calling the functions
showList();
rednerTodoSection();
