// selectors

const textInput = document.querySelector("#txt-input");
const translateButton = document.querySelector("#translate-btn");
const output = document.querySelector("#output");

// Events
translateButton.addEventListener("click", translate);

// logic
const serverurl = "https://api.funtranslations.com/translate/minion.json";
function getTranslationUrl(text) {
  return serverurl + "?" + "text=" + text;
}

function translate() {
  const inputValue = textInput.value;
  fetch(getTranslationUrl(inputValue))
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        output.innerText = "Too many requests. Try after sometime";
      } else {
        output.innerText = data.contents.translated;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
