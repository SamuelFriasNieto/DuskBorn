import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, subCategory, sizes, image, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];

        const images = [image1, image2].filter((item) => item !== undefined);

        let imageUrl = await Promise.all(
            images.map(async (img) => {
                const result = await cloudinary.uploader.upload(img.path, {
                    resource_type: 'image'
                });
                return result.secure_url;
            })
        );

        console.log(imageUrl);
        const newProduct = new productModel({
            name,
            price: Number(price),
            description,
            category,
            image,
            subCategory,
            sizes:JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false, 
            image: imageUrl,
            date: Date.now()
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const listProducts = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeProduct = async (req,res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.body.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const singleProduct = async (req,res) => {
    try {
        const product = await productModel.findById(req.body.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { addProduct, listProducts, removeProduct, singleProduct };