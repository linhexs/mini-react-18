import { createFiber } from "./ReactFiber";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

// render方法 ReactDOM.createRoot(document.getElementById("root")).render(jsx);
ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot;

  // 更新，首次为创建fiber
  updateContainer(children, root);
};

//  ReactDOM.createRoot方法
function createRoot(container) {
  console.log(container)
  const root = {
    containerInfo: container,
  };

  return new ReactDOMRoot(root);
}

function updateContainer(element, container) {
  const { containerInfo } = container;

  // 创建fiber
  const fiber = createFiber(element, {
    type: containerInfo.nodeName.toLowerCase(),
    stateNode: containerInfo,
  });

  // 组件初次渲染
  scheduleUpdateOnFiber(fiber);
}

export default {
  createRoot,
};