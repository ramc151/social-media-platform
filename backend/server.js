require('dotenv').config({ path: './.env' });
require('./bin/db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const authRoutes = require('./router/auth_rout');
const postRoutes = require('./router/post_rout');
const userRoutes = require('./router/user_rout');

app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
}))

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
})