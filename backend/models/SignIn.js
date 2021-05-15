const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let EmployeeSingIn = new Schema({
   username: {
      type: String
   },
   password: {
      type: String
   },
}, {
   collection: 'employees'
})

module.exports = mongoose.model('EmployeeSingIn', EmployeeSingIn)