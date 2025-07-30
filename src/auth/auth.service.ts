import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { HashService } from 'src/hash/hash.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly userService: UserService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required!');
    }

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    const isPasswordValid = await this.hashService.comparingPasswordWithHash(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password!');
    }

    const payload = { email: user.email, uid: user.uid };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        userId: user.uid,
        username: user.username,
        email: user.email,
      },
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userService.findUserByEmail(
      signUpDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email already in use!');
    }

    const hashedPassword =
      await this.hashService.generateSaltAndHashingPassword(signUpDto.password);

    const user = {
      username: signUpDto.username,
      email: signUpDto.email,
      password: hashedPassword,
      favorites: null,
    };

    const createdUser = await this.userService.createUser(user);

    return createdUser;
  }
}
