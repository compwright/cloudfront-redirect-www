'use strict';

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const host = request.headers.host[0].value;

  // Remove www. from the beginning of the hostname
  const redirectHost = host.replace(/^(www\.)/, '');

  if (redirectHost === host) {
    return callback(null, request);
  }

  const response = {
    status: '301',
    headers: {
      location: [{
        key: 'Location',
        value: 'https://' + redirectHost + [request.uri, request.querystring].filter(q => q).join('?')
      }]
    }
  };

  callback(null, response);
};
