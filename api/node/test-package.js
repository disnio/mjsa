// debug https://www.npmjs.com/package/debug
// vscode debug node.js config launch.json, then run debug start.
var launch = {
    version: "0.2.0",
    configurations: [
        {
            type: "node",
            request: "launch",
            name: "Launch Program",
            program: "${workspaceFolder}/netcat/basic-server.js",
            smartStep: true,
            stopOnEntry: true,
            skipFiles: [
                "${workspaceFolder}/node_modules/**/*.js",
                "<node_internals>/**/*.js",
            ],
            env: {
                DEBUG: "*,-not_this"
            }
        }
    ]
};
// mocha JavaScript test framework for Node.js & The Browser

// test coverage https://istanbul.js.org/

// morgan http log
