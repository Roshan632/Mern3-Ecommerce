import multer from 'multer';
import { Request } from 'express';
import path from 'node:path'


const storage = multer.diskStorage({
    destination: function(req:Request, file:Express.Multer.File, cb:any) {
        cb(null, path.resolve(process.cwd(), 'src/uploads'))
    },
    filename: function(req:Request, file:Express.Multer.File, cb:any) {
        cb(null,Date.now() + '-' + file.originalname)
    }
})

export {multer, storage}
