import mongoose from "mongoose";

const productRequestSchema = new mongoose.Schema({

  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  skuid: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  size: {
    type: [String],
    required: true
  },
  category: {
    type: [String],
    enum: ['anime', 'boots', 'sneakers', 'sandals'],
    required: true,
  },
  color: {
    type: [String],
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
  },
  tags: [
    {
      type: String
    }
  ]

})




const requestProductSchema = new mongoose.Schema({
  product: productRequestSchema,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Seller'
  }
}, {
  timestamps: true
})


const sellerRequestSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  gstNumber:{
    type:String,
    validate: {
      validator: function (value) {
     // Check if the GST number has exactly 15 characters
        return value.length === 15;
      },
      message: props => `${props.value} is not a valid GST number. It should have exactly 15 characters.`,
    }
  },
  website: String,
  whatsappNumber: {
    type: String,
    unique: true
  },
  instagram: {
    type: String,
    unique: false
  },
  notes:{
    type: String
  }

})




const ProductRequest = new mongoose.model('ProductRequest', requestProductSchema);
const SellerRequest = new mongoose.model('SellerRequest' , sellerRequestSchema);

export {ProductRequest , SellerRequest}