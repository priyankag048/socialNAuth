import next from 'next';
import setupServer from './server';
const app = next({});
const handler = app.getRequestHandler();

(async() => {
    await app.prepare();
    await setupServer(handler);
})();
