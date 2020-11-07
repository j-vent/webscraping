const input = require('./zipcodes.json');
console.log(input.zipcodes[0]);
const rp = require('request-promise');
const cheerio = require('cheerio');

// const zipcodes = JSON.parse(input);

// for (z in zipcodes) {
//     console.log(zipcodes[z]);
// }


const url = 'https://findadentist.ada.org/search-results?specialty=1&address=30304&searchResultsReferrer=true';

rp(url)
    .then(function (html) {
        const $ = cheerio.load(html);
        console.log("test");

        const names = $(".dentist-list__item__content").find('a').first().text();
        console.log(names);

        const specialities = $('.specialty').text();
        console.log(specialities);

        const phoneNums = $('.phone').text();
        console.log(phoneNums);

        const addresses = $('.address').text();
        console.log(addresses);
        // console.log("length " + addresses.length);
    })
    .catch(function (err) {
        //handle error
    });