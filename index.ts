import * as fs from 'fs';
import * as tc from '@actions/tool-cache';
import * as util from 'util';
import * as core from '@actions/core'
import {exec} from 'child_process';

const getHelmDownloadUrl = 'https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3';
const helmToolName = "helm";
const INPUT_VERSION:string = core.getInput('version', {required: true});

export async function run() {
    let helmPath;

    // try{
    //     var e = getHelmTry();
    //     console.log("testing");
    //     console.log(e);
    // } catch {
    //     console.log("Try failed!");
    // }

    // try{
    //     helmPath = tc.find(helmToolName, 'v.3.7.2');
    //     console.log("This is the helmPath " + helmPath);
    //     await exec("helm version", (error, stdout, stderr) => {
    //         console.log(stdout);
    //         console.log(stderr);
    //     });
    // } catch (e) {
    //     console.log("error while trying to find helm path");
    //     throw new Error("HELM PATH CANNOT BE FOUND");
    // }

    // exec('ls', (error, stdout, stderr) => {
    //     console.log(stdout);
    //     console.log(stderr);
    // });
    try{
        runHelmScript();
        console.log("COMPLETE");
    } catch(e){
        throw new Error(util.format("Failed to run bash scripts from %s", "getHelmTry()"));
    }
}

export async function downloadHelmScript(): Promise<string> {
    let getHelmScriptPath;

    try{
        console.log(process.cwd());
        exec("curl -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3", (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            runHelmScript();
        });
    } catch (e){
        console.log(`exec error: ${e}`);
        throw new Error("NOT DOWNLOADED");
    }
    return "Proceed";
}

export async function runHelmScript(): Promise<void> {
    let results = await downloadHelmScript();
    try{
        exec("chmod 700 get_helm.sh", (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
        });
        exec(`
        if [ $version == "x" ] 
        then 
            ./get_helm.sh
        else 
            ./get_helm.sh --version v3.6.0
        fi `, (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
        });
        
    } catch(e){
        console.log(`exec error: ${e}`);
        throw new Error("NOT RUN")
    }
}
// export async function getHelmTry(): Promise<string> {
//     let getHelmScriptPath;

//     try{
//         getHelmScriptPath =  await tc.downloadTool(getHelmDownloadUrl, "./");
//     } catch(e){
//         throw new Error(util.format("Failed to download get_helm.sh from locations: %s", getHelmDownloadUrl));
//     }
    
//     fs.chmodSync(getHelmScriptPath, '755');
//     console.log("Current getHelmScriptPath === " + getHelmScriptPath);
//     console.log(fs.existsSync(getHelmScriptPath));
//     try{
//         console.log(process.cwd());
//         if(INPUT_VERSION != 'v'){
//             exec(util.format('bash %s --v %s', getHelmScriptPath, INPUT_VERSION), (error, stdout, stderr) => {
//                 console.log(stdout);
//                 console.log(stderr);
//             });
//         } else {
//             exec(util.format('bash %s', getHelmScriptPath), (error, stdout, stderr) => {
//                 console.log(stdout);
//                 console.log(stderr);
//             });
//         }

//     } catch (e){
//         console.log(`exec error: ${e}`);
//         throw new Error("NOT COMPLETE");
//     }
    
//     return "COMPLETE";
// }

//curl -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
// chmod 700 get_helm.sh
// if [ $version == "x" ] 
// then 
//   ./get_helm.sh
// else 
//   ./get_helm.sh --version $version
// fi 
run().catch(core.setFailed);