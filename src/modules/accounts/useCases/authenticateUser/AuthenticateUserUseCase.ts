import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError }  from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateprovider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider : IDateProvider
    ){}
    
    async execute( {email, password} : IRequest): Promise<IResponse>{
        // verificar - o usuário existe?
        const user = await this.usersRepository.findUserByEmail(email);
        const { expires_in_token, secret_refresh_token, secret_token, expires_in_refresh_token, refresh_token_expiration_time} = auth;

        if (!user) {
            throw new AppError('Email or password incorrect!');
        }

        // verificar - senha está correta?
        const passswordMatch = await compare(password, user.password);

        if (!passswordMatch) {
            throw new AppError('Usuário ou senha não conferem.');
        }

        // gerar jsonwebtoken
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        //gerar refresh token
        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });
        //data expiração do refresh token
        const refresh_token_expires_date = this.dayjsDateProvider.addDays(refresh_token_expiration_time);

        //salvar o refresh token
        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expiration_date: refresh_token_expires_date 
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refresh_token
        }

        return tokenReturn;
    }

}
export { AuthenticateUserUseCase }