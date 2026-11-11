const contactForm = document.querySelector("#contact-form");
const soundToggle = document.querySelector("#sound-toggle");
const portraitReveal = document.querySelector(".portrait-reveal");
const aboutPhoto = document.querySelector("#about-photo-card");
let soundsEnabled = true;
let audioContext;

function playWhimsyChime() {
  if (!soundsEnabled) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext ||= new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume();

  const start = audioContext.currentTime;
  [
    { frequency: 1046.5, offset: 0 },
    { frequency: 1568, offset: 0.065 },
  ].forEach(({ frequency, offset }) => {
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();
    const noteStart = start + offset;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, noteStart);
    volume.gain.setValueAtTime(0.0001, noteStart);
    volume.gain.exponentialRampToValueAtTime(0.035, noteStart + 0.012);
    volume.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.22);
    oscillator.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteStart + 0.23);
  });
}

function playShineChime() {
  if (!soundsEnabled) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext ||= new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume();

  const start = audioContext.currentTime;
  [
    { frequency: 1318.5, offset: 0 },
    { frequency: 1568, offset: 0.075 },
    { frequency: 2093, offset: 0.15 },
  ].forEach(({ frequency, offset }) => {
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();
    const noteStart = start + offset;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, noteStart);
    volume.gain.setValueAtTime(0.0001, noteStart);
    volume.gain.exponentialRampToValueAtTime(0.028, noteStart + 0.018);
    volume.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.42);
    oscillator.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteStart + 0.43);
  });
}

soundToggle.addEventListener("click", () => {
  soundsEnabled = !soundsEnabled;
  soundToggle.setAttribute("aria-pressed", String(soundsEnabled));
  soundToggle.textContent = soundsEnabled ? "♫ Sound on" : "♫ Sound off";
  soundToggle.setAttribute("aria-label", soundsEnabled ? "Turn click sounds off" : "Turn click sounds on");
});

portraitReveal.addEventListener("click", () => {
  const isRevealed = aboutPhoto.classList.toggle("is-revealed");
  portraitReveal.setAttribute("aria-expanded", String(isRevealed));
  portraitReveal.querySelector(".reveal-label").innerHTML = isRevealed
    ? "Hide portrait"
    : "Tap to reveal<br>my portrait";
  if (isRevealed) playShineChime();
  else playWhimsyChime();
});

document.addEventListener("click", (event) => {
  if (event.target.closest("a, button") && !event.target.closest(".portrait-reveal")) playWhimsyChime();
});

const typedIntro = document.querySelector(".typed-intro");
const introText = typedIntro.textContent;
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typedIntro.textContent = introText;
} else {
  typedIntro.textContent = "";
  let character = 0;
  const typingTimer = window.setInterval(() => {
    typedIntro.textContent += introText[character];
    character += 1;
    if (character >= introText.length) {
      window.clearInterval(typingTimer);
      document.querySelector(".typing-caret").classList.add("typing-complete");
    }
  }, 23);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const sender = String(formData.get("name")).trim();
  const senderEmail = String(formData.get("email")).trim();
  const message = String(formData.get("message")).trim();
  const subject = encodeURIComponent(`A little note from ${sender}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${sender}\nEmail: ${senderEmail}`);
  window.location.href = `mailto:alyannafeleo20@gmail.com?subject=${subject}&body=${body}`;
});
