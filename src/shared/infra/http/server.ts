import "reflect-metadata";
import "express-async-errors";
import express, {Response, Request, NextFunction} from 'express';
import swaggerUi from 'swagger-ui-express';

//foi desabilitado porque temos que criar a conexão. 
//import "@shared/infra/typeorm";
import  createConnection  from "@shared/infra/typeorm";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";

import { router } from '@shared/infra/http/routes';
import swaggerFile from '../../../swagger.json';


//criação da conexão com typeorm
createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use( (_error: Error, request: Request, response: Response, next: NextFunction) =>{
    if (_error instanceof AppError){
        return response.status(_error.statusCode).json({
            messaage: _error.message
        })
    }

    return response.status(500).json({
        status: "Error",
        messsage: `Internal server error - ${_error.message}`
    });
})

//inicializa o servidor.
app.listen(3333, ()=> console.log("Servidor rodando"));

