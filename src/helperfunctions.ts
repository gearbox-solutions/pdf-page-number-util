import trim from 'lodash/trim';

export const processArguments = (processArgs: string[]) => {
    return processArgs.reduce((parameters: {[key:string]: string}, argument, index) => {
        if(index < 2) {
            return parameters;
        }

        let [flag, value] = argument.split('=');

        flag = trim(flag, '--');

        parameters[flag] = value;

        return parameters;
    }, {})
}
