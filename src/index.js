const express = require('express');
const userRoutes = require('./router/userRouter');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./database')
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });