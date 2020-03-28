import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import fetch from 'node-fetch';

const URL = 'https://graphql.fauna.com/graphql';

const client = new ApolloClient({
  uri: URL,
  fetch,
  request: operation => {
    const token = process.env.GRAPHQL_KEY;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
});

export function handler(event, context, callback) {
  const findAllTodos = gql`
    query FindAllTodos {
      allTodos {
        data {
          _id
          title
          completed
          list {
            title
          }
        }
      }
    }
  `;

  client.query({
    query: findAllTodos
  }).then(results => {
    console.log(results);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(results),
    });
  }).catch(e => callback(e.toString()));
}