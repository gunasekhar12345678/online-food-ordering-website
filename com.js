// General purpose counter utility
let count = 0;

function increaseCounter() {
    count++;
    const el = document.getElementById('counterDisplay');
    if (el) {
        if (el.tagName === 'INPUT') {
            el.value = count;
        } else {
            el.textContent = count;
        }
    }
}

function decreaseCounter() {
    if (count > 0) {
        count--;
        const el = document.getElementById('counterDisplay');
        if (el) {
            if (el.tagName === 'INPUT') {
                el.value = count;
            } else {
                el.textContent = count;
            }
        }
    }
}

function resetCounter() {
    count = 0;
    const el = document.getElementById('counterDisplay');
    if (el) {
        if (el.tagName === 'INPUT') {
            el.value = 0;
        } else {
            el.textContent = 0;
        }
    }
}
