import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";


//@Entity("users", {synchronize:false})
@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;
 
    @Column()
    driver_license: string;

    @Column({default:false})
    isAdmin: boolean;

    @Column({nullable: true})
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        
        if (!this.id){
            this.id = uuidV4();
            console.log("Gerou o id Users",this.id);
        }
        
    }

}

export { User };