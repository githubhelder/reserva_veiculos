import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError }  from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

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
}

@injectable()
class AuthenticateUserUseCase {
    
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    
    async execute( {email, password} : IRequest): Promise<IResponse>{
        // verificar - o usuário existe?
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Não existe um usuário cadastrado com este email.');
        }

        // verificar - senha está correta?
        const passswordMatch = await compare(password, user.password);

        if (!passswordMatch) {
            throw new AppError('Usuário ou senha não conferem.');
        }

        console.log('sucesso total');

        // gerar jsonwebtoken
        const token = sign({}, 'c14abece2ebc7f6f80c7acd302787fee', {
            subject: user.id,
            expiresIn: '1d',
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return tokenReturn;
    }

}
export { AuthenticateUserUseCase }