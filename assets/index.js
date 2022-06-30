const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
 
    .then((result) => dataProcess(result.data, word));
}

const dataProcess = (res, w) =>{
  if (res.title){
    infoText.innerHTML = `Oh No! We cannot find the word: ${w}`;
  } else{
    wrapper.classList.add("active");
    let definitions = res[0].meanings[0].definitions[0];
    console.log({definitions})
    phonetics = `Commonly pronounced as: ${res[0].phonetics[0].text}`;

    document.querySelector(".word p").innerText = res[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions.definition;
    document.querySelector(".example span").innerText = definitions.example ?? `Sorry. Unavailable`;
    document.querySelector(".list").innerText = definitions.synonym ?? `Unavailable!`;

  }

}

searchInput.addEventListener("keyup", (e) => {
  if(e.key =="Enter" && e.target.value){
    fetchApi(e.target.value)
  }
})

removeIcon.addEventListener("click", () => {
  searchInput.value ="";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.style.color = "#000";
  infoText.innerHTML = "Type any existing word and press enter to get meaning, example,synonyms, etc.";
})