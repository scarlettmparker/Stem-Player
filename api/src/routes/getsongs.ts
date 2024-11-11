import { Router } from 'express';
import { readdirSync, lstatSync } from 'fs';
import path from 'path';

const router = Router();

router.get('/', async (req, res) => {
    const dir = req.query.dir as string;
    const subdirs = getDirs(dir);
    const files = {}

    try {
        subdirs.map((subdir, idx) => {
            files[idx] = getFiles(dir + subdir);
            files[idx].name = subdir;
        });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to read directory.',
            details: (error as Error).message
        });
    }
})

/**
 * Return list of subdirectories in a directory.
 * @param dir Directory to search.
 * @returns List of directories.
 */
function getDirs(dir: string) {
    return readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

/**
 * Return list of all files in all subdirectories of a directory.
 * @param dir Directory to search.
 * @returns List of files in all subdirectories.
 */
function getFiles(dir: string) {
    const files: string[] = [];

    readdirSync(dir).forEach(file => {
        let fpath = path.join(dir, file);
        if (lstatSync(fpath).isDirectory()) {
            files.push(...getFiles(fpath));
        } else {
            files.push(dir + "\\" + file);
        }
    })

    return files;
}

export default router;