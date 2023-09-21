import mongoose from 'mongoose'

const turfModel = new mongoose.Schema({
    vendor: {
        type: mongoose.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    coordinates: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
    district: {
        type: mongoose.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }],
    isBlocked: {
        type: Boolean,
        default: true,
    },
    isBooked: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
    })

export default mongoose.model('Turf', turfModel)
