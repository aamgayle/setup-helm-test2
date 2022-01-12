import * as os from 'os';
import * as util from 'util';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

const HELM_SCRIPT_URL = 'https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3';
const INPUT_VERSION:string = core.getInput('version', { 'required': true });

export async function run() {
    try{
        setupHelmViaShell().then(runHelmScript);
        console.log("COMPLETE");
    } catch(e){
        throw new Error(util.format("Failed to run bash scripts from %s", "getHelmTry()"));
    }
}

export async function setupHelmViaShell(): Promise<void> {
    try{
        await exec.exec('curl', ['-o', 'get_helm.sh', HELM_SCRIPT_URL]);
    } catch (e){
        console.log(`exec error: ${e}`);
    }
    return;
}

export function runHelmScript(){
    let script_path = "./get_helm.sh";

    try{
        exec.exec('chmod', ['700', 'get_helm.sh']);

        if(INPUT_VERSION == "latest"){
            exec.exec(script_path);
        } else {
            INPUT_VERSION[0] !== 'v' ?
                exec.exec(script_path, ['--version', "v" + INPUT_VERSION]) :
                exec.exec(script_path, ['--version', INPUT_VERSION])
        }
    } catch(e){
        console.log(`exec error: ${e}`);
        throw new Error("NOT RUN");
    }
}

run().catch(core.setFailed);