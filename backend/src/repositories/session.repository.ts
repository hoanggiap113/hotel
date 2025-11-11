import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AgendaDataSource} from '../datasources';
import {Session, SessionRelations} from '../models';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.id,
  SessionRelations
> {
  constructor(
    @inject('datasources.agenda') dataSource: AgendaDataSource,
  ) {
    super(Session, dataSource);
  }

}
