import * as vscode from "vscode";
import { gitActions } from "./gitacitons/actions";

export class UserManage {
  gitActionsInstance: gitActions;
  userName: string | undefined;
  pwd: string | undefined;
  constructor() {
    this.userName = "";
    this.pwd = "";
    this.gitActionsInstance = new gitActions("", "");
  }
  userNameInputEntry() {
    const self = this;
    vscode.window
      .showInputBox({
        // 这个对象中所有参数都是可选参数
        password: false, // 输入内容是否是密码
        ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
        placeHolder: "请输入github password", // 在输入框内的提示信息
        prompt: "github account password", // 在输入框下方的提示信息
      })
      .then((msg) => {
        self.userName = msg;
        self.passwordInputEntry();
        return msg;
      });
  }
  passwordInputEntry() {
    const self = this;
    vscode.window
      .showInputBox({
        // 这个对象中所有参数都是可选参数
        password: false, // 输入内容是否是密码
        ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
        placeHolder: "请输入github userName", // 在输入框内的提示信息
        prompt: "github account username", // 在输入框下方的提示信息
      })
      .then((msg) => {
        self.pwd = msg;
        self.login();
        return msg;
      });
  }
  cloneInputEntry() {
    const self = this;
    vscode.window
      .showInputBox({
        // 这个对象中所有参数都是可选参数
        password: false, // 输入内容是否是密码
        ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
        placeHolder: "请输入github resigrty path", // 在输入框内的提示信息
        prompt: "github account username", // 在输入框下方的提示信息
      })
      .then((msg) => {
        self.pwd = msg;
        self.login();
        return msg;
      });
  }
  loginEntry() {
    this.userNameInputEntry();
  }
  login() {
    this.gitActionsInstance.setUser(this.userName);
    this.gitActionsInstance.setPassword(this.pwd);
    this.gitActionsInstance.login();
  }
}
