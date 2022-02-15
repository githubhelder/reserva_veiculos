import { getRepository, Repository } from "typeorm";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{
   
    //private - diz que somente a classe "CategoriesRepository" pode ter acesso a variável repository. 
    private repository: Repository<Category>;

    //padrão singleton / Singleton Pattern
    //private static INSTANCE: CategoriesRepository;

    //Singleton Pattern
    constructor(){
        //vamos ter acesso aos atributos de Category-de forma restrita
        this.repository = getRepository(Category);
    }

    async create({name, description}: ICreateCategoryDTO): Promise<void>{
        //cria a entidade -depois podemos salvar
        const category = this.repository.create({
            name, description,
        });
        //se tem await - deve ter async e promise.
        await this.repository.save(category);
    }

    async list(): Promise<Category[]>{
        const categories = await this.repository.find();
        return categories;           
    }

    async findByName(name: string): Promise<Category>{
        //retorna apenas um registro - limit 1
        const category = await this.repository.findOne({ name });
        return category;
    }

}

export {CategoriesRepository};