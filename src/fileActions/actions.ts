import * as vscode from "vscode";
import { GitUserInfo } from "../type/gitFile";
import * as path from "path";
import * as fs from "fs";

export class FileActions {
  private readonly defaultGitInfoStr: string =
    '{"userName":"","password":"","repositoryPath":""}';

  writeFileSync(fileStr: string, text: string) {
    const fileUri = path.resolve(__dirname, fileStr);
    return fs.writeFileSync(fileUri, text, { flag: "w" });
  }
  readFileSync(fileUri: string): string {
    if (!fileUri) {
      console.error("file path is not exist");
    }
    try {
      return fs.readFileSync(fileUri);
    } catch (e) {
      return this.defaultGitInfoStr;
    }
  }
  writeParseFileSync(fileUri: string, data: GitUserInfo) {
    const stringfyData = JSON.stringify(data);
    this.writeFileSync(fileUri, stringfyData);
  }
  readParseFileSync(fileUri: string): GitUserInfo {
    const fileStr = this.readFileSync(fileUri);
    const fileParseData = JSON.parse(fileStr);

    return fileParseData;
  }
}
