class LoaderError extends Error {
    constructor(props) {
        super(props);
        this.name = props.name || "Loader Error";
        this.message = props.message;
    }

}

module.exports = LoaderError;