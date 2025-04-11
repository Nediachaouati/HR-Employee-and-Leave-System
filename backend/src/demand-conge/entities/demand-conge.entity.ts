import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('demand_conge')
export class DemandConge {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ name: 'user_id' }) 
  userId: number; 

  @ManyToOne(() => User, (user) => user.leaveRequests)
  @JoinColumn({ name: 'user_id' })
  user: User; 

  @Column({ type: 'date' })
  start_date: string; 

  @Column({ type: 'date' })
  end_date: string; 

  @Column({ type: 'enum', enum: ['Congé payé', 'Congé maladie', 'Sans solde'] })
  type: string; 

  @Column({ type: 'enum', enum: ['En attente', 'Approuvé', 'Rejeté'], default: 'En attente' })
  status: string; 

  @Column({ type: 'text', nullable: true })
  comments?: string; 

  @Column({ name: 'approved_by', nullable: true })
  approvedById?: number; 

  @ManyToOne(() => User)
  @JoinColumn({ name: 'approved_by' })
  approvedBy?: User; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
