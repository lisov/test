const express = require('express')
const app = express()

app.use(express.json({ extended: true }))
app.use('/api/calculator', require('./routes/calculator.route'))

const PORT = process.env.port || 5000
function start() {
  try {
    if (!module.parent) {
      app.listen(PORT, () => console.log(`App has been starter on port ${PORT}...`))
    }
  } catch (e) {
    console.log(`Server Error, ${e.message }`);
    process.exit(1)
  }
}

start()
module.exports = app