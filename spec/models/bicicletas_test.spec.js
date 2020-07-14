var mongoose = require('mongoose')
var Bicicleta = require('../../models/bicicleta');


describe('Testing Bicicletas', function () {
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

    describe('Bicicleta.CreateInstace', ()=>{
        it('Crea una instancia de una bicicleta',()=>{
            var bici=Bicicleta.createInstance(1,'verde','urbana',[10.522069, -74.186205]); 
            expect(bici.code).toBe(1);
            expect(bici.color).toBe('verde');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toBe(10.522069);
            expect(bici.ubicacion[1]).toBe(-74.186205);
        });
    });

    describe('Bicicletas.allBicis',()=>{
        it('Comienza Vacia',(done)=>{
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add',()=>{
        it('Agregar solo una bici',(done)=>{
            var aBici=new Bicicleta({code:10,color:'verde',modelo:'urbana'});
            Bicicleta.add(aBici,function(err, newBici){
                if(err)console.log(err);
                Bicicleta.allBicis(function(err,bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(10);
                    done()
                });
            });
        });
    });

    describe('Bicicletas.findbyCode',()=>{
        it('debe enontrar la bicicleta con code 1',(done)=>{
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);
                var aBici= new Bicicleta({code:1,color:'verde',modelo:'montaña'});
                Bicicleta.add(aBici,function(err,newBici){
                    if(err)console.log(err);

                    var aBici2=new Bicicleta({code:2,color:'rojo',modelo:'urbana'});
                    Bicicleta.add(aBici2,function(err,newbici2){
                        if(err)console.log(err)
                        Bicicleta.findByCode(1,function(err, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done()
                        });
                    });
                });
            });
        });

    });
});





















/*beforeEach(() => {
    Bicicleta.allBicis = [];
})

beforeEach(() => { console.log('testeando…'); });
describe("Bicicleta.allBicis", () => {
    it("comienza vacio", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    })
})


describe("Bicicleta.add", () => {
    it("Se agrega una", () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [10.522069, -74.186205]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    })
})

describe("Bicicleta.findById", () => {
    it("Devolver la bici con id 1", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'rojo', 'urbana', [10.522069, -74.186205]);
        var b = new Bicicleta(2, 'verde', 'montaña', [10.5218941, -74.1885284]);
        Bicicleta.add(a);
        Bicicleta.add(b);

        var targetBici = Bicicleta.findByid(1);
        expect(targetBici.id).toBe(a.id);
        expect(targetBici.color).toBe(a.color);
        expect(targetBici.modelo).toBe(a.modelo);
    })
})*/