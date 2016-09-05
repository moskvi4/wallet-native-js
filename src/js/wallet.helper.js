wallet.helper.constants = {
	INCOMING: 1,
	OUTGOING: 2
};

wallet.helper.isFunction = function(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};