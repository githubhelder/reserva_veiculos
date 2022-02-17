import { v4 as uuidV4 } from "uuid";
import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("categories")
class Category{
    @PrimaryColumn()
    //id?: string;
    //@PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @CreateDateColumn()
    created_at: Date;

    constructor(){
       
        if(!this.id){
            this.id= uuidV4();
            console.log("Acessou o método construtor",this.id);
        }
        
    }

}

export {Category};