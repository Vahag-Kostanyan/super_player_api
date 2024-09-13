const { sendSendNotification } = require('../../../api/sendNotification.js');
const blumConfigsModule = require('../models/configs.js');

class PrepareConfigService {
    constructor(){
        if (new.target === PrepareConfigService) {
            throw new Error("Cannot instantiate an abstract class.");
        }
    }

    async triggerAction () {
        throw new Error("The triggerAction method must be overridden in the child class");
    }

    async run()
    {
        const configs = await blumConfigsModule.getConfigs();
        await configs.forEach(async (config) => {
            if (this.can(config)) {
                let correctConfig = await this.checkAndGetValidToken(config);
                await this.triggerAction(correctConfig);
            }
        });
    }

    async checkAndGetValidToken(config) {
        const requestOptions = this.prepareRequestOptions('GET', config.token);
        let check = await fetch('https://game-domain.blum.codes/api/v1/user/balance', requestOptions);
        if (check.status == 401) {
            let newToken = await this.generateValidToken(config);
            config.token = newToken;
            await blumConfigsModule.updateConfigsToken(config.id, newToken );
        }

        return config;
    }

    async generateValidToken(config) {
        try {
            let data = {
                query: config.query_id
            }

            const requestOptions = this.prepareRequestOptions('POST', null, data);

            let newToken = await fetch('https://user-domain.blum.codes/api/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP', requestOptions);
            newToken = await newToken.json();

            
            return newToken.token.access;
        } catch (error) {
            const errorMessage = error.message || error.toString(); // Get the error message
            await sendSendNotification(`Blum generateValidToken error ${errorMessage}`);
        }
    }

    prepareRequestOptions(method, token = null, data = {}) {
        const headers = new Headers();

        if (token) {
            headers.append(
                "Authorization",
                "Bearer " + token
            );
        }

        headers.append("Content-Type", "application/json");

        if (method === 'GET') {
            return {
                method: method,
                headers: headers,
                redirect: "follow",
            };
        }

        return {
            method: method,
            headers: headers,
            body: JSON.stringify(data),
            redirect: "follow",
        };
    }
}


module.exports = PrepareConfigService;