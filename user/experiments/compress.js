mdlr('[mdlr]compress', m => {

    const fs = m.require('[node]fs');
    const { args } = m.require('args');

    const body = fs.readFileSync(args.path[0], 'utf8');

    // const regex = /(?<unicode>(?:\\u[0-9a-fA-F]{4,4}))|(?<utf8>[\u0080-\uffff]+)|(?<memberCase>[A-Za-z]+(\.[A-Za-z]+)+)|(?<snakeCase>(?:[A-Za-z]+(?:_[A-Za-z]+)+))|(?<kebabCase>(?:[A-Za-z]+(?:-[A-Za-z]+)+))|(?<camelCase>[a-z]+(?:[A-Z]+[a-z]+)+)|(?<pascalCase>(?:[A-Z]+[a-z]+)+)|(?<upperCase>[A-Z]+)|(?<lowerCase>[a-z]+)/g;
    // const regex = /(?<whitespace>[\t\ ]{1,})|(?<unicode>(?:\\u[0-9a-fA-F]{4,4}))|(?<utf8>[\u0080-\uffff]+)|(?<camelCase>[a-z]+(?:[A-Z]+[a-z]+)+)|(?<pascalCase>(?:[A-Z]+[a-z]+)+)|(?<upperCase>[A-Z]+)|(?<lowerCase>[a-z]+)/g;

    // const regex = /(?<kebabCase>(?:[A-Za-z]+(?:-[A-Za-z]+)+))|([a-zA-Z\-]+)/g;
    const regex = /([a-zA-Z]+)/g;
    const sequences = [];

    let match;
    const encoder = new TextEncoder();
    while ((match = regex.exec(body)) !== null) {
        let type = 'block';
        const id = match[0];
        // const key = encoder.encode(id);
        // if (key.length <= 1) continue;
        sequences.push({ id, type });
    }

    const map = new Map();
    for (let { id, type } of sequences) {
        if (type === 'utf8') continue;
        const key = id.toLocaleLowerCase();
        let count = map.get(id) || 0;
        map.set(id, count + 1);
    }

    function weight([k, v]) {
        return (v - 1) * (k.length - 1);
    }
    const keyValuePairs = [...map];
    keyValuePairs.sort((a, b) => weight(b) - weight(a));

    let estimatedSavings = 0;
    keyValuePairs.forEach(([k, v], i) => {
        const savings = weight([k, v])
        if (savings <= 0) return;
        if (i <= 127) estimatedSavings += savings;
        console.log(savings, v, k)
    });
    console.error('estimatedSavings:', estimatedSavings, 'of', body.length, '~'+(estimatedSavings/body.length*100).toFixed(1)+'%');
})