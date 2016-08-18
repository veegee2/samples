import angular from 'angular';
import startRatePolling from './startRatePolling';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

angular.module('mews', [])
    .controller('AppController', startRatePolling)
    .run(function() {
        console.log('App is running.');
});

angular.element().ready(function() {
    angular.bootstrap(document, ['mews']);
});
