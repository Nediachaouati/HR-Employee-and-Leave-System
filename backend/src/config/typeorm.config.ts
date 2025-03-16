import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from './../../node_modules/@nestjs/typeorm/dist/interfaces/typeorm-options.interface.d';
import { User } from 'src/users/entities/user.entity';


export const typeormConfig =(configService:ConfigService):TypeOrmModuleOptions=>({
 type:'mysql',
 host:configService.get('DB_HOST'),
 username:configService.get('DB_USER'),
 password:configService.get('DB_PASSWORD'),
 port:configService.get('DB_PORT'),
 database:configService.get('DB_NAME'),
 entities:[User],
 synchronize:true,
 autoLoadEntities:true,
})