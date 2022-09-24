const _ = (string) => document.querySelector(string);

const adviceContainer = _("#adviceText");
const button = _("#btn");
const slipId = _("#slip");
const getAdvice = async () => {
  button.disabled = true;
  button.classList.add("fetching");
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  adviceContainer.innerHTML = `"${data.slip.advice}"`;
  slipId.innerHTML = `#${data.slip.id}`;
  button.disabled = false;
  button.classList.remove("fetching");
};

button.addEventListener("click", getAdvice);
