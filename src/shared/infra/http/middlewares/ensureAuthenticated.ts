import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload{
    sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {


    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Você não enviou o token", 401);
    }

    //como é o headers
    //[0] - Bearer
    //[1] - token
    //token - podemos usar qualquer nome.
    const [ , token] = authHeader.split(" ");

    //chave secreta do AuthenticateUserUseCase
    try {
        const {sub: user_id} = verify(token, "c14abece2ebc7f6f80c7acd302787fee") as IPayload;
        //console.log(sub);
        const usersRepository = new UsersRepository();
        const  user = await usersRepository.findById(user_id);

        if (!user){
            throw new AppError("Usuário não existe", 401);
        }

        request.user = {
            id: user_id
        }

        next();
    }catch{
        throw new AppError("Token inválido", 401);
    }


}