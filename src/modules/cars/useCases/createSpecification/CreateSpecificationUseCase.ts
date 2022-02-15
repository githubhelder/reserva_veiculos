import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest{
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject("SpecificationsRepository")
        private _specifications: ISpecificationsRepository){}
    
    async execute({name, description}: IRequest): Promise<void> {

        const specificationAlreadyExists = await this._specifications.findByName(name);

        if (specificationAlreadyExists){
            throw new AppError("A especificação já foi cadastrada!");
        }

        await this._specifications.create({name, description});
    }
}

export {CreateSpecificationUseCase};