const mongoose = require("mongoose")

const communitySchema = mongoose.Schema({
  
    name: { type: String, required: true },
    owner: { type: String, ref: "user", required: true },
    slug: { type: String, unique: true, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

const CommunityModel = mongoose.model("community", communitySchema)

module.exports = {
    CommunityModel
}
