import config from 'config';
import serverFactory from 'factory/server';

serverFactory(
  config().default,
  process.env.NODE_ENV !== 'production',
);
