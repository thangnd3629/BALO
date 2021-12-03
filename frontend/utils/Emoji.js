export default class Emoji {
    constructor() {
        this.dictionary = {
            ":)": "0x1F642",
            "=)": "0x1F642",
            ":D": "0x1F603",
            ":P": "0x1F60B",
            ":x": "0x1F618",
            ";)": "0x1F609",
            ":|": "0x1F610",
            ":(": "0x1F61E",
            ":o": "0x1F62E"
        }
    }

    parse(string) {
        let n = string.length
        if (n <= 1) {
            return string
        }
        let re = ""
        let last = -1
        for (let i = 1; i < n; ++i) {
            tmp = string[i - 1] + string[i]
            if (this.dictionary[tmp] != undefined) {
                re += String.fromCodePoint(this.dictionary[tmp])
                last = i
                continue
            }
            else if (last !== i-1) re += string[i - 1]
            if (i == n - 1) re += string[i]
        }

        return re

    }
}