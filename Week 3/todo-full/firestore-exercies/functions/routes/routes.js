const Router = require("koa-router");
const todoHandler = require("../src/handlers/todoHandler/todoHandler");
const todoValidate = require("../src/middleware/todoValidate");

const router = new Router()

router.get("/todos", async (ctx) => {
  const todos = await todoHandler.getAllTodos(ctx);
  ctx.status = 200;
  ctx.body = {
    ...todos
  }
});
router.post("/todos", todoValidate, todoHandler.createNewTodos);
router.put("/todos/:id", todoHandler.updateSingleTodo);
router.put("/todos", todoHandler.updateTodos);
router.delete("/todos/:id", todoHandler.removeTodo);
router.delete("/todos", todoHandler.removeTodos);

module.exports = router