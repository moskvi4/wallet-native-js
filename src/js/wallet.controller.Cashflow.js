wallet.controller.Cashflow = function(view, model) {
	this._view = view;
	this._model = model;
	this.bindViewActions();
	this.bindModelActions();
};

wallet.controller.Cashflow.prototype = {
	bindViewActions: function() {
		this._view.onUpdate = this.viewUpdate.bind(this);
		this._view.onDestroy = this.viewDestroy.bind(this);
	},

	bindModelActions: function() {
		this._model.onUpdate = this.modelUpdate.bind(this);
		this._model.onDestroy = this.modelDestroy.bind(this);
	},

	viewUpdate: function(dest, amount, desc) {
		if (this._model.destination() !== dest) {
			this._model.destination(dest);
		}
		if (this._model.amount() !== amount) {
			this._model.amount(amount);
		}
		if (this._model.description() !== desc) {
			this._model.description(desc);
		}
	},

	viewDestroy: function() {

	},

	modelUpdate: function(dest, amount) {
		console.log(dest, amount);
	},

	modelDestroy: function() {

	}
};
