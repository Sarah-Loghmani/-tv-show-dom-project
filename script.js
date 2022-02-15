const search = document.querySelector("#search"); //input
// console.log(search);

const getShow = async function () {
  const container = document.createElement("div"); //div

  // ------------API API API API API API API API API------------
  const response = await axios("https://api.tvmaze.com/shows/82/episodes");
  const episodes = response.data;
  console.log(episodes);

  // --------------------create cards-------------------------
  episodes.forEach((ep) => {
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    const figure = document.createElement("figure");
    const card = document.createElement("div");
    card.classList.add("card");
    const p = document.createElement("p");

    img.src = ep.image.medium;
    figcaption.innerText = ep.name;
    p.textContent = ep.summary.replaceAll("<p>", "").replaceAll("</p>", "");
    p.style.fontSize = "0.8rem";

    figure.append(img, figcaption);
    card.append(figure, p);
    container.appendChild(card);
    container.classList.toggle("flex");
    document.body.appendChild(container);
  });

  //-----------------search input---------------------
  search.addEventListener("keyup", (e) => {
    console.log(e.target.value);

    const cards = document.querySelectorAll(".card");
    console.log(cards);

    let searchInput = e.target.value.toLowerCase();

    cards.forEach((card) => {
      if (!card.textContent.toLowerCase().includes(searchInput)) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
      }
    });
  });

  // --------------------------episodeList-------------------
  const episodeList = document.getElementById("episodeList");

  const selectOptions = () => {
    episodes.forEach((ep) => {
      let episodeOption = "";

      if (ep.season < 10 && ep.number < 10) {
        episodeOption = `S0${ep.season}E0${ep.number}`;
      } else if (ep.season >= 10 && ep.number >= 10) {
        episodeOption = `S${ep.season}E${ep.number}`;
      } else if (ep.season < 10 && ep.number >= 10) {
        episodeOption = `S0${ep.season}E${ep.number}`;
      } else if (ep.season >= 10 && ep.number < 10) {
        episodeOption = `S${ep.season}E0${ep.number}`;
      }

      const option = document.createElement("option");
      option.textContent = episodeOption;
      episodeList.appendChild(option);
    });
  };
  selectOptions();
};
getShow();
