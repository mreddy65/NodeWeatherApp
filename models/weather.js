const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var DecimalType= mongoose.Types.Decimal128;

var locationSchema=new Schema({
    lat: 
    {
         type: DecimalType,
         required:true,
   },
   lon: 
    {
         type: DecimalType,
         required:true,
   },
   city: 
   {
        type: String,
        required:true,
  },
state: 
  {
       type: String,
       required:true,
 }
})

var temperatureSchema = new Schema({
    uptoOneDecimal:{
        type: DecimalType,
        get: v=> v,
        set: v=> Math.round(v * 10) / 10,
    }
})
var weatherSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    location: [locationSchema],
    temperature: [{type: Number}]  
});

// const weatherSchema = new weatherSchema(
//     {
//          "id": 1,
//          "date": "1985-01-01",
//          "location": {
//          "lat": 35.1442,
//          "lon": -111.6664,
//          "city": "Flagstaff",
//          "state": "Arizona"
//          },
//          "temperature": [
//          28.5, 27.6, 26.7, 25.9, 25.3, 24.7,
//          24.3, 24.0, 27.1, 34.0, 38.6, 41.3,
//          43.2, 44.4, 45.0, 45.3, 45.1, 44.2,
//          41.9, 38.0, 35.0, 33.0, 31.1, 29.9
//          ]
//       }
//     );

    const weatherModel = mongoose.model('weather', weatherSchema);
    module.exports= weatherModel;