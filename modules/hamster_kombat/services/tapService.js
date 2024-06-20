import { currentDateInArmenia } from '../../../helpers/currentDateInArmenia.js';
import HamsterKombatConfigsModel from '../models/configs.js'
import HamsterKombatDataModel from '../models/data.js'
import HamsterKombatLogsModel from '../models/logs.js';

class TapService {
    async tap() {
        let tokens = await HamsterKombatConfigsModel.tokens();

        tokens.forEach(async token => {
            await this.send(token);
        });
    }

    async send(token) {
        const requestOptions = await this.prepareRequestOptions(token);
        const url =  "https://api.hamsterkombat.io/clicker/tap";
        
        await HamsterKombatDataModel.set_request({url, requestOptions});

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then(async result => {
                if (!result?.clickerUser) {
                    return HamsterKombatLogsModel.set_log('from_sendRequest_then', result);
                }
                await HamsterKombatDataModel.set_response(result);
            })
            .catch(error => {
                console.log(error, "error");
            });
    }

    prepareRequestOptions(token) {
        const headers = new Headers();
        headers.append(
            "Authorization",
            "Bearer " + token
        );
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            count: 900,
            availableTaps: 0,
            timestamp: parseInt(currentDateInArmenia() / 1000),
        });

        return {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow",
        };;
    }
}

export default new TapService;