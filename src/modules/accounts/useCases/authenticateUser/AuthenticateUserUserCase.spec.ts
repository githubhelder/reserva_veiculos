import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Autenticação de usuário", ()=> {

    beforeEach( () =>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
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

    it("Não deve ser capaz de autenticar um usuário inexistente.", async() =>{
        expect( async() =>{
            await authenticateUserUseCase.execute({
                email: "xaugusto@gmail.com",
                password: "1256"
            });        
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve ser capaz de autenticar com senha incorreta.", () => {
        expect( async () => {
            const user: ICreateUserDTO = {
                name: "Augusto",
                email: "xhelder@hotmail.com",
                password: "augustoMorais",
                driver_license: "987654"
            };
            await createUserUseCase.excute(user);
            
            await authenticateUserUseCase.execute({
                email: user.email,
                password: "senhaErrada"
            });

        }).rejects.toBeInstanceOf(AppError);
    });

});