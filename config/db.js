const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://sdeepakncy:deepaksharma@cluster0.sdlfzzw.mongodb.net/messaging-app';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

module.exports = mongoose;
