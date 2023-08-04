// index.js
const serverless = require('serverless-http');
const express = require('express');
const auth = require('./authorizer.js');
const sc = require('./schedule.js');
//const fs = require('fs')
//const fy = require('./foryou.js')
//const ws = require('./webscraper.js');
//import {scrapeInfo} from './webscraper.js';
let payload = null;
let loadModule = null;

// instantiate the express server
const app = express();

// used to get post events as JSON objects correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(function (req, res, next) {
    payload = ('authorization' in req.headers && req.headers.authorization != null) ? auth.getPayload(req.headers.authorization) : null;
    if (payload != null && 'name' in payload) {
        console.log("NAME:", payload.name);
        res.locals.name = payload.name
        //name = payload.name
    }
    next()
})

// Main Function
app.get('/hello', async function (req, res) {
    console.log(req);

    //let payload = ('authorization' in req.headers && req.headers.authorization != null) ? auth.getPayload(req.headers.authorization) : null;
    console.log("PAYLOAD PRINT: ", JSON.stringify(payload));
    
    // Make a list for all event elements
    let displayEvents = [];

    // Show Events around Campus
    //const ndEvents = ws.scrapeInfo();
    //const ndEvents = webInfo();
    let ndEvents = await ndforyou()
    //let ndEvents = scrapeInfo;
    for (let i = 0; i < ndEvents.length; i++) {
        displayEvents.push(ndEvents[i]);
    }
    //displayEvents.push(ndEvents);
    //console.log(ndEvents);

    // Show Events around South Bend
    let myEvents = await foryou()
    //console.log("My Events", myEvents);
    //displayEvents = myEvents;
    for (let i = 0; i < myEvents.length; i++) {
        displayEvents.push(myEvents[i]);
    }
    //displayEvents.push(myEvents);
    console.log(displayEvents);

    let xmJson = 
    {
        "metadata": {
            "version": "2.0"
        },
        "contentContainerWidth": "narrow",
        "content": [
            {
                "elementType": "container",
                "id": "example_arrangements",
                "content": [
                    {
                        "elementType": "hero",
                        "height": "fluid",
                        "contentContainerWidth": "wide",
                        "backgroundImage": {
                            "url": "https://tour.nd.edu/assets/385371/1200x/dome.jpg",
                            "cropVerticalPosition": "top",
                            "overlayType": "gradient",
                            "overlayGradientStartColor": "rgba(0,20,60,0.93)",
                            "overlayGradientEndColor": "rgba(0,10,20,0)",
                            "overlayGradientStartPosition": 25,
                            "overlayGradientEndPosition": 85,
                            "overlayGradientAngle": 20,
                            "overlayBlend": "multiply"
                        },
                        "content": [
                            {
                                "elementType": "heroHeading",
                                "heading": `Welcome, ${res.locals.name}!`,
                                "fontSize": "normal",
                                "textColor": "rgba(220,245,255,0.75)",
                                "responsiveScaling": true,
                                "marginTop": "15%",
                                "marginBottom": "0"
                            },
                            {
                                "elementType": "heroHeading",
                                "heading": " ",
                                "fontSize": "xxsmall",
                                "textColor": "#ffffff",
                                "responsiveScaling": true,
                                "marginTop": "0",
                                "marginBottom": "7.5%"
                            }
                        ]
                    }
                ]
            },
            {
                "elementType": "divider",
                "borderColor": "transparent"
            },
            {
                "elementType": "imageSampler",
                "id": "layout_a",
                "items": [
                    {
                        "image": {
                            "url": "https://kgo-asset-cache.modolabs.net/notredame/production/resource_storage/proxy/modulepage/students-_/homepage/kgoui_Rcontent_I0_Rcontent_I1_Rcontent_I0_Rtile1_I0%3Aproperty%3Abackground_common/Student-Life-Icons-for-Mobile-Ap.b11c9f28c116871de4005349999228fa.png",
                            "alt": "Image of a university by https://unsplash.com/@madebyvadim"
                        },
                        "link": {
                            //"relativePath": "./formexample"
                            "external": "https://nd.campuslabs.com/engage/"
                        }
                    },
                    {
                        "image": {
                            "url": "https://kgo-asset-cache.modolabs.net/notredame/production/resource_storage/proxy/modulepage/students-_/homepage/kgoui_Rcontent_I0_Rcontent_I1_Rcontent_I1_Rtile3_I0%3Aproperty%3Abackground_common/Academic-Icon-for-Mobile-App-200.ebf0da5c778bc5175aee9a749e5845e2.png",
                            "alt": "Image of a library by https://unsplash.com/@inakihxz"
                        },
                        "link": {
                            "relativePath": "./schedule"
                           // "relativePath": "page?relativePath=%2Fschedule"
                        }
                    },
                    {
                        "image": {
                            "url": "https://kgo-asset-cache.modolabs.net/notredame/production/resource_storage/proxy/modulepage/students-_/homepage/kgoui_Rcontent_I0_Rcontent_I1_Rcontent_I0_Rtile2_I0%3Aproperty%3Abackground_common/ID_Card-01.d2ff93143048828e8ba0036307f69ae8.png",
                            "alt": "Image of a person studying by https://unsplash.com/@craftedbygc"
                        },
                        "link": {
                            "external": "https://m.nd.edu/current_students/irish1card/index"
                        }
                    },
                    {
                        "image": {
                            "url": "https://kgo-asset-cache.modolabs.net/notredame/production/resource_storage/proxy/modulepage/students-_/homepage/kgoui_Rcontent_I0_Rcontent_I1_Rcontent_I0_Rtile3_I0%3Aproperty%3Abackground_common/Dining-01.2d009f17c10f646c62bf759e3ad1cb62.png",
                            "alt": "Image of a lecture by https://unsplash.com/@theunsteady5"
                        },
                        "link": {
                            "external": "https://m.nd.edu/current_students/on_campus_dining/index"
                        }
                    },
                    {
                        "image": {
                            "url": "https://kgo-asset-cache.modolabs.net/notredame/production/resource_storage/proxy/modulepage/students-_/homepage/kgoui_Rcontent_I0_Rcontent_I1_Rcontent_I1_Rtile1_I0%3Aproperty%3Abackground_common/Getting_Around-01.6f8d3a37d87ccbf197f82d4aa6e50fa1.png",
                            "alt": "Image of a cafeteria by https://unsplash.com/@mikakor"
                        },
                        "link": {
                            "external": "https://m.nd.edu/current_students/map"
                        }
                    }
                ]
            },
            {
                "elementType": "divider",
                "borderColor": "transparent"
            },
            {
                "elementType": "container",
                "id": "portlet_examples",
                "content": [
                    {
                        "elementType": "container",
                        "wrapperStyle": "focal",
                        "borderStyle": "none",
                        "borderRadius": "loose",
                        "padding": "medium",
                        "shadow": "medium",
                        "shadowOpacity": "0.4",
                        "content": [
                            {
                                "elementType": "blockHeading",
                                "marginTop": "none",
                                "heading": "Events For You",
                                "headingLevel": 2
                            },
                            {
                                "elementType": "cardSet",
                                "id": "carousel_images",
                                "size": "xlarge",
                                "marginTop": "xtight",
                                "items": [
                                    {
                                        "elementType": "carouselCard",
                                        "heading": "Events",
                                        "imageStyle": "fullbleedGradient",
                                        "titleLineClamp": 3,
                                        "descriptionLineClamp": 3,
                                        "items": displayEvents 
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
       

   // let printEvents = foryou(myEvents);
   // console.log("PRINTED EVENTS", foryou(displayEvents));
    //console.log(foryou());
    console.log("Hello");

    // res.setHeader('Content-Type', 'application/json');
    // res.status = 200;
    res.json(xmJson);
});


async function ndforyou() {
    //let myNDEvents = ws.scrapeInfo();
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch(); // {headless : false});
    const page = await browser.newPage();
    await page.goto('https://events.nd.edu/');

    const data = await page.evaluate(() => {
        const events = document.querySelectorAll(".grid.grid-lg-3");
        let info = [];
        
        for (let i = 0; i < events.length; i++) {
            info.push({
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

    //console.log(data);
    await browser.close()
    return data;
};

async function foryou() {
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("f0a8429df8528199bf1e8dafde0fb186e43abf285e493ef37426defd38637e25");
    const params = {
        engine: "google_events",
        q: "Volunteer in South Bend",
        hl: "en",
        gl: "us"
    };

    // Function that returns a Promise for the API call
     async function searchEvents(params) {
    return new Promise((resolve, reject) => {
        search.json(params, data => {
        resolve(data);
        }, error => {
        reject(error);
        });
    });
    }

    let mylist = []
    let eventCount = 0;

    // Using the async/await syntax to get the results
    async function runAsyncTask() {
    try {
        const data = await searchEvents(params);
        //console.log(data["events_results"]);
        //mylist.push(data["events_results"]);
        data["events_results"].forEach(function(event) {
            // Ensure that there are no duplicate events
            if (mylist.some(e => e.title == data["events_results"][eventCount]['title']) == false) {
                mylist.push(
                    {
                        "elementType": "carouselCardItem",
                        "title": data["events_results"][eventCount]['title'],
                        //"heading": "HIIII",
                        "link": {
                            "external": data["events_results"][eventCount]['link']
                        },
                        //"title": data["events_results"]['title'],
                        //"title": data["events_results"]['title'],
                        "description": data["events_results"][eventCount]['description'],
                        "image": {
                            //"url": "https://images.unsplash.com/photo-1604326531570-2689ea7ae287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
                            "url": data["events_results"][eventCount]['image'],
                            "alt": "https://www.wastatepta.org/wp-content/uploads/2016/11/Senior-volunteer-helping-African-American-man-register-for-marathon-000065245281_Medium.jpg"
                        }
                    }
                );
            };
            eventCount++;
        });
    } catch (error) {
        console.error("Error occurred:", error);
    }
    }

    await runAsyncTask();

    console.log("My List", mylist);
    return mylist;
};  

app.get('/formexample', function(req, res) {
    console.log(req);

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "content": [
            {
                "elementType": "form",
                "id": "sample_form",
                "heading": {
                    "heading": "Sample form",
                    "headingLevel": 2,
                    "description": "Items marked with an asterisk (*) are required.",
                    "buttons": [
                        {
                            "elementType": "linkButton",
                            "size": "small",
                            "actionStyle": "normal",
                            "borderRadius": "full",
                            "title": "View in sandbox",
                            "link": {
                                "module": {
                                    "id": "sandbox",
                                    "page": "index",
                                    "targetNewWindow": true,
                                    "queryParameters": {
                                        "apiURL": "https://docs-training-api.modolabs.net/elementextractor?example=sample_form&file=form&size=narrow",
                                        "submit": "Load+from+URL",
                                        "_kgoFORM": "api"
                                    }
                                }
                            }
                        }
                    ]
                },
                "items": [
                    {
                        "elementType": "formInputText",
                        "name": "s1_first",
                        "label": "First name",
                        "required": true
                    },
                    {
                        "elementType": "formInputText",
                        "name": "s1_last",
                        "label": "Last name",
                        "required": true
                    },
                    {
                        "elementType": "formInputText",
                        "name": "s1_company",
                        "label": "Company"
                    },
                    {
                        "elementType": "formInputText",
                        "name": "s1_title",
                        "label": "Title"
                    },
                    {
                        "elementType": "formInputSegmented",
                        "name": "s1_age",
                        "label": "Age",
                        "options": {
                            "Under 25": "Under 25",
                            "25-40": "25-40",
                            "41-60": "41-60",
                            "61+": "61 or over"
                        },
                        "fullWidth": true
                    },
                    {
                        "elementType": "formInputAssistedSelect",
                        "name": "s1_animal",
                        "label": "Favorite animal",
                        "options": {
                            "": "",
                            "alpaca": "Alpaca",
                            "ant": "Ant",
                            "bird": "Bird",
                            "cat": "Cat",
                            "dog": "Dog",
                            "ferret": "Ferret",
                            "fish": "Fish",
                            "goat": "Goat",
                            "guinea": "Guinea pig",
                            "hedgehog": "Hedgehog",
                            "horse": "Horse",
                            "lizard": "Lizard",
                            "mouse": "Mouse",
                            "pig": "Pig",
                            "rabbit": "Rabbit",
                            "rat": "Rat",
                            "salamander": "Salamander",
                            "seal": "Seal",
                            "shark": "Shark",
                            "sheep": "Sheep",
                            "snake": "Snake",
                            "spider": "Spider",
                            "turtle": "Turtle",
                            "weasel": "Weasel"
                        }
                    },
                    {
                        "elementType": "formInputRadio",
                        "label": "Preferred contact",
                        "preamble": "What's the best way to reach you?",
                        "name": "s1_contact",
                        "options": {
                            "email": "Email",
                            "phone": "Phone",
                            "text": "Text",
                            "discord": "Discord"
                        },
                        "nested": true,
                        "progressiveDisclosureItems": {
                            "email": [
                                {
                                    "elementType": "formInputEmail",
                                    "name": "s1_email",
                                    "label": "Email address",
                                    "required": true
                                }
                            ],
                            "phone": [
                                {
                                    "elementType": "formInputPhone",
                                    "name": "s1_phone",
                                    "label": "Phone number"
                                }
                            ],
                            "text": [
                                {
                                    "elementType": "formInputPhone",
                                    "name": "s1_text",
                                    "label": "Phone number for text"
                                }
                            ],
                            "discord": [
                                {
                                    "elementType": "formInputText",
                                    "name": "s1_discord",
                                    "label": "Discord username"
                                }
                            ]
                        }
                    }
                ],
                "buttons": [
                    {
                        "elementType": "formButton",
                        "name": "s1_reset",
                        "title": "Reset",
                        "buttonType": "reset",
                        "actionStyle": "destructiveQuiet",
                        "minWidth": "8rem"
                    },
                    {
                        "elementType": "formButton",
                        "name": "s1_submit",
                        "title": "Submit",
                        "buttonType": "submit",
                        "actionStyle": "constructive",
                        "minWidth": "8rem"
                    }
                ],
                "trackDirtyStateButtonNames": [
                    "s1_submit"
                ],
                "buttonsHorizontalAlignment": "center"
            }
        ]
    };

    res.json(xmJson);
});

app.post('/formexample', function (req, res) {
    console.log(req.body);

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "content": [
            {
                "elementType": "blockHeading",
                "heading": "Submission received",
                "description": "Thank you for your submission"
            }
        ]
    };

    res.json(xmJson);
});

app.get('/ajaxdatesolo', function(req, res) {
    console.log("AJAX Date function entered");
    console.log(req.query);
    let prevDays = -1, nextDays = 1, currentDate = new Date(), ajax = false;

    if ('days' in req.query) {
        ajax = true;
        prevDays = parseInt(req.query.days) - 1;
        nextDays = parseInt(req.query.days) + 1;
        currentDate.setDate(currentDate.getDate() + parseInt(req.query.days));
    }

    let xmJson = {
        metadata: {
            version: "2.0"
        }
    };
    
    let containerContents = [
        {
            elementType: "html",
            html: currentDate.toString()
        },
        {
            elementType: "buttonGroup",
            buttons: [
                {
                    elementType: "linkButton",
                    title: "Previous",
                    events: [
                        {
                            eventName: "click",
                            action: "ajaxUpdate",
                            targetId: "dateHolder",
                            ajaxRelativePath: `?days=${prevDays.toString()}`
                        }
                    ]
                },
                {
                    elementType: "linkButton",
                    title: "Next",
                    events: [
                        {
                            eventName: "click",
                            action: "ajaxUpdate",
                            targetId: "dateHolder",
                            ajaxRelativePath: `?days=${nextDays.toString()}`
                        }
                    ]
                }
            ]
        }
    ]

    if (ajax) {
        xmJson.elementFields = {
            content: containerContents
        }
    } else {
        xmJson.regionContent = [
            {
                elementType: "blockHeading",
                heading: "Selected Date below"
            },
            {
                elementType: "container",
                id: "dateHolder",
                content: containerContents
            }
        ];
    }

    console.log(JSON.stringify(xmJson));
    res.json(xmJson);

});

app.get('/ajaxdate', function(req, res) {
    console.log("AJAX Date function entered");
    console.log(req.query);
    let prevDays = -1, nextDays = 1, currentDate = new Date(), ajax = false;

    if ('days' in req.query) {
        ajax = true;
        prevDays = parseInt(req.query.days) - 1;
        nextDays = parseInt(req.query.days) + 1;
        currentDate.setDate(currentDate.getDate() + parseInt(req.query.days));
    }

    let xmJson = {
        metadata: {
            version: "2.0"
        }
    };
    
    let containerContents = [
        {
            elementType: "html",
            html: currentDate.toString()
        },
        {
            elementType: "buttonGroup",
            buttons: [
                {
                    elementType: "linkButton",
                    title: "Previous",
                    events: [
                        {
                            eventName: "click",
                            action: "ajaxUpdate",
                            targetId: "dateHolder",
                            ajaxRelativePath: `./ajaxdate?days=${prevDays.toString()}`
                        }
                    ]
                },
                {
                    elementType: "linkButton",
                    title: "Next",
                    events: [
                        {
                            eventName: "click",
                            action: "ajaxUpdate",
                            targetId: "dateHolder",
                            ajaxRelativePath: `./ajaxdate?days=${nextDays.toString()}`
                        }
                    ]
                }
            ]
        }
    ]

    if (ajax) {
        xmJson.elementFields = {
            content: containerContents
        }
    } else {
        xmJson.regionContent = [
            {
                elementType: "blockHeading",
                heading: "Selected Date below"
            },
            {
                elementType: "container",
                id: "dateHolder",
                content: containerContents
            }
        ];
    }

    res.json(xmJson);

});

app.get('/ajaxcontent', function (req, res) {
    console.log("AJAX Content function entered");
    console.log(JSON.stringify(req.query));

    let xmJson = {
        metadata: {
            version: "2.0"
        },
        content: [
            {
                elementType: "blockHeading",
                heading: "Outer Content"
            },
            {
                elementType: "container",
                content: {
                    ajaxRelativePath: './ajaxdate'
                }
            }
        ]
    };

    res.json(xmJson);
});

app.get('/quest/:id', function(req, res) {
    console.log(req.params);

    let xmJson = {
        metadata: {
            version: "2.0"
        },
        content: [
            {
                "elementType": "blockHeading",
                "heading": req.params.id
            }
        ]
    }

    res.json(xmJson);

});
module.exports.handler = serverless(app);

app.get('/schedule', function(req, res) {
    //let xmJson = sc.getInfo(res.locals.name);
    //let selectedDate = new Date();
    let currDate = new Date();
    currDate.setHours(0,0,0,0);
    let xmJson = sc.getInfo(res.locals.name, currDate);
    res.json(xmJson);
});

app.get('/schedule/ajax', function(req, res) {
    console.log("REQ QUERY:", req.query);
    console.log("Made it to SCHEDULE AJAX");
    let xmJson = sc.getInfoByAjax(res.locals.name, req.query.startdate);
    res.json(xmJson);
});

module.exports.handler = serverless(app);
