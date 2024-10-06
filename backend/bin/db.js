const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE)
    .then(() => console.log('db conn success'))
    .catch((err) => console.error('Database connection error:', err.message))