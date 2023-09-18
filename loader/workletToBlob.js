module.exports = function workletToBlob(source) {
    try {
        var blob;

        try {
            // BlobBuilder = Deprecated, but widely implemented
            var BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;

            blob = new BlobBuilder();

            blob.append(source);

            blob = blob.getBlob("application/javascript; charset=utf-8");
        } catch (e) {
            // The proposed API
            blob = new Blob([source], { type: "application/javascript; charset=utf-8" });
        }

        return URL.createObjectURL(blob);
    } catch (e) {
        return 'data:application/javascript,' + encodeURIComponent(source);
    }
};