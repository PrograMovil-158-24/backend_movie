import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'conn',
  connector: 'postgresql',
  url: 'postgres://postgres:Control123@localhost/postgres?currentSchema=video_games',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Control123',
  database: 'postgres',
  schema: 'video_games',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConnDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'conn';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.conn', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
