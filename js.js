
const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');
btn.addEventListener('click', addList);



// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));

  
}

// Trigger Get Data From Local Storage Function
getDataFromStorage();

// Add Task
btn.onclick = function () {
    if (input.value !== "") {
      addTaskToArray(input.value); // Add Task To Array Of Tasks
      input.value = ""; // Empty Input Field after adding
    }

  };



function addList(e) {
    
    const notCompleted = document.querySelector('.notCompleted');
    const Completed = document.querySelector('.Completed');

    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';


    if (input.value !== '') {
      newLi.textContent = input.value;
      notCompleted.appendChild(newLi);
      newLi.appendChild(checkBtn);
      newLi.appendChild(delBtn);
  }

  checkBtn.addEventListener('click', function () {
      const parent = this.parentNode;
      parent.remove();
      Completed.appendChild(parent);

  });

  delBtn.addEventListener('click', function () {
      const parent = this.parentNode;
      parent.remove();
  });

}

function addTaskToArray(taskText) {
    // Task Data
    const task = {
      id: Date.now(),
      title: taskText,
      completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Local Storage
    addToLocalStorage(arrayOfTasks);
  }

  function addToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  }
  
  function getDataFromStorage() {
    let data = window.localStorage.getItem("tasks");
    const notCompleted = document.querySelector('.notCompleted');
    const Completed = document.querySelector('.Completed');

    let newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    notCompleted.innerHTML = ""


    

    if (data) {

      let tasks = JSON.parse(data);

      for(let i=0; i < tasks.length; i++){
        if(tasks[i].completed == false){
          notCompleted.innerHTML += "<li>"+ tasks[i].title+"<button ><i  onclick=toggleStatus("+tasks[i].id+") class='fa fa-check tunCompleted'></i></button><button><i class='fa fa-trash'></i></button></li>";
        }else{
          Completed.innerHTML += "<li>"+ tasks[i].title+"<button ><i  onclick=toggleStatus("+tasks[i].id+") class='fa fa-check tCompleted'></i></button><button><i   class='fa fa-trash'></i></button></li>";

        }
  
      }

    }



  }


  function toggleStatus(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
      }
    }
    addToLocalStorage(arrayOfTasks);
  }