let searchForm = document.querySelector("#search-form");
let searchResult = document.querySelector("#search-result");
let showMoreBtn = document.querySelector("#show-more-btn");
let searchBox = document.querySelector("#search-box");
let apiKey = `1s30P13c36fJmMvruq7OegrVw_XPqdY_ESDCUVqKV9s`;

let input = "";
let page = 1;

async function getImageData() {
  let input = searchBox.value;
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${apiKey}&per_page=12`;
  let response = await fetch(url);
  let data = await response.json();
  if (page === 1) {
    searchResult.innerHTML = "";
  }
  const results = data.results;
  results.map((result) => {
    const img = document.createElement("img");
    img.src = result.urls.small;
    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    imgLink.appendChild(img);
    searchResult.appendChild(imgLink);
  });
  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  getImageData();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  getImageData();
});

