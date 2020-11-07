const input = require('./zipcodes.json');
// loop later and place into url 
console.log(input.zipcodes[0]);

const rp = require('request-promise');
const cheerio = require('cheerio');
const { countReset } = require('console');


const url = 'https://findadentist.ada.org/search-results?&address=' + 30301;

rp(url)
    .then(function (html) {
        const $ = cheerio.load(html);

        console.log("test");

        $('.dentist-list__content').each((i, ul) => {

            const children = $(ul).children();
            children.each(async (i, li) => {
                let firstPageInfo = [];
                const classes = ["specialty", "phone", "address", "miles"];
                index = 0;
                const children = $(li).children();
                console.log("children " + children);
                const link = $(li).find('h2').find('a').attr('href');
                console.log("name " + $(li).find('h2').find('a').text());
                const path = "https://findadentist.ada.org";
                console.log("link : " + path + link);
                for (var i = 0; i < classes.length; i++) {
                    const info = children.find("." + classes[i]).text();

                    firstPageInfo[i] = info;
                }
                for (var i = 0; i < firstPageInfo.length; i++) {
                    console.log(firstPageInfo[i]);
                }



            })
        })
        // test link
        writeToJSON(firstPageInfo);

        // visitDentistPage("https://findadentist.ada.org//ga/fulton/atlanta/general-practice/dr-bruce-ashendorf-1649092");

    })
    .catch(function (err) {
        //handle error
    });
// let firstPageInfo = ["Dentist", "890", "Road", "8.8"];
// writeToJSON(firstPageInfo);
function writeToJSON(values) {
    console.log("write to json");
    var obj = { info: [] };
    obj.info.push({ 'specialty': values[0], 'phone': values[1], 'address': values[2], 'miles': values[3] });
    var json = JSON.stringify(obj);
    var fs = require('fs');
    fs.writeFile('output.json', json, 'utf8', callback);
}
async function visitDentistPage(link) {
    const url = link;
    const res = [];
    rp(url)
        .then(function (html) {
            const $ = cheerio.load(html);
            console.log("in dentist page");
            // const website = $('.definition-list--last').get('a').attr('href');
            // console.log("website " + website);
            // console.log($('dt:contains("Gender"));
            // $('.definition-list--last a').get().map(x => $(x).attr('href'))
            $('.definition-list--last').each((i, dl) => {
                const children = $(dl).children();
                children.each((i, li) => {
                    const children = $(li).children();
                    children.each((i, dd) => {
                        // console.log($(a).attr('href'));
                        // console.log($(dd).text());
                        res.push($(dd).text());

                    })
                })
            })
            return new Promise.all(res);
            console.log("done");
        }).catch(function (err) {
            //handle error
        });
}