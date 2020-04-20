const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clear = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event
loadEventListeners();

function loadEventListeners(){
	//task event
	form.addEventListener('submit',addTask);

	//Removing Task vent
	taskList.addEventListener('click', removeTask);

	//Clear task 
	clear.addEventListener('click', clearTask);
	//Filter task
	filter.addEventListener('keyup', filterTasks);

	//Load form storage
	document.addEventListener('DOMContentLoaded',getTask);
}

function addTask(e){

	if(taskInput.value === ''){
		alert("Add a Task");
		e.preventDefault();
		return false;

	}



	//Creating li
	const li = document.createElement('li');

	//adding class
	li.className = 'collection-item';

	//Creating textnode
	li.appendChild(document.createTextNode(taskInput.value));

	//creating link

	const link = document.createElement('a');
	//adding class
	link.className = 'delete-item secondary-content';
	//Adding icon
	link.innerHTML = '<i class="fa fa-remove"></i>';
	//Appending link to LI
	li.appendChild(link);

	//Apending Li to UL
	taskList.appendChild(li);

	//Store in local storage
	storeTaskInLocalStrorage(taskInput.value);

	//clear input
	taskInput.value = '';
	



	e.preventDefault();
}

// Store Task

function storeTaskInLocalStrorage(task){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}
	else{
		tasks = JSON.parse(localStorage.getItem('tasks'));

	}
	tasks.push(task);
	localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Get task from storage

function getTask(){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}
	else{
		tasks = JSON.parse(localStorage.getItem('tasks'));

	}

	tasks.forEach(function(task){
		//Creating li
		const li = document.createElement('li');

		//adding class
		li.className = 'collection-item';

		//Creating textnode
		li.appendChild(document.createTextNode(task));

		//creating link

		const link = document.createElement('a');
		//adding class
		link.className = 'delete-item secondary-content';
		//Adding icon
		link.innerHTML = '<i class="fa fa-remove"></i>';
		//Appending link to LI
		li.appendChild(link);

		//Apending Li to UL
		taskList.appendChild(li);
	});
}



function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are you sure ?')){
			e.target.parentElement.parentElement.remove();

			//Remove from store
			removeTaskFromLocalStorage(e.target.parentElement.parentElement)
		}
	}


}

function removeTaskFromLocalStorage(taskItem){
	console.log(taskItem);
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}
	else{
		tasks = JSON.parse(localStorage.getItem('tasks'));

	}

	tasks.forEach(function(task, index){
		if(taskItem.textContent === task){
			tasks.splice(index,1)
		}
	});

	localStorage.setItem('tasks',JSON.stringify(tasks));

}


function clearTask(){
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}
	clearTasksFormStorage();
}

function clearTasksFormStorage(){
	localStorage.clear();
}


function filterTasks(e){
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(task){
		const item = task.firstChild.textContent;

		if(item.toLowerCase().indexOf(text) !=-1){
			task.style.display = 'block';
		}
		else{
			task.style.display = 'none';
		}
	});
}