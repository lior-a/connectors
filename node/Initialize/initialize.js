/**
 * @module lib/initialize
 * @since 1.0.0
 */

const helpers = require('./helpers');

/**
 * database object with all possible connector classes.
 * @type {Object}
 * @example
 * const init = require('connector/initialize');
 * const connector = init.initlize(settings);
 */
const db = {
    Mongoose: require('../Mongoose')
};


const initialize = {
    connectors_counter: 0,
    settings: {},
    errors: [],
    initlize(settings) {
        console.log('constructor')

        this.settings = settings;

        if(!settings) {
            this.loadSettings();
        }

        this.loadDB();

        return this;
    },
    loadDB() {
        console.log('loadDB')

        this.settings.map((dbConfig, index) => {
            const connectorCapitlizedName = helpers.capitalize(dbConfig.connector_name),
                isConnectorExists = typeof db[connectorCapitlizedName] === 'function';

            if(isConnectorExists) {
                this[dbConfig.connector_name] = new db[connectorCapitlizedName](dbConfig);
                this.connectors_counter++;
            } else {
                const err = '[ERROR] Connector name not found. could be a typo or not a supported connector.';
                console.log(err);
                this.errors.push(err);
            }
        });
    },
    loadSettings() {
        const settingsPromise = new promise((resolve, reject) => {
            fs.readFile('./config/database.js', 'utf-8', (err, content) => {
                if (err) {
                    reject(err);
                    log(err);
                }

                resolve(content)
            });
        });
    }
};

module.exports = initialize;