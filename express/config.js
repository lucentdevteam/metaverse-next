const dotenv = require('dotenv');
dotenv.config();
dotenv.config({
    path: `./${process.env.NODE_ENV}.env`
});
module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    database: {
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_password,
        db: process.env.db_name,
    },
    defaultImage: process.env.defaultImage
}
