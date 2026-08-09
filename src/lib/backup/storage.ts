import fs from "fs";
import path from "path";

const BACKUP_DIR = path.join(process.cwd(), "storage", "backups");

function ensureBackupDir(): string {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  return BACKUP_DIR;
}

export interface BackupFileInfo {
  filename: string;
  sizeBytes: number;
  createdAt: string;
  filePath: string;
}

/**
 * Returns absolute path for a backup file name.
 */
export function getBackupPath(filename: string): string {
  const safeFilename = path.basename(filename);
  return path.join(ensureBackupDir(), safeFilename);
}

/**
 * Saves a backup buffer to the backup storage directory.
 */
export async function saveBackupFile(filename: string, buffer: Buffer): Promise<string> {
  const filePath = getBackupPath(filename);
  await fs.promises.writeFile(filePath, buffer);
  return filePath;
}

// Alias helper as per spec
export const saveBackup = saveBackupFile;

/**
 * Lists all backup files in the backup directory sorted by creation date descending.
 */
export async function listBackupFiles(): Promise<BackupFileInfo[]> {
  ensureBackupDir();
  const files = await fs.promises.readdir(BACKUP_DIR);
  const result: BackupFileInfo[] = [];

  for (const filename of files) {
    if (filename.endsWith(".zip") || filename.endsWith(".json")) {
      const filePath = path.join(BACKUP_DIR, filename);
      const stat = await fs.promises.stat(filePath);
      result.push({
        filename,
        sizeBytes: stat.size,
        createdAt: stat.birthtime.toISOString(),
        filePath,
      });
    }
  }

  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Alias helper as per spec
export const listBackups = listBackupFiles;

/**
 * Reads a backup file buffer by filename.
 */
export async function readBackupFile(filename: string): Promise<Buffer> {
  const filePath = getBackupPath(filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Backup file '${path.basename(filename)}' not found.`);
  }

  return await fs.promises.readFile(filePath);
}

/**
 * Deletes a backup file by filename.
 */
export async function deleteBackupFile(filename: string): Promise<boolean> {
  const filePath = getBackupPath(filename);

  if (fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
    return true;
  }
  return false;
}
