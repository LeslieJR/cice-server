const user = require('./user.routes');
const product = require('./product.routes');
const company = require('./company.routes')
const category = require('./category.routes')

module.exports = {
    user,
    product,
    company,
    category
}