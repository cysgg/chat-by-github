import * as vscode from "vscode";
// import { lineInfo, MsgInfo } from './type/parse'
import { line2tree } from "./utils/line2tree";

export class ChatArea implements vscode.TreeDataProvider<chatItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    chatItem | undefined | void
  > = new vscode.EventEmitter<chatItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<chatItem | undefined | void> =
    this._onDidChangeTreeData.event;

  constructor() {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
  getChildren(element?: chatItem): Thenable<chatItem[]> {
    return Promise.resolve(this.getChatList(element));
  }
  getTreeItem(element: chatItem): vscode.TreeItem {
    return element;
  }
  getChatList(element?: chatItem): chatItem[] {
    if (element?.children) {
      return element?.children.map(
        (child) => new chatItem(child, vscode.TreeItemCollapsibleState.None)
      );
    }
    const chatList = [
      { time: "2020-10-20 15:30:22", user: "cys", text: "你说呢？" },
      { time: "2020-10-20 15:30:22", user: "cys", text: "你说呢？" },
      { time: "2020-10-20 15:30:22", user: "cys", text: "你说呢？" },
      { time: "2020-10-20 15:30:22", user: "zph", text: "你说呢？" },
      { time: "2020-10-20 15:30:22", user: "zph", text: "你说呢？" },
      { time: "2020-10-20 15:30:22", user: "cys", text: "你说呢？" },
      { time: "2020-10-20 15:30:22", user: "zph", text: "你说呢？" },
    ];
    const chatTree = line2tree(chatList);

    return chatTree.map(
      (item) =>
        new chatItem(
          item.user,
          vscode.TreeItemCollapsibleState.Collapsed,
          item.children,
          item.time
        )
    );
  }
}

export class chatItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly children?: string[],
    public readonly time?: string
  ) {
    super(label, collapsibleState);
    // this.description = description;
    this.tooltip = time;
    this.children = children;
  }
  contextValue = "dependency";
}
