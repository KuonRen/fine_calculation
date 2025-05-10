fetch('data.json')
    .then(response => response.json())
    .then(crimes => {
        Object.keys(crimes).forEach(category => createCrimeButtons(category, category + 'List', crimes));
    });

function createCrimeButtons(category, containerId, crimes) {
    const container = document.getElementById(containerId);
    crimes[category].forEach((crime, index) => {
        const crimeDiv = document.createElement('div');
        crimeDiv.classList.add('crime-item');
        crimeDiv.textContent = crime.name;
        crimeDiv.dataset.category = category;
        crimeDiv.dataset.index = index;
        crimeDiv.addEventListener('click', () => toggleCrimeSelection(crimeDiv, crimes));
        container.appendChild(crimeDiv);
    });
}

let selectedCrimes = [];

function toggleCrimeSelection(crimeDiv, crimes) {
    const category = crimeDiv.dataset.category;
    const index = crimeDiv.dataset.index;
    const crime = crimes[category][index];

    crimeDiv.classList.toggle('selected');
    selectedCrimes = crimeDiv.classList.contains('selected')
        ? [...selectedCrimes, crime]
        : selectedCrimes.filter(c => c.name !== crime.name);

    updateOutput();
}

function updateOutput() {
    const text = selectedCrimes.map(c => c.name).join(', ');
    const fine = selectedCrimes.reduce((sum, c) => sum + c.fine, 0);
    const jail = Math.min(60, selectedCrimes.reduce((sum, c) => sum + c.jailTime, 0));
    const remark = document.getElementById('remark').value;

    document.getElementById('output').value = `罪状: ${text}\n罰金: $${fine.toLocaleString()}\n刑期: ${jail}分\n備考: ${remark}`;
}

function copyToClipboard() {
    const outputText = document.getElementById('output');
    outputText.select();
    document.execCommand('copy');
}
