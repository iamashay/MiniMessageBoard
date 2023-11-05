const express = require("express")
const app = express()
const logger = require("morgan")
const {router: MessageRouter, messageArr} = require("./routes/MessageRouter")

app.use(logger('tiny'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function (req, res){
    res.render('index', {messageArr})
})
app.use('/msg', MessageRouter)

app.use((req, res, next) => {
    next(createError(404));

})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(404).send('Error finding the path!')
})

app.listen(process.env.port || 3000)

module.exports = app