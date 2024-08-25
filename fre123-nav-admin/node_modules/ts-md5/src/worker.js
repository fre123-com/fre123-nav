
(function(global) {
    // Older versions of Firefox do not have FileReader in webworkers
    var async = !!global.FileReader;

    // Just in case this is prefixed
    if (!Blob.prototype.slice) {
        Blob.prototype.slice = Blob.prototype.webkitSlice || Blob.prototype.mozSlice;
    }

    // Hook-up worker input
    global.onmessage = function(e) {
        var hasher = new Md5FileHasher(function (data) {
            // This prevents an illegal invocation error
            global.postMessage(data);
        }, async);

        hasher.hash(e.data);
    };
})(this);
