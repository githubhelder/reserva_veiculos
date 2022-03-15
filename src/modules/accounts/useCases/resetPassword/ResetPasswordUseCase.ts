import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateprovider';

@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}
    async execute(refresh_token: string, password: string): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            refresh_token
        );

        if (!userToken) {
            throw new AppError('Invalid token!');
        }

        if (
            this.dateProvider.compareIfBefore(
                userToken.expiration_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppError('Token expired!');
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        //criptografa a nova senha
        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUseCase };