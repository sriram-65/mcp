const express = require('express');
const multer = require('multer');
const Resource = require('../models/model');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
    const resources = await Resource.getAll();
    res.render('resources', { resources });
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', upload.single('file'), async (req, res) => {
    await Resource.create({
        title: req.body.title,
        description: req.body.description,
        fileUrl: `/uploads/${req.file.filename}`,
    });
    res.redirect('/resources');
});

module.exports = router;
