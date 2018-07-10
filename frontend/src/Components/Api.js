export default class Api {
    constructor() {
        this.baseUrl = 'http://api.wheels.test/api';

        this.status = 200;
    }

    async call(method, url, body = {}, headers = {}) {
        let requestHeaders = { "Content-type": "application/json", 'Accept': 'application/json'};
        requestHeaders = Object.assign({},requestHeaders, headers);

        let requestConfig = {
            method,
            headers: requestHeaders
        }

        if(method.toLowerCase() !== 'get'){
            requestConfig['body'] = JSON.stringify(body);
        }

        let response = await fetch(this.baseUrl+'/'+url, requestConfig)
        this.status = response.status
        return response.json()
    }

    log(response, method, url, body = {}, headers = {}){
        console.log(
            `Api call with method ${method} to url ${this.baseUrl+'/'+url}
            with body ${JSON.stringify(body)}
            and headers ${JSON.stringify(headers)}
            got response with status ${this.status} and response is`, response);
    }

    static async json(method, url, body = {}, headers = {}){
        let api = new Api();
        let response;
        try{
            response = await api.call(method, url, body, headers);
            api.log(response, method, url, body, headers);
            return Promise.resolve({response, status: api.status});
        }catch(e){
            return Promise.reject({ error: e, response, status: api.status});
        }
    }

    static jsonAuth(token, method, url, body = {}, headers = {}){
        headers = Object.assign({}, headers, { Authorization: `Bearer ${token}`});
        return Api.json(method, url, body, headers);
    }

    static async upload(file, fileFieldName){
        let formData = new FormData();
        formData.append(fileFieldName, file);

        let response = await fetch('http://files.microservices.test/api/files', {
            method: 'post',
            body: formData
        });

        let status = response.status;
        if(status !== 200){
            return false;
        }
        response = await response.json();
        return response.data.uuid;
    }

}