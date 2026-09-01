import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(){
        return this.prisma.task.findMany();
    }

    async create(createTaskDto: CreateTaskDto){
        return this.prisma.task.create({
            data: createTaskDto,
        });
    }

    async find(id: number){        
        return this.findTaskById(id);
    }

    async update(id: number, updateTaskDto: UpdateTaskDto){
        await this.findTaskById(id);

        const taskdata = await this.prisma.task.update({
            where: {id},
            data: updateTaskDto
        });

        return taskdata;
    }

    async remove(id: number){
        await this.findTaskById(id);

        return this.prisma.task.delete({
            where: {id}
        });
    }

    private async findTaskById(id: number){
        const task = await this.prisma.task.findUnique({
            where: {id}
        });
        if(!task){
            throw new NotFoundException(`Task not found with id: ${id}`);
        }
        return task;
    }

}
