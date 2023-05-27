"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
function activate(context) {
    let disposable = vscode.commands.registerCommand('filebuddy.createFile', async () => {
        const fileName = 'example.txt';
        // Get the root folder path of the workspace
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
        if (workspaceFolder) {
            // Get the current working directory of the terminal
            const terminalCwd = vscode.workspace.rootPath;
            if (terminalCwd) {
                // Combine the workspace folder path and terminal's current working directory
                const fileDirectory = path.resolve(workspaceFolder, terminalCwd);
                try {
                    // Create the file in the combined directory
                    const filePath = path.join(fileDirectory, fileName);
                    await vscode.workspace.fs.writeFile(vscode.Uri.file(filePath), Buffer.from('Hello, World!', 'utf8'));
                    // Show a success message
                    vscode.window.showInformationMessage(`File "${fileName}" created successfully at "${filePath}".`);
                }
                catch (error) {
                    // Show an error message if something goes wrong
                    vscode.window.showErrorMessage(`Failed to create file "${fileName}". ${error}`);
                }
            }
            else {
                // Show an error if the terminal's current working directory is not available
                vscode.window.showErrorMessage('Terminal current working directory is not available.');
            }
        }
        else {
            // Show an error if the workspace folder is not available
            vscode.window.showErrorMessage('Workspace folder is not available.');
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map