"use strict";angular.module("angularjsTutorial",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","firebase"]).config(["$stateProvider","$urlRouterProvider",function(o,t){o.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl as mainCtrl"}).state("contact",{url:"/contact",templateUrl:"app/contact/contact.html",controller:"ContactCtrl as contactCtrl"}),t.otherwise("/")}]).controller("GlobalCtrl",["$scope",function(){this.message="Global"}]),angular.module("angularjsTutorial").constant("firebaseUrl","https://zangulartutorial.firebaseio.com/"),angular.module("angularjsTutorial").factory("TodoService",["$window","$log","$q","$timeout","$firebase","firebaseUrl",function(o,t,a,e,n,r){t.log("TodoService instantiated");var l,i=new Firebase(r+"todos"),s=n(i);return{getTodos:function(){var o=a.defer();return s.$asArray().$loaded().then(function(a){l=a,t.log("todos loaded",l===a,a),o.resolve(l)}).catch(function(o){t.log("Error retrieving todos from firebase",o)}),o.promise},addTodo:function(o){var e=a.defer();return l.$add({title:o.title,completed:!1}).then(function(o){t.log("new todo added",o.$id,o.key(),o,l),t.log("resolving addTodo promise"),e.resolve(o)}).catch(function(o){console.log("error adding todo",o),t.log("rejecting addTodo promise"),e.reject(o)}),e.promise},removeTodo:function(o){var e=a.defer();return l.$remove(o).then(function(o){t.log("resolving removeTodo promise"),e.resolve(o)}).catch(function(o){t.log("error removing todo",o),t.log("rejecting removeTodo promise"),e.reject(o)}),e.promise},saveTodo:function(o){var e=a.defer();return l.$save(o).then(function(o){t.log("resolving saveTodo promise"),e.resolve(o)}).catch(function(o){t.log("error saving todo",o),t.log("rejecting saveTodo promise"),e.reject(o)}),e.promise}}}]),angular.module("angularjsTutorial").controller("MainCtrl",["$scope","$log","$q","TodoService","$q",function(o,t,a,e){t.log("MainCtrl instantiated");var n=this;n.newTodoTitle="",n.getTodos=function(){return e.getTodos().then(function(o){return n.todos=o,n.todos})},n.addTodo=function(o){var t;return e.addTodo(o).then(function(o){t=o,n.newTodoTitle=""},function(o){console.log(o)})},n.removeTodo=function(o){return e.removeTodo(o).then(n.getTodos())},n.getTodoClasses=function(o){return{completed:o.completed}},n.saveTodos=function(o){return e.saveTodo(o)},n.getTodos()}]),angular.module("angularjsTutorial").controller("NavbarCtrl",["$scope",function(o){o.date=new Date}]),angular.module("angularjsTutorial").controller("ContactCtrl",["$scope",function(){console.log("ContactCtrl instantiated")}]),function(o){try{o=angular.module("angularjsTutorial")}catch(t){o=angular.module("angularjsTutorial",[])}o.run(["$templateCache",function(o){o.put("app/contact/contact.html",'<div class="container"><h1>Contact</h1></div>')}])}(),function(o){try{o=angular.module("angularjsTutorial")}catch(t){o=angular.module("angularjsTutorial",[])}o.run(["$templateCache",function(o){o.put("app/main/main.html",'<div class="container"><h1>Todo<div class="row"><div class="col-md-12"><form ng-submit="mainCtrl.addTodo({title : mainCtrl.newTodoTitle})"><input type="text" class="form-control" ng-model="mainCtrl.newTodoTitle" placeholder="Type title here"></form></div></div><div class="row"><div class="col-md-12"><ul class="todos"><li class="todo-item" ng-class="mainCtrl.getTodoClasses(todo)" ng-repeat="todo in mainCtrl.todos track by todo.$id"><div class="input-group"><span class="input-group-addon"><input type="checkbox" ng-model="todo.completed" ng-change="mainCtrl.saveTodos()"></span> <input type="text" class="form-control" ng-model="todo.title" ng-readonly="todo.completed" ng-change="mainCtrl.saveTodos()"> <span class="input-group-btn"><button class="btn btn-default" ng-click="mainCtrl.removeTodo(todo)"><span class="glyphicon glyphicon-remove-circle"></span></button> <span class="sr-only">Remove</span></span></div></li></ul></div></div></h1></div>')}])}(),function(o){try{o=angular.module("angularjsTutorial")}catch(t){o=angular.module("angularjsTutorial",[])}o.run(["$templateCache",function(o){o.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ui-sref="home">Home</a></li><li><a ng-href="#">About</a></li><li><a ui-sref="contact">Contact</a></li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></nav>')}])}();