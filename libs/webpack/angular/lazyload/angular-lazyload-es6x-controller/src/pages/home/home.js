'use srtict';

let HomeController = require('./controllers/home.controller');
let HomeAboutController = require('./controllers/home.about.controller');
let homeModule = angular.module('homeApp', []);
homeModule.controller('HomeController', HomeController);
homeModule.controller('HomeAboutController', HomeAboutController);

export default homeModule;
