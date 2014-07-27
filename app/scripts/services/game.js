'use strict';

/**
 * @ngdoc service
 * @name trunkApp.game
 * @description
 * # game
 * Service in the trunkApp.
 */
 angular.module('trunkApp')
 .service('game', function game($q) {
 	var quiz = {
 		"version": "0.0",
 		"caption": "Области в България",
 		"language": "bg_BG",
 		"verification": "offline",
 		"description": "",
 		"long_description": "",
 		"time": null,
 		"is_time_countdown": null,
 		"can_change_time_countdown": true,
 		"author": "author",
 		"questions_count": 3,
 		"map": {
 			"id": 1,
 			"name": "bg-oblasti",
 			"projection": "mercator"
 		},
 		"questions": [
 		{
 			"caption": "Кой е маркирания град?",
 			"id": "0",
 			"type": "input",
 			"time": null,
 			"multiple": true,
 			"correct_answers": [
 			"RSE"
 			],
 			"suggested_answers": [
 			{
 				"id": null,
 				"caption": "Ruse",
 				"value": "RSE"
 			},
 			{
 				"id": null,
 				"caption": "Varna",
 				"value": "VRN"
 			}
 			]
 		},
 		{
 			"caption": "Кой е маркирания град?",
 			"id": "0",
 			"type": "choice",
 			"time": null,
 			"multiple": true,
 			"correct_answers": [
 			"VRN"
 			],
 			"suggested_answers": [
 			{
 				"id": null,
 				"caption": "Ruse",
 				"value": "RSE"
 			},
 			{
 				"id": null,
 				"caption": "Varna",
 				"value": "VRN"
 			}
 			]
 		},
 		{
 			"caption": "Маркирайте Стара Загора",
 			"id": "0",
 			"type": "map_selection",
 			"multiple": true,
 			"time": 20,
 			"correct_answers": [
 			"STZ"
 			],
 			"suggested_answers": []
 		}
 		]
 	};

 	this.getQuiz = function() {
 		return {
 			db: quiz,
 		};
 	}

 	var currentIndex = -1;

 	var clearQuestion = function() {
 		if (currentIndex < 0) return;

 		var question = questions[currentIndex];

 		question.currentIndex = null;

 		return question;
 	};

 	var getQuestion = function(next) {
 		clearQuestion();

 		currentIndex = (next) ? currentIndex + 1 : currentIndex - 1;

 		if (currentIndex >= quiz.questions.length) {
 			currentIndex = currentIndex % quiz.questions.length;
 		} else if (currentIndex < 0) {
 			currentIndex = quiz.questions.length + currentIndex % quiz.questions.length; 
 		}

 		var question = questions[currentIndex]; 

 		question.isAsked = true;
 		question.currentIndex = currentIndex;

 		return question;
 	};

 	var questions = [];

 	for (var i in quiz.questions) {
 		var rawQuestion = quiz.questions[i];
 		var parsedQuestion = {
 			db: rawQuestion,
 			answers: [],
 			questionIndex: i,
 			currentIndex: null,
 			isAnswered: false,
 			isCorrect: false,
 			isWrong: false,
 			isAsked: false,
 			answerWithInput: rawQuestion['type'] == 'input',
 			answerWithChoice: rawQuestion['type'] == 'choice',
 			answerWithMapSelection: rawQuestion['type'] == 'map_selection',
 		};

 		questions.push(parsedQuestion);

 		for (var k in rawQuestion['suggested_answers']) {
 			var rawAnswer = rawQuestion['suggested_answers'][k];

 			var parsedAnswer = {
 				db: rawAnswer,
 				inputType: (rawQuestion['multiple']) ? 'checkbox' : 'radio',
 			};

 			parsedQuestion.answers.push(parsedAnswer);
 		}
 	}




 	this.getNextQuestion = function() {
 		return getQuestion(true);
 	};
 	this.getPrevQuestion = function() {
 		return getQuestion(false);
 	};
 });
