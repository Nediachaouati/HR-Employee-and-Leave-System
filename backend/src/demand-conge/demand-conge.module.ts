import { Module } from '@nestjs/common';
import { DemandCongeService } from './demand-conge.service';
import { DemandCongeController } from './demand-conge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandConge } from './entities/demand-conge.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Notification } from 'src/notification/entities/notification.entity';
import { User } from 'src/users/entities/user.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([DemandConge]), AuthModule,User,NotificationModule],
  providers: [DemandCongeService],
  controllers: [DemandCongeController],
})
export class DemandCongeModule {}
