const Todo = require("../models/todo");

const getTodos = (req, res) => {
	Todo.find()
		.sort({ createdAt: -1 })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => console.log(err));
};

const addTodo = (req, res) => {
	const todo = new Todo(req.body);

	if (!req.body.body) {
		return res.status(400).json({ status: "error", error: "Todo can not be empty 🤨" });
	}

	todo
		.save()
		.then((data) => res.json({ message: "Todo was added successfully 🎉", data }))
		.catch((err) => res.status(500).json({ status: "error", error: err }));
};

const updateTodo = (req, res) => {
	const id = req.params.id;

	if (!req.body.body) {
		return res.status(400).json({ status: "error", error: "Todo can not be empty 🤨" });
	}

	Todo.findById(id)
		.then((data) => {
			Todo.findByIdAndUpdate(id, { body: req.body.body })
				.then((result) => res.json({ message: "Todo updated successfully 🎉", data: result }))
				.catch((err) => res.status(404).json({ status: "error", error: err }));
		})
		.catch((err) =>
			res.status(404).json({ status: "error", error: `Todo with id ${id} does not exist.` })
		);
};

const deleteTodo = (req, res) => {
	const id = req.params.id;

	Todo.findById(id)
		.then((data) => {
			Todo.findByIdAndDelete(id)
				.then((result) => res.json({ message: "Todo deleted successfully 🎉", data: result }))
				.catch((err) => res.status(500).json({ status: "error", error: err }));
		})
		.catch((err) =>
			res.status(404).json({ status: "error", error: `Todo with id ${id} does not exist.` })
		);
};

module.exports = {
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
};
