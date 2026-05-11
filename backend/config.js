import dotenv from 'dotenv';
dotenv.config();

export const config = {
    DB_URI: process.env.DB_URI,
    JWT_secret_key: process.env.JWT_secret_key,
    user_email: process.env.user_email,
    user_password: process.env.user_password
}; 

