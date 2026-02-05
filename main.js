const data = {
  barrel: {
    title: "Дървена цев",
    text: "Издълбана от масивно черешово дърво. Формата е груба и несиметрична.",
    video: "https://www.youtube.com/embed/ТВОЕТО_ID"
  },
  bands: {
    title: "Железни обръчи",
    text: "Металните обръчи намаляват риска от разцепване при изстрел."
  }
};

function selectPart(key) {
  const part = data[key];
  document.getElementById("title").innerText = part.title;
  document.getElementById("text").innerText = part.text;

  const media = document.getElementById("media");
  media.innerHTML = "";

  if (part.video) {
    media.innerHTML = `
      <iframe width="100%" height="220"
        src="${part.video}"
        allowfullscreen></iframe>`;
  }
}
