import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUsesCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Criar um carro", () => {

    beforeEach( () => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Sandero",
            description: "Sandero LTZ",
            daily_rate: 100,
            license_plate: "123456",
            fine_amount: 60,
            brand: "Renault",
            category_id: "Category"
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with exits license plate ", async () =>{

        await createCarUseCase.execute({
            name: "Car1",
            description: "Car one",
            daily_rate: 100,
            license_plate: "123456",
            fine_amount: 60,
            brand: "Renault",
            category_id: "Category"
        });

        await expect( 
            await createCarUseCase.execute({
                name: "Car2",
                description: "Car two",
                daily_rate: 100,
                license_plate: "123456",
                fine_amount: 60,
                brand: "Renault",
                category_id: "Category"
            })
        ).rejects.toEqual(new AppError("Car already exists!")); 
    });

    it("Should not be able to create a car with available true by default ", async () =>{
        const car =  await createCarUseCase.execute({
            name: "Car Available",
            description: "Car Available",
            daily_rate: 100,
            license_plate: "hmo available",
            fine_amount: 60,
            brand: "Renault",
            category_id: "Category"
        });

        console.log(car);
        console.log("Available",car.available);
        expect(car.available).toBe(true);

    });

}); 