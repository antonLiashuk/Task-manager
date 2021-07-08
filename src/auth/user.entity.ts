import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    // 2-nd argument is dedicated to identify how the task will contain info about user that holds this task
    @OneToMany(_type => Task, task => task.user, {eager: true})
    tasks: Task[];
}