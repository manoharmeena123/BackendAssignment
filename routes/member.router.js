const express = require("express")
const memberRouter = express.Router()
const { MemberModel} = require("../models/members.model")
const {authorise} = require("../middleware/authorise")

memberRouter.get("/get",async(req,res)=>{
    try {
          const data = await MemberModel.find()
    res.json(data)
        
    } catch (error) {
        res.json(error)
    }
  
})


//POST=============================================>
memberRouter.post("/create", authorise(["admin","user"]),async(req,res)=>{
    const payload = req.body
    try {
        const data = new MemberModel(payload)
    await data.save()
    res.send("Data Posted Successfully")
    } catch (error) {
        console.log(error)
        res.send("error in Post")
    }
})
memberRouter.patch("/update/:noteID",authorise(["admin","user"]) ,async(req,res)=>{
    const noteID = req.params.noteID
    const userID = req.body.userID
    const payload = req.body
    const note = await MemberModel.findOne({_id:noteID})
    try {
        if(userID!==note.userID){
            res.send("You are not Authorized for updating")
        }else{
             const data = await      MemberModel.findByIdAndUpdate({_id:noteID},payload)
            res.send("Data Updated Successfully")
        }
       
    } catch (error) {
        console.log(Error)
        res.send("error in patch")
    }
})
//PATCH=====================================================>
memberRouter.delete("/delete/:noteID", authorise(["admin","user"]) , async(req, res) => {
    const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await   MemberModel.findOne({_id:noteID})
    if(userID !== note.userID){
        res.send("Not authorised for Deleting")
    }
    else{
        await      MemberModel.findByIdAndDelete({_id : noteID})
        res.send({"msg" : "Deleted successfully"})
    }
})

//DELETE====================================================>

memberRouter.delete("/delete/:Id",authorise(["admin","user"]) ,async(req,res)=>{
    const Id = req.params.Id
    try {
        const data =  await   MemberModel.findByIdAndDelete({_id:Id})
    
    res.send("Data Deleted Successfully")
    } catch (error) {
        console.log(Error)
        res.send("error in Delete")
    }
})

module.exports ={
    memberRouter
}