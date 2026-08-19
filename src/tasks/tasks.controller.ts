import { Body, Controller, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./entities/task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService){}

    @Get()
    findAll(): Task[] {
        return this.tasksService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findById(@Param('id') id: string): Task {
        return this.tasksService.findById(id);
    }

    @Post()
    @HttpCode(201)
    create(@Body() body: CreateTaskDto): Task{
        return this.tasksService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateTaskDto): Task {
        return this.tasksService.update(id, body);
    }
}