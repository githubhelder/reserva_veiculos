import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, SimpleConsoleLogger } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";
import { Specification } from "./Specification";

//@Entity("cars", {synchronize:false})
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

    @ManyToMany( () => Specification)
    @JoinTable( { 
        name: "specifications_cars",
        joinColumns: [{name:"car_id"}],
        inverseJoinColumns: [{ name: "specifications_id"}]
    } )
    specifications: Specification[];

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if (!this.id){
            this.id= uuidV4();
            console.log("Gerou o id Cars",this.id);
        }
    }
}

export { Car };