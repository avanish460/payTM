const express = require('express');
const mongoose = require('mongoose');
const zod = require('zod');
const router = express.Router();
const {Account} = require('../db');
const {authMiddleware} = require('../middleware');

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId,
    });

    res.json({
        balance: account.balance
    })
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < req.body.amount){
       await session.abortTransaction();
       res.status(400).json({
        message: "Insufficient balance"
       })
    }

    const toAccount = await Account.findOne({userId: req.body.to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid Account"
        })
    }

    //perform the transaction
    await Account.updateOne({userId: req.userId}, { $inc: {balance: -req.body.amount}}).session(session);
    await Account.updateOne({userId: req.body.to}, { $inc: {balance: req.body.amount}}).session(session);

    await session.commitTransaction();

    res.status(200).json({
        message: "Transfer successful"
    })
})

module.exports = router;