const fs = require('fs')
const path = require('path')
const ytdl = require('ytdl-core')
const FileType = require('file-type')
var ffmpeg = require('ffmpeg')

// Convert Video
async function convertVideo (youtubeurl) {
	// Get All Video Info
	const info = await ytdl.getInfo(youtubeurl)
	const readable = ytdl.downloadFromInfo(info)
	// Done Reading
	// Write To File
	
	let filename = info.videoDetails.title.slice(0, 20) + '.mp4';
	
	filename = filename.replace(/ /g, '_' );
	const ws = fs.createWriteStream(filename)
	readable.pipe(ws)
	// Done Wrting
	const promise = new Promise((resolve => {
		ws.on('finish', () => {
			resolve(filename)
		})
	}))
	return promise
}

// Convert Audio
async function convertAudio (youtubeurl) {
	const info = await ytdl.getInfo(youtubeurl)
	const readable = ytdl.downloadFromInfo(info, {
		filter: 'audioonly',
		quality: 'highestaudio',
	})
	const filetype = await FileType.fromStream(readable)
	console.log(filetype)
	let filename = info.videoDetails.title.slice(0, 10) + '.mp3'
	filename = filename.trim()
	const ws = fs.createWriteStream(filename)
	readable.pipe(ws)
	// Done Wrting
	const promise = new Promise((resolve => {
		ws.on('finish', () => {
			console.log('done')
			resolve(filename)
		})
	}))
	return promise
}


async function extractAudio (videopath) {
	var video = await new ffmpeg(videopath)
	const audio_file = await video.fnExtractSoundToMP3(videopath.replace(/mp4/, 'mp3'))
	console.log(audio_file)
}




async function run (youtubeurl = 'https://www.youtube.com/watch?v=RsEZmictANA') {
	

	console.log(audio)
	
}




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

module.exports = { convertYoutubeVideo, convertAudio, convertVideo, extractAudio }

// Testing



