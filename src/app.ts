import * as express from 'express';
const app = express();
import helmet from 'helmet';
import * as passport from 'passport';
import * as session from 'express-session';
import { sessionStore } from './database/db.connect';
import * as dotenv from 'dotenv';

const PORT: number = 3000;

dotenv.config();

app.use( helmet() );

// To parse data passed via body
app.use(express.json({ limit: '100mb' })); // A limit of 100mb is set

// To parse url encoded data
app.use(express.urlencoded({limit: '100mb', extended: true, parameterLimit:50000}));

// Session handler
app.use(session({
    name: 'social-media-API',
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: sessionStore as session.Store,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: false, // set to true in prod
        httpOnly: false, // set to true in prod
        sameSite: 'none'
    } as session.CookieOptions,
}));

app.use(passport.initialize());

app.use(passport.session());

app.listen(PORT, () => {
    return console.log(`Express is listening at port ${PORT}`);
});



export default app;