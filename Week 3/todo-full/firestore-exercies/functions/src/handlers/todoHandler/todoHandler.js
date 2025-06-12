const {
  getTodos,
  newTodo,
  deleteTodo,
  deleteTodoInBulk,
  updateTodo,
  updateBulkTodo
} = require("../../database/todoRepository")

const getAllTodos = async (ctx) => {
  let {limit, orderBy, sort} = ctx.query
  let todos = await getTodos()

  if (orderBy) {
    todos = todos.data.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return -1;
      if (a[orderBy] > b[orderBy]) return 1;
      return 0;
    });
  }

  if (sort) {
    if (sort === "desc") {
      todos = todos.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sort === "asc") {
      todos = todos.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else {
      ctx.status = 400
      ctx.body = {
        error: 'Enter "desc" or "asc" for sort'
      }
    }
  }

  if (limit) {
    limit = parseInt(limit);
    if (!isNaN(limit) && limit > 0) {
      todos = todos.data.slice(0, limit);
    }
  }
  return todos
}
const createNewTodos = async (ctx) => {
  try {
    const todoData = ctx.req.body

    let newTodoData = {
      ...todoData
    }
    const dataFilter = await newTodo(newTodoData);
    ctx.status = 200;
    ctx.body = {message: "Todo created successfully", data: dataFilter};
  } catch (error) {
    ctx.status = 500;
    ctx.message = error.message;
  }
}
const updateSingleTodo = async (ctx) => {
  try {
    const todoId = ctx.params.id;
    const todoData = ctx.req.body
    await updateTodo(todoId, todoData)
    ctx.status = 200;
    ctx.body = {
      message: "Todo updated successfully"
    }
  } catch (error) {
    ctx.status = 500;
    ctx.message = error.message;
  }
}
const updateTodos = async (ctx) => {
  try {
    const updates = ctx.req.body;
    console.log(updates);
    if (!Array.isArray(updates)) {
      ctx.status = 400;
      ctx.body = {
        error: "Request body must be an array of update objects"
      };
      return;
    }
    if (updates.length === 0) {
      ctx.status = 400;
      ctx.body = {
        error: "No updates provided"
      };
      return;
    }
    if (updates.length > 500) {
      ctx.status = 400;
      ctx.body = {
        error: "Cannot update more than 500 items at once due to Firestore batch limitations"
      };
      return;
    }
    for (let i = 0; i < updates.length; i++) {
      const update = updates[i];
      if (!update.id) {
        ctx.status = 400;
        ctx.body = {
          error: `Update object at index ${i} is missing required 'id' field`
        };
        return;
      }
    }

    await updateBulkTodo(updates);
    ctx.status = 200;
    ctx.body = {
      message: `${updates.length} todos updated successfully`
    }
  } catch (error) {
    ctx.status = 500;
    ctx.message = error.message;
  }
}
const removeTodo = async (ctx) => {
  try {
    const todoId = ctx.params.id;
    await deleteTodo(todoId);
    ctx.status = 200;
    ctx.body = {
      message: "Todo deleted successfully"
    }
  } catch (error) {
    ctx.status = 500;
    ctx.message = error.message;
  }
}
const removeTodos = async (ctx) => {
  try {
    const todoIds = ctx.req.body.ids;
    console.log(todoIds);
    await deleteTodoInBulk(todoIds);
    ctx.status = 200;
    ctx.body = {
      message: "Todos deleted successfully"
    }
  } catch (error) {
    ctx.status = 500;
    ctx.message = error.message;
  }
}
module.exports = {getAllTodos, createNewTodos, removeTodo, removeTodos, updateSingleTodo, updateTodos}