import mongoose, { Document, Schema } from "mongoose";
import * as bcrypt from "bcryptjs";


// Default interface for user document
export interface UserDocument extends Document {
    username: string,
    email: string,
    password: string,
    validPassword(password: string): Promise<boolean>;
}

// User Schema
const userSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: [true, 'Username field is required'],
        unique: true,
        validate: {
            validator: async function (value: string) {
                // @ts-ignore
                const existingUser = await this.constructor.findOne({ username: value });
                return !existingUser;
            },
            message: 'Username already exists'
        }
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true,
        validate: [
            {
                validator: async function (value: string) {
                    // @ts-ignore
                    const existingUser = await this.constructor.findOne({ email: value });
                    return !existingUser;
                },
                message: 'Email already exists'
            },
            {
                validator: (value: string) =>
                  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
                message: 'Please use a correct email format user@example.com',
            },
        ]
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    }
});

// Generate Salt and Hash the password using bcrypt
userSchema.pre<UserDocument>('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Valid password function
userSchema.methods.validPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserDocument>('User', userSchema);



export default User;