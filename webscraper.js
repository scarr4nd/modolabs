const puppeteer = require('puppeteer');

//const webInfo = (async function scrapeInfo() {
async function scrapeInfo() {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.goto('https://events.nd.edu/');

    const data = await page.evaluate(() => {
        //const events = document.querySelectorAll("card.hover-bg.hover-grow");
        const events = document.querySelectorAll(".grid.grid-lg-3");
        //const title1 = document.querySelectorAll(".card-body.hover-more a").innerHTML;
        //const title2 = document.querySelectorAll(".card-body.hover-more a").innerHTML;
        //const title3 = document.querySelectorAll(".card-body.hover-more a").innerHTML;
        //return title.innerHTML;
        //const events = document.querySelectorAll('.card.hover-bg.hover-grow');
        //const title = document.querySelector(".card-body.hover-more");
        //let info = {"title1" : title1, "title2" : title2, "title3" : title3}
        let info = [];
        
        for (let i = 0; i < events.length; i++) {
            info.push({ /*
                title: events[i].querySelector(".card-body.hover-more a").innerHTML,
                location: events[i].querySelector(".meta-item.event-location span").innerHTML,
                date: events[i].querySelector(".meta-item.event-time span").innerHTML */
                elementType: 'carouselCardItem',
                title: events[i].querySelector(".card-body.hover-more a").innerHTML,
                link: {
                    "external": events[i].querySelector(".card-link").href
                },
                description: events[i].querySelector(".meta-item.event-location span").innerHTML,
                //date: events[i].querySelector(".meta-item.event-time span").innerHTML
                image: {
                    url: events[i].querySelector(".card-image img").src
                    //url: 'https://www.wastatepta.org/wp-content/uploads/2016/11/Senior-volunteer-helping-African-American-man-register-for-marathon-000065245281_Medium.jpg'
                  }
            });
        }

        return info;
    })

    console.log(data);
    await browser.close()
    return data;
};
//scrapeInfo();
//module.exports.webInfo = webInfo;
//export {webInfo};
export {scrapeInfo};
//export default webInfo;

