const search = document.querySelector("#search"); //input
// console.log(search);

const getShow = async function() {
  const container = document.createElement("div"); //div

  // ------------API API API API API API API API API------------
  const response = await axios("https://api.tvmaze.com/shows/82/episodes");
  const episodes = response.data;
  console.log(episodes);

  // --------------------created cards-------------------------
    episodes.forEach((ep) => {
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      const figure = document.createElement("figure");
      const card = document.createElement("div");
      card.classList.add('card')
      const p = document.createElement("p");

      img.src = ep.image.medium;
      figcaption.innerText = ep.name;
      p.textContent = ep.summary;

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
        }else{
          card.style.display = "block"
        };
    });
  });

};
getShow();

