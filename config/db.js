const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/messaging-app';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

module.exports = mongoose;
