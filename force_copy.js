
import fs from 'fs';
import path from 'path';

const source = "C:\\Users\\Cornelius Debpuur\\.gemini\\antigravity\\brain\\97a95dd7-1305-4d31-b6eb-1f5066679063\\terra_bite_final_flyer_1765439138323.png";
const dest = "c:\\Users\\Cornelius Debpuur\\Desktop\\Web Projects\\Branded By Winni\\public\\projects\\terra-bite-flyer-v3.png";

console.log(`Copying from ${source} to ${dest}`);

try {
    fs.copyFileSync(source, dest);
    console.log("Success!");
} catch (e) {
    console.error("Error:", e);
}
