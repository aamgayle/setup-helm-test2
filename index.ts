import * as fs from 'fs';
import * as tc from '@actions/tool-cache';
import * as util from 'util';
import * as core from '@actions/core'
import {exec} from 'child_process';

const getHelmDownloadUrl = 'https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3';
const helmToolName = "helm";
const INPUT_VERSION:string = "x";

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
        exec("curl -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3", (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            runHelmScript();
        });
    } catch (e){
        console.log(`exec error: ${e}`);
    }
    return;
}

export async function runHelmScript(): Promise<void> {
    try{
        exec("chmod 700 get_helm.sh", (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
        });
        if(INPUT_VERSION == "x"){
            exec('./get_helm.sh', (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
            });
        } else {
            exec(`./get_helm.sh --version ${INPUT_VERSION}`, (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
            });
        }
        
    } catch(e){
        console.log(`exec error: ${e}`);
        throw new Error("NOT RUN")
    }
    return;
}

run().catch(core.setFailed);