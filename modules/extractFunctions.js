const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const filePath = path.resolve(__dirname, '../main.js');
const fileContent = fs.readFileSync(filePath, 'utf-8');

const ast = parser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx']
});

function extractFunctions(ast) {
    const functions = [];

    traverse(ast, {
        FunctionDeclaration(path) {
            const { id, params, body } = path.node;

            const newAst = parser.parse(`function ${id.name}(${params.map(param => param.name).join(', ')}) ${generate(body).code}`, {
                sourceType: 'module',
                plugins: ['jsx']
            });

            functions.push({
                name: id.name,
                params: params.map(param => param.name),
                body: babel.transformFromAstSync(newAst, null, {
                    presets: ['@babel/preset-env']
                }).code
            });
        },
        FunctionExpression(path) {
            const { id, params, body } = path.node;
            const funcName = id ? id.name : 'anonymous';
            const newAst = parser.parse(`const ${funcName} = function(${params.map(param => param.name).join(', ')}) ${generate(body).code}`, {
                sourceType: 'module',
                plugins: ['jsx']
            });

            functions.push({
                name: funcName,
                params: params.map(param => param.name),
                body: babel.transformFromAstSync(newAst, null, {
                    presets: ['@babel/preset-env']
                }).code
            });
        },
        ArrowFunctionExpression(path) {
            const { params, body } = path.node;
            const newAst = parser.parse(`const anonymous = (${params.map(param => param.name).join(', ')}) => ${generate(body).code}`, {
                sourceType: 'module',
                plugins: ['jsx']
            });

            functions.push({
                name: 'anonymous',
                params: params.map(param => param.name),
                body: babel.transformFromAstSync(newAst, null, {
                    presets: ['@babel/preset-env']
                }).code
            });
        }
    });

    return functions;
}

const functions = extractFunctions(ast);

console.log('Полезная нагрузка: \n');

functions.forEach(func => {
    console.log(`Function: ${func.name}`);
    console.log(`Params: ${func.params.join(', ')}`);
    console.log(`Body: ${func.body}`);
    console.log('---------------------------');
});
