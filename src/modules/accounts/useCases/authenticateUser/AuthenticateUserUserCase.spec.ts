import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider : DayjsDateProvider;

let createUserUseCase: CreateUserUseCase;

describe("Autenticação de usuário", ()=> {

    beforeEach( () =>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );

        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Autenticação de um usuário", async ()=> {
        const user: ICreateUserDTO = {
            name: "Augusto",
            email: "xhelder@hotmail.com",
            password: "augustoMorais",
            driver_license: "987654"
        };
        await createUserUseCase.excute(user);

        console.log(user.email,"senha: ", user.password);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        //console.log(result);
        expect(result).toHaveProperty("token"); 
    });

    it("should not be able to authenticate an nonexistent user", async() =>{
        await expect(authenticateUserUseCase.execute({
                email: "xaugusto@gmail.com",
                password: "1256"
        })        
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("should note be able to authenticate with incorrect password.", async () => {
        const user: ICreateUserDTO = {
                name: "Augusto",
                email: "xhelder@hotmail.com",
                password: "augustoMorais",
                driver_license: "987654"
            };

        await createUserUseCase.excute(user);
            
        await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
        })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
});