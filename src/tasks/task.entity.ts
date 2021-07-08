import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description : string;

    @Column()
    status: TaskStatus;

    //there will be many tasks to only one user
    //dec. @Exclude() && toPlainOnly means that whenever I print object into a plain text I want to exclude that user 
    //property whenever you sent a response in JSON that
    @ManyToOne(_type => User, user => user.tasks, {eager: false})
    @Exclude({toPlainOnly:true})
    user : User;
}