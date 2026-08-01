const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum:{
            values: ["ignored","interested","accepted","rejected"],
            message: `{VALUE} is not a valid type`
        }
    }
},{
    timestamps: true,
})

connectionRequestSchema.pre("save", function () {
    if (this.toUserId.equals(this.fromUserId)) {
        throw new Error("Cannot send a request to yourself");
    }
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema)

