import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory
} from '@loopback/repository';
import {AgendaDataSource} from '../datasources';
import {Building, Room, RoomRelations} from '../models';
import {BuildingRepository} from './building.repository';
import {UserRepository} from './user.repository';
export class RoomRepository extends DefaultCrudRepository<
  Room,
  typeof Room.prototype.id,
  RoomRelations
> {
  public readonly building: BelongsToAccessor<
    Building,
    typeof Room.prototype.id
    >;

  constructor(
    @inject('datasources.agenda') dataSource: AgendaDataSource,
    @repository.getter('BuildingRepository')
    protected buildingRepositoryGetter: Getter<BuildingRepository>
  ) {
    super(Room, dataSource);
    this.building = this.createBelongsToAccessorFor(
      'building',
      this.buildingRepositoryGetter
    );
    //Đăng ký include( ý là nếu trên query có include thì tự động lấy các phòng cùng )
    this.registerInclusionResolver('building',this.building.inclusionResolver);
  }

  async getMostPickedRoom(limit: number = 4): Promise<any[]> {
    const connector = this.dataSource.connector as any;
    const db = connector.db;
    const collectionName = (connector as any).collectionName(
      this.modelClass.name,
    );
    const collection = db.collection(collectionName);
    const pipline = [
      {
        $sort: {
          'location.city': 1,
          'rating.average': -1,
        },
      },
      {
        $group: {
          _id: '$location.city',
          rooms: {$push: '$$ROOT'},
        },
      },
      {
        $project: {
          _id: 0,
          city: '$_id',
          topRooms: {
            $slice: ['$rooms', limit],
          },
        },
      },
    ];
    return collection.aggregate(pipline).toArray();
  }
}
