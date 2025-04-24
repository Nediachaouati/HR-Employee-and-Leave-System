import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FindUsersDto } from './dto/find-users.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService,
    private mailerService: MailerService,
  ) {}

  // lister et filtrer uniquement les RH
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('rh')
  findRH(@Query() query: FindUsersDto) {
    return this.usersService.findUsersByRoles([Role.RH], query);  
  }

  // lister et filtrer uniquement les employes
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('employes')
  findCandidats(@Query() query: FindUsersDto) {
    return this.usersService.findUsersByRoles([Role.EMPLOYE], query);  
  }

  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  //rh update employe
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RH)
  @Put('employe/:id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    const updatedEmployee = await this.usersService.updateEmployee(+id, updateUserDto, currentUser.role);
    return updatedEmployee;
  }
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(user.id, updateUserDto);
  }
  // admin add RH 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('add-rh')
  async addRh(@Body() createUserDto: CreateUserDto) {
  const { user, plainPassword } = await this.usersService.createWithRole(createUserDto, Role.RH);

  try {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Détails de votre compte RH',
      template: 'welcome-rh',
      context: {
        name: user.name || 'RH',
        email: user.email,
        password: plainPassword,
      },
    });
    console.log('Email envoyé avec succès à', user.email);
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’email :', error);
    throw error; 
  }

  return user;
}


// rh add employe 
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.RH)
@Post('add-employe')
async addEmployee(@Body() createUserDto: CreateUserDto) {
const { user, plainPassword } = await this.usersService.createWithRole(createUserDto, Role.EMPLOYE);

try {
  await this.mailerService.sendMail({
    to: user.email,
    subject: 'Détails de votre compte Employe',
    template: 'welcome-employe',
    context: {
      name: user.name || 'EMPLOYE',
      email: user.email,
      password: plainPassword,
    },
  });
  console.log('Email envoyé avec succès à', user.email);
} catch (error) {
  console.error('Erreur lors de l’envoi de l’email :', error);
  throw error; 
}

return user;
}

  // rh delete user 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RH)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @CurrentUser() currentUser: User) {
    await this.usersService.delete(+id, currentUser.role);
    return { message: `Utilisateur avec l'ID ${id} supprimé avec succès` };
  }
}