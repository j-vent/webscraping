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
                index = 0;
                const children = $(li).children();
                // console.log("children " + children);
                const link = $(li).find('h2').find('a').attr('href');
                //const link = console.log($(a).attr('href'));
                // TODO: use a safer path joiner 
                const path = "https://findadentist.ada.org";
                console.log("link : " + path + link);
                //const pageRes = await visitDentistPage(path + link);
                //console.log("result : " + pageRes[0]);
                let arr = children.map((i, a) => {
                    firstPageInfo.push({ title: $(a).text() })
                });
                // await Promise.all(async)
                // children.each((i, a) => {
                //     // console.log($(a).attr('href'));
                //     let t = $(a).text().contents().map(function () {
                //         return (this.type === 'text') ? $(this).text() + ' ' : '';
                //     }).get();
                //     console.log("t " + t);
                //     //console.log("a: " + $(a));
                //     //console.log($(a).text() + ",");

                //     // firstPageInfo.push($(a).text());
                //     // index++;

                // })
                // TODO: move to own function
                for (var i = 0; i < firstPageInfo.length; i++) {
                    console.log("i " + i + " " + firstPageInfo[i]);
                }
            })
        })
        // test link
        // visitDentistPage("https://findadentist.ada.org//ga/fulton/atlanta/general-practice/dr-bruce-ashendorf-1649092");

    })
    .catch(function (err) {
        //handle error
    });


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