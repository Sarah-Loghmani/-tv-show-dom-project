
const searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const container = document.querySelector("#container");
//   console.log(container.children);
  if(container.children){
      const imgs = container.children
      for(let img of imgs){
         img.remove()
      }
  }

  const topic = searchForm.elements.topic.value;
  const config = { params: { q: topic } };

  const response = await axios.get(
    "https://api.tvmaze.com/search/shows",
    config);

  getImage(response.data, container);

  searchForm.elements.topic.value = "";
//   console.log(container);
});

const getImage = (serials, div) => {
    
    serials.forEach((ser) => {

        if(ser.show.image){
            const img = document.createElement("img");
            img.src = ser.show.image.medium
            div.append(img)
        }else{
            div.textContent = "There is not any result"
        }
    });
};
