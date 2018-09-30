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
        case 'Alexa.SceneController':
            handleScene(event, context);
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
                        friendlyName: 'Kodi',
                        description: 'Media on Kodi',
                        manufacturerName: 'Cubox-i',
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
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.PlaybackController',
                                version: '3',
                                supportedOperations: [
                                    'Next',
                                    'Pause',
                                    'Play',
                                    'Previous',
                                    'Stop',
                                    'FastForward',
                                    'StartOver',
                                    'Rewind',
                                ],
                            },
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.Speaker',
                                version: '3',
                                properties: {
                                    supported: [
                                        {
                                            name: 'volume',
                                        },
                                        {
                                            name: 'muted',
                                        },
                                    ],
                                },
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
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: true,
                            },
                        ],
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'movies',
                        description: 'Turns on TV and movies',
                        friendlyName: 'Movies',
                        manufacturerName: "Matt's Smart Home",
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'tvshows',
                        description: 'Turns on TV and TV shows',
                        friendlyName: 'TV Shows',
                        manufacturerName: "Matt's Smart Home",
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'lightsbright',
                        description: 'Light scene',
                        friendlyName: 'bright',
                        manufacturerName: "Matt's Smart Home",
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'lightsreading',
                        description: 'Light scene',
                        friendlyName: 'reading',
                        manufacturerName: "Matt's Smart Home",
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'lightsrelax',
                        description: 'Light scene',
                        friendlyName: 'relax',
                        manufacturerName: "Matt's Smart Home",
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'lightsbedtime',
                        description: 'Light scene',
                        friendlyName: 'bedtime',
                        manufacturerName: "Matt's Smart Home",
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'lightsred',
                        description: 'Light scene',
                        friendlyName: 'red',
                        manufacturerName: "Matt's Smart Home",
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'lightsminimal',
                        description: 'Light scene',
                        friendlyName: 'minimal',
                        manufacturerName: "Matt's Smart Home",
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'lightsparty',
                        description: 'Light scene',
                        friendlyName: 'party',
                        manufacturerName: "Matt's Smart Home",
                    },
                    {
                        displayCategories: ['ACTIVITY_TRIGGER'],
                        capabilities: [
                            {
                                type: 'AlexaInterface',
                                interface: 'Alexa.SceneController',
                                version: '3',
                                supportsDeactivation: false,
                            },
                        ],
                        endpointId: 'lightssmart',
                        description: 'Light scene',
                        friendlyName: 'smart',
                        manufacturerName: "Matt's Smart Home",
                    },
                ],
            },
        },
    };
    log('Discovery', JSON.stringify(result));
    context.succeed(result);
}

function sendToMqtt(topic, payload) {
    log('Sending to mqtt', topic + ' ' + (payload || ''));

    return mqtt.send(topic, payload).then(
        function() {
            log('Success', topic + ' ' + (payload || ''));
            return Promise.resolve();
        },
        function(e) {
            log('Error', JSON.stringify(e) + ' when sending ' + topic + ' ' + (payload || ''));
            return Promise.reject(e);
        }
    );
}

function sendAlexaResponse(event, context, properties) {
    var dir = event.directive;
    var responseObject = {
        context: {
            properties: properties || [],
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
    };

    log('responseObject', JSON.stringify(responseObject, null, 4));

    return function() {
        context.succeed(responseObject);
    };
}

function sendActivationEvent(event, context, name) {
    var dir = event.directive;
    var date = new Date();
    var responseObject = {
        context: {},
        event: {
            header: {
                namespace: 'Alexa.SceneController',
                name: name || 'ActivationStarted',
                payloadVersion: '3',
                messageId: dir.header.messageId,
                correlationToken: dir.header.correlationToken,
            },
            endpoint: {
                endpointId: dir.endpoint.endpointId,
            },
            payload: {
                cause: {
                    type: 'VOICE_INTERACTION',
                },
                timestamp: date.toISOString(),
            },
        },
    };

    log('responseObject', JSON.stringify(responseObject, null, 4));

    return function() {
        context.succeed(responseObject);
    };
}

function sendAlexaFail(event, context) {
    return function() {
        context.fail(generateControlError(event, 'ENDPOINT_UNREACHABLE'));
    };
}

function getPowerStateProperty(value) {
    var date = new Date();
    return {
        namespace: 'Alexa.PowerController',
        name: 'powerState',
        value: value,
        timeOfSample: date.toISOString(),
        uncertaintyInMilliseconds: 500,
    };
}

function getVolumeStateProperty(vol) {
    var date = new Date();
    return {
        namespace: 'Alexa.Speaker',
        name: 'volume',
        value: vol,
        timeOfSample: '2017-02-03T16:20:50.52Z',
        timeOfSample: date.toISOString(),
        uncertaintyInMilliseconds: 500,
    };
}

function handlePower(event, context) {
    endpointId = event.directive.endpoint.endpointId;

    log('appliance', endpointId);

    switch (endpointId) {
        case 'tv1':
            if (event.directive.header.name === 'TurnOff') {
                sendToMqtt('events/tv', '0').then(
                    sendAlexaResponse(event, context, [getPowerStateProperty('OFF')]),
                    sendAlexaFail(event, context)
                );
            } else {
                sendToMqtt('events/tv', '1').then(
                    sendAlexaResponse(event, context, [getPowerStateProperty('ON')]),
                    sendAlexaFail(event, context)
                );
            }
            break;
        case 'music1':
            if (event.directive.header.name === 'TurnOff') {
                sendToMqtt('events/kodi/execute', 'stop').then(
                    sendAlexaResponse(event, context, [getPowerStateProperty('OFF')]),
                    sendAlexaFail(event, context)
                );
            } else {
                sendToMqtt('events/music/play').then(
                    sendAlexaResponse(event, context, [getPowerStateProperty('ON')]),
                    sendAlexaFail(event, context)
                );
            }
            break;
        default:
            context.fail(generateControlError(event, 'INVALID_DIRECTIVE'));
    }
}

function handleScene(event, context) {
    endpointId = event.directive.endpoint.endpointId;

    log('scene', endpointId);

    switch (endpointId) {
        case 'all1':
            var topic = 'events/home/leaving';
            var name = 'DeactivationStarted';
            if (event.directive.header.name === 'Activate') {
                topic = 'events/home/coming';
                name = 'ActivationStarted';
            }
            sendToMqtt(topic).then(
                sendActivationEvent(event, context, name),
                sendAlexaFail(event, context)
            );
            break;
        default:
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
            if (topicMap[endpointId][0]) {
                sendToMqtt(topicMap[endpointId][0], topicMap[endpointId][1]).then(
                    sendActivationEvent(event, context),
                    sendAlexaFail(event, context)
                );
            } else {
                context.fail(generateControlError(event, 'INVALID_DIRECTIVE'));
            }
    }
}

function handlePlayback(event, context) {
    endpointId = event.directive.endpoint.endpointId;
    cookie = event.directive.endpoint.cookie;

    log('appliance', endpointId);
    var action;

    switch (event.directive.header.name) {
        case 'Next':
            action = 'next';
            break;
        case 'Pause':
            action = 'pause';
            break;
        case 'Play':
            action = 'play';
            break;
        case 'Previous':
            action = 'previous';
            break;
        case 'Stop':
            action = 'stop';
            break;
        case 'FastForward':
            action = 'ff';
            break;
        case 'Rewind':
            action = 'fr';
            break;
        case 'StartOver':
            action = 'previous';
            break;
        default:
            context.fail(generateControlError(event, 'INVALID_DIRECTIVE'));
    }
    if (action) {
        sendToMqtt('events/kodi/execute', action).then(
            sendAlexaResponse(event, context),
            sendAlexaFail(event, context)
        );
    }
}

function handleSpeaker(event, context) {
    endpointId = event.directive.endpoint.endpointId;
    cookie = event.directive.endpoint.cookie;

    log('appliance', endpointId);

    switch (event.directive.header.name) {
        case 'SetMute':
            sendToMqtt('events/kodi/execute', 'mute').then(
                sendAlexaResponse(event, context),
                sendAlexaFail(event, context)
            );
            break;
        case 'SetVolume':
            sendToMqtt('events/kodi/volume', event.directive.payload.volume.toString()).then(
                sendAlexaResponse(event, context, [
                    getVolumeStateProperty(event.directive.payload.volume),
                ]),
                sendAlexaFail(event, context)
            );
            break;
        case 'AdjustVolume':
            sendToMqtt('events/kodi/volumeadjust', event.directive.payload.volume.toString()).then(
                sendAlexaResponse(event, context),
                sendAlexaFail(event, context)
            );
            break;
        default:
            context.fail(generateControlError(event, 'INVALID_DIRECTIVE'));
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
