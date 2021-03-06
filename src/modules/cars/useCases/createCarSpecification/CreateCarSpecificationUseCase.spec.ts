import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    })
    
        
    it("Should be able to add a new specification to a now-existent car", async () => {
        const car_id = "1234";
        const specifications_id = ["54321"];

        await expect(createCarSpecificationUseCase.execute({car_id, specifications_id})
        ).rejects.toEqual(new AppError("Car does not exists!"));
    })

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Sandero LTZ",
            daily_rate: 100,
            license_plate: "123456",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        });
        
        const specification = await specificationRepositoryInMemory.create({
            description: "descrição",
            name: "nome"
        }); 

        const specifications_id = [specification.id];
        
        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id, 
            specifications_id
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    })
})