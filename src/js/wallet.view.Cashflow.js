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