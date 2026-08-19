import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./entities/task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {

    private tasks: Task[] = [];
    private nextId = 1;

    create(createTaskDto: CreateTaskDto): Task {

        const task = {
            id: this.nextId++,
            done: false,
            ...createTaskDto
        };
        
        this.tasks.push(task);
        return task; 
    }

    findAll(): Task[]{
        return this.tasks;
    }

    findById(id: string): Task { 
        const task = this.tasks.find(t => t.id === parseInt(id));
        if(!task) {
            throw new NotFoundException(`Task ${id} não encontrada`);
        }
        return task;
    }
    
    update(id: string, updateTaskDto: UpdateTaskDto): Task {
        let task = this.findById(id);
        if(!task){
            throw new NotFoundException(`Task ${id} não encontrada`);
        }
        
        Object.assign(task, updateTaskDto);

        return task; 
    }

    delete(id: number): string {
        return `Objeto ${id} excluído com sucesso`;
    }
}