import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RealEstate = new Schema({
    description: {
        type: String
    },
    city: {
        type: String
    },
    municipality: {
        type: String
    },
    street: {
        type: String
    },
    streetnumber: {
        type: String
    },
    ishouse: {
        type: Boolean
    },
    numfloors: {
        type: Number
    },
    size: {
        type: Number
    },
    numrooms: {
        type: Number
    },
    furnished: {
        type: Boolean
    },
    // TODO: pictures (at least 3 pictures or videos)
    renting: {
        type: Boolean
    },
    price: {
        type: Number
    },
    owner: {
        type: String
    },
    promoted: {
        type: Boolean
    },
    active: {
        type: Boolean
    },
});

export default mongoose.model('RealEstates', RealEstate, 'real-estate');
