const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTURvMHhvOEpaT1oxUzZQZllDWFkvUTZXTFlIVUNraUNLUHRxRjcyNzJHOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiakR1d1FzQWZXS2RvdFM4RllISVpHblZGNzllTDFRSFNDU1BXU0hTeTJqVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrQjRWOGlqOUw2WFdLWkN5VDh1ZldGZTlZdHJjd2pCM1BZZnhHZGlnUEZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2VGlkM0wyR2VWVXp6NldmL0MyT2NrVFovZkZ2bFg0VVZNcCt5Y0hBQmlzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlBeUUwV2s0UDFZelNLSndKZjJEMi83cVBLNUlNOXJVOWVrbHdEY2FDWDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpPbEdINjY0Wm1qa2lWVWNBdmRhOFJwc0VCYU9wYVVVUlhMbjVhdmtBV3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUFNMFZFZ0Q2SjU2dlNDbHpkaG9CWUxvOW15aFFZUmxITWh5U29kdDFuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1pja0U0OWxPQUhBZytOYnQ3NFprelRwMG1wSVVnWFBtTlNvRUM4UDAxdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRnQlJPNDZCQVZYbzcrR2toclYvTHZjZWVxNElSTXlGdndHbGFkLzlMN3lvWHpGTldMTmV3V2R0dS9YNk5oSVZpQXZhb2F5djM2eW1uMFpXQU40c2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE5LCJhZHZTZWNyZXRLZXkiOiJFT2hiMVl1eFJZV3J1YUNjQS83b2hsSUFqM1ZkQUg4aGcxb2xxbGVhRUtVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI4eVJQZDJfcVJzLVJDU0RsTXc0SUhnIiwicGhvbmVJZCI6Ijc0YWI3ZTU2LTZlM2UtNDM1My1hMTVkLTM1NjU3NGRlODYyZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzV1RBVzl4TlZGWVI0aC9BcVFZeHA3Ni9ia0k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0ZRTWY1a0cyalVyNkV2U0w2MEYwcnhQa3NjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZQNE1RWDhLIiwibWUiOnsiaWQiOiIyMzQ3MDM0MzEzODgzOjQwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlQuY29tIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOSC8zdTBDRU5TOXBMWUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIvV0pVSDhBUVBicFNQaGlSWHN2ZHNzNGdaSU5FSkIvTmxyWDJ5d3E4bnpnPSIsImFjY291bnRTaWduYXR1cmUiOiJvQnFvbW5NRXdjaW42RmhxV3FtckdFVE5DVzduUTJQcHdvQlJJV3JWTXlHbzRtYmZxaXFFU1EraDRQclpkWDV2ZkNxaGpiZGEyNHRJVUtzNXhRQnlCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiN0lFY3BBS3lUaXNKd0VZRDZ2Q0NQVlhQUFZ3K0EwOWpjWTJ5OEtQcFdtcjhYeEkwY3hLWTBhWEhXM0Fia2lQdGVCYzZOc1NxbTJmVUJOMWdXNHdialE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDM0MzEzODgzOjQwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmYxaVZCL0FFRDI2VWo0WWtWN0wzYkxPSUdTRFJDUWZ6WmExOXNzS3ZKODQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ0NTY2NzMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS09MIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Taiwo",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2347034313883", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'T.com',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
