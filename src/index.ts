import fs from 'fs/promises';
import path from 'path';

function errorLog(msg: string) {
  console.log(`dotenv-file-maker: ${msg}`);
}

/**
 * make .env file in specified path
 * @param outputPath path for the .env to be generated
 * @param envListPath path of envList file
 */
export async function makeEnv(
  outputPath: string,
  envListPath = './envlist'
): Promise<void> {
  /**
   * read envListPath
   */
  const resolvedPath = path.resolve(process.cwd(), envListPath);
  const rawEnv = await fs
    .readFile(resolvedPath, 'utf-8')
    .catch(() => errorLog('failed reading file'));

  /**
   * parse rawEnv to list
   */
  const envList = (rawEnv as string).split('\n');

  /**
   * write to file
   */
  const toWrite = envList.reduce<string>(
    (prev, curr) => `${prev}\n${curr}=${process.env[curr]}`,
    ''
  );

  const resolvedOutPath = path.resolve(process.cwd(), outputPath);
  await fs.writeFile(resolvedOutPath, toWrite).catch(() => {
    errorLog('failed writing file');
  });
}

/**
 * make .env file in specified path in JSON format
 * @param outputPath path for the .env to be generated
 * @param envName name for the environment
 * @param envListPath path of envList file
 */
export async function makeEnvInJson(
  outputPath: string,
  envName: string,
  envListPath = './envList'
): Promise<void> {
  /**
   * read envListPath
   */
  const resolvedPath = path.resolve(process.cwd(), envListPath);
  const rawEnv = await fs
    .readFile(resolvedPath, 'utf-8')
    .catch(() => errorLog('failed reading file'));

  /**
   * parse rawEnv to list
   */
  const envList = (rawEnv as string).split('\n');

  const envObject = envList.reduce<Record<string, string>>(
    (prev, curr) => ({
      ...prev,
      [curr]: process.env[curr] as string,
    }),
    {}
  );

  const toWrite = JSON.stringify({
    [envName]: envObject,
  });

  const resolvedOutPath = path.resolve(process.cwd(), outputPath);
  await fs.writeFile(resolvedOutPath, toWrite).catch(() => {
    errorLog('failed to write data');
  });
}
