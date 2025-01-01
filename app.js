require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();

mongoose.connect("mongodb+srv://sriram:1324@cluster0.9gopd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster", { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/resources', resourceRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
