import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("specifications")
class Specification {
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
            console.log("Gerou o id Specification",this.id);
        }
        
    }
}

export {Specification};