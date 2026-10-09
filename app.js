document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", submitCode);
});

async function submitCode() {
    const codeArea = document.getElementById("codeArea");
    const outputDiv = document.getElementById("output");
    const submitBtn = document.getElementById("submitBtn");

    const code = codeArea.value.trim();

    if (!code) {
        showResult("Please enter Python code before submitting.", "error");
        return;
    }

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerText = "Verifying AST & Generating Proof...";
    outputDiv.style.display = "none";

    try {
        const response = await fetch("http://127.0.0.1:8000/submit-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: 1,
                task_id: 101,
                code: code
            })
        });

        const data = await response.json();

        if (response.ok) {
            showResult(
                `<strong>✔ AST Verification Passed!</strong><br>` +
                `Status: Eligible<br>` +
                `Cryptographic Proof Hash: <code>${data.proof_hash}</code>`,
                "success"
            );
        } else {
            showResult(`<strong>✖ Verification Failed:</strong> ${data.detail}`, "error");
        }
    } catch (err) {
        showResult("<strong>✖ Server Connection Error:</strong> Make sure FastAPI backend is running on port 8000.", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Code for Verification";
    }
}

function showResult(message, type) {
    const outputDiv = document.getElementById("output");
    outputDiv.className = `result ${type}`;
    outputDiv.innerHTML = message;
    outputDiv.style.display = "block";
}