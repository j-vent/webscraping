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
                // console.log("sup");
                let firstPageInfo = [];
                const classes = ["name", "specialty", "phone", "address", "miles"];
                const children = $(li).children();
                const link = $(li).find('h2').find('a').attr('href');
                const path = "https://findadentist.ada.org";

                // console.log("link : " + path + link); // send to other function
                // console.log("name " + $(li).find('h2').find('a').text());
                firstPageInfo[0] = $(li).find('h2').find('a').text();

                for (var i = 1; i < classes.length; i++) {
                    const info = children.find("." + classes[i]).text();
                    firstPageInfo[i] = info;
                }
                for (var i = 0; i < firstPageInfo.length; i++) {
                    console.log(firstPageInfo[i]);
                }
                // let res = await visitDentistPage(link);
                let res = await test();
                console.log(res);
                // res.resolve().then(function (f) {
                //     console.log(f[0]);
                // })
                // console.log("res " + res);

            })
        })
        // TODO: Get these other function calls async
        // visitDentistPage("https://findadentist.ada.org//ga/fulton/atlanta/general-practice/dr-bruce-ashendorf-1649092");
        // visitDentistPage("https://findadentist.ada.org/ga/dekalb/decatur/general-practice/dr-t-james-brown-3154033");
        // writeToJSON(firstPageInfo);
    })
    .catch(function (err) {
        // handle error
    });

function writeToJSON(values) {
    console.log("write to json");
    var obj = { info: [] };
    obj.info.push({ 'name': values[0], 'specialty': values[1], 'phone': values[2], 'address': values[3], 'miles': values[4] });
    var json = JSON.stringify(obj);
    var fs = require('fs');
    fs.writeFile('output.json', json, 'utf8', callback);
}

const dentistInfo = []
function test() {
    return new Promise((resolve, reject) => {
        xurl = "https://findadentist.ada.org//ga/fulton/atlanta/general-practice/dr-bruce-ashendorf-1649092";
        request(xurl, function (err, resp, body) {
            if (err) { return reject(err); }
            let $ = cheerio.load(body);
            // let links = $('#container');
            // let name = links.find('span[itemprop="name"]').html(); // name
            resolve({ name: 'Man', links: 'link', url: xurl });
        });
    })
}

function visitDentistPage(link) {
    const url = link;
    const res = [];
    const unwantedDescriptors = ["Phone", "Email", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Address",
        "Specialities"];

    rp(url)
        .then(function (html) {
            const $ = cheerio.load(html);
            console.log("in dentist page");
            $('dt').each((index, element) => {
                console.log($(element).text());
                console.log($(element).next().text());
                console.log(" _____________");
                const key = $(element).text();
                if (!unwantedDescriptors.includes(key)) {
                    dentistInfo.push({ [$(element).text()]: $(element).next().text() });
                }
            });
            console.log("here");
            for (var i = 0; i < dentistInfo.length; i++) {
                console.log("i " + i + "  " + dentistInfo[i]);
            }
            console.log("info" + JSON.stringify(dentistInfo));

            return new Promise((resolve, reject) => {
                if (dentistInfo != null) {
                    resolve(JSON.stringify(dentistInfo));
                } else {
                    reject("eror");
                }
                // return new Promise(resolve => {
                //     setTimeout(() => {
                //         resolve('resolved');
                //     }, 2000);
                // });
            })
            // console.log("done");
        }).catch(function (err) {
            //handle error
        });
}

