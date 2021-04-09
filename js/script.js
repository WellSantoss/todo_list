const todoContainer = document.querySelector('.todo ul');
const doneContainer = document.querySelector('.done ul');
const inputTodo = document.querySelector('.new #new-todo');
const btnAdd = document.querySelector('.new a');
inputTodo.focus();

let todoArray = [
	{
		text: 'Ir ao mercado',
		state: 'todo',
	},
	{
		text: 'Fazer compras',
		state: 'todo',
	},
	{
		text: 'Estudar',
		state: 'done',
	}
];

inputTodo.addEventListener('keyup', (e) => {
	if (e.keyCode == '13') {
		submitTodo();
	}
});

// Retorna o index do array correspondente ao arg
function getIndex(info) {
	const infoArray = todoArray.map((item) => {
		return item.text;
	});

	return infoArray.indexOf(info);
}

// Deleta o todo
function deleteTodo(info) {
	const i = getIndex(info);

	todoArray.splice(i, 1);

	reloadig();
}

// Muda o estado do todo
function changeState(info) {
	const i = getIndex(info);

	if (todoArray[i].state == 'todo') {
		todoArray[i].state = 'done';
	}
	else if (todoArray[i].state == 'done') {
		todoArray[i].state = 'todo';
	}

	reloadig();
}

// Cria o todo a partir do input
function submitTodo() {
	if (inputTodo.value != '') {
		todoArray.push({ text: inputTodo.value, state: 'todo' });

		inputTodo.value = '';
		inputTodo.focus();
		reloadig();
	}
}

// Cria o elemento
function createTodo(text, state) {
	const li = document.createElement('li');
	li.innerHTML = `
		<img onclick="changeState('${text}');" src="./assets/${state}.svg">
		<p>${text}</p>
		<img src="./assets/edit.svg" alt="Editar">
		<img onclick="deleteTodo('${text}');" src="./assets/delete.svg" alt="Excluir">`;

	return li;
}

// Adiciona o elemento ao HTML
function addTodo(item) {
	if (item.state === 'todo') {
		todoContainer.appendChild(createTodo(item.text, item.state));
	}
	else if (item.state === 'done') {
		doneContainer.appendChild(createTodo(item.text, item.state));
	}
	else {
		return;
	}

}

// Limpa o HTML e readiciona os todo's
function reloadig() {
	todoContainer.innerHTML = '';
	doneContainer.innerHTML = '';

	todoArray.forEach((item) => {
		addTodo(item);
	});
}

reloadig();