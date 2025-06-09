const hello = (ctx) => {
  return ctx.body = {
    message: "Hi",
  };
};
module.exports={
  hello,
};
