// timesheet.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from 'src/users/entities/user.entity';
  
  export enum TimesheetStatus {
    PENDING = 'PENDING',
    VALIDATED = 'VALIDATED',
    REJECTED = 'REJECTED',
  }
  
@Entity()
  export class Timesheet {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    date: string;
  
    @Column('float')
    hoursWorked: number;
  
    @Column({
      type: 'enum',
      enum: TimesheetStatus,
      default: TimesheetStatus.PENDING,
    })
    status: TimesheetStatus;
    // Add this field to track the employee who created the timesheet
    @ManyToOne(() => User)
    createdBy: User;

  
    @ManyToOne(() => User, { nullable: true })
    validatedBy: User;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  