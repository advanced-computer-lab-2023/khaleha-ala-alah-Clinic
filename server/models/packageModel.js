
const mongoose = require('mongoose');
const package = new mongoose.Schema({
    Name: {
      type: String,
      enum : ['silver', 'gold', 'platinum'],
      required: [true, 'Please provide the name of packages']
    },
    price: {
      type: Number,
      required: [true, 'Please provide price for packages'],
    },
    description : {
        type: String,
        required: [true, 'Please provide description for packages'],
    },
    default: null
});

const Package = mongoose.model('Package', package);