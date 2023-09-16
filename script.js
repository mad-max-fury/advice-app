const getElement = (selector) => document.querySelector(selector);

const adviceContainer = getElement("#adviceText");
const button = getElement("#btn");
const slipId = getElement("#slip");
const adviceSearchForm = getElement("#adviceSearch");
const adviceSearchInput = getElement("#adviceSearchInput");
const searchResult = getElement("#searchResult");
const searchBtn = getElement("#searchBtn");

const getAdvice = async () => {
  try {
    button.disabled = true;
    button.classList.add("fetching");
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    adviceContainer.innerHTML = `"${data.slip.advice}"`;
    slipId.innerHTML = `#${data.slip.id}`;
  } catch (error) {
    console.error("Error fetching advice:", error);
  } finally {
    button.disabled = false;
    button.classList.remove("fetching");
  }
};

const getSearchedAdvice = async (e) => {
  e.preventDefault();
  const query = adviceSearchInput.value;
  if (query.length < 1) {
    alert("Please enter a search term");
    return;
  }

  try {
    searchBtn.disabled = true;
    searchBtn.classList.add("fetching");
    searchResult.innerHTML = "Loading...";

    const response = await fetch(
      `https://api.adviceslip.com/advice/search/${query}`
    );
    const data = await response.json();

    if (data.message) {
      return (searchResult.innerHTML = `
        <div class="notice">
          <h3># ${data.message.type}</h3>
          <p>${data.message.text}</p>
        </div>`);
    }
    const cards = data?.slips?.map(
      ({ id, advice, date }) =>
        `<div class="resultCard">
        <span class="resultCardQuoteDate">${date}</span>
        <p class="resultCardQuote">"${advice}"</p>
        <span class="resultCardQuoteId"># ${id}</span>
      </div>`
    );
    searchResult.innerHTML = [
      `<h3>Showing Results for : ${query}</h3>`,
      ...cards,
    ].join("");
  } catch (error) {
    console.error("Error searching advice:", error);
    searchResult.innerHTML = `An error occurred 😒😒😒`;
  } finally {
    searchBtn.disabled = false;
    searchBtn.classList.remove("fetching");
  }
};

button.addEventListener("click", getAdvice);
adviceSearchForm.addEventListener("submit", getSearchedAdvice);
