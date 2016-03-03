/**
 * @ngdoc service
 * @name mustaskeClientApp.settings
 * @description
 * # settings
 * Service in the mustaskeClientApp.
 */

(function(){
  'use strict';

  angular.module('mustaskeClientApp')
    .service('SettingsService', ['SocketService', 'UserService', SettingsService]);

  var ctrl, socketService, userService;
  function SettingsService(SocketService, UserService)
  {
    ctrl = this;
    socketService = SocketService;
    userService = UserService;
  }





})();
