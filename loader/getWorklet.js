function getWorklet(source) {
    const workletBlob = new Blob([source], {type: "application/javascript"});
    return URL.createObjectURL(workletBlob);
}

module.exports = getWorklet;