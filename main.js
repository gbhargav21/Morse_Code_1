const MORSE_CODE = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    'Á': '.--.-', // A with acute accent
    'Ä': '.-.-', // A with diaeresis
    'É': '..-..', // E with acute accent
    'Ñ': '--.--', // N with tilde
    'Ö': '---.', // O with diaeresis
    'Ü': '..--', // U with diaeresis
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    ',': '--..--', // comma
    '.': '.-.-.-', // period
    '?': '..--..', // question mark
    ';': '-.-.-', // semicolon
    ':': '---...', // colon
    '/': '-..-.', // slash
    '-': '-....-', // dash
    "'": '.----.', // apostrophe
    '()': '-.--.-', // parenthesis
    '_': '..--.-', // underline
    '@': '.--.-.', // at symbol from http://www.learnmorsecode.com/
    ' ': '.......'
};


//Encryption n Decryption to MorseCode ot to English
const MorseCode = {
    decodeMorse: (morseCode) => {

        const decodeCharacterByMap = (character) => {
            for (let i in MORSE_CODE) {
                if (MORSE_CODE[i] === character) {
                    return i
                }
            }
            return '';
        };

        return morseCode
            .trim()
            .split("   ")
            .map(data => data.split(" ")
                .map(char => decodeCharacterByMap(char))
                .join(""))
            .join(" ");
    },
    encodeMorse: (str) => {
        let MorseCode = str.split('');
        for (let j in MorseCode) MorseCode[j] = MORSE_CODE[MorseCode[j].toUpperCase()] || '?';
        return MorseCode.join(' ');
    }
};
//Output
window.addEventListener('load', function() {
    let itext = document.getElementById('encrypt-decrypt');
    let answer = document.getElementById('answer');

    itext.addEventListener('input', function(e) {
        let pattern = /^(?![.-])[a-z0-9ÁÄÉÑÖÜ,.?;:/\-'()_@ ]+$/i;
        if (pattern.test(itext.value)) {
            answer.innerHTML = MorseCode.encodeMorse(itext.value);
        } else {
            answer.innerHTML = MorseCode.decodeMorse(itext.value);
        }
        if (itext.value === '') {
            answer.innerHTML = '';
        }
    });
});
let saveFile = () => {
    const mcode = document.getElementById('answer').innerHTML;
    console.log(mcode)
    const text = document.getElementById("encrypt-decrypt");
    let dataCode = '\r Text -: ' + text.value + ' \r\n ' +
        'MorseCode-: ' + mcode;
    const textToBLOB = new Blob([dataCode], {
        type: 'text/plain'
    });

    const sFileName = 'Output.txt'; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}


// Copy Content
let copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', copyText);

function copyText(ev) {
    console.log("hi");
    let div = document.getElementById('answer');
    let text = div.innerText;
    let textArea = document.createElement('textarea');
    textArea.width = "1px";
    textArea.height = "1px";
    textArea.background = "transparents";
    textArea.value = text;
    document.body.append(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}