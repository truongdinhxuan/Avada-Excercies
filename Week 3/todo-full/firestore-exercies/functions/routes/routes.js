const Router = require("koa-router");
const todoHandler = require("../src/handlers/todoHandler/todoHandler");
const todoInputMiddleware = require("../src/middleware/todoInputMiddleware");

const router = new Router()

router.get("/todos", async (ctx) => {
  const todos = await todoHandler.getAllTodos(ctx);
  ctx.status = 200;
  ctx.body = {
    ...todos
  }
});
router.post("/todos", todoInputMiddleware, todoHandler.createNewTodos);
router.put("/todos/:id", todoHandler.updateSingleTodo);
router.put("/todos", todoHandler.updateTodos);
router.delete("/todos/:id", todoHandler.removeTodo);
router.delete("/todos", todoHandler.removeTodos);

module.exports = router