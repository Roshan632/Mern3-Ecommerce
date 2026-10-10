import { Request, Response } from "express";



const errorHandler = (fn:Function) => {
    return (req:Request,res:Response) => {
        fn(req,res).catch((err:Error) => {
            res.status(500).json({
                message : "Internal server error",
                errorMessage : err.message
            })
            return
        })
    }
}

export default errorHandler

// Yo chai hamro controller ma vako function lai wrap garna ko lagi ho jasma hamile chai error handling garna parxa. Jaba hamile controller ma vako function lai wrap garne chau teti bela yo errorHandler function le chai hamro controller ma vako function lai call garxa ra jaba tyo function ma kunai error aauxa teti bela yo errorHandler le chai catch block ma gayera error lai handle garxa ra client lai 500 status code ra error message return garxa.
//yo banaera harek controller code ma try catch halnu pardaina