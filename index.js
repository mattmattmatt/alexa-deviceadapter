var mqtt = require('./mqtt');

/**
 * Main entry point.
 * Incoming events from Alexa Lighting APIs are processed via this method.
 */
exports.handler = function(event, context) {
    log('Input', event);
    switch (event.directive.header.namespace) {
        case 'Alexa.Discovery':
            handleDiscovery(event, context);
            break;
        case 'Alexa.PowerController':
            handlePower(event, context);
            break;
        case 'Alexa.PlaybackController':
            handlePlayback(event, context);
            break;
        case 'Alexa.Speaker':
            handleSpeaker(event, context);
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
function handleDiscovery(event, context) {
    /**
     * Craft the final response back to Alexa Smart Home Skill. This will include all the
     * discoverd appliances.
     */
    var result = {
        event: {
            header: {
                namespace: 'Alexa.Discovery',
                name: 'Discover.Response',
                payloadVersion: '3',
                messageId: event.directive.header.messageId,
            },
            payload: {
                endpoints: [
                    {
                        endpointId: 'music1',
                        friendlyName: 'Apartment',
                        description: 'Music on Kodi',
                        manufacturerName: 'Cubox-i',
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                'properties.supported': [
                                    {
                                        name: 'powerState',
                                    },
                                ],
                            },
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PlaybackController',
                                version: '1.0',
                                properties: {},
                            },
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.Speaker',
                                version: '1.0',
                                'properties.supported': [
                                    {
                                        name: 'volume',
                                    },
                                    {
                                        name: 'muted',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        endpointId: 'tv1',
                        friendlyName: 'TV',
                        description: "Matt's TV",
                        manufacturerName: 'Sony',
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        endpointId: 'all1',
                        friendlyName: 'everything',
                        description: 'Turn lights, music and TV on or off',
                        manufacturerName: 'all',
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'movies',
                        description: 'Turns on TV and movies',
                        friendlyName: 'Movies',
                        manufacturerName: 'Matt',
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'tvshows',
                        description: 'Turns on TV and TV shows',
                        friendlyName: 'TV Shows',
                        manufacturerName: 'Matt',
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'lightsbright',
                        description: 'Light scene',
                        friendlyName: 'bright',
                        manufacturerName: 'Matt',
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'lightsreading',
                        description: 'Light scene',
                        friendlyName: 'reading',
                        manufacturerName: 'Matt',
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'lightsrelax',
                        description: 'Light scene',
                        friendlyName: 'relax',
                        manufacturerName: 'Matt',
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'lightsbedtime',
                        description: 'Light scene',
                        friendlyName: 'bedtime',
                        manufacturerName: 'Matt',
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'lightsred',
                        description: 'Light scene',
                        friendlyName: 'red',
                        manufacturerName: 'Matt',
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'lightsminimal',
                        description: 'Light scene',
                        friendlyName: 'minimal',
                        manufacturerName: 'Matt',
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'lightsparty',
                        description: 'Light scene',
                        friendlyName: 'party',
                        manufacturerName: 'Matt',
                    },
                    {
                        displayCategories: [],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PowerController',
                                version: '1.0',
                                properties: {
                                    supported: [
                                        {
                                            name: 'powerState',
                                        },
                                    ],
                                },
                            },
                        ],
                        cookie: {
                            isScene: true,
                        },
                        endpointId: 'lightssmart',
                        description: 'Light scene',
                        friendlyName: 'smart',
                        manufacturerName: 'Matt',
                    },
                ],
            },
        },
    };
    log('Discovery', JSON.stringify(result));
    context.succeed(result);
}

function sendToMqtt(topic, payload, event, context, properties) {
    mqtt.send(topic, payload).then(
        function() {
            console.log('Success: ' + topic + ' ' + (payload || ''));

            var response = {
                context: {
                    properties: [
                        {
                            namespace: 'Alexa.PowerController',
                            name: 'powerState',
                            value: 'ON',
                            timeOfSample: '2017-02-03T16:20:50.52Z',
                            uncertaintyInMilliseconds: 500,
                        },
                    ],
                },
                event: {
                    header: {
                        namespace: 'Alexa',
                        name: 'Response',
                        payloadVersion: '3',
                        messageId: 'abc-123-def-456',
                        correlationToken: 'dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==',
                    },
                    endpoint: {
                        scope: {
                            type: 'BearerToken',
                            token: 'access-token-from-Amazon',
                        },
                        endpointId: 'appliance-001',
                    },
                    payload: {},
                },
            };

            var request = {
                directive: {
                    header: {
                        namespace: 'Alexa.PowerController',
                        name: 'TurnOff',
                        payloadVersion: '3',
                        messageId: '1bd5d003-31b9-476f-ad03-71d471922820',
                        correlationToken: 'dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==',
                    },
                    endpoint: {
                        scope: {
                            type: 'BearerToken',
                            token: 'access-token-from-skill',
                        },
                        endpointId: 'appliance-001',
                        cookie: {},
                    },
                    payload: {},
                },
            };

            var dir = event.directive;

            context.succeed({
                context: {
                    properties: properties,
                },
                event: {
                    header: {
                        namespace: 'Alexa',
                        name: 'Response',
                        payloadVersion: '3',
                        messageId: dir.header.messageId,
                        correlationToken: dir.header.correlationToken,
                    },
                    endpoint: {
                        endpointId: dir.endpoint.endpointId,
                    },
                },
                payload: {},
            });
        },
        function(e) {
            console.log(
                'Error: ' + JSON.stringify(e) + ' when sending ' + topic + ' ' + (payload || '')
            );
            context.fail(generateControlError(event, 'ENDPOINT_UNREACHABLE'));
        }
    );
}

function getPowerStateProperty(value) {
    return {
        namespace: 'Alexa.PowerController',
        name: 'powerState',
        value: value,
        timeOfSample: new Date().toISOString,
        uncertaintyInMilliseconds: 800,
    };
}

function handlePower(event, context) {
    endpointId = event.directive.endpoint.endpointId;
    cookie = event.directive.endpoint.cookie;

    log('appliance', endpointId);

    switch (endpointId) {
        case 'tv1':
            if (event.directive.header.name === 'TurnOff') {
                sendToMqtt('events/tv', '0', event, context, [getPowerStateProperty('OFF')]);
            } else {
                sendToMqtt('events/tv', '1', event, context, [getPowerStateProperty('ON')]);
            }
            break;
        case 'all1':
            if (event.directive.header.name === 'TurnOff') {
                sendToMqtt('events/home/leaving', undefined, event, context, [
                    getPowerStateProperty('OFF'),
                ]);
            } else {
                sendToMqtt('events/home/coming', undefined, event, context, [
                    getPowerStateProperty('ON'),
                ]);
            }
            break;
            6;
        case 'music1':
            if (event.directive.header.name === 'TurnOff') {
                sendToMqtt('events/kodi/execute', 'stop', event, context, [
                    getPowerStateProperty('OFF'),
                ]);
            } else {
                sendToMqtt('events/music/play', undefined, event, context, [
                    getPowerStateProperty('ON'),
                ]);
            }
            break;
        case 'some-endpoint':
            sendToMqtt('noop', '', event, context);
            break;
        default:
            if (cookie.isScene) {
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
                sendToMqtt(topicMap[endpointId][0], topicMap[endpointId][1], event, context, [
                    getPowerStateProperty('ON'),
                ]);
            } else {
                context.fail(generateControlError(event, 'INVALID_DIRECTIVE'));
            }
    }
}

function handlePlayback(event, context) {
    endpointId = event.directive.endpoint.endpointId;
    cookie = event.directive.endpoint.cookie;

    log('appliance', endpointId);

    switch (event.directive.header.name) {
        case 'Next':
            sendToMqtt('events/kodi/execute', 'next', event, context);
            break;
        case 'Pause':
            sendToMqtt('events/kodi/execute', 'pause', event, context);
            break;
        case 'Play':
            sendToMqtt('events/kodi/execute', 'play', event, context);
            break;
        case 'Previous':
            sendToMqtt('events/kodi/execute', 'previous', event, context);
            break;
        case 'Stop':
            sendToMqtt('events/kodi/execute', 'stop', event, context);
            break;
        case 'FastForward':
            sendToMqtt('events/kodi/execute', 'ff', event, context);
            break;
        case 'Rewind':
            sendToMqtt('events/kodi/execute', 'fr', event, context);
            break;
        case 'StartOver':
            sendToMqtt('events/kodi/execute', 'previous', event, context);
            break;
        default:
            context.fail(generateControlError(event, 'INVALID_DIRECTIVE'));
    }
}

function handleSpeaker(event, context) {
    endpointId = event.directive.endpoint.endpointId;
    cookie = event.directive.endpoint.cookie;

    log('appliance', endpointId);

    switch (event.directive.header.name) {
        case 'SetMute':
            sendToMqtt('events/kodi/execute', 'mute', event, context);
            break;
        case 'SetVolume':
            sendToMqtt('events/kodi/volume', event.directive.payload.volume, event, context);
            break;
        case 'AdjustVolume':
            sendToMqtt('events/kodi/volume', event.directive.payload.volumeDelta, event, context);
            break;
        default:
            context.fail(generateControlError(event, 'INVALID_DIRECTIVE'));
    }
}

/**
 * Control events are processed here.
 * This is called when Alexa requests an action (IE turn off appliance).
 */
function handleControl(event, context) {
    var applianceId = event.payload.endpoint.applianceId;
    var details = event.payload.endpoint.cookie;
    log('appliance', event.payload.endpoint);

    if (applianceId === 'music1') {
        if (event.header.name === 'SetPercentageRequest') {
            sendToMqtt(
                'events/kodi/volume',
                JSON.stringify(Math.round(event.payload.percentageState.value)),
                'SetPercentageConfirmation',
                context
            );
        }
    }
}

function log(title, msg) {
    console.log(title + ':', msg);
}

function generateControlError(event, type) {
    return {
        event: {
            header: {
                namespace: 'Alexa',
                name: 'ErrorResponse',
                messageId: event.directive.header.messageId,
                payloadVersion: '3',
            },
            payload: {
                type: type,
                message: 'generateControlError',
            },
        },
    };
}
