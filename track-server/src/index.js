import { User } from './models/User.js'
import { Track } from './models/Track.js'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import { authRoutes } from './routes/authRoutes.js'
import { trackRoutes } from './routes/trackRoutes.js'
import requireAuth from './middlewares/requireAuth.js'
import fs from 'fs';
const rawdata = fs.readFileSync('./config.json');
const config = JSON.parse(rawdata).development;


const app = express()
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)
const mongoUri = `mongodb+srv://${config.username}:${config.password}@${config.database}/?retryWrites=true&w=majority`
console.log(mongoUri)

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
  })
  .catch(err => {
    console.log("MONGO OH NO ERROR!!!!")
    console.log(err)
  })

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`)
})

app.listen(3000, () => {
  console.log('listening on port 3000!')
})