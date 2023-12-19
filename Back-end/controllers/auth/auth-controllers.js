const AccountsCollection = require('../../models/auth/account-model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../../errors/errors');

async function register(req, res) {
    // password encryption is executed in auth-model
    const account = await AccountsCollection.create(req.body);
    // create a json web token
    const token = account.createJWT();
    const username = account.name;
    const email = account.email;
    res.status(StatusCodes.CREATED).json({ username, email, token });
}

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
        throw new BadRequestError('Provide name & password!!');

    // is email exist in db
    const account = await AccountsCollection.findOne({ email });

    if (!account)
        throw new UnauthenticatedError('You are not regitered!!!');

    // is password correct 
    const isPasswordCorrect = await account.comparePasswords(password);

    if (!isPasswordCorrect)
        throw new UnauthenticatedError('Password in not correct!!!');

    // creating token
    let token;
    if (account._doc.isAdmin)
        token = account.createAdminJWT();
    else
        token = account.createJWT();

    // now the account email + password are correct
    const username = account.name;
    res.status(StatusCodes.OK).json({ username, token });
}

const verifyUser = (req, res) => {
    res.status(200).send('vaild token');
}

const getMembers = async (req, res) => {
    let { page, limit, sortKey } = req.query;
    // pagination
    page = Number(page) || 1;
    limit = Number(limit) || 10; 
    const skip = (page - 1) * limit;

    let membersCount = (await AccountsCollection.find()).length;
    let members = await AccountsCollection.find({}).select('name email createdAt isAdmin').skip(skip).limit(limit).sort(sortKey);

    res.status(200).json({ success: true, members, membersCount });
}


module.exports = { register, login, verifyUser, getMembers };