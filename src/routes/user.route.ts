import { Router } from "express";
import {
    httpCreateUser,
    httpLoginUser,
    httpFindUser,
    httpGetUser,
    httpGetUsers
} from "../controllers/user.controller";

const userRouter = Router() as Router;


userRouter.post('/signup', httpCreateUser);

userRouter.post('/login', httpLoginUser);

userRouter.get('/find', httpFindUser);

userRouter.get('/', httpGetUser);

userRouter.get('/db', httpGetUsers);


export default userRouter;