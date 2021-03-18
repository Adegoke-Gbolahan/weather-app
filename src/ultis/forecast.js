const request = require('request')
const forcast = (location=lagos,callback)=>{
const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + location + '?unitGroup=us&key=97P9PZX8HTHS958QCXM3F3EZP';
request({url,json:true},(error,response)=>{
    if(error)
    {
        callback('Unable to connect to weather services',undefined)
    }else if(response.body.error)
    {
        callback('The location does not exist',undefined)
    }
    else{
        callback(undefined,{
           temp:response.body.currentConditions.temp,
           precip: response.body.currentConditions.precip,  
           condition:response.body.days[0].conditions,
           
        })
       }    
})
}
module.exports = forcast