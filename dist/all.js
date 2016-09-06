if (!wallet) {
    var wallet = {};
}
wallet.model = wallet.model || {};
wallet.view = wallet.view || {};
wallet.controller = wallet.controller || {};
wallet.helper = wallet.helper || {};
wallet.template = wallet.template || {};
wallet.controller.Cashflow = function (view, model) {
    this._view = view;
    this._model = model;
    this.bindViewActions();
    this.bindModelActions();
};

wallet.controller.Cashflow.prototype = {
    bindViewActions: function () {
        this._view.onUpdate = this.viewOnUpdate.bind(this);
        this._view.onDestroy = this.viewOnDestroy.bind(this);
    },

    bindModelActions: function () {
        this._model.onUpdate = this.modelOnUpdate.bind(this);
        this._model.onDestroy = this.modelOnDestroy.bind(this);
    },

    viewOnUpdate: function (checked, dest, amount, desc) {
        this._model.checked(checked);
        this._model.destination(dest);
        this._model.amount(amount);
        this._model.description(desc);
    },

    viewOnDestroy: function () {
        this._model.destroy();
    },

    modelOnUpdate: function (checked, amount, dest) {
        this._view.setChecked(checked);
        this._view.setAmount(amount);
        this._view.setDestination(dest);
    },

    modelOnDestroy: function () {

    }
};

wallet.helper.constants = {
    INCOMING: 'incoming',
    OUTGOING: 'outgoing'
};

wallet.helper.isFunction = function (functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};
wallet.model.Cashflow = function () {
    this._dest = wallet.helper.constants.INCOMING;
    this._amount = 0;
    this._desc = '';
    this._checked = false;
};

wallet.model.Cashflow.prototype = {
    checked: function (checked) {
        if (checked === undefined) {
            return this._checked;
        }
        if (this._checked !== checked) {
            this._checked = checked;
            this.update();
        }
    },

    amount: function (amount) {
        if (amount === undefined) {
            return this._amount;
        }
        if (this._amount !== amount) {
            this._amount = Math.abs(+amount);
            this.update();
        }
    },

    destination: function (destination) {
        if (destination === undefined) {
            return this._dest;
        }
        if (this._dest !== destination) {
            this._dest = destination;
            this.update();
        }
    },

    description: function (description) {
        if (description === undefined) {
            return this._desc;
        }
        this._desc = description;
    },

    update: function () {
        var args = [this._checked, this._amount, this._dest];
        if (wallet.helper.isFunction(this.onUpdate)) {
            this.onUpdate.apply(this, args);
        }
    },

    destroy: function () {
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
    '<div class="cashflow-view">' +
    '<input type="checkbox" class="cashflow-checked">' +
    '<select class="cashflow-dest">' +
    '<option value="incoming">Incoming</option>' +
    '<option value="outgoing">Outgoing</option>' +
    '</select>' +
    '<input type="text" class="cashflow-amount">' +
    '<textarea class="cashflow-desc" cols="40" rows="3"></textarea>' +
    '<button class="cashflow-remove"></button>' +
    '</div>'
;

wallet.view.Cashflow = function (parentList) {
    this.insertHtml(parentList);
    this.initFields();
    this.initEvents();
};

wallet.view.Cashflow.prototype = {
    insertHtml: function (parentList) {
        var template = wallet.template.Cashflow;
        var liElement = document.createElement('li');
        liElement.innerHTML = template;
        parentList.appendChild(liElement);
        this._li = liElement;
    },

    initFields: function () {
        this._checked = this._li.querySelector('.cashflow-checked');
        this._dest = this._li.querySelector('.cashflow-dest');
        this._amount = this._li.querySelector('.cashflow-amount');
        this._desc = this._li.querySelector('.cashflow-desc');
        this._div = this._li.querySelector('.cashflow-view');
    },

    initEvents: function () {
        this._checked.addEventListener('change', this.update.bind(this));
        this._dest.addEventListener('change', this.update.bind(this));
        this._dest.addEventListener('change', this.changeViewClass.bind(this));
        this._amount.addEventListener('change', this.update.bind(this));
        this._desc.addEventListener('change', this.update.bind(this));
        this._li.querySelector('.cashflow-remove').addEventListener('click', this.destroy.bind(this));
    },

    setChecked: function (checked) {
        this._checked.checked = checked;
    },

    setDestination: function (dest) {
        this._dest.value = dest;
        this.changeViewClass();
    },

    setAmount: function (amount) {
        this._amount.value = amount;
    },

    changeViewClass: function () {
        var dest = this._dest.value;
        if (dest === wallet.helper.constants.INCOMING) {
            this._div.classList.remove('outgoing');
        } else {
            this._div.classList.add('outgoing');
        }
    },

    update: function () {
        var args = [this._checked.checked, this._dest.value, this._amount.value, this._desc.value];
        if (wallet.helper.isFunction(this.onUpdate)) {
            this.onUpdate.apply(this, args);
        }
    },

    destroy: function () {
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