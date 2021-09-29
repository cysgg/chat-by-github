import simpleGit, { SimpleGit } from "simple-git";
// import fs from "fs";

export class gitActions {
  private user: string | undefined;
  private pwd: string | undefined;
  private git: SimpleGit = simpleGit();
  constructor(user: string, pwd: string) {
    this.init(user, pwd);
  }
  init(user: string, pwd: string) {
    this.git.init();
    this.user = user;
    this.pwd = pwd;
  }
  setUser(text: string | undefined) {
    this.user = text;
  }
  setPassword(pwd: string | undefined) {
    this.pwd = pwd;
  }
  login() {}
  clone(path: string) {
    const result = this.git.clone(path);
    console.log("result", result);
  }
}
