const document = {
    value_: '',

    get cookie() {
        return this.value_;
    },

    set cookie(value) {
        this.value_ += value + ';';
    }
};

export default document;