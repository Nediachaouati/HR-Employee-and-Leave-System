import { DemandConge } from "src/demand-conge/entities/demand-conge.entity";
import { Role } from "src/role.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(() => DemandConge, (demand) => demand.user)
    leaveRequests: DemandConge[];

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at: Date;


}
