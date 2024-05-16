import ServerlessHttp from 'serverless-http';
import expresApp from './app';

export const handler = ServerlessHttp(expresApp, {
  response: { headers: { 'Access-Control-Allow-Origin': '*' } }
});
