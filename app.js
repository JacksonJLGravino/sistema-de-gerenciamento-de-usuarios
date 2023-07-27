require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const {flash} = require('express-flash-message')
const session = require('express-session')
const connectDB = require('./server/config/db')


const app = express()
const port = 5000 || process.env.PORT

connectDB()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(express.static('public'))

app.use(
  session({
    secret: 'secret',
    resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
  })
)
    

app.use(flash({ sessionKeyName: 'flashMessage' }));
  
  
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use('/', require('./server/routes/customer'))

app.get('*', (req, res) => {
  res.status(404).render('404')
})

app.listen(port, ()=>{
  console.log(`App listeing on port ${port}`)
})
    
    