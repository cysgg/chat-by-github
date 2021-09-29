import { lineInfo, MsgInfo } from "../type/parse";

export const line2tree = function (lineList: lineInfo[]) {
  const stack: MsgInfo[] = [];
  let preMsg: MsgInfo = {
    ...lineList[0],
    children: [],
  };

  lineList.forEach((line: lineInfo) => {
    if (preMsg) {
      if (preMsg.user === line.user) {
        preMsg.children.push(line.text);
        return;
      }
      stack.push(preMsg);
    }

    preMsg = {
      time: line.time,
      user: line.user,
      text: line.text,
      children: [line.text],
    };
  });

  if (preMsg) {
    stack.push(preMsg);
  }

  return stack;
};
