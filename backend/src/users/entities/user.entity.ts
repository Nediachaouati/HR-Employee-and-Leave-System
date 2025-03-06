import { Role } from "src/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
@PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column({ nullable: true })
    password?: string;

    @Column({nullable:true})
    name:string;

    @Column({
        type: 'enum',
        enum: Role,
       
    })
    role: Role; 


}
