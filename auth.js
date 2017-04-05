/**
 *
 * Author: Barbara Goss
 * Created: 2017-04-04
 */

let User = require('./api/users/model');
let passport = require('passport');
let session = require('express-session');

module.exports = function (app) {
    passport.use(User.createStrategy());

    app.use(session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.post('/api/login', passport.authenticate('local'), function (req, res) {
        res.send(req.user);
    });

    app.post('/api/signup', function (req, res) {
        let user = new User();
        user.email = req.body.email;
        user.name = req.body.name;

        User.register(user, req.body.password, (err) => {
            if (err) { return next(err); }
            res.send(user);
        })
    });

    app.get('/api/logout', function (req, res) {
       req.logout();
       res.sendStatus(200);
    });

    app.get('/api/me', function (req, res) {
        if (req.user) {
            res.send(req.user);
        } else {
            res.status(401);
            res.send("Unauthorized");
        }
    });
};