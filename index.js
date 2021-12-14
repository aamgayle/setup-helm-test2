"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.getHelmTry = void 0;
const fs = __importStar(require("fs"));
const tc = __importStar(require("@actions/tool-cache"));
const util = __importStar(require("util"));
const core = __importStar(require("@actions/core"));
const child_process_1 = require("child_process");
const getHelmDownloadUrl = 'https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3';
function getHelmTry() {
    return __awaiter(this, void 0, void 0, function* () {
        let getHelmScriptPath;
        try {
            getHelmScriptPath = yield tc.downloadTool(getHelmDownloadUrl);
        }
        catch (e) {
            throw new Error(util.format("Failed to download get_helm.sh from locations: %s", getHelmDownloadUrl));
        }
        fs.chmodSync(getHelmScriptPath, '777');
        console.log("Current getHelmScriptPath === " + getHelmScriptPath);
        var runGetHelmScript = (0, child_process_1.exec)(util.format('bash .%s', getHelmScriptPath), (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
                throw new Error("NOT COMPLETE");
            }
        });
        return "COMPLETE";
    });
}
exports.getHelmTry = getHelmTry;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var e = getHelmTry();
            console.log(e);
        }
        catch (_a) {
            console.log("Try failed!");
        }
    });
}
exports.run = run;
run().catch(core.setFailed);
