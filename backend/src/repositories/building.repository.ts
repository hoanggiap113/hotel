import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository, 
  BelongsToAccessor, 
  HasManyRepositoryFactory, 
} from '@loopback/repository';
import {AgendaDataSource} from '../datasources';

import {Building, BuildingRelations, Room, User} from '../models'; 
import {RoomRepository} from './room.repository'; 
import {UserRepository} from './user.repository'; 

export class BuildingRepository extends DefaultCrudRepository<
  Building,
  typeof Building.prototype.id,
  BuildingRelations
> {
  // 3. Khai báo các thuộc tính quan hệ
  public readonly rooms: HasManyRepositoryFactory<
    Room,
    typeof Building.prototype.id
  >;
  public readonly user: BelongsToAccessor<User, typeof Building.prototype.id>;

  constructor(
    @inject('datasources.agenda') dataSource: AgendaDataSource,

    @repository.getter('RoomRepository')
    protected roomRepositoryGetter: Getter<RoomRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Building, dataSource);

    this.user = this.createBelongsToAccessorFor(
      'user', 
      userRepositoryGetter,
    );

    this.registerInclusionResolver('user', this.user.inclusionResolver);

    this.rooms = this.createHasManyRepositoryFactoryFor(
      'rooms', 
      roomRepositoryGetter,
    );

    this.registerInclusionResolver('rooms', this.rooms.inclusionResolver);
  }
}