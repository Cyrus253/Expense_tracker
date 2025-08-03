const Income = require("../models/Income")
const Expense = require("../models/Expense")
const {isValidObjectId, Types} = require("mongoose")

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id
        const userObjectId = new Types.ObjectId(String(userId))

        const totalIncome = await Income.aggregate([
            {
                $match: {
                    userId: userObjectId
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ])
        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)})

        const totalExpense = await Expense.aggregate([
            {
                $match: {
                    userId: userObjectId
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ])
            // get income transaction of 60 days
        const lastSixtyDaysTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},
        }).sort({date: -1})

        //get total income for last 60 days
        const totalIncomeLast60Days = lastSixtyDaysTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // get expense transaction of 30 days
        const lastThirtyDaysTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)},
        }).sort({date: -1})

        //get total expense for last 30 days
        const expenseLast30Days = lastThirtyDaysTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );
        
        // fetch last 5 transactions (income and expense)
        const lastFiveTransactions = [
            ...(await Income.find({userId}).sort({date: -1}).limit(5)).map(
                (trx) =>({
                    ...trx.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
                (trx) =>({
                    ...trx.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date)
        
        // final responce
        res.json({
            totalBalance:
             (totalIncome[0]?.total || 0) -(totalExpense[0]?.total || 0),
             totalIncome: totalIncome[0]?.total || 0,
             totalExpenses: totalExpense[0]?.total || 0,
             expenseLast30Days:{
                total: expenseLast30Days,
                transactions: lastThirtyDaysTransactions,
             },
             incomeLast60Days: {
                total: totalIncomeLast60Days,
                transactions: lastSixtyDaysTransactions,
             },
             recentTransactions: lastFiveTransactions,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error dashboard", error
        })
    }
}