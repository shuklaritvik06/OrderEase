import { HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDTO } from '../dto/user.dto';
import { LoginDTO } from '../dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { comparePass, hashPass } from '../utils/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async login(user: LoginDTO) {
    const userFound = await this.userModel.findOne({
      username: user.username,
    });
    if (userFound && comparePass(user.password, userFound.password)) {
      const payload = {
        sub: userFound._id,
        username: user.username,
        role: userFound.role,
      };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          algorithm: 'HS256',
          expiresIn: '1h',
          secret: process.env.SECRET,
          issuer: 'Auth Service',
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          algorithm: 'HS256',
          expiresIn: '24h',
          secret: process.env.SECRET,
          issuer: 'Auth Service',
        }),
      };
    }
    return {
      error: 'Please enter correct details',
    };
  }
  async register(user: RegisterDTO) {
    const userFound = await this.userModel.find({ username: user.username });
    if (userFound.length === 0) {
      user.password = await hashPass(user.password);
      return await this.userModel.create(user);
    }
    return {};
  }
}
