import { DemandConge } from "src/demand-conge/entities/demand-conge.entity";
import { Notification } from "src/notification/entities/notification.entity";
import { Role } from "src/role.enum";
import { Timesheet } from "src/timesheet/entities/timesheet.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    // @OneToMany(() => Notification, (notification) => notification.user)
    // notifications: Notification[];

    @OneToMany(() => Notification, (notification) => notification.demand, { onDelete: 'CASCADE' })
    notifications: Notification[];
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;


  


}
