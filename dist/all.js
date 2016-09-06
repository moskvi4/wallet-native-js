if (!wallet) {
    var wallet = {};
}
wallet.model = wallet.model || {};
wallet.view = wallet.view || {};
wallet.controller = wallet.controller || {};
wallet.helper = wallet.helper || {};
wallet.template = wallet.template || {};
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

wallet.helper.constants = {
	INCOMING: 'incoming',
	OUTGOING: 'outgoing'
};

wallet.helper.isFunction = function(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};
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

wallet.template.Cashflow =
		'<li>' +
		'<div class="cashflow-view">' +
		'<select class="cashflow-dest">' +
		'<option value="incoming">Incoming</option>' +
		'<option value="outgoing">Outgoing</option>' +
		'</select>' +
		'<input type="text" class="cashflow-amount">' +
		'<textarea class="cashflow-desc" cols="40" rows="3"></textarea>' +
		'<button class="cashflow-remove"></button>' +
		'</div>' +
		'</li>'
;

wallet.view.Cashflow = function(parentList) {
	this.insertHtml(parentList);
	this.initFields();
	this.initEvents();
};

wallet.view.Cashflow.prototype = {
	insertHtml: function(parentList) {
		var template = wallet.template.Cashflow;
		var liElement = document.createElement('li');
		liElement.innerHTML = template;
		parentList.appendChild(liElement);
		this._li = liElement;
	},

	initFields: function() {
		this._dest = this._li.querySelector('.cashflow-dest');
		this._amount = this._li.querySelector('.cashflow-amount');
		this._desc = this._li.querySelector('.cashflow-desc');
		this._div = this._li.querySelector('.cashflow-view');
	},

	initEvents: function() {
		this._dest.addEventListener('change', this.update.bind(this));
		this._dest.addEventListener('change', this.changeViewClass.bind(this));
		this._amount.addEventListener('change', this.update.bind(this));
		this._desc.addEventListener('change', this.update.bind(this));
		this._li.querySelector('.cashflow-remove').addEventListener('click', this.destroy.bind(this));
	},

	changeViewClass: function() {
		var dest = this._dest.value;
		if (dest === wallet.helper.constants.INCOMING) {
			this._div.classList.remove('outgoing');
		} else {
			this._div.classList.add('outgoing');
		}
	},

	update: function() {
		var args = [this._dest.value, this._amount.value, this._desc.value];
		if (wallet.helper.isFunction(this.onUpdate)) {
			this.onUpdate.apply(this, args);
		}
	},

	destroy: function() {
		this._li.parentNode.removeChild(this._li);
		if (wallet.helper.isFunction(this.onDestroy)) {
			this.onDestroy();
		}
		this.onDestroy = null;
		this.onUpdate = null;
	},

	onDestroy: null,

	onUpdate: null
};