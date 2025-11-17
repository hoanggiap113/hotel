import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AgendaDataSource} from '../datasources';
import {Payment, PaymentRelations} from '../models';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.id,
  PaymentRelations
> {
  constructor(
    @inject('datasources.agenda') dataSource: AgendaDataSource,
  ) {
    super(Payment, dataSource);
  }
}
