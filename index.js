const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')

const UserModel = require('./models/Users')




const app = express();

app.use(cors());

app.use(express.json());

//connectivity with mongodb
// mongoose.connect("mongodb://127.0.0.1:27017/hackathon")
mongoose.connect("mongodb+srv://sutharsachinbhai90:g7a0lMRHbb1ITjQP@cluster0.u04rpbn.mongodb.net/?retryWrites=true&w=majority");


// making API for this 

// get the Data...

app.get('/', (req , res ) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// target update  the data ... 

app.get('/getUser/:id' , (req , res) => {
    const id = req.params.id; 
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


//   update the data   ... 


app.put('/Update/:id ', (req , res ) =>{
    const id = req.params.id;

    UserModel.findByIdAndUpdate({_id : id } , {

        name : req.body.name , 
        district: req.body.district,
        psName: req.body.psName,
        pinCode: req.body.pinCode,
        rating : req.body.rating ,
        suggestion : req.body.suggestion,
        currDate : req.body.currDate

    } , {new: true})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


// Delete the Data ... 

app.delete('/deleteUser/:id', (req,res )=> {
    const id  = req.params.id ;
    UserModel.findByIdAndDelete({ _id : id })
    .then(res => res.json(res))
    .catch(err => res.json(err));
});

// post the Data... 

app.post("/FeedBackForm" , (req,res)=> {

    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})



app.listen( 8081 , ()=> {

    console.log("server is running")
    
})