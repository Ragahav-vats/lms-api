const mongoose = require('mongoose');

const defaultSchema = new mongoose.Schema({
//     user_id : {
//     type : String,
//     required : [true, 'User Id is require' ],
//     default : '',
//     ref : 'users'
//   },
  name: {
    type : String,
    default : '',
    required : [true,'Name is required'],
    match: /^[a-zA-Z ]{2,15}$/,
    validate: {
      validator: async function(v) {
        const user = await this.constructor.findOne({ name: v, deleted_at : null });
        return !user;
      },
      message: props => `The specified username is already in use.`
}
  },
   email: {
    type : String,
    default : '',
    required : [true,'Email is required'],
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/,
    validate: {
    validator: async function(v) {
    const user = await this.constructor.findOne({ email: v, deleted_at : null, role_type: 'user' });
        return !user;
      },
      message: props => `The specified Email is already in use.`
}
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
    required :  [true,'Role Type is required'],
    default : 'user'
  },
  status : {
    type : Boolean,
    default : true
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

const defaultModel = mongoose.model('defaults', defaultSchema);

module.exports = defaultModel;