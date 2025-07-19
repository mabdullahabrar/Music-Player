const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const coverImage = document.getElementById('coverImage');
const nowTitle = document.getElementById('nowTitle');
const nowCategory = document.getElementById('nowCategory');
const searchBar = document.getElementById('searchBar');
const categorySelect = document.getElementById('categorySelect');
const overviewList = document.getElementById('overviewList');
const searchResults = document.getElementById('searchResults');
const libraryList = document.getElementById('libraryList');
const categoryList = document.getElementById('categoryList');
const volumeSlider = document.getElementById('volumeSlider');
const volumePercent = document.getElementById('volumePercent');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');

const navButtons = document.querySelectorAll('.nav-btn');
const mainSections = document.querySelectorAll('.main-section');

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const songs = [
  { title: 'FE!N', src: 'assets/songs/FE!N .mp3', category: 'hiphop', cover: 'assets/covers/fein.jpeg' },
  { title: 'Topia Twins', src: 'assets/songs/TOPIA TWINS .mp3', category: 'hiphop', cover: 'assets/covers/topia twins.jpeg' },
  { title: 'Hyaena', src: 'assets/songs/HYAENA.mp3', category: 'hiphop', cover: 'assets/covers/hayena.jpeg' },
  { title: 'Agency', src: 'assets/songs/Agency .mp3', category: 'desi', cover: 'assets/covers/agency.jpeg' },
  { title: 'Kahani Suno', src: 'assets/songs/kahani suno 2.0.mp3', category: 'desi', cover: 'assets/covers/Kahani Suno 2.0.jpeg' },
  { title: 'Tu Hai Kahan', src: 'assets/songs/Tu Hai Kahan.mp3', category: 'desi', cover: 'assets/covers/tu hai kahan.jpeg' },
  { title: 'Kesariya', src: 'assets/songs/Kesariya .mp3', category: 'lofi', cover: 'assets/covers/Kesariya.jpeg' },
  { title: 'Tum Mile', src: 'assets/songs/Tum Mile .mp3', category: 'lofi', cover: 'assets/covers/Tum Mile.jpeg' },
  { title: 'Chill Vibe', src: 'assets/songs/Chill Type Beat Missing You .mp3', category: 'lofi', cover: 'assets/covers/Chill Type Beat.jpeg' },
  { title: 'Pal Pal', src: 'assets/songs/pal pal .mp3', category: 'romantic', cover: 'assets/covers/pal pal.jpeg' },
  { title: 'Chaleya', src: 'assets/songs/chaleya.mp3', category: 'romantic', cover: 'assets/covers/Chaleya.jpeg' },
  { title: 'Kesariya (Remix)', src: 'assets/songs/Kesariya .mp3', category: 'romantic', cover: 'assets/covers/Kesariya (Lo-Fi Remix).jpeg' },
  { title: 'Brown Munde', src: 'assets/songs/BROWN MUNDE .mp3', category: 'party', cover: 'assets/covers/brown munde.jpeg' },
  { title: 'Insane', src: 'assets/songs/INSANE .mp3', category: 'party', cover: 'assets/covers/insane.jpeg' },
  { title: 'Spectre', src: 'assets/songs/The Spectre .mp3', category: 'party', cover: 'assets/covers/specter.jpeg' }
];

function loadSongList(targetElement, filteredSongs) {
  targetElement.innerHTML = '';
  filteredSongs.forEach((song, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${song.cover}" alt="${song.title}" />
      <h4>${song.title}</h4>
      <p>${song.category}</p>
    `;
    li.addEventListener('click', () => {
      currentSongIndex = songs.indexOf(song);
      playSong();
    });
    targetElement.appendChild(li);
  });
}

function playSong() {
  const song = songs[currentSongIndex];
  audioPlayer.src = song.src;
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸';
  nowTitle.textContent = song.title;
  nowCategory.textContent = song.category;
  coverImage.src = song.cover;
}

function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.textContent = '▶';
  } else {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸';
  }
}

function nextSong() {
  if (isShuffle) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong();
}


function toggleShuffle() {
  isShuffle = !isShuffle;
  const shuffleBtn = document.getElementById("shuffleBtn");
  shuffleBtn.classList.toggle("active", isShuffle);
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  const repeatBtn = document.getElementById("repeatBtn");
  repeatBtn.classList.toggle("active", isRepeat);
}

function setVolume(value) {
  audioPlayer.volume = value;
  volumePercent.textContent = Math.round(value * 100) + '%';
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

audioPlayer.addEventListener('timeupdate', () => {
  progressBar.value = Math.floor(audioPlayer.currentTime);
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

audioPlayer.addEventListener('loadedmetadata', () => {
  progressBar.max = Math.floor(audioPlayer.duration);
  durationEl.textContent = formatTime(audioPlayer.duration);
});

progressBar.addEventListener('input', () => {
  audioPlayer.currentTime = progressBar.value;
});

audioPlayer.addEventListener('ended', () => {
  if (isRepeat) {
    playSong();
  } else {
    nextSong();
  }
});

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const targetId = btn.dataset.target;
    mainSections.forEach(section => {
      section.classList.remove('active');
      if (section.id === targetId) {
        section.classList.add('active');
      }
    });

    if (targetId === 'overview') {
      loadSongList(overviewList, songs);
    } else if (targetId === 'library') {
      loadSongList(libraryList, songs);
    } else if (targetId === 'search') {
      searchBar.value = '';
      loadSongList(searchResults, songs);
    } else if (targetId === 'categories') {
      categorySelect.value = 'all';
      loadSongList(categoryList, songs);
    }
  });
});

searchBar?.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const filtered = songs.filter(song => song.title.toLowerCase().includes(query));
  loadSongList(searchResults, filtered);
});

categorySelect?.addEventListener('change', () => {
  const category = categorySelect.value;
  const filtered = category === 'all' ? songs : songs.filter(song => song.category === category);
  loadSongList(categoryList, filtered);
});

loadSongList(overviewList, songs);
setVolume(1);
volumeSlider.value = 1;

const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
let audioCtx, analyser, source, dataArray, bufferLength;

function initVisualizer() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  source = audioCtx.createMediaElementSource(audioPlayer);

  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  drawVisualizer();
}

function drawVisualizer() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const width = canvas.width;
  const height = canvas.height;

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i];
      ctx.fillStyle = `rgba(29,185,84,0.4)`;
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }
  draw();
}

audioPlayer.addEventListener('play', () => {
  if (!audioCtx) initVisualizer();
});

