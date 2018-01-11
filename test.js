import {
  dirname
} from 'path';

import test from 'ava';
import m from './dist';

test('default', t => {
	const name = 'unicorn';
	const paths = m(name);

	Object.keys(paths).forEach(key => {
		const val = paths[key];
		console.log(`  ${key}: ${val}`);
		if (process.platform === 'win32' && key !== 'temp') {
      // Special case for win32
			t.true(dirname(val).endsWith(`${name}-nodejs`));
		} else {
			t.true(val.endsWith(`${name}-nodejs`));
		}
	});
});

test('custom suffix', t => {
	const name = 'unicorn';
	const opts = {
		suffix: 'horn'
	};
	const paths = m(name, opts);
	if (process.platform === 'win32') {
		t.true(dirname(paths.data).endsWith(`${name}-${opts.suffix}`));
	} else {
		t.true(paths.data.endsWith(`${name}-${opts.suffix}`));
	}
});

test('no suffix', t => {
	const name = 'unicorn';
	const opts = {
		suffix: false
	};
	const paths = m(name, opts);
	if (process.platform === 'win32') {
		t.true(dirname(paths.data).endsWith(name));
	} else {
		t.true(paths.data.endsWith(name));
	}
});

if (process.platform === 'linux') {
	test('correct paths with XDG_*_HOME set', t => {
		const envVars = {
			data: 'XDG_DATA_HOME',
			config: 'XDG_CONFIG_HOME',
			cache: 'XDG_CACHE_HOME',
			log: 'XDG_STATE_HOME'
		};

		Object.values(envVars).forEach(env => {
			process.env[env] = `/tmp/${env}`;
		});

		const name = 'unicorn';
		const paths = m(name);

		Object.keys(envVars).forEach(env => {
			const expectedPath = process.env[envVars[env]];
			t.true(paths[env].startsWith(expectedPath) && paths[env].endsWith(`${name}-nodejs`));
		});
	});
}
