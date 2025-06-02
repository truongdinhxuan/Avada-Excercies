const { createNewProduct: createProduct,
    getSingleProduct: getProduct,
    getAllProducts: getProducts,
    deleteProduct: deleteSingleProduct,
    updateProduct: updateSingleProduct
}
    = require('../../database/productRepository')

async function getAllProducts(ctx) {
    let { limit, orderBy, sort } = ctx.query
    let products = getProducts()

    if (orderBy) {
        products = products.sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return -1;
            if (a[orderBy] > b[orderBy]) return 1;
            return 0;
        });
    }

    if (sort) {
        if (sort == "desc") {
            products = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        } else if (sort == "asc") {
            products = products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        } else {
            ctx.status = 400
            ctx.body = {
                error: 'Nhập desc hoặc asc'
            }
        }
    }

    if (limit) {
        limit = parseInt(limit)
        if (!isNaN(limit)) {
            products = products.slice(0, limit)
        }
    }
    return products
}
async function getSingleProduct(ctx) {
    try {
        const productId = ctx.params.id
        let product = getProduct(productId)

        const { field } = ctx.query
        if (field) {
            product = { [field]: product[field] }
        }
        ctx.body = product
    } catch (error) {
        ctx.status = 400
        ctx.message = error.message
    }
}
async function updateProduct(ctx) {
    try {
        const productId = ctx.params.id

        const { name, price } = ctx.request.body
        const data = {};
        if (name !== undefined) data.name = name;
        if (price !== undefined) data.price = price;
        // console.log(data)

        updateSingleProduct(productId, data)
    } catch (error) {
        ctx.status = 400
        ctx.error = error.message
    }
}
async function createNewProduct(ctx) {
    try {
        const dataProduct = ctx.request.body
        const createdAt = new Date()

        let newProduct = {
            ...dataProduct,
            createdAt
        }
        createProduct(newProduct)
        ctx.status=200
        ctx.body={message: "them ok roi day"}
    } catch (error) {
        ctx.status = 400,
        ctx.message = error.message
    }
}
async function deleteProduct(ctx) {
    try {
        const productId = ctx.params.id
        // console.log(productId)
        deleteSingleProduct(Number(productId))
        ctx.body = "xoa thanh cong"
    } catch (error) {
        ctx.status = 400
        ctx.message = error.message
    }
}
module.exports = {
    getAllProducts,
    getSingleProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
}