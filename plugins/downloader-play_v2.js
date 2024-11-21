import yts from 'yt-search';  

const handler = async (m, { conn, text, usedPrefix, command }) => {  
    if (!text) throw `\`\`\`[ 💛 ] Por favor ingresa un texto. Ejemplo:\n${usedPrefix + command} Did I tell you that I miss you\`\`\``;  

    let search = await yts(text);  
    if (!search.all.length) throw 'No se encontraron resultados.';  

    let isVideo = /video|vid$/i.test(command);  // Asegúrate de que el comando obtenga videos.  
    let { title, views, timestamp, ago, url, thumbnail } = search.all[0];  
    let body = `*⊜─⌈ [🌠] ◜MUSICA◞📀 ⌋─⊜*  

*≡ Título :* » ${title}  
*≡ Views :* » ${views}  
*≡ Duration :* » ${timestamp}  
*≡ Uploaded :* » ${ago}  
*≡ URL :* » ${url}  

# [🌠] Su ${isVideo ? 'Video' : 'Audio'} se está enviando, espere un momento...`;  

    conn.sendMessage(m.chat, {   
        image: { url: thumbnail },   
        caption: body   
    }, { quoted: m });  

    try {  
        let res = await dl_vid(url);  
        let mediaUrl = res.data.mp4;  // Asegúrate de usar el enlace del video.  

        conn.sendMessage(m.chat, {   
            video: { url: mediaUrl },  // Siempre enviar como video.  
            gifPlayback: false,   
            mimetype: "video/mp4"   
        }, { quoted: m });  
    } catch (error) {  
        conn.sendMessage(m.chat, { text: `Error al enviar el video: ${error.message}` }, { quoted: m });  
    }  
};  

handler.command = ['play2'];  // Puedes incluir más comandos aquí si lo deseas.  
handler.help = ['play2'];  
handler.tags = ['descargas'];  
export default handler;  

async function dl_vid(url) {  
    const response = await fetch('https://shinoa.us.kg/api/download/ytdl', {  
        method: 'POST',  
        headers: {  
            'accept': '*/*',  
            'api_key': 'free',  
            'Content-Type': 'application/json'  
        },  
        body: JSON.stringify({ text: url })  
    });  

    if (!response.ok) {  
        throw new Error(`HTTP error! status: ${response.status}`);  
    }  

    return await response.json();  
}