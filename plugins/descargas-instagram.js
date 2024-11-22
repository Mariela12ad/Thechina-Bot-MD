
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let mssg = {
    useCmd: 'Usa el comando correctamente',
    error: 'Error al descargar el archivo',
    result: 'Archivo descargado con éxito'
  }

  if (!args[0]) throw `✳️ ${mssg.useCmd}\n *${usedPrefix + command}* (link unavailable)`
  try {
    let res = await fetch(global.API('fgmods', '/api/downloader/igdl', { url: args[0] }, 'apikey'))
    if (res.status !== 200) throw `❎ ${mssg.error} `
    let data = await res.json()
    for (let item of data.result) {
      conn.sendFile(m.chat, item.url, 'igdl.jpg', `✅ ${mssg.result}`, m)
    }
  } catch (error) {
    m.reply(`❎ ${mssg.error}`)
  }
}

handler.help = ['instagram <link ig>']
handler.tags = ['dl']
handler.command = ['ig', 'igdl', 'instagram', 'igimg', 'igvid']
handler.diamond = true

export default handler
