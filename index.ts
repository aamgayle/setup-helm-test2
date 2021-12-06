import * as fs from 'fs';
import * as tc from '@actions/tool-cache';
import * as core from '@actions/core'
import {exec} from 'child_process';

// const { exec } = require('child_process');
// const tc = require('@actions/tool-cache');
// const fs = require('fs');

export async function getHelmTry(): Promise<string> {
    const getHelmScriptPath =  await tc.downloadTool('https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3', "./");
    fs.chmodSync("./get_helm.sh", '700');
    var runGetHelmScript = exec(`./get_helm.sh`, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if(error !== null){
        console.log(`exec error: ${error}`);
        return "NOT COMPLETE";
        }
    });

    return "COMPLETE";
}

export async function run() {
    try{
        var e = getHelmTry();
        console.log(e);
    } catch {
        console.log("Try failed!");
    }
}

run().catch(core.setFailed);