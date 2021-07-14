import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userModel from './model/user';
import realEstateModel from './model/real-estate';
import { checkNewPassword } from './password-utils';

const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads');
    },
    filename: (req: any, file: any, cb: any) => {
        let prefix = req.body.username ? 'profile-' : 'real-estate-';
        cb(null, prefix + Date.now() + file.originalname);
    }
});

var upload = multer({ storage: storage });

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

// files route

router.post('/download-profile-picture', function (req, res) {
    const username = req.body.username;
    userModel.findOne({ 'username': username }, (err, user) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        if (user) {
            let filepath = path.join(__dirname, '../uploads') + '/' + user.get('picture');
            res.sendFile(filepath);
        }
        else {
            res.json(null);
        }
    });
});

router.post('/download', (req, res) => {
    const filepath = path.join(__dirname, '../uploads') + '/' + req.body.path;
    res.sendFile(filepath);
});

router.route('/real-estate-picture-paths').post((req, res) => {
    const id = new mongoose.mongo.ObjectId(req.body._id);
    realEstateModel.findOne({ '_id': id }, (err, realEstate) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        if (realEstate)
            res.json(realEstate.get('pictures'));
        else
            res.json(null);
    });
});

router.post('/download-random-real-estate-picture', function (req, res) {
    const id = req.body._id;
    realEstateModel.findOne({ '_id': id }, (err, realEstate) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        if (realEstate) {
            const pictures = realEstate.get('pictures');
            const picturePath = pictures[Math.floor(Math.random() * pictures.length)];
            const filepath = path.join(__dirname, '../uploads') + '/' + picturePath;
            res.sendFile(filepath);
        }
        else {
            res.json(null);
        }
    });
});

// users routes

app.post('/profile-picture-change', upload.single('file'), (req: any, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error("Please upload file");
        return next(error);
    }

    const username = req.body.username;
    userModel.collection.updateOne({ 'username': username }, { $set: { 'picture': file.filename } });
    res.json({ ok: true });
});

app.post('/register-with-picture', upload.single('file'), (req: any, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error("Please upload file");
        return next(error);
    }

    let newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        city: req.body.city,
        country: req.body.country,
        role: Number(req.body.role),
        active: false,
        picture: file.filename,
    };

    const passwordRepeat = req.body.passwordRepeat;
    if (!checkNewPassword(newUser.password, passwordRepeat)) {
        res.json({ ok: false });
        return;
    }

    userModel.findOne({ $or: [{ 'username': newUser.username }, { 'email': newUser.email }] }, (err, user) => {
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

router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    userModel.findOne({ 'username': username, 'password': password, active: true }, 'username role', (err, user) => {
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
        picture: 'default-picture.jpg',
    };

    const passwordRepeat = req.body.passwordRepeat;
    if (!checkNewPassword(newUser.password, passwordRepeat)) {
        res.json({ ok: false });
        return;
    }

    userModel.findOne({ $or: [{ 'username': newUser.username }, { 'email': newUser.email }] }, (err, user) => {
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

router.route('/password-change').post((req, res) => {
    const username = req.body.username;
    const passwordOld = req.body.passwordOld;
    const password = req.body.password;
    const passwordRepeat = req.body.passwordRepeat;

    if (!checkNewPassword(password, passwordRepeat)) {
        res.json({ ok: false });
        return;
    }

    const filter = { 'username': username, 'password': passwordOld, 'active': true };
    userModel.collection.updateOne(filter, { $set: { 'password': password } }, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ ok: false });
            return;
        }

        res.json({ ok: result.modifiedCount > 0 });
    });
});

router.route('/user-delete').post((req, res) => {
    const username = req.body.username;
    userModel.collection.deleteOne({ 'username': username, 'active': true });
    res.json({ ok: true });
});

router.route('/user-data-change').post((req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const city = req.body.city;
    const country = req.body.country;
    const update = {
        $set: {
            'firstname': firstname,
            'lastname': lastname,
            'city': city,
            'country': country,
        }
    };

    userModel.collection.updateOne({ 'username': username, 'active': true }, update, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ ok: false });
            return;
        }

        res.json({ ok: true });
    });
});

router.route('/get-user').post((req, res) => {
    const username = req.body.username;
    const filter = { 'username': username, 'active': true };
    const projection = 'firstname lastname city country';
    userModel.findOne(filter, projection, (err, user) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(user);
    });
});

router.route('/allUsers').post((req, res) => {
    userModel.find({ 'role': { $ne: 3 } }, '-password', (err, users) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(users);
    });
});

// real estate routes

router.route('/real-estate-accept').post((req, res) => {
    const id = new mongoose.mongo.ObjectId(req.body._id);
    const username = req.body.username;
    realEstateModel.collection.updateOne({ _id: id, 'active': true }, { $set: { 'offers': [], 'owner': username } });
    res.json({ ok: true });
});

router.route('/real-estate-buy').post((req, res) => {
    const id = new mongoose.mongo.ObjectId(req.body._id);
    const username = req.body.username;
    realEstateModel.collection.updateOne({ _id: id, 'active': true }, { $push: { 'offers': username } });
    res.json({ ok: true });
});

router.route('/real-estate-rent').post((req, res) => {
    const id = new mongoose.mongo.ObjectId(req.body._id);
    const username = req.body.username;
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;
    const offer = {
        username: username,
        dateFrom: dateFrom,
        dateTo: dateTo,
    };

    // TODO: check date overlaps

    realEstateModel.collection.updateOne({ _id: id, 'active': true }, { $push: { 'offers': offer } });
    res.json({ ok: true });
});

app.post('/real-estate-new', upload.array('file[]'), (req: any, res, next) => {
    const file = req.files;

    if (!file) {
        const error = new Error("Please upload file");
        return next(error);
    }

    if (file.length < 3) {
        res.json({ ok: false });
        return;
    }

    let realEstateData = {
        description: req.body.description,
        city: req.body.city,
        municipality: req.body.municipality,
        street: req.body.street,
        streetnumber: req.body.streetnumber,
        ishouse: Boolean(req.body.ishouse),
        numfloors: Number(req.body.numfloors),
        size: Number(req.body.size),
        numrooms: Number(req.body.numrooms),
        furnished: Boolean(req.body.furnished),
        renting: Boolean(req.body.renting),
        price: Number(req.body.price),
        owner: req.body.owner,
        promoted: false,
        active: false,
        pictures: file.map((element: any) => element.filename),
    };

    realEstateModel.collection.insertOne(realEstateData, (err, realEstate) => {
        if (err) {
            console.log(err);
            res.json({ ok: false });
            return;
        }

        res.json({ ok: true });
    });
});

router.route('/real-estate-get').post((req, res) => {
    const id = new mongoose.mongo.ObjectId(req.body._id);
    realEstateModel.findOne({ _id: id, 'active': true }, (err, realEstate) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(realEstate);
    });
});

router.route('/real-estates-list').post((req, res) => {
    realEstateModel.find({}, (err, realEstates) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(realEstates);
    });
});

router.route('/owned').post((req, res) => {
    const username = req.body.username;
    realEstateModel.find({ 'owner': username }, (err, realEstates) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(realEstates);
    });
});

router.route('/promoted').post((req, res) => {
    realEstateModel.find({ 'promoted': true }, (err, realEstates) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(realEstates);
    });
});

router.route('/unapproved').post((req, res) => {
    realEstateModel.find({ 'active': false }, (err, realEstates) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(realEstates);
    });
});

router.route('/real-estate-promoted-add').post((req, res) => {
    const id = new mongoose.mongo.ObjectId(req.body._id);
    realEstateModel.collection.updateOne({ _id: id, 'active': true }, { $set: { 'promoted': true } });
    res.json({ ok: true });
});

router.route('/real-estate-promoted-remove').post((req, res) => {
    const id = new mongoose.mongo.ObjectId(req.body._id);
    realEstateModel.collection.updateOne({ _id: id, 'active': true }, { $set: { 'promoted': false } });
    res.json({ ok: true });
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
    let priceFilter = {};
    if (priceLow && priceHigh) {
        priceFilter = {
            $and: [
                { 'price': { $gte: priceLow } },
                { 'price': { $lte: priceHigh } }
            ]
        };
    }
    else if (priceLow) {
        priceFilter = { 'price': { $gte: priceLow } };
    }
    else if (priceHigh) {
        priceFilter = { 'price': { $lte: priceHigh } };
    }

    realEstateModel.find({ 'active': true, ...priceFilter }, (err, realEstates) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(realEstates.filter((element: any) => element.city.includes(nameQuery)));
    });
});

router.route('/dashboard-real-estate-per-price').post((req, res) => {
    realEstateModel.find({}, 'price').sort('price').exec((err, prices) => {
        if (err) {
            console.log(err);
            res.json(null);
            return;
        }

        res.json(prices);
    });
});

router.route('/dashboard-real-estate-per-city').post((req, res) => {
    let cursor = realEstateModel.collection.aggregate([{ $group: { _id: "$city", total: { $sum: 1 } } }]);
    cursor.toArray().then(arr => res.json(arr));
});

router.route('/dashboard-houses-rent-sale').post((req, res) => {
    let cursor = realEstateModel.collection.aggregate([
        { $match: { ishouse: true } },
        { $group: { _id: "$renting", total: { $sum: 1 } } }
    ]);
    cursor.toArray().then(arr => res.json(arr));
});

router.route('/dashboard-apartments-rent-sale').post((req, res) => {
    let cursor = realEstateModel.collection.aggregate([
        { $match: { ishouse: false } },
        { $group: { _id: "$renting", total: { $sum: 1 } } }
    ]);
    cursor.toArray().then(arr => res.json(arr));
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
