const yup = require('yup')

async function productInputMiddleware(ctx,next) {
    try {
        const postDate = ctx.request.body
        let schema = yup.object().shape({
            id: yup.number().required().integer().positive().strict(),
            name: yup.string().required(),
            price: yup.number().required(),
            image: yup.string().required() 
        })
        await schema.validate(postDate)
        next()
    } catch (error) {
        ctx.status=400
        ctx.body = {
            success:false,
            error: error.errors,
            errorName: error.name
        }
    }
}

module.exports = productInputMiddleware