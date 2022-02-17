import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, SimpleConsoleLogger } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";

@Entity("cars")
class Car {
    @PrimaryColumn()
    //@PrimaryGeneratedColumn("uuid")
    //@Column({ primary: true, generated: 'uuid' })
    id: string;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column({default:true})
    available: boolean;
    

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne( ()=> Category )
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id?: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if (!this.id){
            this.id= uuidV4();
            console.log("gerou o id cars");
        }
    }
}

export { Car };