// selectors

const textInput = document.querySelector("#txt-input");
const translateButton = document.querySelector(".translate");
const output = document.querySelector("#output");
const errorText = document.querySelector(".error");

// Events
translateButton.addEventListener("click", translate);
console.log(translateButton.disable);

// logic
const serverurl = "https://api.funtranslations.com/translate/ferb-latin.json";
function getTranslationUrl(text) {
  return serverurl + "?" + "text=" + text;
}

function translate() {
  const inputValue = textInput.value;
  if (inputValue) {
    errorText.innerHTML = "";
    translateButton.disabled = true;
    translateButton.style.backgroundColor = "gray";
    output.innerText = "Translating your text...";
    fetch(getTranslationUrl(inputValue))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          output.style.color = "red";
          output.innerText = "Too many requests. Try after sometime";
          translateButton.style.backgroundColor = "#466680";
          translateButton.disabled = false;
          // translateButton.innerText = "Translate again";
        } else {
          output.innerText = data.contents.translated;
          translateButton.disabled = false;
          translateButton.style.backgroundColor = "#466680";
          // translateButton.innerText = "Translate again";
        }
      })
      .catch((err) => {
        translateButton.disabled = false;
        console.log("Error occured", err);
      });
  } else {
    output.innerText = "";
    errorText.innerHTML = "Please enter text above";
    setTimeout(() => {
      errorText.innerHTML = "";
    }, 1500);
  }
}
