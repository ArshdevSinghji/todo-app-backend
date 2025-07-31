import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.findUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findUser(searchTerm?: string) {
    const qb = this.userRepository.createQueryBuilder('user');
    if (searchTerm) {
      qb.where('user.email ILIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
      qb.orWhere('user.username ILIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
    }
    // qb.leftJoinAndSelect('user.tasks', 'tasks').leftJoinAndSelect(
    //   'user.assignedTasks',
    //   'assignedTasks',
    // );
    // qb.orderBy('user.uid', 'ASC');
    return await qb.getMany();
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(uid: number) {
    return await this.userRepository.findOne({ where: { uid } });
  }
}
