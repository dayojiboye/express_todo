const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
	{
		desc: {
			type: String,
			required: true,
		},
		isCompleted: {
			type: Boolean,
			required: false,
		},
	},
	{ timestamps: true }
);

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
