const expressAsyncHandler = require("express-async-handler");
// const Todo = require("../model/todomodel");
const todo = require('../model/todomodels')

const gettodos = expressAsyncHandler(async(req,res)=>{
   const gettodos = await todo.find()
   if(!gettodos){
    res.status(401)
    throw new Error("Something went wrong")
   }
   res.status(200)
   res.json(gettodos)

})
const gettodo = expressAsyncHandler(async(req,res)=>{
    const gettodo = await todo.findById(req.params.id)
    if(!gettodo){
        res.status(401)
        throw new Error("Something went wrong")
    }
    res.status(200)
    res.json(gettodo)
})
const addtodo = expressAsyncHandler(async(req,res)=>{
    const {title, description} = req.body
    if(!title || !description){
     res.status(401)
     throw new Error("please fill all the details")
    }
    const newtodo = await todo.create({
        title,
        description
    })
    if(!newtodo){
        res.status(401)
        throw new Error("todo not created")
    }
    res.status(201)
    res.json(newtodo)
})
const updatetodo = expressAsyncHandler(async(req,res)=>{
   const updatetodo = await todo.findByIdAndUpdate( req.params.id,  req.body, {new : true})
   if(!updatetodo){
    res.status(401)
    throw new Error("todos not updated")
   }
   res.status(200)
   res.json(updatetodo)
})
const removetodo = expressAsyncHandler(async(req,res)=>{
   const removetodo = await todo.findByIdAndDelete(req.params.id)
   if(!removetodo){
    res.status(401)
    throw new Error("todos not deleted")
   }
   res.status(200)
   res.json("todo deleted successfully")
})

module.exports = {gettodos, gettodo, addtodo, updatetodo, removetodo}