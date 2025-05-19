import { DemandConge } from "src/demand-conge/entities/demand-conge.entity";
import { Notification } from "src/notification/entities/notification.entity";
import { Role } from "src/role.enum";
import { Timesheet } from "src/timesheet/entities/timesheet.entity";
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

    @Column({nullable:true})
    photo:string;

    @Column({
        type: 'enum',
        enum: Role,
       
    })
    role: Role; 

    @OneToMany(() => DemandConge, (demand) => demand.user)
    leaveRequests: DemandConge[];

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at: Date;


  


}
