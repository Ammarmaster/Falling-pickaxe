// youtube.js
let nextPageToken = "";

async function fetchChat(apiKey, liveChatId) {
  const url = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${apiKey}`;
  const res = await fetch(nextPageToken ? url + `&pageToken=${nextPageToken}` : url);
  const data = await res.json();

  if (data.items) {
    data.items.forEach(msg => {
      const message = msg.snippet.displayMessage.toLowerCase();
      const user = msg.authorDetails.displayName;
      handleChatCommand(message, user);
    });
    nextPageToken = data.nextPageToken;
  }
}

function handleChatCommand(message, user) {
  if (message.includes("tnt")) {
    blocks.push({ x: Math.random() * (canvas.width - 50), y: 0, width: 50, height: 20, color: "red" });
  }
  if (message.includes("nuke")) {
    blocks = [];
  }
  if (message.includes("fast")) {
    for (let i = 0; i < 3; i++) blocks.push(createBlock());
  }
}

async function getLiveChatId(apiKey, channelId, streamId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${streamId}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items?.[0]?.liveStreamingDetails?.activeLiveChatId || null;
}

async function startChatPolling(apiKey, channelId, streamId) {
  const liveChatId = await getLiveChatId(apiKey, channelId, streamId);
  if (!liveChatId) return alert("Invalid Stream ID or no live chat found");
  setInterval(() => fetchChat(apiKey, liveChatId), 4000);
}
