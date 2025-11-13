const wordData = {
  "ありがとう": "arigatou.jpg",
  "こんにちは": "knnnitiha.jpg",
  "さようなら": "syounara.jpg",
  // もっと増やす予定 一旦画像だが動画に変更する 似た単語で他の候補も見れるようにする
};

function showSuggestions() {
  const input = document.getElementById("searchInput").value;
  const suggestionsDiv = document.getElementById("suggestions");
  suggestionsDiv.innerHTML = "";

  if (input === "") return;

  const matches = Object.keys(wordData).filter(word => word.includes(input));
  if (matches.length === 0) {
    suggestionsDiv.textContent = "候補が見つかりませんでした。";
    return;
  }

  matches.forEach(match => {
    const div = document.createElement("div");
    div.textContent = match;
    div.onclick = () => {
      document.getElementById("searchInput").value = match;
      searchWord();
    };
    suggestionsDiv.appendChild(div);
  });
}

function searchWord() {
  const word = document.getElementById("searchInput").value;
  const result = document.getElementById("result");
  const image = document.getElementById("signImage");

  if (wordData[word]) {
    result.textContent = `選択された単語：${word}`;
    image.src = `images/${wordData[word]}`;
    image.style.display = "block";
    image.onerror = () => {
      image.style.display = "none";
      result.textContent = `「${word}」の動画が見つかりませんでした。`;
    };
  } else {
    result.textContent = `「${word}」は見つかりませんでした。`;
    image.style.display = "none";
  }
}

function bookmarkWord() {
  const word = document.getElementById("searchInput").value;
  if (!word || !wordData[word]) return;

  let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  if (!bookmarks.includes(word)) {
    bookmarks.push(word);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    alert(`「${word}」をブックマークしました！`);
  } else {
    alert(`「${word}」をブックマーク済みです。`);
  }
}

function showBookmarks() {
  const list = document.getElementById("bookmarkList");
  const image = document.getElementById("signImage");
  const result = document.getElementById("result");

  image.style.display = "none";
  result.textContent = "選択された単語：なし";

  // ブックマーク一覧を表示
  list.innerHTML = "";
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  bookmarks.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    li.onclick = () => {
      document.getElementById("searchInput").value = word;
      searchWord();
    };
    list.appendChild(li);
  });
}
