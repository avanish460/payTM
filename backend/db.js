const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://dubeyavanish166:Avanish%4017@cluster0.bwcos.mongodb.net/paytm';

mongoose.connect(mongoDB);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength:50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const accountSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:"User", required: true},
    balance: {type: Number, required: true}
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
}