import {Request, Response} from "express"
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController{

    //constructor(private listCategoriesUseCase: ListCategoriesUseCase){}

    async handle(rquest: Request, response: Response): Promise<Response>{
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

        const allCategories = await listCategoriesUseCase.execute();
        return response.json(allCategories);
    }
}

export {ListCategoriesController}