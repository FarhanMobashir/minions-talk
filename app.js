// selectors

const textInput = document.querySelector("#txt-input");
const translateButton = document.querySelector(".translate");
const output = document.querySelector("#output");
const errorText = document.querySelector(".error");

// Events
translateButton.addEventListener("click", translate);
console.log(translateButton.disable);

// logic
const serverurl = "https://api.funtranslations.com/translate/minion.json";
function getTranslationUrl(text) {
  return serverurl + "?" + "text=" + text;
}

function translate() {
  const inputValue = textInput.value;
  if (inputValue) {
    errorText.innerHTML = "";

    fetch(getTranslationUrl(inputValue))
      .then((res) => {
        translateButton.disabled = "true";
        translateButton.innerText = "Translating your text";
        translateButton.style.backgroundColor = "gray";
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          output.innerText = "Too many requests. Try after sometime";
        } else {
          translateButton.innerText = "Translate again";
          output.innerText = data.contents.translated;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    errorText.innerHTML = "Please enter text above";
    setTimeout(() => {
      errorText.innerHTML = "";
    }, 1500);
  }
}
