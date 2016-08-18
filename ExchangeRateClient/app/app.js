import angular from 'angular';
import startRatePolling from './startRatePolling';

angular.module('mews', [])
    .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
    ])
    .controller('AppController', startRatePolling)
    .run(function() {
        console.log('App is running.');
});

angular.element().ready(function() {
    angular.bootstrap(document, ['mews']);
});
