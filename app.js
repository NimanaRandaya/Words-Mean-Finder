

document.getElementById("searchBtn").addEventListener("click", async () => {
    let word = document.getElementById("searchTxt").value;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const options = {
        method: 'GET',
    };

    try {
        const response = await fetch(url, options);
        const results = await response.json();

        if (results.length > 0) {
            const meanings = results[0].meanings;
            let htmlContent = "";

            meanings.forEach((meaning) => {
                htmlContent += `<p ><strong>${meaning.partOfSpeech.charAt(0).toUpperCase()+meaning.partOfSpeech.slice(1)}</strong></p>`;

                meaning.definitions.forEach((definition) => {
                    htmlContent += `<p>- ${definition.definition}</p>`;

                    if (definition.example) {
                        htmlContent += `<p style="font-style: italic;">Example: ${definition.example}</p>`;
                    }
                });
            });

            document.getElementById("exampleSentences").innerHTML = htmlContent || "No definitions found.";
        } else {
            document.getElementById("exampleSentences").innerHTML = "No results found.";
        }
    } catch (error) {
        console.error(error);
    }
});
