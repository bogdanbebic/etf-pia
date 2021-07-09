import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import userModel from './model/user';
import realEstateModel from './model/real-estate';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.set('debug', true);

const connectionString = 'mongodb://localhost:27017/real-estate-agency';

mongoose.connect(connectionString);
const conn = mongoose.connection;
conn.once('open', () => {
    console.log('mongo open');
});

const router = express.Router();

router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    userModel.findOne({'username': username, 'password': password, active: true}, 'username role', (err, user) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(user);
    });
});

router.route('/register').post((req, res) => {
    let newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        city: req.body.city,
        country: req.body.country,
        role: req.body.role,
        active: false,
    };

    userModel.findOne({ $or: [{'username': newUser.username}, {'email': newUser.email}]}, (err, user) => {
        if (err) {
            console.log(err);
            res.json({ ok: false });
            return;
        }
        if (user) {
            res.json({ ok: false });
            return;
        }

        userModel.collection.insertOne(newUser, (err, user) => {
            if (err) {
                console.log(err);
                res.json({ ok: false });
                return;
            }

            res.json({ ok: true });
        });
    });
});

router.route('/registration-accept').post((req, res) => {
    const username = req.body.username;
    userModel.collection.updateOne({ 'username': username, 'active': false }, { $set: { 'active': true } });
    res.json({ ok: true });
});

router.route('/registration-reject').post((req, res) => {
    const username = req.body.username;
    userModel.collection.deleteOne({ 'username': username, 'active': false });
    res.json({ ok: true });
});

router.route('/user-delete').post((req, res) => {
    const username = req.body.username;
    userModel.collection.deleteOne({ 'username': username, 'active': true });
    res.json({ ok: true });
});

router.route('/allUsers').post((req, res) => {
    userModel.find({}, '-password', (err, users) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(users);
    });
});

router.route('/promoted').post((req, res) => {
    realEstateModel.find({'promoted': true}, (err, realEstates) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(realEstates);
    });
});

router.route('/unapproved').post((req, res) => {
    realEstateModel.find({'active': false}, (err, realEstates) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(realEstates);
    });
});

router.route('/real-estate-approve').post((req, res) => {
    const id = new mongoose.mongo.ObjectId(req.body._id);
    realEstateModel.collection.updateOne({ _id: id, 'active': false }, { $set: { 'active': true } });
    res.json({ ok: true });
});

router.route('/real-estate-reject').post((req, res) => {
    const id = new mongoose.mongo.ObjectId(req.body._id);
    realEstateModel.collection.deleteOne({ _id: id, 'active': false });
    res.json({ ok: true });
});

router.route('/search').post((req, res) => {
    const nameQuery = req.body.nameQuery;
    const priceLow = req.body.priceLow;
    const priceHigh = req.body.priceHigh;
    const priceFilter = { $and: [
        { 'price': { $gte: priceLow } },
        { 'price': { $lte: priceHigh } }
    ]};

    realEstateModel.find(priceFilter, (err, realEstates) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(realEstates.filter((element: any) => element.description.includes(nameQuery)));
    });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
