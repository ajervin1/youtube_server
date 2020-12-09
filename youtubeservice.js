const fs = require('fs')
const path = require('path')
const ytdl = require('ytdl-core')

const youtube_url = 'https://www.youtube.com/watch?v=Rq0ovsiB4MQ'





async function convertYoutubeVideo (youtube_url, media_type = 'mp4') {
	// Based On Media Type Change Extension
	let media_filter
	let ext
	let done = false
	if (media_type == 'mp3') {
		ext = '.mp3'
		media_filter = 'audioonly'
	} else {
		ext = '.mp4'
		media_filter = ''
	}
	// Get Video Info
	const info = await ytdl.getInfo(youtube_url)
	let filename = info.videoDetails.title.slice(0, 5) + ext
	filename = filename.trim()
	// Create File With the filename
	const writable = fs.createWriteStream(filename, { flags: 'w+' })
	// Output
	const readableStream = ytdl(youtube_url, {
		filter: media_filter
	})
	// After Reading File Write To Server
	const stream = readableStream.pipe(writable)
	// This Alerts When Done
	stream.on('finish', function () {
		console.log('finised')
	})
	return filename
}

module.exports = { convertYoutubeVideo }





