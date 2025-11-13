import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AgendaDataSource} from '../datasources';
import {Room, RoomRelations} from '../models';
import {Db} from 'mongodb';

export class RoomRepository extends DefaultCrudRepository<
  Room,
  typeof Room.prototype.id,
  RoomRelations
> {
  constructor(
    @inject('datasources.agenda') dataSource: AgendaDataSource,
  ) {
    super(Room, dataSource);
  }
  async getMostPickedRoom(limit: number = 4): Promise<any[]>{
    const connector = this.dataSource.connector as any;
    const db = connector.db;
    const collectionName = (connector as any).collectionName(this.modelClass.name);
    const collection = db.collection(collectionName);
    const pipline = [
      {
        '$sort': {
          'location.city' : 1,
          'rating.average': -1
        }
      },
      {
        '$group': {
          '_id': '$location.city',
          //Đây phòng rating cao nhất lên đầu mảng
          'rooms': {'$push': '$$ROOT'}
        }
      },
      {
        '$project': {
          '_id': 0,
          'city': '$_id',
          'topRooms': {
            '$slice': ['$rooms',limit]
          }
        }
      }
    ]
    return collection.aggregate(pipline).toArray()
  }
    
}
