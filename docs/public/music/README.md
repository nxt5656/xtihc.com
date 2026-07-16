# Background music playlist

Place all Ogg or MP3 files in this directory, including any subdirectories. The build scans every
`.ogg` and `.mp3` file, sorts the filenames, and exposes them as the site's background-music playlist.

For example, `docs/public/music/01-intro.ogg` is published at `/music/01-intro.ogg`.
After adding or removing tracks, restart the local development server or run a new production
build so the playlist is regenerated.
