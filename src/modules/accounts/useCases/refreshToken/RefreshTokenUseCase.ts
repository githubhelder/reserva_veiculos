import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateprovider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase{
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const decode = verify(token, auth.secret_refresh_token) as IPayload;
        const { sub: user_id, email } = decode;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError('Refresh Token does not exists!');
        }
        //exclui o token da tabela
        await this.usersTokensRepository.deleteById(userToken.id);
        //cria um novo token
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expiration_date = this.dateProvider.addDays(
            auth.refresh_token_expiration_time
        );
        //salva os dados no banco de dados
        await this.usersTokensRepository.create({
            user_id,
            expiration_date,
            refresh_token,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return {
            token: newToken,
            refresh_token,
        };
    }}

export { RefreshTokenUseCase };

