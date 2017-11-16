import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import multer from 'multer';

import config from './config/config';
import router from './routes/routes';

mongoose.connect(config.mongoUrl, () => {
    console.log('Db initialized!');
});

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/listeContact', router);

app.listen(config.port, () => {
    console.log(`Started on port ${config.port}`);
});