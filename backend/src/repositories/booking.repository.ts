import {inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { Getter } from '@loopback/core';
import {AgendaDataSource} from '../datasources';
import {Booking, BookingRelations, Room, User} from '../models';
import {RoomRepository} from './room.repository';
import {UserRepository} from './user.repository';
export class BookingRepository extends DefaultCrudRepository<
  Booking,
  typeof Booking.prototype.id,
  BookingRelations
> {
  public readonly room: BelongsToAccessor<Room, typeof Booking.prototype.id>;
  public readonly user: BelongsToAccessor<User, typeof Booking.prototype.id>;

  constructor(
    @inject('datasources.agenda') dataSource: AgendaDataSource,
    @repository.getter('RoomRepository')
    protected roomRepositoryGetter: Getter<RoomRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Booking, dataSource);
    this.room = this.createBelongsToAccessorFor('room', roomRepositoryGetter);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);

    this.registerInclusionResolver('room', this.room.inclusionResolver);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
