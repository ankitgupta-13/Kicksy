import { Address } from "../models/address.model.js";
import { Offer } from "../models/offer.model.js";
import { Product } from "../models/product.models.js";
import { Request, Seller } from "../models/seller.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse, message} from "../utils/ApiResponse.js";
import { uploadOnAws } from "../utils/aws.js";
import fs from 'fs'

/*
try{
        
}
catch(err){
    return res.json(new ApiError(400 , err.message));
}
*/



const createSeller = async (req, res) => {
    try {
        const { userID, gstNumber,  storeName , whatsappNumber} = req.body;
        // console.log(req.body)
        
        

        const user = await User.findOne({ _id:userID });

        if (!user) return res.json(new ApiResponse(404, 'user not found'))

        user.role = 'seller';
        await user.save()

        if(!req.file) return message(res , 'res' , 404 , 'Image not found , upload image'); 

        const logoImageUrl = await uploadOnAws(req.file.path);

        
        if (!logoImageUrl) {
            fs.unlinkSync(req.file.path);
            return res.json(new ApiResponse(400, "Unable to upload logo"));
        }

        fs.unlinkSync(req.file.path);
        
        const address = new Address(req.body);
        await address.save()

        const seller = new Seller({
            email: user.email,
            userID: user._id,
            gstNumber,
            storeAddress:address._id,
            storeName,
            storeLogo:logoImageUrl,
            whatsappNumber
        })

        await seller.save();


        return res.json(new ApiResponse(200, `role updated to ${user.role}`))

    }
    catch (err) {
        return res.json(new ApiError(400, err.message));
    }
}






// seller makes a request ---> 

// ---> request gets stored in DB ---> 

// ---> Admin dashboard will have an option to see all these requests ---> 

// ---> requests can be accepted or declined from dashboard ---> 

// ---> admin will be given an option to 1) add the qty to the existing product or 2) create new product --->

// ---> if admin chooses option 1 , quantity of whichever product admin chooses will be increased --->

// ---> if admin chooses option 2 , new product will be added to the DB

// ---> admin will have an option to edit the request parameters as per his need and requirements

const productAddRequest = async (req, res) => {
    const { sellerID } = req.body

    console.log(req.body)

    try {
        const { images } = req.body;
        if (!images || images.length === 0) {
            return res.json(new ApiResponse(422, 'You need to attach atleast 1 image of the product '));
        }

        const seller = await Seller.findOne({ _id: sellerID })

        if (!seller || seller.role !== 'seller') return res.json(new ApiResponse(404, 'seller not found'));

        const request = new Request({
            product: req.body,
            seller: sellerID
        })

        await request.save();

    }
    catch (err) {
        return res.json(new ApiError(400, err.message))
    }
}


/* this api is for raising request to add offer to the existing product */

const addOfferRequest = async (req, res) => {
    const { productID } = req.body;
    try {

    }
    catch (err) {

    }
}

const getAllRequests = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const requests = await Request.find({})
            .skip((page - 1) * limit)
            .limit(limit)

        res.json(
            new ApiResponse(200, { requests, page }, 'requests fetched successfully')
        )
    }

    catch (err) {
        return res.json(new ApiError(400, err.message))
    }

}

const acceptProductRequest = async (req, res) => {

    const { requestID } = req.body;

    try {



    }
    catch (err) {
        return res.json(new ApiError(400, err.message));
    }
}



export {

    createSeller,
    productAddRequest,
    getAllRequests,
    acceptProductRequest

}
