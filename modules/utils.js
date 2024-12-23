export function postMessageWithContentHeight() {
    const contentHeight = document.body.scrollHeight;
    window.parent.postMessage({ contentHeight }, '*');
}

export function delayShowChallengeData() {
    setTimeout(() => {
        const challengeElement = document.getElementById('challenge-data');
        if (challengeElement) {
            challengeElement.style.display = 'block';
        }
    }, 2000);
}

export function setRunStatus(status) {
    const statusElement = document.getElementById('run-status');
    if (statusElement) {
        statusElement.textContent = status;
    }
}

export async function runChallenge() {
    try {
        const response = await fetch('/api/challenge');
        if (!response.ok) {
            throw new Error('Failed to run challenge');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export function asString(value, maxLength) {
    if (typeof value !== 'string') {
        value = String(value);
    }
    return value.length > maxLength ? value.substring(0, maxLength) : value;
}

export async function sendCandidate(data) {
    try {
        const response = await fetch('/api/candidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to send candidate data');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export function handleMobile(response) {
    console.log('Handling mobile response:', response);
}

export function handleWeb(response, token) {
    console.log('Handling web response:', response, 'Token:', token);
}

export const MODE_PARAM = 'mode';
export const MOBILE_MODE = 'mobile';
