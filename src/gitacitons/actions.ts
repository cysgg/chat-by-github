import simpleGit, { SimpleGit } from "simple-git";
import { GitFileActions } from "../fileActions/gitFileActions";
import * as path from "path";
import * as fs from "fs";

export class gitActions {
  public user: string | undefined;
  public pwd: string | undefined;
  public remote: string;
  private git: SimpleGit;
  public fileDir: string = "./store";
  public filePath: string = "./store/gitfile.txt";
  private gitFileAction: GitFileActions; // 读写本地存储的 git 相关的数据
  constructor() {
    const gitFilePath = path.resolve(__dirname, this.filePath);
    this.gitFileAction = new GitFileActions(gitFilePath);

    const gitPath = path.resolve(__dirname, this.fileDir);
    if (!fs.existsSync(gitPath)) {
      fs.mkdirSync(gitPath);
    }
    console.log("gitPath", gitPath);
    this.git = simpleGit(gitPath);

    this.git.checkIsRepo().then((isRepo) => {
      !isRepo && this.git.init();
    });
    this.user = this.gitFileAction.fileData.userName;
    this.pwd = this.gitFileAction.fileData.password;
    this.remote = this.gitFileAction.fileData.repositoryPath;
  }
  setUser(text: string | undefined) {
    this.user = text;
    this.gitFileAction.fileData.userName = text || "";
  }
  setPassword(pwd: string | undefined) {
    this.pwd = pwd;
    this.gitFileAction.fileData.password = pwd || "";
  }
  // https://github.com/cysgg/chatArea.git
  setRemote(name: string, path: string) {
    this.remote = path;
    this.gitFileAction.fileData.repositoryPath = path;
    return this.git.addRemote(name, path);
  }
  fetch(name: string, branch: string) {
    return this.git
      .fetch(name, branch)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  login() {}
  clone(path: string) {
    const result = this.git
      .clone(path)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  saveGitFile() {
    this.gitFileAction.save();
  }
  async fetchRepository(name: string, path: string) {
    const remotes = await this.git.getRemotes();

    if (!remotes.find((remote) => remote.name === name)) {
      await this.setRemote(name, path);
    }
    const val = await this.fetch(name, "");
  }
}
