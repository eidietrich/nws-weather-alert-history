const fs = require('fs')

const getJson = (path) => JSON.parse(fs.readFileSync(path))

const writeJson = (path, data) => {
    fs.writeFile(path, JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('Written to', path);
    }
    );
}

const MT_WEATHER_FORECAST_OFFICES = [
    'KBYZ', // Billings
    'KGGW', // Glasgow
    'KMSO', // Missoula
    'KTFX' // Great Falls
]


const full = getJson('./nws-weather-alerts.json')

if (full.features && full.features.length > 0) {
    // conditional here keeps existing data for null data result
    const filteredToMontana = {
        ...full,
        features: full.features.filter(d => MT_WEATHER_FORECAST_OFFICES.includes(d.properties.WFO))
    }

    writeJson('./nws-weather-alerts-for-mt.json', filteredToMontana)
    console.log('Done')
}
