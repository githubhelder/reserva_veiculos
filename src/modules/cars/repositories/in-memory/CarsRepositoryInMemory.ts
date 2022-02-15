import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "../ICarsRepositories";

class CarsRepositoryInMemory implements ICarsRepository{
    cars: Car[] = [];

    async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id}: ICreateCarDTO): Promise<void> {
        const cars = new Car();

        Object.assign(cars, {
            name, description, daily_rate, license_plate, fine_amount, brand, category_id
        });

        this.cars.push(cars);
    }

    async findByLicensePlace(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

} 

export { CarsRepositoryInMemory };