// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '447016842355234', // your App ID
        'clientSecret'  : '2eb7ea8fbf47062c84053546ad0833b9', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileFields' : ['emails', 'displayName']
    },
    'googleAuth' : {
        'clientID'      : '142136934809-oaf0p7jol48j89p1uj49be25ekh2ojec.apps.googleusercontent.com',
        'clientSecret'  : '4Jq12kwhwPlDYXRjY7650jc7',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};
