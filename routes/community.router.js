const express = require("express")
const communityRouter = express.Router()
const {CommunityModel} = require("../models/community.model")
// const { authenticate } = require("../middleware/auth");
const {authorise} = require("../middleware/authorise")

communityRouter.get("/get",async(req,res)=>{
    try {
          const data = await CommunityModel.find()
    res.json(data)
        
    } catch (error) {
        res.json(error)
    }
  
})


//POST=============================================>
communityRouter.post("/create", authorise(["admin","user"]),async(req,res)=>{
    const payload = req.body
    try {
        const data = new CommunityModel(payload)
    await data.save()
    res.send("Data Posted Successfully")
    } catch (error) {
        console.log(error)
        res.send("error in Post")
    }
})

//PATCH=====================================================>
communityRouter.patch("/update/:noteID",authorise(["admin","user"]) ,async(req,res)=>{
    const noteID = req.params.noteID
    const userID = req.body.userID
    const payload = req.body
    const note = await    CommunityModel.findOne({_id:noteID})
    try {
        if(userID!==note.userID){
            res.send("You are not Authorized for updating")
        }else{
             const data = await    CommunityModel.findByIdAndUpdate({_id:noteID},payload)
            res.send("Data Updated Successfully")
        }
       
    } catch (error) {
        console.log(Error)
        res.send("error in patch")
    }
})
//DELETE====================================================>
communityRouter.delete("/delete/:noteID", authorise(["admin","user"]) , async(req, res) => {
    const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await CommunityModel.findOne({_id:noteID})
    if(userID !== note.userID){
        res.send("Not authorised for Deleting")
    }
    else{
        await    CommunityModel.findByIdAndDelete({_id : noteID})
        res.send({"msg" : "Deleted successfully"})
    }
})



module.exports ={
    communityRouter
}