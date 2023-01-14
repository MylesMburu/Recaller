function openTab(evt,tabId) {
    //  Declare all variables
    var i, tabcontent, tablinks;
  
    //  Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    //  Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    //  Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabId).style.display = "block";
    evt.currentTarget.className += " active";
  }

window.addEventListener('load', () => {
  const form = document.getElementById('form');
  const input = document.getElementsByClassName('task');
  const list_el = document.getElementById('All');
  const plist_el = document.getElementById('Pending');

  form.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = input[0].value;
  const deadline = input[1].value;

  if(!task){
    alert('Please fill out a task');
    return;
  }
  
   const task_el = document.createElement('div');
   task_el.classList.add('tasks');

   const task_content_el = document.createElement('div');
   task_content_el.classList.add('content');

   task_el.appendChild(task_content_el);

   const task_input_el = document.createElement('input');
   task_input_el.classList.add('text');
   task_input_el.type = 'text';
   task_input_el.value = task + " " +"by"+" "+ deadline;
   task_input_el.setAttribute('readonly', 'readonly');
   task_input_el.setAttribute('style', 'width:300px')

   task_content_el.appendChild(task_input_el);
   const task_content_el_clone =  task_content_el.cloneNode(true);//cloning the content div so that I can use it in the pending part
   task_content_el_clone.classList.add('tasks_clone');

   const task_actions_el = document.createElement('div');
   task_actions_el.classList.add('actions');
  
   const task_edit_el = document.createElement('button');
   task_edit_el.classList.add('edit');
   task_edit_el.innerText = 'Edit';

   const task_delete_el = document.createElement('button');
   task_delete_el.classList.add('delete');
   task_delete_el.innerText = 'Delete';

   const task_done_el = document.createElement('button');
   task_done_el.classList.add('done');
   task_done_el.innerHTML = 'Done';

   //appending buttons to actions
   task_actions_el.appendChild(task_done_el);
   task_actions_el.appendChild(task_edit_el);
   task_actions_el.appendChild(task_delete_el);
   
   task_el.appendChild(task_actions_el);

   //appending the child processes to the two main parents
   list_el.appendChild(task_el);
   plist_el.appendChild( task_content_el_clone);
   
   input[0].value = '';
   input[1].value = '';
   window.alert("Task added to 'All");

   task_edit_el.addEventListener('click', (e) => {
    if (task_edit_el.innerText.toLowerCase() == "edit") {
      task_edit_el.innerText = "Save";
      task_input_el.removeAttribute("readonly");
      task_input_el.focus();
    } else {
      task_edit_el.innerText = "Edit";
      task_input_el.setAttribute("readonly", "readonly");
    }
  });

  task_delete_el.addEventListener('click', (e) => {
    list_el.removeChild(task_el);
    plist_el.removeChild(task_content_el_clone);
  });

  task_done_el.addEventListener('click',(e) =>{
    task_input_el.style.textDecoration = "line-through"; //strikes through the completed task
    plist_el.removeChild(task_content_el_clone); //removes the task from pending list
  })

})
})
