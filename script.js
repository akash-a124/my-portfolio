const isMobile = window.innerWidth < 768;
/* ================= MATRIX ================= */
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(5, 8, 22, 0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0, 247, 255, 0.25)";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i]++;
  }
}

setInterval(draw, 33);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* ================= SECTION FADE ================= */
const sections = document.querySelectorAll("section");

function revealSection() {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < trigger) {
      section.classList.add("show");
    }
  });
}
window.addEventListener("scroll", revealSection);
revealSection();

/* ================= ACTIVE NAV ================= */
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* ================= PARALLAX ================= */
const parallax = document.querySelector(".parallax-layer");

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;
  if (parallax) {
    parallax.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  }
});

/* ================= ADVANCED SCROLL REVEAL ================= */
const revealSections = () => {
  const triggerPoint = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerPoint) {
      section.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealSections);
revealSections();


/* ================= TERMINAL ================= */
const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

if (input) {
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const command = input.value;
      output.innerHTML += `<div>> ${command}</div>`;

      if (command === "whoami") {
        output.innerHTML += "<div>Akash A - Cybersecurity Researcher</div>";
      } else if (command === "skills") {
        output.innerHTML += "<div>Penetration Testing, SIEM, Python, Incident Response</div>";
      } else if (command === "clear") {
        output.innerHTML = "";
      } else {
        output.innerHTML += "<div>Command not recognized.</div>";
      }

      input.value = "";
      output.scrollTop = output.scrollHeight;
    }
  });
}

/* ================= CURSOR GLOW ================= */
const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.15;
  glowY += (mouseY - glowY) * 0.15;

  glow.style.left = glowX + "px";
  glow.style.top = glowY + "px";

  requestAnimationFrame(animateGlow);
}
animateGlow();

/* Glow scale on hover */
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("mouseenter", () => {
    glow.style.transform = "translate(-50%, -50%) scale(1.8)";
  });
  link.addEventListener("mouseleave", () => {
    glow.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

/* ================= SMOOTH SCROLL EASING ================= */
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  });
});

/* ================= SCROLL PROGRESS ================= */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  document.getElementById("scroll-progress").style.width = progress + "%";
});

/* ================= PARTICLE NETWORK ================= */
for (let i = 0; i < 40; i++) {
  const particle = document.createElement("div");
  particle.classList.add("particle");
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.animationDuration = 10 + Math.random() * 20 + "s";
  document.body.appendChild(particle);
}

/* ================= RADAR CLICK ================= */
document.addEventListener("click", e => {
  const ripple = document.createElement("div");
  ripple.classList.add("click-ripple");
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

document.getElementById("ai-assistant").addEventListener("click", () => {
  alert("AI Assistant Coming Soon 😎");
});

/*page transition*/

const wipe = document.querySelector(".page-wipe");

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    wipe.style.transform = "translateY(0)";
    setTimeout(() => {
      wipe.style.transform = "translateY(-100%)";
    }, 600);
  });
});

/* ================= THREE.JS CYBER SPACE ================= */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-container").appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 2000; i++) {
  vertices.push(
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000
  );
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);

const material = new THREE.PointsMaterial({
  color: 0x00f7ff,
  size: 2
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 500;

function animateThree() {
  requestAnimationFrame(animateThree);
  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0004;
  renderer.render(scene, camera);
}

animateThree();

document.addEventListener("mousemove", e => {
  camera.position.x = (e.clientX - window.innerWidth / 2) * 0.002;
  camera.position.y = -(e.clientY - window.innerHeight / 2) * 0.002;
});


window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
/*chatbot*/
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

if (chatInput && chatMessages) {
  chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const msg = chatInput.value.toLowerCase();

      chatMessages.innerHTML += `<div>> ${msg}</div>`;

      let response = "";

      if (msg.includes("services")) {
        response = "I provide penetration testing, vulnerability assessment and security consulting.";
      } else if (msg.includes("skills")) {
        response = "My skills include SIEM tools, Python, incident response and network security.";
      } else if (msg.includes("contact")) {
        response = "You can contact me via email or LinkedIn.";
      } else {
        response = "AI Assistant is currently in demo mode.";
      }

      chatMessages.innerHTML += `<div>AI: ${response}</div>`;
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
}
/*typing booth*/
const intro = document.getElementById("intro-screen");
if (intro) {
  let text = "Initializing Secure Protocol...\nAccessing Encrypted Network...\nAccess Granted ✔";
  let i = 0;

  intro.innerHTML = "";

  function typeBoot() {
    if (i < text.length) {
      intro.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
      i++;
      setTimeout(typeBoot, 40);
    }
  }

  typeBoot();
}

/* ================= PARTICLE NETWORK ================= */

const networkCanvas = document.getElementById("networkCanvas");
const nCtx = networkCanvas.getContext("2d");

networkCanvas.width = window.innerWidth;
networkCanvas.height = window.innerHeight;

let particlesArray = [];
const numParticles = 80;

class Particle {
  constructor() {
    this.x = Math.random() * networkCanvas.width;
    this.y = Math.random() * networkCanvas.height;
    this.size = 2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > networkCanvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > networkCanvas.height) this.speedY *= -1;
  }

  draw() {
    nCtx.fillStyle = "#00f7ff";
    nCtx.beginPath();
    nCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    nCtx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = dx * dx + dy * dy;

      if (distance < 15000) {
        nCtx.strokeStyle = "rgba(0,247,255,0.1)";
        nCtx.lineWidth = 1;
        nCtx.beginPath();
        nCtx.moveTo(particlesArray[a].x, particlesArray[a].y);
        nCtx.lineTo(particlesArray[b].x, particlesArray[b].y);
        nCtx.stroke();
      }
    }
  }
}

function animateNetwork() {
  nCtx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);

  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animateNetwork);
}

initParticles();
animateNetwork();

window.addEventListener("resize", () => {
  networkCanvas.width = window.innerWidth;
  networkCanvas.height = window.innerHeight;
  initParticles();
});

/* ================= EMAILJS CONTACT ================= */
/* ================= EMAILJS CONTACT FIX ================= */

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contact-form");

  if (!form) return; // safety check

  emailjs.init("ti6FxsVrbDXrs05mR"); // replace with your real key

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // 🚨 THIS STOPS PAGE REFRESH

    emailjs.sendForm("service_68j4h85", "ejs-test-mail-service__", this)
      .then(function () {
        alert("Message sent successfully!");
        form.reset();
      })
      .catch(function (error) {
        console.error("EmailJS Error:", error);
        alert("Failed to send message.");
      });

  });

});

/* ================= CERTIFICATE VIEW MODAL ================= */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("cert-modal");
  const modalImg = document.getElementById("cert-modal-img");
  const closeBtn = document.getElementById("close-cert");

  if (!modal || !modalImg) return;

  // support both buttons and anchor links that should open the modal
  document.querySelectorAll(".view-cert-btn, .view-link").forEach(el => {
    el.addEventListener("click", function (e) {
      if (this.tagName.toLowerCase() === 'a') e.preventDefault();
      const src = this.getAttribute("data-img") || this.getAttribute('href');
      if (!src) return;
      modalImg.src = src;
      modal.style.display = "flex";
    });
  });

  // show a console error if image fails to load (helps debug missing file)
  modalImg.addEventListener('error', () => {
    console.error('Certificate image failed to load:', modalImg.src);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

console.log(this.getAttribute("data-img"));









