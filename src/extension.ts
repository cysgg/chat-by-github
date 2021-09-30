// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { ChatArea } from "./chatArea";
import { UserManage } from "./userManage";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const chatArea = new ChatArea();
  const userManage = new UserManage();
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "cheat-by-github" is now active!'
  );
  vscode.window.registerTreeDataProvider("chatArea", chatArea);
  vscode.commands.registerCommand("chatArea.refreshEntry", () =>
    chatArea.refresh()
  );
  vscode.commands.registerCommand("chatArea.loginEntry", () =>
    userManage.loginEntry()
  );
  vscode.commands.registerCommand("chatArea.fetchEntry", () =>
    userManage.fetchEntry()
  );
  vscode.commands.registerCommand("chatArea.addEntry", () =>
    vscode.window.showInformationMessage(`Successfully called add entry.`)
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
