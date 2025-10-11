const handler = async (msg, { conn }) => {
  const chatId  = msg.key.remoteJid;
  const prefijo = global.prefixes?.[0] || ".";

  await conn.sendMessage2(chatId, { react: { text: "🧩", key: msg.key } }, msg);

  const todosLosComandos = [
    ...new Set(
      (global.plugins || [])
        .flatMap(p => {
          const c = p?.command;
          if (!c) return [];
          const arr = Array.isArray(c) ? c : [c];
          return arr.filter(x => typeof x === "string");
        })
    )
  ].sort((a, b) => a.localeCompare(b));

  const total = todosLosComandos.length;

  const caption = ` xtayrusx bot

🔧 *Total comandos activos:* ${total}
🔑 *Prefijo actual:* ${prefijo}

📦 *Lista de comandos:*
${todosLosComandos.map(c => `➤ ${prefijo}${c}`).join("\n")}
  
💫 *xtayrusx WhatsApp*
`.trim();

  return conn.sendMessage2(chatId, {
    video: { url: "https://cdn.russellxz.click/d2f2ff66.mp4" },
    caption
  }, msg);
};

handler.command = ["allmenu"];
handler.help = ["allmenu"];
handler.tags = ["menu"];

module.exports = handler;
