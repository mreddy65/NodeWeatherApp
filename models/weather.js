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

    const weatherModel = mongoose.model('weather', weatherSchema);
    module.exports= weatherModel;