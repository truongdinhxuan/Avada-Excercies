const Router = require("koa-router");
const todoHandler = require("../src/handlers/todoHandler/todoHandler");

const router = new Router()

router.get("/todos", async (ctx) => {
    console.log("called todos endpoint");
    try {
        const todos = await todoHandler.getAllTodos(ctx);
        ctx.body = {todos};
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});
router.post("/todos", todoHandler.createNewTodos);

module.exports = router