require('dotenv').config()
require("./connection/db");
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const app = express();
import router from './routers/brandsRouter';

app.use(cors({origin:true,credentials:true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router)

app.listen(process.env.port, () => console.log(`I'm listening to port ${process.env.port}!`));