"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEnvInJson = exports.makeEnv = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function errorLog(msg) {
    console.log(`dotenv-file-maker: ${msg}`);
}
/**
 * make .env file in specified path
 * @param outputPath path for the .env to be generated
 * @param envListPath path of envList file
 */
async function makeEnv(outputPath, envListPath = './envlist') {
    /**
     * read envListPath
     */
    const resolvedPath = path_1.default.resolve(process.cwd(), envListPath);
    const rawEnv = await promises_1.default
        .readFile(resolvedPath, 'utf-8')
        .catch(() => errorLog('failed reading file'));
    /**
     * parse rawEnv to list
     */
    const envList = rawEnv.split('\n');
    /**
     * write to file
     */
    const toWrite = envList.reduce((prev, curr) => `${prev}\n${curr}=${process.env[curr]}`, '');
    const resolvedOutPath = path_1.default.resolve(process.cwd(), outputPath);
    await promises_1.default.writeFile(resolvedOutPath, toWrite).catch(() => {
        errorLog('failed writing file');
    });
}
exports.makeEnv = makeEnv;
/**
 * make .env file in specified path in JSON format
 * @param outputPath path for the .env to be generated
 * @param envName name for the environment
 * @param envListPath path of envList file
 */
async function makeEnvInJson(outputPath, envName, envListPath = './envList') {
    /**
     * read envListPath
     */
    const resolvedPath = path_1.default.resolve(process.cwd(), envListPath);
    const rawEnv = await promises_1.default
        .readFile(resolvedPath, 'utf-8')
        .catch(() => errorLog('failed reading file'));
    /**
     * parse rawEnv to list
     */
    const envList = rawEnv.split('\n');
    const envObject = envList.reduce((prev, curr) => ({
        ...prev,
        [curr]: process.env[curr],
    }), {});
    const toWrite = JSON.stringify({
        [envName]: envObject,
    });
    const resolvedOutPath = path_1.default.resolve(process.cwd(), outputPath);
    await promises_1.default.writeFile(resolvedOutPath, toWrite).catch(() => {
        errorLog('failed to write data');
    });
}
exports.makeEnvInJson = makeEnvInJson;
