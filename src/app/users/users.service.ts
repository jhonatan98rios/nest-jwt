import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { UsersEntity } from './Users.entity';

@Injectable()
export class UsersService {

    constructor ( 
        @InjectRepository(UsersEntity)    
        private readonly userRepository: Repository<UsersEntity>
    ) {}

    async findAll() {
        return await this.userRepository.find({ 
            select: ['id', 'firstName', 'lastName', 'email'] 
        })
    }

    async findOneOrFail(options: FindOneOptions<UsersEntity>){
        try {
            return await this.userRepository.findOneOrFail(options)
        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    async update(id: string, data) {
        const user = await this.findOneOrFail({ where: { id } })
        this.userRepository.merge(user, data)

        return await this.userRepository.save(user)
    }

    async destroy(id: string) {
        await this.userRepository.findOneOrFail({ where: { id } })
        this.userRepository.softDelete({ id })
    }

}
