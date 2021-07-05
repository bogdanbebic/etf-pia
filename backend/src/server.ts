import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userModel from './model/user';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connectionString = 'mongodb://localhost:27017/real-estate-agency';

mongoose.connect(connectionString);
const conn = mongoose.connection;
conn.once('open', () => {
    console.log('mongo open');
});

const router = express.Router();

// TODO: routes
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    userModel.findOne({'username': username, 'password': password}, 'username role', (err, user) => {
        if (err) {
            console.log(err);
            return;
        }

        res.json(user);
    });
});

router.route('/allUsers').post((req, res) => {
    userModel.find({}, (err, users) => {
        if (err) {
            console.log(err);
            return;
        }

        res.json(users);
    });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
