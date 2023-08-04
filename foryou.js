function getModule() {

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "contentContainerWidth": "wide",
        "content": [
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
                                "heading": "For You",
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
                                        "heading": "Full-bleed images",
                                        "imageStyle": "fullbleedGradient",
                                        "titleLineClamp": 3,
                                        "descriptionLineClamp": 3,
                                        "items": [
                                            {
                                                "elementType": "carouselCardItem",
                                                "title": "New South Wing dining hall is open!",
                                                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin justo vel augue finibus, vehicula vulputate lacus vulputate. In elit diam, dictum vitae tortor in, tempus mattis tortor. Mauris eget dolor vehicula, malesuada dui vel, imperdiet tortor.",
                                                "image": {
                                                    "url": "https://images.unsplash.com/photo-1604326531570-2689ea7ae287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
                                                    "alt": "unsplash Harith Irfan Wahid"
                                                }
                                            },
                                            {
                                                "elementType": "carouselCardItem",
                                                "title": "Donec facilisis, sapien eget congue tempor",
                                                "description": "Curabitur cursus tellus quam, a porttitor nisi tincidunt a. Vestibulum vel eros metus. Morbi lorem velit, scelerisque sit amet mattis quis, porta ac justo. Fusce aliquam erat enim, id fringilla ligula laoreet eu.",
                                                "image": {
                                                    "url": "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                                                    "alt": "unsplash Adrien Olichon"
                                                }
                                            },
                                            {
                                                "elementType": "carouselCardItem",
                                                "title": "Praesent porttitor nulla eros",
                                                "description": "Nullam hendrerit dignissim ante vel ornare. Duis vitae diam dui. Maecenas nibh urna, luctus eget est eu, tempor vestibulum orci.",
                                                "image": {
                                                    "url": "https://images.unsplash.com/photo-1627556704353-016baeb12c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                                                    "alt": "unsplash Rut Mit"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "elementType": "list",
                                "listStyle": "unpadded",
                                "imageStyle": "thumbnailSmall",
                                "marginTop": "medium",
                                "marginBottom": "none",
                                "showBottomBorder": false,
                                "items": [
                                    {
                                        "title": "In navigatino",
                                        "description": "Cras mattis consectetur purus sit amet fermentum",
                                        "image": {
                                            "url": "https://kgo-app-assets.modolabs.net/shared/iconsets/stroke-fullcolor/90/agenda.png",
                                            "alt": "agenda icon"
                                        },
                                        "link": {
                                            "relativePath": ""
                                        }
                                    },
                                    {
                                        "title": "Donec sed odio dui",
                                        "description": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Curabitur blandit tempus porttitor",
                                        "image": {
                                            "url": "https://kgo-app-assets.modolabs.net/shared/iconsets/stroke-fullcolor/90/innovation.png",
                                            "alt": "innovation icon"
                                        },
                                        "link": {
                                            "relativePath": ""
                                        }
                                    },
                                    {
                                        "title": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor",
                                        "description": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit",
                                        "image": {
                                            "url": "https://kgo-app-assets.modolabs.net/shared/iconsets/stroke-fullcolor/90/laundry.png",
                                            "alt": "laundry icon"
                                        },
                                        "link": {
                                            "relativePath": ""
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return xmJson;

};

module.exports.getModule = getModule;