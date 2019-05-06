const { chai, chaihttp, should, app, clearDB, mongoose } = require('../helpers/databasetest');
mongoose.set('useFindAndModify', false);
 
chai.use(chaihttp)
before(function (done) { clearDB(done) });
after(function (done) { clearDB(done) });

describe('user-success', function() {
    it('should add a single user on /user/signup POST',function (done) {
        chai.request(app)
        .post(`/user/signup`)
        .send({
            name:'anaknya persib',
            username:'kejayaan persib',
            email:'iniemail@nama.nya',
            password:'owhjadibegitu'
        })
        .end((err,res)=>{
            should.not.exist(err)
            // err.should.be.null
            res.should.has.status(201)
            res.should.be.a('Object')
            res.body.hasOwnProperty(`email`)
            res.body.hasOwnProperty(`password`)
            done()
        })
    });
    
    it('should get a token on /user/signin POST',function (done) {
        chai.request(app)
        .post(`/user/signin`)
        .send({
            email:'iniemail@nama.nya',
            password:'owhjadibegitu'
        })
        .end((err,res)=>{
            should.not.exist(err)
            // err.should.be.null
            res.should.has.status(201)
            res.should.be.a('Object')
            res.body.hasOwnProperty(`username`)
            res.body.hasOwnProperty(`token`)
            done()
        })
    });
    // it('should get a token on /user/Gsignin POST');
    it('should update user profile on /user/update/12345 PUT',function (done) {
        chai.request(app)
        .put(`/user/update/12345`)
        .send({
            username:'kita gantinama'
        })
        .end((err,res)=>{
            should.not.exist(err)
            // err.should.be.null
            res.should.has.status(201)
            res.should.be.a('Object')
            res.body.hasOwnProperty(`username`)
            done()
        })
    })
    it('should delete user profile on /user/delete/12345 DELETE',function (done) {
        chai.request(app)
        .delete(`/user/delete/12345`)
        .send()
        .end((err,res)=>{
            should.not.exist(err)
            // err.should.be.null
            res.should.has.status(200)
            res.should.be.a('Object')
            res.body.hasOwnProperty(`username`)
            done()
        })
    })
});

describe('user-fail', function() {
    it('should not add a single user on /user/signup POST',function (done) {
        chai.request(app)
        .post(`/user/signup`)
        .send({
            name:'anaknya persib',
            username:'kejayaan persib',
            email:'iniemaifl@nama.nya',
            password:'owhjadibegitu'
        })
        .end((err,res)=>{
            // console.log(res)
            should.not.exist(err)
            res.should.has.status(400)
            res.should.be.a('Object')
            res.body.hasOwnProperty('message')
            res.body.message.should.be.equal('username cannot have space')
            done()
        })
    });
});