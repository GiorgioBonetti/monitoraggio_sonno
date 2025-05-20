export async function generaConsiglio(prompt: string) {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama3.2",
            prompt,
        }),
    });

    const text = await response.text();
    const lines = text.split("\n").filter((line) => line.trim().length > 0);

    let fullResponse = "";
    for (const line of lines) {
        try {
            const obj = JSON.parse(line);
            if (obj.response) fullResponse += obj.response;
        } catch {
            // ignora errori di parsing
        }
    }

    // Rimuove eventuali virgolette doppie all'inizio/fine
    return fullResponse.replace(/^"+|"+$/g, "").trim();
}
