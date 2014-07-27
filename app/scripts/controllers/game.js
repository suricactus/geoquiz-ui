'use strict';

/**
 * @ngdoc function
 * @name trunkApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the trunkApp
 */
 angular.module('trunkApp')
 .controller('GameCtrl', function ($scope, game) {
 	$scope.quiz = game.getQuiz();

 	$scope.question = game.getNextQuestion();


 	$scope.footerNavPrev = function() {
 		$scope.question = game.getPrevQuestion();
 	};

 	$scope.footerNavNext = function() {
 		$scope.question = game.getNextQuestion();
 	};
 });
