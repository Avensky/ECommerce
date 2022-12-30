if (process.env.NODE_ENV === 'production'){
    module.exports = require('./prod.ts');
} else {
    module.exports = require('./dev.ts');
};