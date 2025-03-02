const units = {
    length: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
    weight: ['Kilogram', 'Gram', 'Milligram', 'Metric Ton', 'Pound', 'Ounce'],
    temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
    volume: ['Liter', 'Milliliter', 'Cubic Meter', 'Cubic Centimeter', 'Gallon', 'Pint']
};

const conversionFactors = {
    length: {
        Meter: 1,
        Kilometer: 1000,
        Centimeter: 0.01,
        Millimeter: 0.001,
        Mile: 1609.34,
        Yard: 0.9144,
        Foot: 0.3048,
        Inch: 0.0254
    },
    weight: {
        Kilogram: 1,
        Gram: 0.001,
        Milligram: 0.000001,
        'Metric Ton': 1000,
        Pound: 0.453592,
        Ounce: 0.0283495
    },
    volume: {
        Liter: 1,
        Milliliter: 0.001,
        'Cubic Meter': 1000,
        'Cubic Centimeter': 0.001,
        Gallon: 3.78541,
        Pint: 0.473176
    }
};

function updateUnits() {
    const category = document.getElementById('categorySelect').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    
    fromUnit.innerHTML = units[category].map(unit => `<option>${unit}</option>`).join('');
    toUnit.innerHTML = units[category].map(unit => `<option>${unit}</option>`).join('');
}

function convertTemperature(from, to, value) {
    if (from === 'Celsius') {
        if (to === 'Fahrenheit') return (value * 9/5) + 32;
        if (to === 'Kelvin') return value + 273.15;
        return value;
    }
    if (from === 'Fahrenheit') {
        if (to === 'Celsius') return (value - 32) * 5/9;
        if (to === 'Kelvin') return (value - 32) * 5/9 + 273.15;
        return value;
    }
    if (from === 'Kelvin') {
        if (to === 'Celsius') return value - 273.15;
        if (to === 'Fahrenheit') return (value - 273.15) * 9/5 + 32;
        return value;
    }
}

function convert() {
    const category = document.getElementById('categorySelect').value;
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;
    const value = parseFloat(document.getElementById('inputValue').value);
    
    if (isNaN(value)) {
        document.getElementById('result').innerHTML = "Please enter a valid number";
        return;
    }

    let result;
    if (category === 'temperature') {
        result = convertTemperature(from, to, value);
    } else {
        const factorFrom = conversionFactors[category][from];
        const factorTo = conversionFactors[category][to];
        result = value * factorFrom / factorTo;
    }

    document.getElementById('result').innerHTML = 
        `${value} ${from} = ${result.toFixed(2)} ${to}`;
}

// Initialize units on page load
updateUnits();