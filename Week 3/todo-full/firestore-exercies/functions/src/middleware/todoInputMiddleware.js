const yup = require('yup');

const todoInputMiddleware = async (ctx, next) => {
  try {
    const todoData = ctx.req.body;
    let schema = yup.object().shape({
      title: yup.string().required(),
    })
    await schema.validate(todoData);
    await next();
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      success: false,
      error: error.errors,
      errorName: error.name
    }
  }
}
module.exports = todoInputMiddleware;