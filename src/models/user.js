const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    type : String,
    default : '',
    required : [true,'Name is required'],
    match: /^[a-zA-Z ]{2,15}$/,
  },

  email: {
    type : String,
    default : '',
    required : [true,'Email is required'],
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/,
//     validate: {
//     validator: async function(v) {
//     const user = await this.constructor.findOne({ email: v, deleted_at : null, role_type: 'user' });
//         return !user;
//       },
//       message: props => `The specified Email is already in use.`
// }
  },

  mobile_number : {
    type : Number,
    default : ''
  },

  password : {
    type : String,
    required :  [true,'password is required'],
    default : ''
  },

  address : {
    type : String,
    default : ''
  },

  gender : {
    type : String,
    default : ''
  },

  role_type : {
    type : String,
    enum : ['user','admin'],
    // required :  [true,'Role Type is required'],
    default : 'user'
  },

  status : {
    type : Boolean,
    default : true
  },

  // actual_price : {
  //   type : Number,
  //   default : '',
  //   required : [true, 'Actual price is required']
  // },

  // sale_price : {
  //   type : Number,
  //   default : '',
  //   required : [true, 'Sale price is required']
  // },

  // short_description : {
  //   type : String,
  //   default : '',
  //   required : [true, 'Short Description is required']
  // },

  image : {
    type : String,
    default : ''
  },

    images : {
    type : Array,
    default : []
  },

  created_at : {
    type : Date,
    default : Date.now()
  },

  updated_at : {
    type : Date,
    default : Date.now()
  },

  deleted_at :{
    type : Date,
    default : ''
  },

});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
