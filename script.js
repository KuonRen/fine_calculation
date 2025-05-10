const crimes = {
    robbery: [
        { name: "第1級強盗罪", fine: 30000, jailTime: 40 },
        { name: "第2級強盗罪", fine: 25000, jailTime: 35 },
        { name: "第3級強盗罪", fine: 20000, jailTime: 30 },
        { name: "第4級強盗罪", fine: 15000, jailTime: 25 },
        { name: "第5級強盗罪", fine: 10000, jailTime: 20 }
    ],
    robberyAttempt: [
        { name: "第1級強盗未遂罪", fine: 20000, jailTime: 25 },
        { name: "第2級強盗未遂罪", fine: 15000, jailTime: 20 },
        { name: "第3級強盗未遂罪", fine: 10000, jailTime: 15 },
        { name: "第4級強盗未遂罪", fine: 7500, jailTime: 10 },
        { name: "第5級強盗未遂罪", fine: 5000, jailTime: 5 }
    ],
    murder: [
        { name: "殺人罪", fine: 100000, jailTime: 40 },
        { name: "殺人未遂罪", fine: 75000, jailTime: 20 }
    ],
    other: [
        { name: "拉致監禁罪", fine: 50000, jailTime: 30 },
        { name: "公然わいせつ罪", fine: 5000, jailTime: 5 },
        { name: "車両窃盗罪", fine: 20000, jailTime: 15 },
        { name: "車両窃盗未遂罪", fine: 10000, jailTime: 10 },
        { name: "窃盗罪", fine: 15000, jailTime: 10 },
        { name: "窃盗未遂罪", fine: 7500, jailTime: 5 },
        { name: "暴行罪", fine: 10000, jailTime: 10 },
        { name: "器物損壊罪", fine: 8000, jailTime: 10 },
        { name: "公務執行妨害罪", fine: 20000, jailTime: 20 },
        { name: "違法薬物売買罪", fine: 50000, jailTime: 30 },
        { name: "違法薬物所持罪", fine: 20000, jailTime: 15 },
        { name: "指定違法物所持罪", fine: 15000, jailTime: 10 },
        { name: "共犯罪", fine: 30000, jailTime: 20 },
        { name: "IDカード、免許証不携帯", fine: 5000, jailTime: 5 },
        { name: "ガンライセンス不携帯、無免許", fine: 10000, jailTime: 10 },
        { name: "テロ罪", fine: 150000, jailTime: 90 },
        { name: "業務妨害罪", fine: 10000, jailTime: 10 }
    ]
};

let selectedCrimes = [];

function createCrimeButtons(category, containerId) {
    const container = document.getElementById(containerId);
    crimes[category].forEach((crime, index) => {
        const crimeDiv = document.createElement('div');
        crimeDiv.classList.add('crime-item');
        crimeDiv.textContent = crime.name;
        crimeDiv.dataset.category = category;
        crimeDiv.dataset.index = index;
        crimeDiv.addEventListener('click', toggleCrimeSelection);
        container.appendChild(crimeDiv);
    });
}

Object.keys(crimes).forEach(category => createCrimeButtons(category, category + 'List'));

function toggleCrimeSelection(event) {
    const crimeDiv = event.target;
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

    const fineFormatted = fine.toLocaleString();
    const outputText = `罪状: ${text}\n罰金: $${fineFormatted}\n刑期: ${jail}分\n備考: ${remark}`;

    document.getElementById('output').value = outputText;
}

function copyToClipboard() {
    const outputText = document.getElementById('output');
    outputText.select();
    document.execCommand('copy');
}
