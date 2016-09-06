wallet.model.Cashflow = function(amount, dest, desc) {
	amount = Math.abs(amount || 0);
	this._dest = dest || wallet.helper.constants.INCOMING;
	if (this._dest === wallet.helper.constants.OUTGOING) {
		this._amount = -amount;
	} else {
		this._amount = amount;
	}
	this._desc = desc || '';
};

wallet.model.Cashflow.prototype = {
	amount: function(amount) {
		if (amount === undefined) {
			return this._amount;
		}
		this._amount = amount;
		this.update();
	},

	destination: function(destination) {
		if (destination === undefined) {
			return this._dest;
		}
		this._dest = destination;
		this.update();
	},

	description: function(description) {
		if (description === undefined) {
			return this._desc;
		}
		this._desc = description;
	},

	update: function() {
		var args = [this._amount, this._dest];
		if (wallet.helper.isFunction(this.onUpdate)) {
			this.onUpdate.apply(this, args);
		}
	},

	destroy: function() {
		if (wallet.helper.isFunction(this.onDestroy)) {
			this.onDestroy();
		}
		this.onDestroy = null;
		this.onUpdate = null;
	},

	onDestroy: null,

	onUpdate: null
};
