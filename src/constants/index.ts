import * as dotenv from 'dotenv'; 
dotenv.config();


//TODO add throw error if env are empty
export const LOCAL_URL = process.env.LOCAL_URL ?? ""
export const PRIVATE_KEY = process.env.PRIVATE_KEY ?? ""
export const RPC_URL = process.env.RPC_URL ?? ""
export const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS ?? ""
