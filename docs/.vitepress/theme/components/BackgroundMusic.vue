<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import playlistSource from 'virtual:xtihc-music-playlist'

const DEFAULT_VOLUME = 0.35

const audio = ref<HTMLAudioElement>()
const isPlaying = ref(false)
const volume = ref(DEFAULT_VOLUME)
const currentIndex = ref(0)
const playlist = playlistSource as string[]

const currentTrack = computed(() => playlist[currentIndex.value])

function trackTitle(track: string) {
  return decodeURIComponent(track.split('/').pop() || track).replace(/\.(ogg|mp3)$/i, '')
}

const trackLabel = computed(() => {
  return currentTrack.value ? trackTitle(currentTrack.value) : ''
})

async function togglePlayback() {
  if (!audio.value) return

  if (audio.value.paused) {
    try {
      await audio.value.play()
    } catch {
      isPlaying.value = false
    }
  } else {
    audio.value.pause()
  }
}

async function selectTrack(index: number, startPlaying: boolean) {
  if (!playlist.length) return

  currentIndex.value = (index + playlist.length) % playlist.length
  await nextTick()

  if (!audio.value) return
  audio.value.load()

  if (startPlaying) {
    try {
      await audio.value.play()
    } catch {
      isPlaying.value = false
    }
  }
}

function playPrevious() {
  return selectTrack(currentIndex.value - 1, true)
}

function playNext() {
  return selectTrack(currentIndex.value + 1, true)
}

function playSelectedTrack() {
  return selectTrack(currentIndex.value, true)
}

function updateVolume() {
  if (audio.value) audio.value.volume = volume.value
  localStorage.setItem('xtihc-music-volume', String(volume.value))
}

onMounted(() => {
  const savedVolume = Number(localStorage.getItem('xtihc-music-volume'))
  if (Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1) {
    volume.value = savedVolume
  }

  if (audio.value) audio.value.volume = volume.value
})
</script>

<template>
  <div v-if="playlist.length" class="background-music" role="group" aria-label="Background music controls">
    <audio
      ref="audio"
      :src="currentTrack"
      preload="metadata"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @ended="playNext"
    />
    <button
      class="background-music__skip"
      type="button"
      aria-label="Previous track"
      title="Previous track"
      @click="playPrevious"
    >
      <span class="background-music__previous" aria-hidden="true" />
    </button>
    <button
      class="background-music__toggle"
      type="button"
      :aria-label="isPlaying ? 'Pause background music' : 'Play background music'"
      :title="isPlaying ? 'Pause background music' : 'Play background music'"
      @click="togglePlayback"
    >
      <span v-if="isPlaying" class="background-music__pause" aria-hidden="true" />
      <span v-else class="background-music__play" aria-hidden="true" />
    </button>
    <button
      class="background-music__skip"
      type="button"
      aria-label="Next track"
      title="Next track"
      @click="playNext"
    >
      <span class="background-music__next" aria-hidden="true" />
    </button>
    <label class="background-music__track" :title="trackLabel">
      <span class="sr-only">Track</span>
      <select v-model.number="currentIndex" aria-label="Background music track" @change="playSelectedTrack">
        <option v-for="(track, index) in playlist" :key="track" :value="index">
          {{ trackTitle(track) }}
        </option>
      </select>
    </label>
    <label class="background-music__volume" title="Volume">
      <span class="sr-only">Volume</span>
      <input
        v-model.number="volume"
        type="range"
        min="0"
        max="1"
        step="0.05"
        aria-label="Background music volume"
        @input="updateVolume"
      >
    </label>
  </div>
</template>
