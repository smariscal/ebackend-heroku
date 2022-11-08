const mongoose = require('mongoose')
require('dotenv').config()

connection = async () => {
  const URIString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@smariscal.zaald0d.mongodb.net/ecommerce`
  await mongoose.connect(URIString)
}

module.exports = connection