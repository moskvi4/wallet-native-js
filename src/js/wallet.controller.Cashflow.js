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
