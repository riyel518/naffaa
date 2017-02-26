var mongoDB = require('mongoose');
var AttendeeSchema = mongoDB.Schema;

var guestSchema = new AttendeeSchema(
 
    {
        totalFee:Number,
        conferenceFees:Number,
        galaFees: Number,
        vendorFees: Number,
        souvenirFees: Number,
        my_guest: [{

                totalFee:Number,   
                conferenceFees:Number,
                galaFees: Number,
                vendorFees: Number,
                souvenirFees: Number,
                first_name: String,
                last_name: String     
        }],
       
        total_payments:Number,
        guest_total_payment:Number,
        first_name: String,
        last_name: String,
        address1:String,
        city:String,
        state:String,
        zip:String,
        email:String,
        night_phone_a:String


});


 var Attendee = mongoDB.model('Attendee', guestSchema);

 module.exports = Attendee;





