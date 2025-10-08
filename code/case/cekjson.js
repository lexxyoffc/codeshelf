case "cekjson": {
 if (!text) return m.reply(example("teks JSON-nya"));

 try {
 const json = JSON.parse(text);
 const pretty = JSON.stringify(json, null, 2);
 m.reply(`✅ JSON valid!\n\nBerikut hasil parse:\n\`\`\`${pretty}\`\`\``);
 } catch (e) {
 m.reply(`❌ JSON tidak valid!\n\nError:\n${e.message}`);
 }
}
break
