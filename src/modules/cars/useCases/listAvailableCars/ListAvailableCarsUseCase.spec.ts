import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCases";

let listaCarsUseCases: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () =>{
    beforeEach(() =>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listaCarsUseCases = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    
    it("Should be able to list all available cars", async () =>{
        const car = await carsRepositoryInMemory.create(
            {
                "name": "Car1", 
                "description": "car1 teste", 
                "daily_rate": 10, 
                "license_plate": "HADM 1999", 
                "fine_amount": 100, 
                "brand": "Renault", 
                "category_id": "bb63ba0c-c3fb-4f8e-bfc5-1f1d2a8c2b68"
            }
        );
        
        const cars = await listaCarsUseCases.execute({});
        
        expect(cars).toEqual([car])
    });


    it("Should be able to list all available cars by name", async () =>{
        const car = await carsRepositoryInMemory.create(
            {
                "name": "Car2", 
                "description": "car2 teste", 
                "daily_rate": 10, 
                "license_plate": "HADM 1999", 
                "fine_amount": 100, 
                "brand": "Car_brand_test", 
                "category_id": "bb63ba0c-c3fb-4f8e-bfc5-1f1d2a8c2b68"
            }
        );
        
        const cars = await listaCarsUseCases.execute({
            brand: "Car_brand_test"
        });
        
        expect(cars).toEqual([car])
    });

});