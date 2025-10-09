case "mediafire": {
   if (!text) return m.reply(`Contoh:\n${prefix + command} https://www.mediafire.com/file/...`);
   try {
      const url = text.trim();
      const res1 = await fetch("https://staging-mediafire-direct-url-ui-txd2.frontend.encr.app/api/mediafire/taskid", {
         method: "POST",
         headers: {
            "accept": "*/*",
            "content-type": "application/json",
            "accept-language": "id-ID"
         }
      });

      const data1 = await res1.json();
      const taskId = data1.taskId;

      const res2 = await fetch(`https://staging-mediafire-direct-url-ui-txd2.frontend.encr.app/api/mediafire/download/${taskId}`, {
         method: "POST",
         headers: {
            "accept": "*/*",
            "content-type": "application/json",
            "accept-language": "id-ID"
         },
         body: JSON.stringify({ url })
      });

      const data2 = await res2.json();

      if (!data2.downloadUrl) return m.reply("Gagal mengambil link download.");

      let fileName = data2.fileName || "mediafire-file";
      let downloadUrl = data2.downloadUrl;

      let getFile = await fetch(downloadUrl);
      let buffer = await getFile.buffer();

      await mix.sendMessage(m.chat, {
         document: buffer,
         fileName: fileName,
         mimetype: "application/octet-stream"
      }, { quoted: m });

   } catch (e) {
      console.log(e);
      m.reply("Terjadi error saat download file dari MediaFire.");
   }
}
break
