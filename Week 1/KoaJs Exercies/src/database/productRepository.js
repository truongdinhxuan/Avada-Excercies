const fs = require('fs')
const { data: products } = require('./product.json')

const filePath = './src/database/product.json'

function getAllProducts() {
    return products
}
function getSingleProduct(id) {
    return products.find(product => product.id == id)
}
function updateProduct(id, newData) {
    try {
        // const product = products.find(product => product.id == id)
        const readData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const updatedProduct = readData.data.map(product => {
            if (product.id === parseInt(id)) {
                // console.log(id)
                return {
                    ...product,
                    ...newData,
                    id: product.id,
                    createdAt: product.createdAt
                }
            }
            return product
        })
        // console.log(updatedProduct)
        return fs.writeFileSync(filePath, JSON.stringify({ data: updatedProduct }, null, 2));
    } catch (error) {
        throw new Error("chiu billard")
    }
}
function createNewProduct(data) {
    const existedId = products.some(product => product.id === data.id)
    if (existedId) {
        throw new Error("id da ton tai")
    }
    const newProduct = [data, ...products]
    return fs.writeFileSync(filePath, JSON.stringify({
        data: newProduct
    }, null, 2))
}
function deleteProduct(id) {
    try {
        const readData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const filteredProducts = readData.data.filter(product => product.id !== id)
        // console.log(filteredProducts)
        return fs.writeFileSync(filePath, JSON.stringify({ data: filteredProducts }, null, 2))
    } catch (error) {
        throw new Error("chiu billard")
    }
}
module.exports = {
    getAllProducts,
    deleteProduct,
    getSingleProduct,
    createNewProduct,
    updateProduct
}