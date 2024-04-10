import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import { findUser } from "../database/queries/user";
import User from "../collections/user.collection";


// Passport Login Strategy
passport.use(
    'login',
    new LocalStrategy.Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            const userData = { email };

            findUser(userData)
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'User not found' });
                    }

                    return user.validPassword(password)
                        .then((validate) => {
                            if (!validate) {
                                return done(null, false, { message: 'Wrong Password' });
                            }
                            return done(null, user, { message: 'Logged in Successfully' });
                        });
                    
                })
                .catch((error) => {
                    console.log(error);
                    return done(error);
                });
        }
    )
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize
passport.deserializeUser((user: any, done) => {
    console.log('Deserializing User ', user);
    console.log('Deserializing User ID ', user._id);
    User.findById(user._id).then((user) => done(null, user));
});


export default passport;