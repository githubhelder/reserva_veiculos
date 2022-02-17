import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Cars";

interface ICarsRepository{
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlace(license_plate: string): Promise<Car>;    
}

export { ICarsRepository };