exports.handler = async event => {
  const subject = event.queryStringParameters.name || 'World';
  return {
    statusCOde: 200,
    body: `Hello ${subject}!`,
  };
}