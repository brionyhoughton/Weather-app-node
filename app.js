let request = require('request')
const url = "https://api.darksky.net/forecast/0d6d7e59f5148c9be44c69ebc3f23a77/37.8267,-122.4233?units=si"
const chalk = require('chalk');

const weather = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/0d6d7e59f5148c9be44c69ebc3f23a77/${latitude},${longitude}?units=si`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Oops, Can't connect to darksky. Check internet connection")
        } else {
            const data = response.body;
            switch (data.currently.icon) {
                case 'clear-day':
                    console.log(chalk.green('clear-day'))
                    break;
                case 'clear-night':
                    console.log(chalk.green('clear-night'))
                    break;
                case 'rain':
                    console.log(chalk.blue('rain'))
                    break;
                case 'snow':
                    console.log(chalk.yellow('snow'))
                    break;
                case 'sleet':
                    console.log(chalk.gray('sleet'))
                    break;
                case 'wind':
                    console.log(chalk.red('wind'))
                    break;
                case 'fog':
                    console.log(chalk.red('fog'))
                    break;
                case 'cloudy':
                    console.log(chalk.yellow('cloudy'))
                    break;
                case 'partly-cloudy-day':
                    console.log(chalk.yellow('partly-cloudy-day'))
                    break;
                case 'partly-cloudy-night':
                    console.log(chalk.yellow('partly-cloudy-night'))
                    break;
                case 'hail':
                    console.log(chalk.yellow('hail'))
                    break;
                case 'thunderstorm':
                    console.log(chalk.red('thunderstorm'))
                    break;
                case 'tornado':
                    console.log(chalk.red('tornado'))
                    break;
                  
                    default:
                
                    console.log("Error");

            }



        }
    })

}

const geocode = (address, callback) => {
    const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYnJpb255aG91Z2h0b24iLCJhIjoiY2p0N2RnMmZmMGdkajN5bGhtNHpiMWtvNiJ9.783AmJqTmMBsXweD4UZsPQ`

    request({ url: url2, json: true }, (error, response) => {
        if (error) {
            console.log("Oops, Can't connect to darksky. Check internet connection", undefined)
        } else if (response.body.features[0].center.length == 0) {
            console.log('unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

geocode('chester', (error, data) => {
    let latitude = data.latitude
    let longitude = data.longitude
    console.log('Error', error)
    console.log('data', data)
    weather(latitude, longitude, (error, data) => {
        console.log('Error', error)
        console.log('data', data)
    })

})
