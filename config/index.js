module.exports = {
  port: process.env.PORT || 8080,
  appName: 'Goût du Pays',
  whatsapp: {
    apiUrl: 'https://graph.facebook.com/v21.0',
    phoneNumberId: process.env.WA_PHONE_NUMBER_ID || '',
    accessToken: process.env.WA_ACCESS_TOKEN || '',
    restaurantNumber: process.env.WA_RESTAURANT_NUMBER || '22921300000',
  },
};
