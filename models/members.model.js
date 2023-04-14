const mongoose = require("mongoose")

const memberSchema = mongoose.Schema({
 
  community: { type: String, required: true },
  user: { type: String, required: true },
  role: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

const MemberModel = mongoose.model("member", memberSchema)

module.exports = {
  MemberModel
}
