import { Client } from 'discord.js-selfbot-v13';
import 'dotenv/config';
import { checkProfiles } from './utils/profileChecker';

const token = process.env.TOKEN;
const client = new Client();

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    checkProfiles(client.guilds.cache)
        .then(() => console.log('Initial profile check completed.'))
        .catch(console.error);

    setInterval(() => {
        checkProfiles(client.guilds.cache)
            .then(() => console.log('Scheduled profile check completed.'))
            .catch(console.error);
    }, 10 * 60 * 1000);
});

client.login(token);
