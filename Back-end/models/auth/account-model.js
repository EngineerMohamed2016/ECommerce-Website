const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, provide a name!!'],
        minlength: 3,
    },

    email: {
        type: String,
        required: [true, 'Please, provide an email!!'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
        "background": true
    },

    password: {
        type: String,
        required: [true, 'Please, provide a password!!'],
        minlength: 8,
    },
}, { timestamps: true });


// password encryption before establishing connection to db
userSchema.pre('save', async function () {
    const saltKey = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltKey);
});


// all run after sending to db and (the connection must be successfull)
userSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id, name: this.name }, 'Encrypt-Key', { expiresIn: "1d" });
}

userSchema.methods.createAdminJWT = function () {
    return jwt.sign({ id: this._id, name: this.name, isAdmin: true }, 'Encrypt-Key', { expiresIn: "1d" });
}

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('xperia-users', userSchema);