const express = require('express');
const cors = require('cors');

require('./db.js'); // Database connection
const routes = require('./routes/employee.routes.js');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/employees', routes);

app.get('/', (req, res) => {
    res.send('🚀 Employee Management API is running!');
});

app.listen(PORT, () => {
    console.log(`✅ Server started at port: ${PORT}`);
}).on('error', (err) => {
    console.error(`❌ Server error: ${err.message}`);
});
