const TransactionsCollection = require('../../models/transaction/transaction-model');
const { StatusCodes } = require('http-status-codes');

const createTransaction = async (req, res) => {
    req.body.userID = req.account.accountID;
    await TransactionsCollection.create(req.body);
    res.status(StatusCodes.OK).json({ msg: 'A transaction has been stored successfully.' })
}

const getTransactions = async (req, res) => {
    let { page, limit, sortKey } = req.query;
    
    // pagination
    page = Number(page) || 1;
    limit = Number(limit) || 10; 
    const skip = (page - 1) * limit;

    // all transactions
    const transactions = await TransactionsCollection.find().skip(skip).limit(limit).sort(sortKey);

    // all transactions count
    const allTransactionsCount = (await TransactionsCollection.find()).length;

    // date of 7 days ago to get weekly transactions
    const date_7days_ago = new Date(new Date().setDate(new Date().getDate() - 6)).toJSON().slice(0, 10);

    // weekly transactions
    const weeklyTransactions = await TransactionsCollection.find({ createdAt: { $gte: new Date(date_7days_ago) } });

    // today transactions
    const todayDateFromStart = new Date().toJSON().slice(0, 10); // 2023-08-31
    const tomorrowDateFromStart = new Date(new Date().setDate(new Date().getDate() + 1)).toJSON().slice(0, 10);
    const transactionsToday = await TransactionsCollection.find({ createdAt: { $gte: new Date(todayDateFromStart), $lte: new Date(tomorrowDateFromStart) } });

    res.status(200).json({ success: true, transactions, allTransactionsCount, weeklyTransactions, transactionsToday });
}

module.exports = { createTransaction, getTransactions };