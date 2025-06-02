const yup = require('yup')

async function productUpdateMiddleware(ctx, next) {
    try {
        const updateData = ctx.request.body
        let schema = yup.object().shape({
            name: yup.string().strict(),
            price: yup.number().strict()
        })
        await schema.validate(updateData)
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

module.exports = productUpdateMiddleware