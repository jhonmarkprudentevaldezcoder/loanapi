const mongoose = require("mongoose");

const loanSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    telephone: {
      type: String,
    },
    address: {
      type: String,
    },
    birthday: {
      type: String,
    },
    ID: {
      type: String,
    },
    IDnumber: {
      type: String,
    },
    occupation: {
      type: String,
    },
    companylocation: {
      type: String,
    },
    monthlyincome: {
      type: String,
    },
    loantype: {
      type: String,
    },
    loanamount: {
      type: String,
    },
    loaninterest: {
      type: String,
    },
    lengthoftime: {
      type: String,
    },
    totalpayment: {
      type: String,
    },
    paymentperMonth: {
      type: String,
    },
    maritalstatus: {
      type: String,
    },
    username: {
      type: String,
    },
         status: {
      type: String,
    },
    approveDate: {
      type: String,
    },
    activateDate: {
      type: String,
    }, 
  },
  {
    timestamps: true,
  }
);

const Loans = mongoose.model("loans", loanSchema);

module.exports = Loans;
