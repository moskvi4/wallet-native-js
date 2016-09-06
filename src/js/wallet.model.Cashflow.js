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
