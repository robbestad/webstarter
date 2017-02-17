require('isomorphic-fetch');

// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
  console.log('BUILDING PRODUCTION');
  require('./webpack.config.dist.js')
} else {
  console.log('BUILDING DEV');
  require('./webpack.config.dev.js')
}
