import * as fs from 'fs';
import * as tc from '@actions/tool-cache';
import * as util from 'util';
import * as core from '@actions/core'
import {exec} from 'child_process';

const getHelmDownloadUrl = 'https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3';

export async function run() {
    try{
        var e = getHelmTry();
        console.log(e);
    } catch {
        console.log("Try failed!");
    }
}

export async function getHelmTry(): Promise<string> {
    let getHelmScriptPath;

    try{
        getHelmScriptPath =  await tc.downloadTool(getHelmDownloadUrl);
    } catch(e){
        throw new Error(util.format("Failed to download get_helm.sh from locations: %s", getHelmDownloadUrl))
    }
    
    fs.chmodSync(getHelmScriptPath, '666');
    console.log("Current getHelmScriptPath === " + getHelmScriptPath);
    console.log(fs.existsSync(getHelmScriptPath));
    try{
        console.log(process.cwd());
        exec(util.format('bash %s', getHelmScriptPath), (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
        });
    } catch (e){
        console.log(`exec error: ${e}`);
        throw new Error("NOT COMPLETE");
    }

    return "COMPLETE";
}


run().catch(core.setFailed);