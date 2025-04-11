import { Module } from '@nestjs/common';
import { DemandCongeService } from './demand-conge.service';
import { DemandCongeController } from './demand-conge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandConge } from './entities/demand-conge.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([DemandConge]), AuthModule],
  providers: [DemandCongeService],
  controllers: [DemandCongeController],
})
export class DemandCongeModule {}
