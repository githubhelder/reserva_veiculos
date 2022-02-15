import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositories";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

//@injectable()
class CreateCarUseCase{
    constructor(
        //@inject("CarsRepositories")
        private carsRepository: ICarsRepository
    ){}

    async execute( {name, description, daily_rate, license_plate, fine_amount, brand, category_id} : IRequest): Promise<void>{
        const carAlreadyExists = await this.carsRepository.findByLicensePlace(license_plate);

        if (carAlreadyExists) {
            throw new AppError("Car already exists!");
        }

        await this.carsRepository.create({
            name, description, daily_rate, license_plate, fine_amount, brand, category_id
        });
    }
}

export { CreateCarUseCase }