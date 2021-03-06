import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('features');
  this.route('predictfor');
  this.route('results');
  this.route('labels');
  this.route('mypage');
});

export default Router;
