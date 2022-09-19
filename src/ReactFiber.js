import { FunctionComponent, HostComponent } from "./ReactWorkTags";
import { isFn, isStr, Placement } from "./utils";

/**
 * @param {*} vnode 虚拟dom
 * @param {*} returnFiber 父节点
 * @returns 
 */
export function createFiber(vnode, returnFiber) {
  const fiber = {
    // 节点类型
    type: vnode.type,
    // 节点key
    key: vnode.key,
    // 节点属性
    props: vnode.props,
    // 原生标签时候指dom节点，类组件时候指的是实例
    stateNode: null,
    // 第一个子fiber
    child: null,
    // 下一个兄弟fiber
    sibling: null,
    // 父fiber
    return: returnFiber,
    // 标记节点是什么类型的
    flags: Placement,
    // 老节点
    alternate: null,
    // 要删除子节点 null或者[]
    deletions: null,
    //当前层级下的下标，从0开始
    index: null,
  };

  const { type } = vnode

  if (isStr(type)) {
    fiber.tag = HostComponent
  } else if (isFn(type)) {
    fiber.tag = FunctionComponent
  }

  return fiber;
}