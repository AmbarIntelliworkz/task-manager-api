import { Controller, Get, Body, Post, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto){
        return this.tasksService.create(createTaskDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.tasksService.find(id);
    }

    @Patch(':id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto){
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number){
        return this.tasksService.remove(id);
    }
}
