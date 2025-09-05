const routes = {
  logIn: () =>'/api/v1/login',
  logInPage: () => '/login',
  signUp: () =>'/api/v1/signup',
  signUpPage: () => '/signup',
  mainPage: () => '/',
  messages: () =>'/api/v1/messages',
  channel: (id) =>`/api/v1/channels/${id}`,
  channels: () => '/api/v1/channels',
  notFound: () => '*',
};

export default routes;
