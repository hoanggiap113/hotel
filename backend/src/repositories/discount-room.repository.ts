import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {AgendaDataSource} from '../datasources';
import {Discount, DiscountRoom, DiscountRoomRelations} from '../models';
import { DiscountRepository } from './discount.repository';

export class DiscountRoomRepository extends DefaultCrudRepository<
  DiscountRoom,
  typeof DiscountRoom.prototype.id,
  DiscountRoomRelations
> {
  public readonly discount: BelongsToAccessor<Discount,
  typeof DiscountRoom.prototype.id>
  constructor(
    @inject('datasources.agenda') dataSource: AgendaDataSource,
    @repository.getter('DiscountRepository')
    protected discountRepoGetter: Getter<DiscountRepository>
  ) {
    super(DiscountRoom, dataSource);
    this.discount = this.createBelongsToAccessorFor(
      'discount',
      discountRepoGetter,
    );
    this.registerInclusionResolver(
      'discount',
      this.discount.inclusionResolver
    )
  }
}
