import { DemandConge } from "src/demand-conge/entities/demand-conge.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    message: string;
  
    @Column({ default: false })
    read: boolean;
  
    @Column({ name: 'user_id' })
    userId: number;
  
    @ManyToOne(() => User, (user) => user.notifications)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ name: 'demand_id' })
    demandId: number;
  
    @ManyToOne(() => DemandConge, (demand) => demand.notifications)
    @JoinColumn({ name: 'demand_id' })
    demand: DemandConge;
  
    @CreateDateColumn()
    created_at: Date;
  }