const dotenv = require('dotenv');
dotenv.config();
dotenv.config({
    path: `./${process.env.NODE_ENV}.env`
});
console.log(process.env.db_password,"DB pass");
module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    database: {
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_password,
        db: process.env.db_name,
        dialect: process.env.db_dialect,
        logging: process.env.db_logging,
        pool: {
            "max": 5,
            "min": 0,
            "acquire": 30000,
            "idle": 10000
        },
    },
    cryptoPassword: process.env.crypto_password,
}
