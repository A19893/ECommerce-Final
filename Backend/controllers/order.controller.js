const Order=require("../models/orderModel");
//Create New Order
exports.newOrder=async(req,res,next)=>{
    console.log(req.body);
try{
const{
    shippingInfo,
    order,
    user,
    Quantity,
    subTotal
}=req.body

const orders=await Order.create({
    shippingInfo,
    order,
    user,
    Quantity,
    subTotal
});
res.status(201).json({
    success:true,
    orders,
});
}
catch(err){
    console.log(err);
}
}
//get Single Order
exports.getSingleOrder=async(req,res)=>{
    try{
    const order=await Order.findById(req.params.id);
    if(!order){
        return res.status(401).json({
            success:false,
            message:"No Order Found"
        })
    }
    return res.status(200).json({
        success:true,
        order
    })
}
catch(err){
    console.log(err);
}
}
//get MyOrders
exports.getMyOrders=async(req,res,next)=>{
    try{
    const myOrders=await Order.find({user:req.params.id})
    return res.status(200).json({
        success:true,
        myOrders
    })
}
catch(err){
    console.log(err);
}
}
//get AllOrders
exports.getAllOrders=async(req,res,next)=>{
    try{
    const Orders=await Order.find();
   res.status(200).json({
    success:true,
    Orders
   })
}
catch(err){
    console.log(err);
}
}
//update OrderStatus
exports.updateOrder=async(req,res)=>{
    console.log(req.params.id,req.body);
    try{
    const order=await Order.findById(req.params.id);
    console.log(order);
    // if(order.orderStatus==="Delivered"){
    //    return  res.status(401).json({
    //         success:false,
    //         message:"Already Delivered"
    //     })
    // }
    // order.orderItems.forEach(async(item)=>{
    //     await updateStock(item.product,item.quantity);
    // })
    order.orderStatus=req.body.orderStatus;
    // order.deliveredAt=Date.now();
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        order
    });
}
catch(err){
    console.log(err)
}
}
async function updateStock(id,quantity){
    const product=await Product.findById(id);
    product.Stock=product.Stock-quantity;
    await product.save({validateBeforeSave:false});
}
//Delete Order
exports.deleteOrder=async(req,res)=>{
    console.log('---remobve id',req.params.id);
    try{
    const order=await Order.findByIdAndRemove(req.params.id);
    console.log('-----removee----',order);
    if(order){
    return res.status(200).json({
        success:true,
        message:"Order Deleted"
    })
}
else{
    return res.status(203).json({
        success:true,
        message:"Order Deleted"
    })
}
    }
    catch(err){
        console.log(err);
    }
}
exports.getVendorOrder=async(req,res)=>{
    // console.log(req.params.id);
    try{
    const Orders=await Order.find({'order.CreatedBy':req.params.id});
    res.status(200).json({
        success:true,
        Orders
       })
    }
    catch(err){
        console.log(err)
    }
}