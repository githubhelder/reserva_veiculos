import { UserToken } from "../infra/typeorm/entities/UserTokens";
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUsersTokensRepository {
    create({
        user_id,
        expiration_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserToken>;

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;
    
    findByRefreshToken(refresh_token: string): Promise<UserToken>;
    
    deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };