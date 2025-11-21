import {inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Getter} from '@loopback/core';
import {AgendaDataSource} from '../datasources';
import {Booking, BookingRelations, Payment, Room, User} from '../models';
import {RoomRepository} from './room.repository';
import {UserRepository} from './user.repository';
import { BookingRequestInterface } from '../models';
import {PaymentRepository} from './payment.repository';
export class BookingRepository extends DefaultCrudRepository<
  Booking,
  typeof Booking.prototype.id,
  BookingRelations
> {
  public readonly room: BelongsToAccessor<Room, typeof Booking.prototype.id>;
  public readonly user: BelongsToAccessor<User, typeof Booking.prototype.id>;
  public readonly payment: HasOneRepositoryFactory<
    Payment,
    typeof Booking.prototype.id
  >;
  constructor(
    @inject('datasources.agenda') dataSource: AgendaDataSource,
    @repository.getter('RoomRepository')
    protected roomRepositoryGetter: Getter<RoomRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('PaymentRepository')
    protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(Booking, dataSource);
    this.room = this.createBelongsToAccessorFor('room', roomRepositoryGetter);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.payment = this.createHasOneRepositoryFactoryFor(
      'payment',
      paymentRepositoryGetter,
    );
    this.registerInclusionResolver('room', this.room.inclusionResolver);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.registerInclusionResolver('payment', this.payment.inclusionResolver);
  }
}
