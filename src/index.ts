import fs from 'fs/promises';

function errorLog(msg: string) {
  console.log(`dotenv-file-maker: ${msg}`);
}

type As = 'normal' | 'inJson';

/**
 * make .env file in specified path
 * @param path path for the .env to be generated
 * @param envListPath path of envList file
 * @param as { As } what format the generated file should be
 */
export default async function (
  path: string,
  envListPath = './envlist',
  as: As = 'normal'
): Promise<void> {
  /**
   * read envListPath
   */
  const rawEnv = await fs
    .readFile(envListPath, 'utf-8')
    .catch(() => errorLog('failed reading file'));

  /**
   * parse rawEnv to list
   */
  const envList = (rawEnv as string).split('\n');

  /**
   * TODO: make .env write option depends on the format
   */
}
