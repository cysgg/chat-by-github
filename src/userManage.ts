import * as vscode from "vscode";
import { gitActions } from "./gitAcitons/actions";
export class UserManage {
  private gitActionsInstance: gitActions; // git 所有命令操作
  private userName: string | undefined;
  private pwd: string | undefined;
  private path: string;
  constructor() {
    this.gitActionsInstance = new gitActions();
    this.userName = this.gitActionsInstance.user;
    this.pwd = this.gitActionsInstance.pwd;
    this.path = this.gitActionsInstance.remote;
  }
  userNameInputEntry() {
    const self = this;
    return vscode.window
      .showInputBox({
        // 这个对象中所有参数都是可选参数
        password: false, // 输入内容是否是密码
        ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
        placeHolder: "请输入github userName", // 在输入框内的提示信息
        prompt: "github account userName", // 在输入框下方的提示信息
      })
      .then((msg) => {
        self.userName = msg;
        self.gitActionsInstance.setUser(self.userName);
        return msg;
      });
  }
  passwordInputEntry() {
    const self = this;
    return vscode.window
      .showInputBox({
        // 这个对象中所有参数都是可选参数
        password: true, // 输入内容是否是密码
        ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
        placeHolder: "请输入github password", // 在输入框内的提示信息
        prompt: "github account password", // 在输入框下方的提示信息
      })
      .then((msg) => {
        self.pwd = msg;
        self.gitActionsInstance.setPassword(self.pwd);
        return msg;
      });
  }
  remoteInputEntry() {
    const self = this;
    return vscode.window
      .showInputBox({
        // 这个对象中所有参数都是可选参数
        password: false, // 输入内容是否是密码
        ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
        placeHolder: "请输入github resigrty path", // 在输入框内的提示信息
        prompt: "github account resigrty path", // 在输入框下方的提示信息
      })
      .then((msg) => {
        self.path = msg || "";
        self.gitActionsInstance.setRemote("origin", self.path);
        return msg;
      });
  }
  async loginEntry() {
    if (!this.userName) {
      await this.userNameInputEntry();
    }
    if (!this.pwd) {
      await this.passwordInputEntry();
    }
    if (!this.path) {
      await this.remoteInputEntry();
    }
    this.gitActionsInstance.saveGitFile();
    vscode.window.showInformationMessage("login success");
  }
  fetchEntry() {
    return vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "fetch source",
        cancellable: true,
      },
      async (progress, token: vscode.CancellationToken) => {
        progress.report({ increment: 0 });
        const res = await this.gitActionsInstance.fetchRepository(
          "origin",
          this.path
        );
        progress.report({
          increment: 10,
          message: "I am long running! - still going...",
        });
        console.log("res", res);
        const p = new Promise((s, j) => {});
        return p;
      }
    );
  }
}
