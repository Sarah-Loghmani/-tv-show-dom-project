const search = document.querySelector("#search"); //input
// console.log(search);

const getShow = async function () {

  const container = document.createElement("div");//div

  // API API API API API API API API API API API API
  const response = await axios("https://api.tvmaze.com/shows/82/episodes");
  const episodes = response.data;
  console.log(episodes);
  // API API API API API API API API API API API API 

  const getImgs = ()=>{

      episodes.forEach((ep) => {
        const img = document.createElement("img");
        img.src = ep.image.medium;
        container.appendChild(img);
        document.body.appendChild(container);
      });
  };
  getImgs()

  search.addEventListener("input", function (e) {
    console.log(e.target.value);
    
    episodes.filter(ep=>{
        ep.name.includes(e.target.value) || 
        ep.summary.includes(e.target.value);
        const img = document.createElement("img");
        img.src = ep.image.medium;
        container.appendChild(img);
        document.body.appendChild(container);
        
    });

    //   if (container.children.length !== 0) {
    //     for (let i = 0; i < container.children.length; i++) {
    //       container.children[i].remove();
    //     }
    //   }
    //   console.log(container.children);
    
  });
};
getShow();

//   console.log(container);

// const getImage = (episodes, div) => {
//     console.log(episodes);

//     episodes.forEach((ep) => {

//         if(ep.image){
//             const img = document.createElement("img");
//             img.src = ep.image.medium
//             div.append(img)
//         };
//     });
// };
