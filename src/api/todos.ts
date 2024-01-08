type todo = {
	label: string;
	value: string;
};

const todos: todo[] = [{ label: "Todo 1", value: "1" }];

export const getTodos = (value: number, query) => {
	console.log(value);
	console.log(query);

	return new Promise((resolve) =>
		setTimeout(() => {
			return resolve(todos);
		}, 1000)
	);
	// return Promise.reject({ message: "ERROR" });
	// return setTimeout(() => {
	// 	return todos;
	// }, 3000);
};

export const postTodos = (todo: todo) => {
	return Promise.resolve(todos.push(todo));
};
