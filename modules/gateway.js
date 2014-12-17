/**
 * Created by jjungmac on 2014. 12. 16..
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var pool = require('../modules/database.js');



// 인증 후, 사용자 정보를 Session에 저장함
passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user);
});

// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
passport.deserializeUser(function(user, done) {

    // session에 한번에 너무 많은 정보가 있으면 메모리에 부담이 되므로
    // 아이디만 저장해놓고 아이디로 다른 정보를 불러와 활용할때 findByid.

    //findById(id, function (err, user) {
    console.log('deserialize');
    console.log(user);
    done(null, user);
    //});
});


passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }
    ,function(req, email, password, done) {

        console.log('login req : ',email, password);
        var shasum = crypto.createHash('sha1');
        shasum.update(password);
        password = shasum.digest('hex');
        pool.getConnection(function (error, connection) {
            if(error) {
                console.error(error);
            }
            var sql = 'SELECT * FROM user WHERE email='+pool.escape(email);
            connection.query(sql, function (error, result) {
                console.log('isRightAuth called');
                connection.release();
                if(error) {
                    console.log('쿼리 문장에 오류가 있습니다.');
                    return done(null,false);
                }
                if(result[0]) {
                    console.log("has result");
                    if(result[0].password === password) {
                        console.log('RightAuth');
                        var user = {
                            "email":  result[0].email
                        };
                        return done(null,user);
                    }
                    console.log('Wrong pw');
                    return done(null,false);
                }
                console.log("no result");
                return done(null,false);

            });
        });
    }
));

var ensureAuthenticated =  function(req, res, next) {
    passport.authenticate('local', { failureRedirect: '/signup', failureFlash: true });
    return next();
}

module.exports= ensureAuthenticated;




