const fs = require('fs');
const cp = require('child_process');

const { exec } = cp;

exec('mkdir node_modules');

if (!fs.existsSync('./node_modules/modules')) {
    exec('cd node_modules && ln -sf ../libs modules', (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
        }
    });
}
