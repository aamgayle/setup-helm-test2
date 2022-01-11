import * as os from 'os';
import * as util from 'util';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

const HELM_SCRIPT_URL = 'https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3';
const INPUT_VERSION:string = core.getInput('version', { 'required': true });

export async function run() {
    try{
        setupHelmViaShell();
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

export async function runHelmScript(): Promise<void> {
    let install_path = "";
    let script_path = "./get_helm.sh";

    try{
        await exec.exec('chmod', ['700', 'get_helm.sh']);

        if(INPUT_VERSION == "latest"){
            await exec.exec(script_path);
        } else {
            INPUT_VERSION[0] !== 'v' ?
                await exec.exec(script_path, ['--version', "v" + INPUT_VERSION]) :
                await exec.exec(script_path, ['--version', INPUT_VERSION])
        }
    } catch(e){
        console.log(`exec error: ${e}`);
        throw new Error("NOT RUN")
    }
    return;
}

run().catch(core.setFailed);