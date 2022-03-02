import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("rentals")
class Rental{

    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string

    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    @Column({nullable: true})
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column({nullable: true})
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    uploaded_at: Date;
    
    constructor(){
        if (!this.id){
            this.id= uuidV4();
            console.log("Gerou o id Rentals",this.id);
        }
    }

}

export {Rental}