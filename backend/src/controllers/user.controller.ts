import {inject} from '@loopback/core';
import { UserService } from '../services'; 
import { param, post, patch, get, del, response, requestBody, getModelSchemaRef } from '@loopback/rest';
import { User } from '../models';
import { Filter, repository } from '@loopback/repository';
import { authenticate } from '@loopback/authentication';
import { Booking } from '../models';
import { BookingRepository } from '../repositories';
import { SecurityBindings, UserProfile } from '@loopback/security';
export class UserController {
  constructor(
    @inject('services.UserService') 
    public userService : UserService,
    @repository(BookingRepository) 
    public bookingRepo: BookingRepository,
  ) {};

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
  @get('/users/orders')
  @authenticate('jwt')
  @response(200,{
    description:'Lấy orders theo user',
    content:{
      'application/json': {
        schema: getModelSchemaRef(Booking, {includeRelations : true})
      },
    },
  })
  async getOrdersByUser(
    @param.query.string('status') status: string,
    @inject(SecurityBindings.USER)
    currentUserProfile:UserProfile
  ): Promise<Booking[]>{
    try{
      const userId = currentUserProfile.id;
      const bookings = await this.bookingRepo.find({
        where: {
          status: status,
          userId: userId
        },
        include: [{
          relation: 'room'
        }
        ]
      })
      return bookings;
    }catch(err){
      console.error(err);
      return [];
    }
  }
}
