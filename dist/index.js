"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var os_1 = require("os");
var home = os_1.homedir();
var tmp = os_1.tmpdir();
var env = process.env;
var macos = function (name) {
    var library = path_1.join(home, 'Library');
    return {
        data: path_1.join(library, 'Application Support', name),
        config: path_1.join(library, 'Preferences', name),
        cache: path_1.join(library, 'Caches', name),
        log: path_1.join(library, 'Logs', name),
        temp: path_1.join(tmp, name)
    };
};
var windows = function (name) {
    var appData = env.LOCALAPPDATA || path_1.join(home, 'AppData', 'Local');
    return {
        // data/config/cache/log are invented by me as Windows isn't opinionated about this
        data: path_1.join(appData, name, 'Data'),
        config: path_1.join(appData, name, 'Config'),
        cache: path_1.join(appData, name, 'Cache'),
        log: path_1.join(appData, name, 'Log'),
        temp: path_1.join(tmp, name)
    };
};
// https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
var linux = function (name) {
    var username = path_1.basename(home);
    return {
        data: path_1.join(env.XDG_DATA_HOME || path_1.join(home, '.local', 'share'), name),
        config: path_1.join(env.XDG_CONFIG_HOME || path_1.join(home, '.config'), name),
        cache: path_1.join(env.XDG_CACHE_HOME || path_1.join(home, '.cache'), name),
        // https://wiki.debian.org/XDGBaseDirectorySpecification#state
        log: path_1.join(env.XDG_STATE_HOME || path_1.join(home, '.local', 'state'), name),
        temp: path_1.join(tmp, username, name)
    };
};
exports.default = function (name, opts) {
    if (opts === void 0) { opts = { suffix: 'nodejs' }; }
    if (opts.suffix !== false)
        name += "-" + opts.suffix;
    if (process.platform === 'darwin') {
        return macos(name);
    }
    if (process.platform === 'win32') {
        return windows(name);
    }
    return linux(name);
};
