var mqtt = require('./mqtt');

/**
 * Main entry point.
 * Incoming events from Alexa Lighting APIs are processed via this method.
 */
exports.handler = function(event, context) {
    log('Input', event);
    switch (event.header.namespace) {
        case 'Alexa.ConnectedHome.Discovery':
            handleDiscovery(event, context);
            break;
        case 'Alexa.ConnectedHome.Control':
            handleControl(event, context);
            break;
        default:
            log('Err', 'No supported namespace: ' + event.header.namespace);
            context.fail('Something went wrong');
            break;
    }
};

/**
 * This method is invoked when we receive a "Discovery" message from Alexa Smart Home Skill.
 * We are expected to respond back with a list of appliances that we have discovered for a given
 * customer.
 */
function handleDiscovery(accessToken, context) {
    /**
     * Craft the final response back to Alexa Smart Home Skill. This will include all the
     * discoverd appliances.
     */
    var result = {
        "header": {
            "name": "DiscoverAppliancesResponse",
            "namespace": "Alexa.ConnectedHome.Discovery",
            "payloadVersion": "2"
        },
        "payload": {
            "discoveredAppliances": [{
                    "actions": [
                        "turnOn",
                        "turnOff",
                        "setPercentage"
                    ],
                    "additionalApplianceDetails": {},
                    "applianceId": "music1",
                    "friendlyDescription": "Music on Kodi via MQTT",
                    "friendlyName": "Cody",
                    "isReachable": true,
                    "manufacturerName": "Cubox-i",
                    "modelName": "Kodi",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn",
                        "turnOff"
                    ],
                    "additionalApplianceDetails": {},
                    "applianceId": "tv1",
                    "friendlyDescription": "Matt's TV via MQTT",
                    "friendlyName": "TV",
                    "isReachable": true,
                    "manufacturerName": "LG",
                    "modelName": "Flatscreen",
                    "version": "1"
                },
                {
                    "actions": [
                        "turnOn",
                        "turnOff"
                    ],
                    "additionalApplianceDetails": {},
                    "applianceId": "all1",
                    "friendlyDescription": "Turn lights and music on or off via MQTT",
                    "friendlyName": "everything",
                    "isReachable": true,
                    "manufacturerName": "all",
                    "modelName": "all",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "movies",
                    "friendlyDescription": "Movie time scene via MQTT",
                    "friendlyName": "movie time",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "tvshows",
                    "friendlyDescription": "TV show scene via MQTT",
                    "friendlyName": "tv episodes",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "lightsbright",
                    "friendlyDescription": "Light scene via MQTT",
                    "friendlyName": "bright",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "lightsreading",
                    "friendlyDescription": "Light scene via MQTT",
                    "friendlyName": "reading",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "lightsrelax",
                    "friendlyDescription": "Light scene via MQTT",
                    "friendlyName": "relax",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "lightsbedtime",
                    "friendlyDescription": "Light scene via MQTT",
                    "friendlyName": "bedtime",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "lightsred",
                    "friendlyDescription": "Light scene via MQTT",
                    "friendlyName": "red",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "lightsminimal",
                    "friendlyDescription": "Light scene via MQTT",
                    "friendlyName": "minimal",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "lightsparty",
                    "friendlyDescription": "Light scene via MQTT",
                    "friendlyName": "party",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                },
                {
                    "actions": [
                        "turnOn"
                    ],
                    "additionalApplianceDetails": {
                        "isScene": true,
                    },
                    "applianceId": "lightssmart",
                    "friendlyDescription": "Light scene via MQTT",
                    "friendlyName": "smart",
                    "isReachable": true,
                    "manufacturerName": "Matt",
                    "modelName": "Scene",
                    "version": "0"
                }
            ]
        }
    };
    log('Discovery', result);
    context.succeed(result);
}

function sendToMqtt(topic, payload, name, context) {
    mqtt.send(topic, payload).then(function() {
        console.log('Success: ' + topic + ' ' + (payload || ''));
        context.succeed({
            "header": {
                "name": name,
                "namespace": "Alexa.ConnectedHome.Control",
                "payloadVersion": "2"
            },
            "payload": {}
        });

    }, function(e) {
        console.log('Error: ' + JSON.stringify(e) +
            ' when sending ' + topic + ' ' + (payload || ''));
        context.fail(generateControlError(name,
            'DEPENDENT_SERVICE_UNAVAILABLE',
            'Unable to connect to MQTT'));
    });
}

/**
 * Control events are processed here.
 * This is called when Alexa requests an action (IE turn off appliance).
 */
function handleControl(event, context) {
    if (event.header.namespace != 'Alexa.ConnectedHome.Control') {
        context.fail(generateControlError('Control Request',
            'UNSUPPORTED_OPERATION', 'Unrecognized operation',
            event.header.namespace, event.header.name));
    }

    var applianceId = event.payload.appliance.applianceId;
    var details = event.payload.appliance.additionalApplianceDetails;
    log('appliance', event.payload.appliance);

    if (applianceId === 'tv1') {
        if (event.header.name === 'TurnOnRequest') {
            sendToMqtt('events/tv', '1', 'TurnOnConfirmation', context);
        }
        if (event.header.name === 'TurnOffRequest') {
            sendToMqtt('events/tv', '0', 'TurnOffConfirmation', context);
        }
    }

    if (applianceId === 'music1') {
        if (event.header.name === 'TurnOnRequest') {
            sendToMqtt('events/music/play', undefined, 'TurnOnConfirmation', context);
        }
        if (event.header.name === 'TurnOffRequest') {
            sendToMqtt('events/music/play', undefined, 'TurnOffConfirmation', context);
        }
        if (event.header.name === 'SetPercentageRequest') {
            sendToMqtt(
                'events/kodi/volume',
                JSON.stringify(Math.round(event.payload.percentageState.value)),
                'SetPercentageConfirmation',
                context
            );
        }
    }

    if (applianceId === 'all1') {
        if (event.header.name === 'TurnOnRequest') {
            sendToMqtt('events/home/coming', undefined, 'TurnOnConfirmation', context);
        }
        if (event.header.name === 'TurnOffRequest') {
            sendToMqtt('events/home/leaving', undefined, 'TurnOffConfirmation', context);
        }
    }

    if (details.isScene && event.header.name === 'TurnOnRequest') {
        var topicMap = {
            movies: ['events/watch/movie', undefined],
            tvshows: ['events/watch/tvshow', undefined],
            lightsbright: ['events/lights/scene', 'bright'],
            lightsreading: ['events/lights/scene', 'reading'],
            lightsrelax: ['events/lights/scene', 'relax'],
            lightsbedtime: ['events/lights/scene', 'bedtime'],
            lightsred: ['events/lights/scene', 'red'],
            lightsminimal: ['events/lights/scene', 'minimal'],
            lightsparty: ['events/lights/scene', 'party'],
            lightssmart: ['events/lights/scene', 'on'],
        };
        sendToMqtt(topicMap[applianceId][0], topicMap[applianceId][1], 'TurnOnConfirmation', context);
    }
}

function log(title, msg) {
    console.log(title + ':', msg);
}

function generateControlError(name, code, description) {
    var headers = {
        namespace: 'Alexa.ConnectedHome.Control',
        name: name,
        payloadVersion: '2'
    };

    var payload = {
        exception: {
            code: code,
            description: description
        }
    };

    var result = {
        header: headers,
        payload: payload
    };

    return result;
}
