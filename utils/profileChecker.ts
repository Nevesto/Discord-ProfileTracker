import { GuildMember } from 'discord.js-selfbot-v13';
import { loadProfileData, saveProfileData } from './fileHandler';
import { ProfileData, ProfileHistory } from '../types/profileData';

export async function trackProfile(member: GuildMember) {
    const serverId = member.guild.id;
    const userId = member.id;

    const currentData: ProfileData = {
        username: member.user.username,
        pfp: member.displayAvatarURL(),
        dates: [new Date().toISOString()],
    };

    const profileHistory: ProfileHistory = loadProfileData(serverId, userId);
    const previousEntries = profileHistory[userId] || [];

    const lastEntry = previousEntries[previousEntries.length - 1];

    if (lastEntry && lastEntry.username === currentData.username && lastEntry.pfp === currentData.pfp) {
        lastEntry.dates.push(new Date().toISOString());
    } else {
        previousEntries.push(currentData);
    }

    profileHistory[userId] = previousEntries;
    saveProfileData(serverId, userId, profileHistory);
}

export async function checkProfiles(guilds: any) {
    const fetchPromises = guilds.map(async (guild: any) => {
        const members = await guild.members.fetch();
        const trackPromises = members.map((member: GuildMember) => trackProfile(member));
        await Promise.all(trackPromises);
    });
    await Promise.all(fetchPromises);
}
