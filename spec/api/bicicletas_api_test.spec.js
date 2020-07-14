var Bicicleta=require("../../models/bicicleta");
var request=require("request");
var mongoose = require('mongoose');
var server=require("../../bin/www")


describe('Testing Bicicletas Api', function(){

    beforeEach(function (done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology: true })
        .then( ()=>{console.log('Connected')})
        .catch((err)=>{
          console.log('Error to conect '+err.message);
        });
        const db = mongoose.connection;
        db.on('Error', console.error.bind(console, 'Connection failed'));
        db.once('open', function () {
            console.log('conectado a la base de datos de testing');
            done();
        });
    });
    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, suces) {
            if (err) console.log(err);
            done();
        })
    });
    describe("Bicicleta Api",()=>{
        describe("GET bicicletas",()=>{
            it("STATUS 200",()=>{

                var a= Bicicleta.createInstance(1,'rojo','urbana',[10.522069, -74.186205]);

                
                Bicicleta.add(a,(err, bici)=>{
                    if(err) console.log(err);
                    return bici;
                });
                
                request.get('http://localhost:3000/api/bicicletas',function(err, res,body){
                    expect(res.statusCode).toBe(200);
                })
            })
        })
    })

    describe("POST BICICLETAS/create",()=>{
    it("STATUS 200",(done)=>{
        var headers={'content-type':"application/json"};
        var a='{"id":10,"color":"negro","modelo":"urbana", "lat":10.522069, "lng":-74.186205}';

        request.post(
            {
            headers:headers,
            url:'http://localhost:3000/api/bicicletas/create',
            body:a
            },
            function(err,response, body){
                expect(response.statusCode).toBe(200);
                code=Bicicleta.findByCode(10,(err, data)=>{
                    if(err) console.log(err);   
                    
                    
                    expect(data.code).toBe(10);
                });
                
               
                done();
            }
        )
    })
    });

})