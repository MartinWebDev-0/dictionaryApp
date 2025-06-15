const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn")

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value; 

    fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fa-solid fa-play"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

           // looping trough the audio to get the audio in any index available and not just the first (errore precedente)
        let audioSrc = (data[0].phonetics.find(p => p.audio) || {}).audio || "";

        if (audioSrc) {
            sound.setAttribute("src", audioSrc);
        } else {
            sound.removeAttribute("src");
            console.warn("No audio available.");
        }
                
        })
       .catch(() => {
        result.innerHTML = `<h3 style="margin-top:20px; text-align:center;">Word not found</h3>`;

        })



});




//searching with enter key
const enterInput = document.getElementById("inp-word"); 
enterInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click(); 
    }
});




function playSound() {
    sound.play();
}

