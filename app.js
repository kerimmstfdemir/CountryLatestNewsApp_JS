const countrySelect = document.getElementById("select_country")

// update countryValue from local storage. (Default "tr")
let countryValue = JSON.parse(localStorage.getItem("selectedCountry")) || "tr";

countrySelect.value = countryValue;

let country = "";

const onChange = () => {
  countryValue = countrySelect.value;
  localStorage.setItem("selectedCountry", JSON.stringify(countryValue));
  country = countrySelect.options[countrySelect.selectedIndex].text;
  location.reload();
}

countrySelect.addEventListener("change", onChange);

let isError = false;

const getNews = async function () {
  const url = `https://newsapi.org/v2/top-headlines?country=${countryValue}&apiKey=22627bf7bebf4c9bbbe1e49278652e4b`

  try {
    const res = await fetch(url);
    if (!res.ok) {
        isError = true;
        // throw new Error(`Something went wrong ${res.status}`)
    }
    const data = await res.json();
    renderNews(data.articles);
  } catch (error) {
    console.log(error);
  } 
};

const renderNews = (news) => {
    const newsList = document.getElementById("news-list");

    if(isError) {
        newsList.innerHTML += `
        <h2>News can not be fetched...</h2>
        <img src="./img/404.png" alt="404" class="img-404">
        `;
        return
    }

    news.forEach((item) => {
       const {title, description, urlToImage, url} = item; //! destruction
       newsList.innerHTML += `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card"">
                <img src="${urlToImage}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                </div>
                <a href="${url}" target="_black" class="btn btn-secondary">Details</a>
            </div>
        </div>
       `
    });
}

window.addEventListener("load", getNews)