const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUc0Q0N2VmNEQXFsTXlPWERoY21TN0JFNlVneFVMdDBIYTF4cVhieXdsZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTVwRDl2OFo4dXJKZnNSMDU2aEs1ZHVySUhDdDdkZkM3NzgrRm5LZ2xFbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQ3dLN0tUQzRiVFRxZjRyaHN0WjVCV3NvSnZUZUt4TXR4cUtrdlIra1ZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLa3ZyU3Z2OVAvSDJhMGtqczUwSFNtT043aTlRQklKZ2ZSSTFmVUpsYkIwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJEeTYzUHBmSGdRbmZvQkg3K1o2ZW5icXYxMWl2eTNxWVdWNlg0UlRpRzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im05NFZMOHEzbkdoVHpCYXZ5RnNKNXdoY1JqbkxoTHdaeWQwL1g5L1ludzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNERwTE9rV0xLblowZ1lRNUR2V1hTSm9ScEttK2RNT1ExbGdteGlwcTdGZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0pIVWxkOWlyWlkwWFZ3czZaN01xSUtEV010dUxYNVZodTZnV2ROeHl5Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlMY2l2TDZ0ZVE1enFzeDdSWDBFQ0ZDaExlMWRVbFRWNDBmcVAvMkM0eEdlWDJaVzg0M25Mbm5UUU1VUkpNM1pqZmgwNjZML2YzeHlOLzhhVTQ2YWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzksImFkdlNlY3JldEtleSI6ImdCNzBpT3JRanJwbjVLaUVWaHROTXRUei8rdnFFakNwdzl6OGpJS0hONm89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik5aX3hXRzltUThPSkFNd3RaeVdaV2ciLCJwaG9uZUlkIjoiZjc5MDVjNzctMTIwZC00NDk2LWFkYjgtYzQwNjIyMTlkM2JmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InAyWTV6TVpUU0NuUngzaE8xU3lqT1JJT285MD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFY1dsMURGTXB1eWNaUVR0WFhydDY0V2UxcUk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMUU5WFI2V1giLCJtZSI6eyJpZCI6IjI1MjkwNzAyNzc1Njo1MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwlqOY4Ze34ZGM4ZaH4ZGV4Zep4ZeqS+GXqeKBgiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS21pL3FNQkVMbjZ1YnNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaFh3ODJlSFU1NGhXSUI5dFpNR0F4aWN2eS91TUV5VVMxa0o3NGtlN0xrYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRUtHR3JMOTR3S1pGWnVmMC9BbzN2MTdkRVV6a2o3YWNzcFFDcForanJTaUFzZUdEOFR4YVpFUzV2N1QzSzEwbXMrZXAzNk5ENFZmbUFXMys5a1c4Q0E9PSIsImRldmljZVNpZ25hdHVyZSI6IkFVUUpmMjZuRDBOVGJ1a2FWR0VsMUFPRHNEZlNtSGRrSjU5clIyeEt5QjhHek82dk9rblo5MisvUDRDbE5qSjl3aStEa1dVT052VFE4aEl2Y0Y0dGlBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjUyOTA3MDI3NzU2OjUyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllWOFBObmgxT2VJVmlBZmJXVEJnTVluTDh2N2pCTWxFdFpDZStKSHV5NUgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzUyOTQyNzksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRjFFIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "burcadka MuشAqiبKA",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2520907027756",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
