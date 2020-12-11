import * as  fs from 'fs';
import * as path from 'path';
import * as ytdl from 'ytdl-core'




async function convertReadable(readable) {
	let result = '';
	const rs = fs.createReadStream('./videos/big.mp4');
	for await (const chunk of rs) {
		result += chunk;
	}
	return result;
}


export async function convertVideo(youtubeurl) {
	// Get All Video Info
	const info = await ytdl.getInfo(youtubeurl);
	const readable = ytdl.downloadFromInfo(info);
	// Done Reading
	// Write To File
	
	let filename = info.videoDetails.title.slice(0, 10) + '.mp4'
	filename = filename.trim()
	const ws = fs.createWriteStream(filename);
	readable.pipe(ws);
	// Done Wrting
	const promise = new Promise(( resolve => {
		ws.on('finish', () => {
			resolve(filename);
		})
	} ));
	return promise;
}


export async function convertAudio(youtubeurl) {
	const info = await ytdl.getInfo(youtubeurl);
	const readable = ytdl.downloadFromInfo(info, {
		filter: 'audioonly',
		quality: 'highestaudio'
	});
	let filename = info.videoDetails.title.slice(0, 10) + '.mp3'
	filename = filename.trim()
	const ws = fs.createWriteStream(filename);
	readable.pipe(ws);
	// Done Wrting
	const promise = new Promise(( resolve => {
		ws.on('finish', () => {
			resolve(filename);
		})
	} ));
	return promise;
}




// Testing

const youtube_url = 'https://www.youtube.com/watch?v=4bP8wbt4SeA';

async function run() {
	const res = await convertAudio(youtube_url);
	console.log(res)
}


