import { GitUserInfo } from "../type/gitFile";
import { FileActions } from "./actions";

export class GitFileActions extends FileActions {
  private filePath: string;
  public fileData: GitUserInfo;

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
    this.fileData = this.readParseFileSync(this.filePath);
  }
  save() {
    try {
      const res = this.writeParseFileSync(this.filePath, this.fileData);
      console.log("res", res);
      return res;
    } catch (e) {
      console.error("e", e);
    }
  }
}
