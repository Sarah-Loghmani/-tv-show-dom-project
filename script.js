alert("Turn on your vpn");
// console.log(search);

const getShow = async function () {
  const search = document.querySelector("#search"); //input
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
    const p2 = document.createElement("p");
    const a = document.createElement("a");
    const main = document.querySelector("main");

    img.src = ep.image.medium;
    figcaption.innerText = ep.name;
    p.textContent = ep.summary.replaceAll("<p>", "").replaceAll("</p>", "");
    p.style.fontSize = "0.8rem";
    p.style.textAlign = "justify";
    p.style.margin = "1rem";
    // p.style.marginTop = "0";
    a.href = ep.url;
    a.target = "_blank";

    // ----adding the number of episodes under the imgs.-----
    if (ep.season < 10 && ep.number < 10) {
      p2.textContent = `S0${ep.season}E0${ep.number}`;
    } else if (ep.season >= 10 && ep.number >= 10) {
      p2.textContent = `S${ep.season}E${ep.number}`;
    } else if (ep.season < 10 && ep.number >= 10) {
      p2.textContent = `S0${ep.season}E${ep.number}`;
    } else if (ep.season >= 10 && ep.number < 10) {
      p2.textContent = `S${ep.season}E0${ep.number}`;
    }

    a.append(figcaption);
    figure.append(img, a, p2);
    card.append(figure, p);
    container.appendChild(card);
    container.classList.add("flex");
    main.append(container);
  });

  //-----------------search input---------------------
  const cards = document.querySelectorAll(".card");

  search.addEventListener("keyup", (e) => {
    console.log(e.target.value);

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
        episodeOption = `S0${ep.season}E0${ep.number} `;
      } else if (ep.season >= 10 && ep.number >= 10) {
        episodeOption = `S${ep.season}E${ep.number} `;
      } else if (ep.season < 10 && ep.number >= 10) {
        episodeOption = `S0${ep.season}E${ep.number} `;
      } else if (ep.season >= 10 && ep.number < 10) {
        episodeOption = `S${ep.season}E0${ep.number} `;
      }

      const option = document.createElement("option");
      option.textContent = episodeOption;
      episodeList.appendChild(option);
    });
  };
  selectOptions();

  // --------------match the episode after selecting-----------
  episodeList.addEventListener("change", (e) => {
    console.log(e.target.value);
    cards.forEach((card) => {
      const epNum = card.children[0].children[2].innerText;

      if (e.target.value === "") {
        cards.forEach((card) => {
          card.style.display = "block";
        });
      } else if (epNum === e.target.value) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
};
getShow();
