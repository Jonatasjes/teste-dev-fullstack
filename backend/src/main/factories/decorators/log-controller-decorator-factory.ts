import { LogMongoRepository } from '../../../infra/db/mongodb/log-mongo-repository';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators';

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
