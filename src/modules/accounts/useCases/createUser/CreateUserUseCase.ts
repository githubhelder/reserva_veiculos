import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository){}
    
    async excute({name, password, email, driver_license}: ICreateUserDTO): Promise<void>{

        const userAlreadExists = await this.usersRepository.findByEmail(email);

        if (userAlreadExists){
            throw new AppError("Usuário já cadastrado");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
           name, password: passwordHash, email, driver_license
    });
    }
}

export { CreateUserUseCase };