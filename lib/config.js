'use strict';

module.exports = {
  paypal: {
      businessEmail: '',
      url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
      currency: 'USD'
  },
  secret: '',
  name: 'nodeStore',
  db: {
      url: 'mongodb://skoromar:toxinaA1.@ds249233.mlab.com:49233/heroku_3dtgl0p6?authSource=heroku_3dtgl0p6',
      sessions: 'sessions'
  },
  locale: {
      lang: 'en-US',
      currency: 'USD'
  }
};