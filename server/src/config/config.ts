// import { config } from 'dotenv';

// config();

// const connectionString = process.env.CONNECTION_STRING?.trim();

// if (!connectionString) {
//   throw new Error('CONNECTION_STRING is required in .env');
// }

// const port = process.env.PORT?.trim();

// export const envConfig = {
//   PORT: port,
//   connectionString
// };


import { config } from "dotenv"
config()

export const envConfig = {
  connectionString: process.env.CONNECTION_STRING?.trim(),
  port: process.env.PORT?.trim(),
  jwtSecretKey: process.env.JWT_SECRET_KEY?.trim(),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN?.trim(),
  email: process.env.EMAIL?.trim(),
  emailPassword: process.env.EMAIL_PASSWORD?.trim(),
  adminEmail: process.env.ADMIN_EMAIL?.trim(),
  adminPassword: process.env.ADMIN_PASSWORD?.trim(),
  adminUsername: process.env.ADMIN_USERNAME?.trim()
}