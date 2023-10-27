import { User } from './models/User.js'
import { Track } from './models/Track.js'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import { authRoutes } from './routes/authRoutes.js'
import { trackRoutes } from './routes/trackRoutes.js'
import requireAuth from './middlewares/requireAuth.js'



const app = express()
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)
const mongoUri = 'mongodb+srv://stylianosplus:cBVRrhEBKbenBfup@cluster0.pphmyma.mongodb.net/?retryWrites=true&w=majority'


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