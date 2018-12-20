const request = require('request');
const prompts = require('prompts');
const conf = require('./config.js');

(async() => {
    // Setting of argument from command line
    let questions = [
        {
            type: 'select',
            name: 'app',
            message: 'Choose app name you want to create.',
            choices: conf.choices,
            initial: 0
        },
        {
            type: 'text',
            name: 'domain',
            message: 'Input your kintone domain name.'
        },
        {
            type: 'text',
            name: 'user',
            message: 'Input your user name.'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Input your password.'
        }
    ];

    let onCancel = prompt => {
        console.log('Please answer all question.');
        return true;
    }
    let response = await prompts(questions, { onCancel });

    // Config information of kintone env.
    const buffer = new Buffer.from(response.user + ':' + response.password);
    var base = buffer.toString('base64');

    const config = {
        domain: response.domain,
        headers: {
            'X-Cybozu-Authorization': base,
            'Content-Type': 'application/json'
        }
    };

    // Create app to test environment
    const createApp = () => {
        let objPreviewApp = {
            'name': response.app
        };
    
        let paramsPreviewApp = {
            url: 'https://' + config.domain + '.cybozu.com/k/v1/preview/app.json',
            method: 'POST',
            json: true,
            headers: config.headers,
            body: objPreviewApp
        };
    
        return new Promise((resolve, reject) => {
            return request(paramsPreviewApp, (error, respCreate, body) => {
                if (error) {
                    reject(error);
                    return;
                } else if (respCreate.statusCode !== 200) {
                    reject(respCreate.body.message + '(create app)');
                    return;
                }
                resolve(respCreate);
                console.log(' Create success: app(' + respCreate.body.app + '), ' + 'revision(' + respCreate.body.revision + ')');
            });
        });
    };
    
    // Add fields
    const addFields = (respCreate) => {
        let objAddFields;
        conf.appTemps.map((appTemp) => {
            if (appTemp.name === response.app) {
                objAddFields = {
                    "app": respCreate.body.app,
                    "properties": appTemp.fields
                }
            }
        });
        
        let paramsAddFields = {
            url: 'https://' + config.domain + '.cybozu.com/k/v1/preview/app/form/fields.json',
            method: 'POST',
            json: true,
            headers: config.headers,
            body: objAddFields
        };

        return new Promise((resolve, reject) => {
            return request(paramsAddFields, (error, respAdd, body) => {
                if (error) {
                    reject(error);
                    return;
                } else if (respAdd.statusCode !== 200) {
                    reject(respAdd.body.message + '(add fields)');
                    return;
                }
                resolve(respCreate, respAdd);
                console.log(' Add fields success: revision(' + respAdd.body.revision + ')');
            });
        });
    };

    // Deploy app
    const deployApp = (respCreate) => {
        let objDeployApp = {
            "apps": [
                {
                    "app": respCreate.body.app
                }
            ]
        };

        let paramsDeployApp = {
            url: 'https://' + config.domain + '.cybozu.com/k/v1/preview/app/deploy.json',
            method: 'POST',
            json: true,
            headers: config.headers,
            body: objDeployApp
        };

        return new Promise((resolve, reject) => {
            return request(paramsDeployApp, (error, respDeploy, body) => {
                if (error) {
                    reject(error);
                    return;
                } else if (respDeploy.statusCode !== 200) {
                    reject(respDeploy.body.message + '(deploy app)');
                    return;
                }
                resolve(respDeploy)
                console.log(' Deploy success: app(' + respCreate.body.app + ')');
                console.log(' ☆*:.｡. o(≧▽≦)o .｡.:*☆');
            });
        });
    };

    // Execution function
    Promise.resolve()
        .then(createApp)
        .then(addFields)
        .then(deployApp)
        .catch((error) => {
            console.log('Error: ' + error);
        });
})();