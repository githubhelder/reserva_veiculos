import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid";

@Entity("cars_image")
class CarImage {

    @PrimaryColumn()
    id: string;
    
    /*
    @OneToOne( ()=> Car )
    @JoinColumn({ name: "id" })
    car: Car;
    */

    @Column()
    car_id: string;
    
    @Column()
    image_name: string;
    
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export {CarImage}