const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

   user_id : {
        type : String,
        required : [true, 'User Id is required'],
        default : '',
        ref : 'users'
    },
    order_number : {
        type : String,
        default : '',
    },
    order_id : {
        type : String,
        default : '',
    },
    order_date : {
        type : Date,
        default : Date.now(),
    },
    payment_id : {
        type : String,
        default : '',
    },
    product_info : {
        type : Array,
        required : [true, 'Product Details is required']
    },
    total_amount : {
        type : Number,
        required : [true, 'Total amount is required'],
        default : '',
    },
    discount_amount : {
        type : Number,
        required : [true, 'Discount amount is required'],
        default : '',
    },
    net_amount : {
        type : Number,
        required : [true, 'Net amount is required'],
        default : '',
    },
    payment_status : {
        type : Number,
        default : 1,    // 1 - Pending 2 - Completed 3 - Failed / Cancelled
    },

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

   status : {
        type : Boolean,
        default : true
    },

  address : {
    type : Object,
    default : ''
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

const orderModel = mongoose.model('orders', orderSchema);

module.exports = orderModel;
