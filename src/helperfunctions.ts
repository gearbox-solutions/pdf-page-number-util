const trim = require('lodash/trim');

export const processArguments = (processArgs) => {
    return processArgs.reduce((parameters, argument, index) => {
        if(index < 2) {
            return parameters;
        }

        let [flag, value] = argument.split('=');

        flag = trim(flag, '--');

        parameters[flag] = value;

        return parameters;
    }, {})
}
