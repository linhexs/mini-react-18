import { ClassComponent, Fragment, FunctionComponent, HostComponent, HostText } from "./ReactWorkTags";

let wip = null;

function performUnitOfWork() {
  const { tag } = wip;
  // 更新当前组件
  switch (tag) {
    case HostComponent:
      updateHostComponent(wip)
    case FunctionComponent:
      updateFunctionComponent(wip)
    case ClassComponent:
      updateClassComponent(wip)
    case Fragment:
      updateFragment(wip)
    case HostText:
      updateHostText(wip)
    default:
      break
  }

  // 更新下一个组件
  // 深度优先遍历
  if (wip.child) {
    wip = wip.child;
    return;
  }
  let next = wip;
  while (next) {
    if (next.sibling) {
      wip = next.sibling;
      return;
    }
    next = next.return;
  }
  wip = null;
}