const path = require('path')
const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000
const forcast = require('./ultis/forecast')

const app = express()
const publicDirectory = path.join(__dirname,'../public')
//Customizing the view folder
const viewPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Gbolahan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Gbolahan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'We are glad to have you here, how may we be of help?',
        name:'Gbolahan'
    })
})

app.get('/weather',(req,res)=>{
if(!req.query.address){
    return res.send({
        error:'Please Provide an address'
    })
}

forcast(req.query.address,(error,{condition,temp,precip}={})=>{
    if(error){
        return res.send(error)
    }
    res.send([{
        forcast:condition + ' It is currently ' + temp + ' degrees out. There is a ' + precip + '% chance of rain',
        condition:condition,
        temperature:temp,
        location:req.query.address
    }])
})
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return  res.send({
            error:'You must provide a search term'
        })
        
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'Help article not found',
        name:'Gbolahan',
        title:'404'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message:'Page not found',
        name:'Gbolahan',
        title:'404'
    })
})
app.listen(port,()=>{
    console.log('The server is running on port ' + port)
})