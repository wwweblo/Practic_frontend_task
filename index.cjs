const express = require('express');
const cors = require('cors');
const phonesRoutes = require('./routes/phones');

const app = express();
const PORT = 3000;

app.use(cors());
app.use('/api/phones', phonesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});