let baseUrl;

switch (process.env.NODE_ENV) {
  case 'production':
    baseUrl = 'https://puzzle-fight.herokuapp.com'
    break;
  default:
    baseUrl = 'http://localhost:3000'
}

export default baseUrl;