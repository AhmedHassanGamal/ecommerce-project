const mongoose = require('mongoose');

const databasee = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then((conn) => {
            console.log(`Connected to the database: ${conn.connection.host}`);
        })
        .catch((err) => {
            console.log(`DB connection error: ${err}`);
            process.exit(1);
        });
};

module.exports = databasee;
