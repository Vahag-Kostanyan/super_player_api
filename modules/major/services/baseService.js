const { sendSendNotification } = require("../../../api/sendNotification");
const MajorConfigModule = require('../models/configs.js');

class MajorBaseService {

    playUrl = '';
    playName = '';

    constructor() {
        if (new.target === MajorBaseService) {
            throw new Error("Cannot instantiate an abstract class.");
        }
    }

    prepareRequestObject () {
        throw new Error("Cannot instantiate an abstract class.");
    }

    
    async run() {
        const configs = await MajorConfigModule.getConfigs();

        await configs.forEach(async config => {
            if (await this.can(config)) {
                let correctConfig = await this.checkAndGetValidToken(config);
                await this.triggerGame(correctConfig);
                await this.updateConfigs(correctConfig);
            }
        })
    }

    async triggerGame(config) {
        let data = this.prepareRequestObject();

        const requestOptions = this.prepareRequestOptions('POST', config.token, data);
        let response = await fetch(this.playUrl, requestOptions);
        let resData = await response.json();
        if (response.status == 201) {
            await sendSendNotification(`Major ${this.playName} done for player ${config.name}`);
        } else {
            await sendSendNotification(`Major ${this.playName} failed for player ${config.name} with this result ${JSON.stringify(resData)}`);
        }
    }

    async updateConfigs() {
        throw new Error("Child class must implement the 'updateConfigs' method.");
    }

    async checkAndGetValidToken(config) {
        const requestOptions = this.prepareRequestOptions('GET', config.token);
        let check = await fetch('https://major.bot/api/user-visits/streak/', requestOptions);
        if (check.status == 401) {
            let newToken = await this.generateValidToken(config);
            config.token = newToken;
        }

        return config;
    }

    async generateValidToken(config) {
        try {
            let data = {
                init_data: config.query_id
            }

            const requestOptions = this.prepareRequestOptions('POST', null, data);

            let newToken = await fetch('https://major.bot/api/auth/tg/', requestOptions);
            newToken = await newToken.json();

            return newToken?.access_token;
        } catch (error) {
            const errorMessage = error.message || error.toString(); // Get the error message
            await sendSendNotification(`Major generateValidToken error ${errorMessage}`);
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

module.exports = MajorBaseService