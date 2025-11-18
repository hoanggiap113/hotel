import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AgendaDataSource} from '../datasources';
import {Discount, DiscountRelations} from '../models';

export class DiscountRepository extends DefaultCrudRepository<
  Discount,
  typeof Discount.prototype.id,
  DiscountRelations
> {
  constructor(
    @inject('datasources.agenda') dataSource: AgendaDataSource,
  ) {
    super(Discount, dataSource);
  }
}
