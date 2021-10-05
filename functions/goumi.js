exports.handler = async function() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'goumi1009',
      age: 85,
      email: 'goumi1009@abc.com'
    })
  };
};