import { Category } from "../infra/typeorm/entities/Category";

//conceito DTO - Data Transfer Object
interface ICreateCategoryDTO{
    name: string;
    description: string;
}

interface ICategoriesRepository{
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    //create(name: string, description: string): void;
    create({name, description}:ICreateCategoryDTO): Promise<void>;
}

export {ICategoriesRepository, ICreateCategoryDTO};