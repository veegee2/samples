import {endpoint,	interval} from './config';
export default function startRatePolling($q, $scope, $timeout, $http) {
	let vm = this;
	vm.data = [];
	vm.error = false;

	function getData() {
		var deferred = $q.defer();
		$http.jsonp(endpoint + '?callback=JSON_CALLBACK')
			.success(function(res) {
				deferred.resolve(res);
			})
			.error(function(res) {
				console.log('Server error');
				deferred.resolve();
			});
		return deferred.promise;
	};

	var cancelNextLoad = function() {
		$timeout.cancel();
	};

	function parseRatesObject(ratesObj) {
		var objectKeys = Object.keys(ratesObj);
		var rateArr = [];
		objectKeys.forEach((propName) => {
			rateArr.push({'label': propName, 'value': ratesObj[propName]});
		});
		return rateArr;
	}

	(function tick() {
		getData().then((res) => {
			if(res) {
				vm.error = false;
				vm.data = parseRatesObject(res.rates);
			} else {
				vm.error = true;
			}
			cancelNextLoad();
			$timeout(tick, interval);
		});
	})();

	$scope.$on('$destroy', function() {
		cancelNextLoad();
	});
}
