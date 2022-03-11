import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

//Torne essa dependência conhecida pelo container (especifique que é injetável)
//a classe pode ser injetada por um controller.
@injectable()
class CreateCategoryUseCase {
    //O construtor pode ser feito desta forma para termos a DIP - princípio da inversão de dependência.
    constructor(
        //vai dar um  new CategoriesRepository
        @inject("CategoriesRepository")
        private _iCategoriesRepository: ICategoriesRepository){}
 
    async execute({name, description}: IRequest): Promise<void>{

        const categoryAlreadExists = await this._iCategoriesRepository.findByName(name);

        if (categoryAlreadExists){
            throw new AppError("Category already exists!");
        }

        await this._iCategoriesRepository.create({name, description});

    }

}

export {CreateCategoryUseCase}