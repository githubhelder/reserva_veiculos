import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRespositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Criar categoria", ()=>{

    //antes de realizar algum teste, faça.....
    beforeEach( () => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("Criação de uma nova categoria", async () =>{

        const category ={
            name: "Nova categoria",
            description: "descrição da categoria"
        }
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated =  await categoriesRepositoryInMemory.findByName(category.name);

        console.log(categoryCreated);
        expect(categoryCreated).toHaveProperty("id"); 
    });

    //verifica se a categoria existe
    it("Não podemos criar uma categoria existente", async () =>{

        expect( async() => {
        
            const category ={
                name: "Nova categoria",
                description: "descrição da categoria"
            }
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);

    });
});