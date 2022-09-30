import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import { records } from './resolver';


const app = express();
app.use(express.json())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: { records },
    graphiql: true,
    customFormatErrorFn: (error) => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path,
    })
  })
);

const PORT_NUMBER = process.env.PORT || 3000;
const server = app.listen(PORT_NUMBER, () => console.log(`Listening on port ${PORT_NUMBER}`));

process.on('SIGTERM', async () => {
  await server.close();
  return process.exit();
});
