import * as fs from 'fs';
import * as tc from '@actions/tool-cache';
import {exec} from 'child_process';

// const { exec } = require('child_process');
// const tc = require('@actions/tool-cache');
// const fs = require('fs');

async function getHelmTry(): Promise<string> {
    const getHelmScriptPath =  await tc.downloadTool('https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3');
    fs.chmodSync(getHelmScriptPath, '700');
    var runGetHelmScript = exec('./get_helm.sh help', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if(error !== null){
        console.log(`exec error: ${error}`)
    }
    });

    return "COMPLETE";
}


console.log(getHelmTry());