import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

 
  // Filtrer les utilisateurs par rôles (RH ou employe)
  async findUsersByRoles(roles: Role[], query: any): Promise<User[]> {
    return this.usersRepository.find({
      where: { role: In(roles) },
      ...query,  
    });
  }

  // Récupérer un utilisateur par ID
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return user;
  }

  //rh update employe
  async updateEmployee(id: number, updateUserDto: UpdateUserDto, requesterRole: Role): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    if (requesterRole === Role.RH && user.role !== Role.EMPLOYE) {
      throw new ForbiddenException('Un RH ne peut mettre à jour que des employés');
    }
    if (updateUserDto.email !== undefined) user.email = updateUserDto.email;
    if (updateUserDto.name !== undefined) user.name = updateUserDto.name;
    if (updateUserDto.password !== undefined) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepository.save(user);
    delete user.password;
    return user;
  }


  async findOne(email: string, selectSecrets: boolean = false): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true, 
        password: selectSecrets,
      },
    });
  }

async createWithRole(dto: CreateUserDto, role: Role): Promise<{ user: User; plainPassword: string }> {
  const { email, password, name } = dto;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = this.usersRepository.create({
    email,
    password: hashedPassword,
    name,
    role: role,
  });

  const newUser = await this.usersRepository.save(user);
  delete newUser.password; 
  return { user: newUser, plainPassword: password }; 
}

  // rh delete employe
  async delete(id: number, requesterRole?: Role): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    if (requesterRole === Role.RH && user.role !== Role.EMPLOYE) {
      throw new ForbiddenException('Un RH ne peut supprimer que des employés');
    }
    await this.usersRepository.delete(id);
  }
  
}
