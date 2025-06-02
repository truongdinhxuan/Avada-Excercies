const Router = require('koa-router')
const productHandler = require('../src/handlers/product/productHandler')
const productInputMiddleware = require('../src/middleware/productInputMiddleware')
const productUpdateMiddleware = require('../src/middleware/productUpdateMiddleware')
const router = new Router({
    prefix: '/api'
})


router.get('/products', async(ctx) => {
    const products = await productHandler.getAllProducts(ctx)
    await ctx.render('products', {
        title: "danh sach sp",
        products
    })
})
router.get('/products/:id', productHandler.getSingleProduct)

router.post('/products', productInputMiddleware, productHandler.createNewProduct)
router.put('/products/:id', productUpdateMiddleware, productHandler.updateProduct)

router.delete('/products/:id', productHandler.deleteProduct)

module.exports = router