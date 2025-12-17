/* AI Modal Controller */
window.openAImodal = function () {
    document.getElementById('ai-modal').style.display = 'flex';
    document.getElementById('ai-prompt').focus();
    document.getElementById('ai-response-area').style.display = 'none';
    document.getElementById('ai-response-area').innerHTML = '';
};

window.closeAImodal = function () {
    document.getElementById('ai-modal').style.display = 'none';
};

window.runAI = async function () {
    const prompt = document.getElementById('ai-prompt').value;
    if (!prompt) return;

    // UI Loading State
    const btnText = document.getElementById('ai-btn-text');
    const loader = document.getElementById('ai-loading');
    btnText.style.display = 'none';
    loader.style.display = 'inline-block';

    try {
        // Call Store to generate
        const result = await window.Store.generateCampaignAI(prompt);

        // Show success
        const responseArea = document.getElementById('ai-response-area');
        responseArea.style.display = 'block';
        responseArea.innerHTML = `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 8px; color: #166534;">
                <div style="font-weight: 600; margin-bottom: 8px;"><i class="fa-solid fa-check-circle"></i> Plan Generated Successfully!</div>
                <div style="font-size: 0.9rem;">
                    <strong>Campaign:</strong> ${result.title}<br>
                    <strong>Tasks Created:</strong> ${result.tasks.length}<br>
                    <strong>Budget:</strong> $${result.budget.toLocaleString()}
                </div>
                <div style="margin-top: 12px; font-size: 0.8rem;">
                    Redirecting to Campaign Dashboard...
                </div>
            </div>
        `;

        // Redirect after delay
        setTimeout(() => {
            closeAImodal();
            window.location.hash = '/campaigns';
        }, 2500);

    } catch (e) {
        console.error(e);
        alert('AI Error: ' + e.message);
    } finally {
        // Reset UI
        btnText.style.display = 'inline';
        loader.style.display = 'none';
        document.getElementById('ai-prompt').value = '';
    }
};
