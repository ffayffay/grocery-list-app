let groceryItems = localStorage.getItem('listItem')
  ? JSON.parse(localStorage.getItem('listItem'))
  : []

localStorage.setItem('listItem', JSON.stringify(groceryItems))
const data = JSON.parse(localStorage.getItem('listItem'))
const clearButton = document.getElementById('clear-all');


function addNewListItem() {
	let inputName = document.getElementById('name-input');
	let inputCost = document.getElementById('cost-input');
	let inputQuantity = document.getElementById('quantity-input');
	let newItem = 
					{
						name: inputName.value,
						cost: inputCost.value,
						quantity: inputQuantity.value,
						isChecked: false
					};

	groceryItems.push(newItem);
	localStorage.setItem('listItem', JSON.stringify(groceryItems))

	inputName.value = '';
	inputQuantity.value = '';
	inputCost.value = '';

	console.log(groceryItems);
	displayList();
}



function listTemplate(listItem) {
	const template = `
		 <tr class="${listItem.name}">
		    <th id="${listItem.name}">${listItem.name}</th>
		    <th id="${listItem.quantity}">(${listItem.quantity})</th>
		    <th id="${listItem.cost}">$ ${listItem.cost}</th>
		    <th>
		    	<label class="checkbox" id="${listItem.name}" name="${listItem.name}">
		    		 <input type="checkbox" value="${listItem.name}" onclick="toggleCheckbox(event)">
		    	</label>
		    </th>
		    <th>
		    	<button value="${listItem.name}" class="delete-btn button is-small" onclick="deleteItem(event, ${listItem.name})">X</button>
		    </th>
		  </tr>
	`;

	return template;
}



function displayList() {
	const table = document.getElementById('table');
	let mappedList = groceryItems.map(listItem => listTemplate(listItem)).join ('');

	table.innerHTML = mappedList;
}


//  Delete Section ---

function deleteItem(event, name) {
	let itemToDelete = event.target.value;
	groceryItems = groceryItems.filter(name => name.name !== itemToDelete);
	localStorage.setItem('listItem', JSON.stringify(groceryItems))

	displayList()
}


//  Total Section ---

function findTotalCost() {
	const costTotal = groceryItems.reduce(
		(total, currentValue) => total + Number(currentValue.cost), 0);
	console.log(Math.ceil(costTotal*100)/100);

	return costTotal
}


function totalTemplate(total) {
	const template = `
		<div class="total-cont"
			<p>Total = $ ${total}</p>
		</div>
	`

	return template
}


function displayTotal() {
	let total = findTotalCost()

	const btnCont = document.querySelector('.total-btn-cont');

	btnCont.insertAdjacentHTML('beforeend', totalTemplate(total))
}


function toggleCheckbox(event) {
	debugger
	let clickedItem = event.target.value;
	let checkedItem = groceryItems.find(item => item.name === clickedItem);
	let itemName = checkedItem.name;
	let itemCost = checkedItem.cost;
	let itemQuantity = checkedItem.quantity;
	
	checkedItem.isChecked = !checkedItem.isChecked

	let element = document.querySelector(`.${itemName}`)

	console.log(checkedItem, itemName, itemCost, itemQuantity)

	if(checkedItem.isChecked === true) {
		element.classList.add('checked');
	} else {
		element.classList.remove('checked');
	}
	
}

function addCheckedClass(name, checkedItem, itemName, itemCost, itemQuantity) {
	if(checkedItem.isChecked === true) {
		itemName.classList.add('checked');

	} else {
		itemName.classList.remove('checked');
	}
}

displayList();


//  Clear All ---
clearButton.addEventListener('click', function () {
  localStorage.clear()
  groceryItems = [];
  displayList();
})