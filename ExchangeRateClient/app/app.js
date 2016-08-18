import angular from 'angular';
import startRatePolling from './startRatePolling';

angular.module('mews', [])
    .controller('AppController', startRatePolling)
    .run(function() {
        console.log('App is running.');
});

angular.element().ready(function() {
    angular.bootstrap(document, ['mews']);
});
