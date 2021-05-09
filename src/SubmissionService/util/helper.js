const fs = require('fs/promises');

exports.createInputFile = async (input) => {
    try {
        const data = input.join('\n');
        await fs.writeFile('util/code/input.txt', data);
    }
    catch(error) {
        throw error;
    }
}

exports.createCodeFile = async (filename, code) => {
    try {
        await fs.writeFile(`util/code/${filename}`, code);
    }
    catch(error) {
        throw error;
    }
}

exports.checkCorrectness = async (correctOutput) => {
    try {
        const response = await fs.readFile('util/code/output.txt');
        const codeOutput = response.toString().split('\n');
        if(codeOutput.length < correctOutput.length) {
            return false;
        }
        else {
            for(let i=0 ; i<correctOutput.length ; i++) {
                const codeOutputLine = codeOutput[i].trim();
                if(codeOutputLine !== correctOutput[i]) {
                    return false;
                }
            }
            for(let i=correctOutput.length ; i<codeOutput.length ; i++) {
                const codeOutputLine = codeOutput[i].trim();
                if(codeOutputLine !== '') {
                    return false;
                }
            }
            return true;
        }
    }
    catch(error) {
        throw error;
    }
}

exports.cleanupJava = async () => {
    try {
        await fs.unlink('util/code/Solution.class');
    }
    catch(error) {
        if(error.code !== 'ENOENT') {
            throw error;
        }
    }
}