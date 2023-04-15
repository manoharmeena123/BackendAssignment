const express = require("express")
const roleRouter = express.Router()
const {RoleModel} = require("../models/role.model")
const {authorise} = require("../middleware/authorise")

roleRouter.get("/get",async(req,res)=>{
    try {
          const data = await RoleModel.find()
    res.json(data)
        
    } catch (error) {
        res.json(error)
    }
  
})


//POST=============================================>
roleRouter.post("/create", authorise(["admin","user"]),async(req,res)=>{
    const payload = req.body
    try {
        const data = new RoleModel(payload)
    await data.save()
    res.send("Data Posted Successfully")
    } catch (error) {
        console.log(error)
        res.send("error in Post")
    }
})
//PATCH=====================================================>
roleRouter.patch("/update/:noteID",authorise(["admin","user"]) ,async(req,res)=>{
    const noteID = req.params.noteID
    const userID = req.body.userID
    const payload = req.body
    const note = await RoleModel.findOne({_id:noteID})
    try {
        if(userID!==note.userID){
            res.send("You are not Authorized for updating")
        }else{
             const data = await      RoleModel.findByIdAndUpdate({_id:noteID},payload)
            res.send("Data Updated Successfully")
        }
       
    } catch (error) {
        console.log(Error)
        res.send("error in patch")
    }
})
//DELETE====================================================>
roleRouter.delete("/delete/:noteID", authorise(["admin","user"]) , async(req, res) => {
    const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await   RoleModel.findOne({_id:noteID})
    if(userID !== note.userID){
        res.send("Not authorised for Deleting")
    }
    else{
        await      RoleModel.findByIdAndDelete({_id : noteID})
        res.send({"msg" : "Deleted successfully"})
    }
})


module.exports ={
    roleRouter
}