const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();
const Bill = require('./Bill');

const connectionURL = `mongodb+srv://${process.env.DB_UserName}:${process.env.DB_Password}@cluster0.0w7pb.mongodb.net/Bill?retryWrites=true&w=majority`;

mongoose.connect(connectionURL)
  .then(() => {
    console.log('MongoDB Connected');

    app.get('/Bill', async (req, res) => {
        const bills = await Bill.find();
        res.status(200).send(bills);
    });

    app.post('/Bill', async (req, res) => {
        const { BillDate, Income, Expense } = req.body;

        const newBill = new Bill({
            BillDate: new Date(BillDate),
            Income,
            Expense,
        });

        await newBill.save();
        res.status(201).send(newBill);
    });

    app.put('/Bill/:id', async (req, res) => {
        const { BillDate, Income, Expense } = req.body;

        const updatedBill = await Bill.findByIdAndUpdate(
            req.params.id,
            {
                BillDate: new Date(BillDate),
                Income,
                Expense,
            },
            { new: true }
        );

        if (!updatedBill) {
            return res.status(404).send('Bill not found');
        }

        res.send(updatedBill);
    });

    app.delete('/Bill/:id', async (req, res) => {
        const deletedBill = await Bill.findByIdAndDelete(req.params.id);

        if (!deletedBill) {
            return res.status(404).send('Bill not found');
        }

        res.send('Bill deleted successfully');
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is listening at port ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });
