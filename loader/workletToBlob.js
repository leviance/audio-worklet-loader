module.exports = function workletToBlob(source) {
    const blob = new Blob([source], {type: "application/javascript"});
    return URL.createObjectURL(blob);
};