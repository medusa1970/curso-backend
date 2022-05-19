const express = require('express');
const petRouter = require('./router/petRouter');
app = express();

require('./database')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pets', petRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});