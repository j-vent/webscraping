const input = require('./zipcodes.json');
// loop later and place into url 
console.log(input.zipcodes[0]);

const rp = require('request-promise');
const cheerio = require('cheerio');


const url = 'https://findadentist.ada.org/search-results?&address=' + 30301;

rp(url)
    .then(function (html) {
        const $ = cheerio.load(html);
        // console.log(html);
        console.log("test");

        const names = $('.dentist-list__item__content').find('a').text();
        console.log(names);

        const specialities = $('.specialty').text();
        console.log(specialities);

        // const phoneNums = $('.phone').text();
        // console.log("phones " + phoneNums);

        const addresses = $('.address').text();
        console.log(addresses);
        console.log("done");
    })
    .catch(function (err) {
        //handle error
    });