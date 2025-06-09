const {getTodos, newTodo} = require("../../database/todoRepository")

const getAllTodos = (ctx) => {
    return getTodos();
}
const createNewTodos = (ctx) => {
    try {
        const data = ctx.req.body
        let newTodoData = {
            ...data,
            isCompleted: false
        }
        newTodo(newTodoData);
        ctx.status = 200;
        ctx.body = {message: "Todo created successfully", data: newTodoData};
    } catch (error) {
        ctx.status = 500;
        ctx.message = error.message;
    }
}
module.exports = {getAllTodos, createNewTodos}