const jwt = require("jsonwebtoken");
const fs = require("fs")
const express = require("express");
const exp = require("constants");
const app = express()

//redis===========>


const authenticate = async(req, res, next) => {
  const token = req.cookies.token
 
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
            const userrole = decoded.role  
            req.cookies.userrole = userrole
           next();
         } else {
           res.send("Please Login");
       }
       } else {
        res.send("Please Login");
  }

}


module.exports = {
  authenticate
};
