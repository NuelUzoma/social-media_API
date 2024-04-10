import { FilterQuery } from "mongoose";
import User, { UserDocument } from "../../collections/user.collection";


async function createUser(userData: Partial<UserDocument>) {
    try {
        let { username, email, password } = userData;
        const newUser = await User.create(userData);
        return newUser;
    } catch (err) {
        throw err;
    }
}

// Find a user by username or email
async function findUser(userData: FilterQuery<UserDocument>) {
    try {
        const duser = await User.findOne(userData);
        return duser;
    } catch (err) {
        throw err;
    }
}

// Get all users from the database
async function getUsers() {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        throw err;
    }
}


export { createUser, findUser, getUsers };