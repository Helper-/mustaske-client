(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .service('ClickerService', ['$mdBottomSheet', 'SocketService','RoomService', ClickerService]);

  var ctrl, mdBottomSheet, socketService, answers, buttons, roomService;
  function ClickerService($mdBottomSheet, SocketService,RoomService)
  {
    ctrl = this;
    socketService = SocketService;
    mdBottomSheet = $mdBottomSheet;
    roomService = RoomService;

    answers = {
      current: '',
      all: []
    };

    buttons = ['A', 'B', 'C', 'D', 'E'];
    ctrl.isPollStarted = false;
  }

  ClickerService.prototype.getButtons = function ()
  {
    return buttons;
  };

  ClickerService.prototype.openClicker = function ()
  {
    mdBottomSheet.show(
      {
        templateUrl: 'views/clicker-input-bottom-sheet.tpl.html',
        controller: 'ClickerInputController',
        controllerAs: 'ctrl',
        clickOutsideToClose: true
      });
  };

  ClickerService.prototype.closeClicker = function ()
  {
    mdBottomSheet.cancel();
  };

  //poll status
  ClickerService.prototype.getPollStatus = function ()
  {
    if(roomService.getActivePoll()){
      ctrl.isPollStarted=true;
      roomService.setActivePoll(false);
      ctrl.openClicker();
    }
    return ctrl.isPollStarted;
  };

  ClickerService.prototype.setPollStatus = function (status)
  {
    ctrl.isPollStarted = status;
  };

  //answers
  ClickerService.prototype.vote = function (answer)
  {
    socketService.votePoll(answer);
    answers.current = answer;
  };

  ClickerService.prototype.saveCurrentVote = function ()
  {
    answers.all.push(answers.current);
  };

  ClickerService.prototype.getAnswers = function ()
  {
    return answers;
  };

})();
