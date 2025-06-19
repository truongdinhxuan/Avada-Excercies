const {
  getTodos,
  newTodo,
  deleteTodo,
  deleteTodoInBulk,
  updateTodo,
  updateBulkTodo
} = require("../../database/todoRepository")

async function getAllTodos(ctx) {
  try {
    const {limit, orderBy, orderDirection} = ctx.query;
    const todos = await getTodos({limit, orderBy, orderDirection});

    return todos;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {message: error.message};
  }
}

async function createNewTodos(ctx) {
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

async function updateSingleTodo(ctx) {
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

async function updateTodos(ctx) {
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
    // for (let i = 0; i < updates.length; i++) {
    //   const update = updates[i];
    //   if (!update.id) {
    //     ctx.status = 400;
    //     ctx.body = {
    //       error: `Update object at index ${i} is missing required 'id' field`
    //     };
    //     return;
    //   }
    // }
    console.log(updates);
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

async function removeTodo(ctx) {
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

async function removeTodos(ctx) {
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