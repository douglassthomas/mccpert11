var express = require('express');
var router = express.Router();

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


router.use(passport.initialize());

passport.use(new FacebookStrategy({
  clientID: '1821780844597541',
  clientSecret: '1241744d74db0b0ceb5ced1259fd70d4',
  enableProof: true,
  callbackURL: 'https://mcc-test99.herokuapp.com/auth/facebook/done',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function (accessToken, refreshToken, profile, next) {
  return next(null, profile);
}));

passport.serializeUser(function (user, next) {
  return next(null, user);
});

passport.deserializeUser(function (user, next) {
  return next(null, user);
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/done', passport.authenticate('facebook', { failureRedirect: '/' })
  , function (req, res) {
    let  = req.user.displayName;
    let userData = {
      facebook_id: '10212735855619379',
      displayName: req.user.displayName
    };

    userData = JSON.stringify(userData);
    
    return res.redirect('/home?userData=' + userData);
  });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/detail', function (req, res, next) {
  res.render('detail');
});

router.get('/home', function (req, res, next) {
  res.render('home');
});

router.get('/mylist', function (req, res, next) {
  res.render('mylist');
});

module.exports = router;
