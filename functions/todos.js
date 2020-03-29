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

export async function handler(event, context) {
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

  return client.query({ query: findAllTodos })
    .then( results => JSON.stringify(results))
    .then( data => ({
      statusCode: 200,
      body: data
    }))
    .catch(e => callback(e.toString()));
}