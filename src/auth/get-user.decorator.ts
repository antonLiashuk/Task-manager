import { createParamDecorator , ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

/*passed as an argument in the @Post method while creating a Task in the database in order to define that every task shoudl contain its own user */
export const GetUser = createParamDecorator((_data, ctx : ExecutionContext) : User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
    }
);