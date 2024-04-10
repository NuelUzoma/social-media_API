import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { createUser, findUser, getUsers } from '../database/queries/user';


export async function httpCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body;
        const user = await createUser(userData);
        if (user) {
            return res.status(201).json({
                message: 'You have signed up successfully',
                user
            });
        } else {
            return res.status(404).json({
                message: 'Error signing up user'
            });
        }
    } catch (err) {
        next(err);
    }
}

export async function httpLoginUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('login', { session: true }, async (err: any, user: any, info: any) => {
        try {
            if (err) {
                next(err);
            }
            if (!user) {
                const error = new Error('email or password is incorrect');
                next(error);
            }
            req.logIn(user, { session: true }, err => {
                if (err) {
                    next(err);
                } else {
                    return res.json({
                        success: true,
                        message: info.message
                    })
                }
            })
        } catch (error) {
            return next(error)
        }
    })(req, res, next);
}

export async function httpFindUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body;
        const user = await findUser(userData);
        return res.status(200).json({
            message: `Details: ${user}`
        });
    } catch (err) {
        next(err);
    }
}

export async function httpGetUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user;
        if (user) {
            setTimeout(() => {
               return res.status(200).json({ user }); 
            }, 3000); // Timeout call back set to 3 secs to retrieve logged in user
        } else {
            return res.status(404).json({message: 'Error retrieving user details'});
        }
    } catch (err) {
        next(err);
    }
}

export async function httpGetUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}
