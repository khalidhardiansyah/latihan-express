var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator')

const {Product} = require('../models/')

const v = new Validator()
// api create
router.post('/', async(req, res)=>{
    const schema ={
        name:'string',
        brand:'string',
        description:'string|optional'
    }
    const validate = v.validate(req.body, schema)
    if(validate.length){
        return res.status(400).json(validate);
    }
    // create data
    const product = await Product.create(req.body);
    res.json(product);
})

// api update
router.put('/:id', async (req, res)=>{
    const id = req.params.id;
    
    let product = await Product.findByPk(id);
    if(!product){
        return res.json({message:'tidak ditemukan'});
    }

    const schema ={
        name:'string|optional',
        brand:'string|optional',
        description:'string|optional'
    }
    const validate = v.validate(req.body, schema)
    if(validate.length){
        return res.status(400).json(validate);
    }

    // update data
    product = await product.update(req.body);
    res.json(product)
    
})

// api get/read all
router.get('/', async (req, res)=>{
    const products = await Product.findAll();
    return res.json(products)
})

// get byID / read by ID
router.get('/:id', async(req, res)=>{
    const id = req.params.id
    const product = await Product.findByPk(id);
    if(!product){
        return res.json({message:'tidak ditemukan'});
    }
    return res.json(product)
})

// delete
router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    const product = await Product.findByPk(id);
    if(!product){
        return res.json({message:'tidak ditemukan'});
    }
    await product.destroy();
    res.json({
        msg:"berhasil dihapus"
    })
})


module.exports = router;
