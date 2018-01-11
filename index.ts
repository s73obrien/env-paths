import { join, basename } from 'path';
import { homedir, tmpdir } from 'os';

const home = homedir();
const tmp = tmpdir();
const env = process.env;

const macos = (name: string) => {
  const library = join(home, 'Library');

  return {
    data: join(library, 'Application Support', name),
    config: join(library, 'Preferences', name),
    cache: join(library, 'Caches', name),
    log: join(library, 'Logs', name),
    temp: join(tmp, name)
  };
};

const windows = (name: string) => {
  const appData = env.LOCALAPPDATA || join(home, 'AppData', 'Local');

  return {
    // data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: join(appData, name, 'Data'),
    config: join(appData, name, 'Config'),
    cache: join(appData, name, 'Cache'),
    log: join(appData, name, 'Log'),
    temp: join(tmp, name)
  };
};

// https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
const linux = (name: string) => {
  const username = basename(home);

  return {
    data: join(env.XDG_DATA_HOME || join(home, '.local', 'share'), name),
    config: join(env.XDG_CONFIG_HOME || join(home, '.config'), name),
    cache: join(env.XDG_CACHE_HOME || join(home, '.cache'), name),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: join(env.XDG_STATE_HOME || join(home, '.local', 'state'), name),
    temp: join(tmp, username, name)
  };
};

export default (
  name: string,
  opts: {
    suffix: string | boolean
  } = { suffix: 'nodejs' }
) => {

  if (opts.suffix !== false)
    name += `-${opts.suffix}`;

  if (process.platform === 'darwin') {
    return macos(name);
  }

  if (process.platform === 'win32') {
    return windows(name);
  }

  return linux(name);
};
