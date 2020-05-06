const express=require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

const weatherInfo= require('../models/weather');
const weatherRouter= express.Router();
weatherRouter.use(bodyParser.json());

weatherRouter.route('/erase')
.delete((req,res,next)=>{
  if(req.params)
  {
    var obj = {};
      for(var parameter in req.query)      {        
         obj[parameter]= req.query[parameter]  ;   
      }
      var queryparam ={"date": { $gte:obj.startdate, $lt:obj.enddate}, location:{lat:obj.lat ,lon:obj.lan}};
    console.log('working');
    console.log(queryparam);
      weatherInfo.remove(queryparam)
      .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err)=> next(err))
    .catch((err)=> next(err))
  }
  else
  {
    weatherInfo.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err)=> next(err))
    .catch((err)=> next(err))
}
});

weatherRouter.route('/weather')
.get((req,res,next)=>{
  var date=  req.query["date"];
  var lat=req.query["lat"];
  var lon=req.query["lon"];
  console.log('value in data '+ date +', '+lat);
  if(date!=null){
  weatherInfo.find({"date":date})
  .then((weather)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(weather);
  }, (err)=> next(err))
  .catch((err)=> next(err))
}
else if(lat!=null && lon!=null){
  weatherInfo.find({location:{ "lat":lat,"lon":lon}})
  .then((weather)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(weather);
  }, (err)=>next(err))
  .catch((err)=> next(err))
} 
else
 {
    weatherInfo.find({})
    .then((weather)=>{
   res.statusMessage='Entered the method';
        res.statusCode= 200;
   res.setHeader('Content-Type','application/json');
   res.json(weather);
    } , (err)=> next(err))
    .catch((err)=> next(err)); 
 }
})
.post((req,res,next)=>{
    weatherInfo.create(req.body)
    .then((weather) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(weather);
    }, (err)=>next(err))
    .catch((err)=> next(err))
})

module.exports= weatherRouter;