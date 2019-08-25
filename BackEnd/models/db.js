var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/ProjetOSC')

// mongoose.connection.on('connected', ()=>{
//     console.log('connected to database successfully ',
//         );
// });
mongoose.set('useFindAndModify', false);

mongoose.connect(
    'mongodb+srv://osc:osc@mongodbbase-fqvnb.mongodb.net/projetOSC'
    ,
    { useNewUrlParser: true ,'useCreateIndex': true})
    .then(()=>
    {
        console.log("mongoDB connected successfully...!!")
    })
mongoose.connection.on('error', (err)=>{
    console.log('Connection Error: '+ err);
});
