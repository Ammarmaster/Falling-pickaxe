// game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let blocks = [];
let score = 0;
let gameRunning = false;

function randomColor() {
  const colors = ["#00ffcc", "#00ffaa", "#00ffff", "#00dddd"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createBlock() {
  return {
    x: Math.random() * (canvas.width - 50),
    y: -20,
    width: 50,
    height: 20,
    color: randomColor()
  };
}

function drawBlock(block) {
  ctx.fillStyle = block.color;
  ctx.fillRect(block.x, block.y, block.width, block.height);
}

function updateBlocks() {
  blocks.forEach(block => (block.y += 3));
  blocks = blocks.filter(block => block.y < canvas.height);
}

function drawPickaxe() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(canvas.width / 2 - 25, canvas.height - 30, 50, 20);
}

function drawScore() {
  ctx.fillStyle = "#00ffaa";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  if (!gameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.03) blocks.push(createBlock());
  updateBlocks();
  blocks.forEach(drawBlock);
  drawPickaxe();
  drawScore();
  requestAnimationFrame(gameLoop);
}

function startGame() {
  const apiKey = document.getElementById("apiKey").value;
  const channelId = document.getElementById("channelId").value;
  const streamId = document.getElementById("streamId").value;
  if (!apiKey || !channelId || !streamId) {
    alert("Please fill all fields");
    return;
  }
  gameRunning = true;
  gameLoop();
  startChatPolling(apiKey, channelId, streamId);
}
