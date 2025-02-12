const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/starkindustry';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connection success
mongoose.connection.on('connected', () => {
    console.log(`✅ MongoDB connected successfully to ${DB_URL}`);
});

// Connection error
mongoose.connection.on('error', (err) => {
    console.error(`❌ MongoDB connection error: ${err}`);
});

// Connection closed
mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected. Retrying...');
});

module.exports = mongoose;
