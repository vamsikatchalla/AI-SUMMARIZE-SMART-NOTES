const apiKey = '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'; // Replace with your API key

async function summarizeText(text) {
    const response = await fetch('https://api.example.com/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ text })
    });
    const data = await response.json();
    return data.summary;
}

async function extractTextFromImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch('https://api.example.com/ocr', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}` },
        body: formData
    });
    const data = await response.json();
    return data.text;
}

document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('textInput').value;
    const imageFile = document.getElementById('imageInput').files[0];
    let extractedText = inputText;

    if (imageFile) {
        extractedText = await extractTextFromImage(imageFile);
    }

    if (extractedText) {
        const summary = await summarizeText(extractedText);
        document.getElementById('summaryOutput').innerText = summary;
    } else {
        document.getElementById('summaryOutput').innerText = 'No text found to summarize.';
    }
});
