/*const serverless = require('serverless-http');
const express = require('express');
//const ci = require('./classInfo.js');

// instantiate the express server
const app = express();

// used to get post events as JSON objects correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
*/

// Utilize Airtable API
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'patuYiWvMpIWLoE1Y.7afa47584d9507eeae24b3dd5726066e890cdb0139b43875e0672e986ae09c0f'}).base('apphPgEq2hrBbGwru');

let currSchedule = {}
let studentSchedule = {}

function getInfo(name, selectedDate) {

    //selectedDate = new Date (selectedDate);

    // List Table 1 records

    base('Table 1').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 3,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            //console.log(record.get('Name'));
            if (record.get('Name') == name) {
            //console.log('Retrieved', record.get('Name'));
                //console.log(record.fields);
                currSchedule = record.fields;
               // (Object.keys(currSchedule)).sort()
                console.log(currSchedule);
                console.log('Retrieved', name);
                //console.log('Class 1', record.get('Course 1'));
                //getSchedule(record, name, selectedDate)
                //continue;
            }
        });

        //console.log(records.name.get('Course 1'));

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    //getInfoByAjax(name, selectedDate);

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
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
                            "url": "https://www.neh.gov/sites/default/files/2018-06/openbooks.jpg",
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
                                "heading": `${name}'s Student Schedule`,
                                "fontSize": "normal",
                                "textColor": "rgba(220,245,255,0.75)",
                                "responsiveScaling": true,
                                "marginTop": "15%",
                                "marginBottom": "0"
                            },
                            {
                                "elementType": "heroHeading",
                                "heading": "Fall 2023",
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
                    "elementType": "dropdownCalendarPicker",
                    "events": [
                        {
                            "eventName": "changed",
                            "action": "ajaxUpdate",
                            "targetId": "accessory_buttons",
                            "ajaxRelativePath": "./schedule/ajax",
                            "propagateArgs": true
                        }
                    ]
                },
                {
                    "elementType": "divider",
                    "borderColor": "transparent"
                },
                {
                    "elementType": "eventList",
                    "id": "accessory_buttons",
                    "heading": selectedDate.toDateString(),
                    //"headingTextAlignment": "right",
                    "titleLineClamp": 3,
                    "descriptionLineClamp": 1,
                    "showTopBorder": false,
                    "showBottomBorder": false,
                    "marginBottom": "none",
                    //"items": getItems(name, new Date(), currSchedule)
                    "items": getItems(name, selectedDate, currSchedule)
                }
        ]
    };
    
    //console.log("selectedDate");

    //printSchedule()

    return xmJson;
};

module.exports.getInfo = getInfo;

function getInfoByAjax(name, selectedDate) {
    selectedDate = new Date (selectedDate);


    //getInfo(name);

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "elementFields": {
            "heading": selectedDate.toDateString(),
            "items": getItems(name, selectedDate, currSchedule)
        }
    };

    return xmJson;
};
module.exports.getInfoByAjax = getInfoByAjax;

function getItems(name, selectedDate, currSchedule) {

    //if (currSchedule === {}) {
    if (Object.keys(currSchedule).length === 0) {
        console.log("THIS IS EMPTY")
        base('Table 1').select({
            // Selecting the first 3 records in Grid view:
            maxRecords: 3,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            records.forEach(function(record) {
                if (record.get('Name') == name) {
                    console.log(record.fields);
                    currSchedule = record.fields;
                }
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        console.log(currSchedule);
    };

    studentSchedule = currSchedule;
    let templist = {};
    let displaySchedule = [];

    //selectedDate = JSON.parse(selectedDate);
    console.log("DATE SELECTED: ", selectedDate);
    //selectedDate = JSON.parse(selectedDate);
    console.log("DAY OF THE WEEK: ", selectedDate.getDay());
    getDay = selectedDate.getDay()
    console.log("Savannah's Schedule: ", studentSchedule);
    const dayNames = ["Su", "M", "T", "W", "Th", "F", "Sa"];
    currDay = dayNames[getDay];
    console.log(dayNames[getDay]);
   // console.log("Made it to GetITEMS");
   // console.log(studentSchedule);
    let noClass = true;
    let mainlist = {};

    const getLocations = {
        "DeBartolo Hall": "3955376e-50a0-5c99-a0e7-0ddc06056fbd",
        "Jordan Hall of Science": "b5a8c8cb-7b7f-52af-afac-6bed9b7b172d",
        "Ricci Band Rehearsal Hall": "2ac98bf5-bef4-5876-b1db-690e60954022",
        "Nieuwland Science Hall": "3ac28eec-4c4a-5fb8-9c98-25d9eb3b3e26"
    }
    //console.log(getLocations[])

    if (dayNames[getDay] == "Sa" || dayNames[getDay] == "Su") {
        displaySchedule.push({} //( "No Classes Today! Enjoy the Weekend :)"
           /* { 
                "
            } */
        )
    } else {
        for (const [key, val] of Object.entries(studentSchedule)) {
            // console.log("OBJECT: ", key, val);
            // console.log("MADE IT TO THIS LOOP");
            // noClass = true;
             //if (val == 'M W F') {
            //let mainlist = {}
             if (typeof(val) == 'string' && val.includes(currDay) == true && !(key in mainlist)) {
                 noClass = false;
                 templist = {};
                 //console.log(key,val);
                 // return only course and number
                 let courseNum = key.split(" ").shift();
                 // Get all information about the current course
                 for (const [key, val] of Object.entries(studentSchedule)) {
                     if (key.startsWith(courseNum) == true) {
                         //let startTime = 
                         mainlist[key] = val; 
                         templist[key] =  val;
                         //console.log(key,val);
                     }
                 };
                console.log("Main List: ", mainlist);
                console.log("Temp List:", templist);
                let startTime = "", date = null, duration = 0, className = null, professor = "", location = "", locationURL = "";
                 // Print that current course information
                 for (const [key, val] of Object.entries(templist)) {
                    if (key.includes("Start Time") == true) {
                        if (val >= 13) {
                            tempval = Math.round((val-12) * 100) / 100; //val - 12;
                            startTime = tempval.toString() + " PM";
                        } else if (val >= 12) startTime = val.toString() + " PM"; 
                        else {
                            startTime = val.toString() + " AM";
                        }
                        console.log("ST", startTime);

                        if (startTime.includes(".") == true) {
                            console.log("This is true");
                            startTime = startTime.replace(".3", ":30");
                        } //else //startTime = startTime.replace 
                    }
                    else if (key.includes("Date") == true) 
                        date = val;
                    else if (key.includes("Duration") == true)
                        duration = val/3600;
                    else if (key.includes("Professor") == true)
                        professor = val;
                    else if (key.includes("Location") == true) {
                        location = val;
                        let temploc = location.split(',');
                        console.log(temploc[0]);
                        //locationURL = getLocations.get(temploc[0]);
                        //console.log(typeof(getLocations));
                        //console.log(typeof(y))
                        //locationURL = getLocations.get("DeBartolo Hall");
                        locationURL = getLocations[temploc[0]];
                    }
                    else 
                        className = val;
                 };
     
                 displaySchedule.push(
                     {
                         "datetimePrimaryLine": startTime, //+ " AM/PM",
                         "datetimeSecondaryLine": duration + " hr",
                         "title": className,
                         "description": professor + " | " + location, //Arnold, Room 302",
                         "link": {
                            "relativePath": "./schedule"
                            /*"module": {
                                 "id": "courses",
                                 "page": "detail",
                                 //"queryparameters": "id=aacct101"
                             } */
                         },
                         "dividerColor": "#4B61B4",
                         "accessoryButton": {
                             "elementType": "linkButton",
                             "title": "View on map",
                             "icon": "map_pin",
                             "iconPosition": "iconOnly",
                             "size": "small",
                             "actionStyle": "normal",
                             "link": {
                                //"external": "https://m.nd.edu/current_students/map/index"
                                "external": "https://m.nd.edu/current_students/map/index?state=detail&feed=kml_buildings&id=" + locationURL
                                //https://m.nd.edu/current_students/map/index?feed=kml_buildings&id=3955376e-50a0-5c99-a0e7-0ddc06056fbd&state=directionsForm&destination%5Btype%5D=placemark&destination%5Bid%5D=3955376e-50a0-5c99-a0e7-0ddc06056fbd
                                /* "module": {
                                     "id": "map",
                                     "page": "./index",
                                     "queryparameters": "filter=Arnold&state=search"
                                 }  */
                             }
                         }
                     }
                 )
                 
             }
         };
    }

    return displaySchedule;
};

/*
app.get('/classInfo', function(req, res) {
    //let xmJson = sc.getInfo(res.locals.name);
    //let selectedDate = new Date();
    //let currDate = new Date();
   // currDate.setHours(0,0,0,0);
    let xmJson = ci.courseInformation(); 
    res.json(xmJson);
});

module.exports.handler = serverless(app);
*/