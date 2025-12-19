let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const storedTasks=localStorage.getItem("tasks");
	if (storedTasks) {
		return JSON.parse(storedTasks);
	} else {
		return items;
	}
	
}

function handleDeleteButtonClick(clone) {
    return function() {
        clone.remove();
        saveTasks(getTasksFromDOM());
    };
}

function handleDuplicateButtonClick(textElement, listElement) {
    return function() {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        saveTasks(getTasksFromDOM());
    };
}

function handleEditButtonClick(textElement) {
    return function() {
        textElement.contentEditable = true;
        textElement.focus();
    };
}

function handleTextElementBlur(textElement) {
    return function() {
        textElement.contentEditable = false;
        saveTasks(getTasksFromDOM());
    };
}


function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	textElement.textContent = item;
	deleteButton.addEventListener('click', handleDeleteButtonClick(clone));
    duplicateButton.addEventListener('click', handleDuplicateButtonClick(textElement, listElement));
    editButton.addEventListener('click', handleEditButtonClick(textElement));
    textElement.addEventListener('blur', handleTextElementBlur(textElement));
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks=[];
	itemsNamesElements.forEach(function(item) {
		tasks.push(item.textContent);
	})
	return tasks
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

items=loadTasks();

items.forEach( function(item) {
	const taskElement = createItem(item);
	listElement.append(taskElement)
})

formElement.addEventListener('submit', function (evt) {
  	evt.preventDefault();
	const taskText=inputElement.value;
	listElement.prepend(createItem(taskText));
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = "";
}); 