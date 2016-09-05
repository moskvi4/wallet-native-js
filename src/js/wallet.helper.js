wallet.helper.constants = {
	INCOMING: 'incoming',
	OUTGOING: 'outgoing'
};

wallet.helper.isFunction = function(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};