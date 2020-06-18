/**
 * make .env file in specified path
 * @param outputPath path for the .env to be generated
 * @param envListPath path of envList file
 */
export declare function makeEnv(outputPath: string, envListPath?: string): Promise<void>;
/**
 * make .env file in specified path in JSON format
 * @param outputPath path for the .env to be generated
 * @param envName name for the environment
 * @param envListPath path of envList file
 */
export declare function makeEnvInJson(outputPath: string, envName: string, envListPath?: string): Promise<void>;
