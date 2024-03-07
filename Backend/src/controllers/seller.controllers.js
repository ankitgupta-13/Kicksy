import { Product } from "../models/product.models.js";
import { Request, Seller } from "../models/seller.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createSeller = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) return res.json(new ApiResponse(404, 'user not found'))

        user.role = 'seller';
        await user.save()

        const seller = new Seller({
            email: user.email,
            userID: user._id
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

const acceptRequest = async (req, res) => {
    const { requestID, productID,  existing } = req.body;

    // typeof(existing) -------> boolean

    try {
        const request = await Request.findOne({ _id: requestID });

        if (!request) return res.json(new ApiResponse(422, 'invalid requestID'))

        if (existing) {
            const product = await Product.findOne({ _id: productID });
            if (!product) return res.json(new ApiResponse(422, 'invalid productID'))
            product.sellers.concat(request.seller);
        }

    }
    catch (err) {
        return res.json(new ApiError(400, err.message));
    }
}

export {
    createSeller,
    productAddRequest,
    getAllRequests,
    acceptRequest
}
