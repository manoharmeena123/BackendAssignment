const mongoose = require("mongoose")

const roleSchema = mongoose.Schema({
    community: { type: String, ref: 'community', required: true },
    user: { type: String, ref: 'user', required: true },
    role: { type: String, ref: 'role', required: true },
    created_at: { type: Date, default: Date.now() }
})

const RoleModel = mongoose.model("role", roleSchema)
module.exports = {
    RoleModel
}



// id	string (snowflake)	primary key
// community	string (snowflake)	ref: > community.id
// user	string (snowflake)	ref: > user.id
// role	string (snowflake)	ref: > role.id
// created_at	datetime