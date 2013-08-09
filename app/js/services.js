'use strict';

/* Services */
var app = angular.module('myApp.services', []);

app.factory("HelloWorldService",['$q',function($q){

    var worker = new Worker('js/doWork.js');
    var defer;
    worker.addEventListener('message', function(e) {
      console.log('Worker said: ', e.data);
      defer.resolve(e.data);
    }, false);

    return {
        doWork : function(myData){
            defer = $q.defer();
            worker.postMessage(myData); // Send data to our worker. 
            return defer.promise;
        }
    };

}]);