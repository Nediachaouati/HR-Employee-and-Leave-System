import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { IsOptional } from 'class-validator';

export enum EvaluationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED'
}

export enum EvaluationPeriod {
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL',
  MONTHLY = 'MONTHLY'
}


@Entity()
export class PerformanceEvaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  employee: User;

  @ManyToOne(() => User, { eager: true })
  evaluator: User;

  @Column({
    type: 'enum',
    enum: EvaluationPeriod,
    default: EvaluationPeriod.ANNUAL
  })
  evaluationPeriod: EvaluationPeriod;
  

  @IsOptional()
  @Column()
  month?: number;
  
  @Column()
  evaluationYear: number;

  @Column({
    type: 'enum',
    enum: EvaluationStatus,
    default: EvaluationStatus.DRAFT
  })
  status: EvaluationStatus;

  @Column('decimal', { precision: 3, scale: 1, default: 0 })
  overallScore: number;

  @Column('text', { nullable: true })
  comments: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 