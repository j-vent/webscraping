const input = require('./zipcodes.json');
// loop later and place into url 
console.log(input.zipcodes[0]);

const rp = require('request-promise');
const cheerio = require('cheerio');


const url = 'https://findadentist.ada.org/search-results?&address=' + 30301;

rp(url)
    .then(function (html) {
        const $ = cheerio.load(html);

        console.log("test");

        $('.dentist-list__content').each((i, ul) => {
            const children = $(ul).children();
            children.each((i, li) => {
                const children = $(li).children();
                const link = $(li).find('h2').find('a').attr('href');
                //const link = console.log($(a).attr('href'));
                // TODO: use a safer path joiner 
                const path = "https://findadentist.ada.org/";
                console.log(path + link);
                children.each((i, a) => {
                    // console.log($(a).attr('href'));
                    console.log($(a).text());

                })
            })
        })

        console.log("done");
    })
    .catch(function (err) {
        //handle error
    });