import * as fs from 'fs';
import * as path from 'path';
import { ProfileHistory } from '../types/profileData';

export function ensureDirectoryExistence(filePath: string): void {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

export function saveProfileData(serverId: string, userId: string, data: ProfileHistory): void {
    const filePath = path.join('data', serverId, `${userId}.json`);
    ensureDirectoryExistence(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

export function loadProfileData(serverId: string, userId: string): ProfileHistory {
    const filePath = path.join('data', serverId, `${userId}.json`);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return {};
}
