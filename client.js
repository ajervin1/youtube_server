const fs = require('fs')

const ytdl = require('ytdl-core')



async function main () {
	const youtube_url = 'https://www.youtube.com/watch?v=J19MThzOLfY'
	const info = await ytdl.getInfo(youtube_url);
	console.log(info.videoDetails)
	
}


