import {inject} from '@loopback/core';
import { UserService } from '../services'; 
import { param, post, patch, get, del, response, requestBody, getModelSchemaRef } from '@loopback/rest';
import { User } from '../models';
import { Filter } from '@loopback/repository';
export class UserController {
  constructor(@inject('services.UserService') public userService : UserService) {};

  @get('/users')
  @response(200,{
    description: "Get All Users",
    content: {
      'application/json': {
        schema: {
          type:'array',
          items: getModelSchemaRef(User,{
            includeRelations:true
          }),
        },
      },
    },
  })
  async getUser(@param.filter(User) filters? : Filter<User>): Promise<User[]>{
    return await this.userService.getUsers(filters);
  }
}
