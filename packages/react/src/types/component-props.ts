import type { Node, NodeChange } from './nodes'

export type NodeMouseHandler<NodeType extends Node = Node> = (event: MouseEvent, node: NodeType) => void
export type OnNodeDrag<NodeType extends Node = Node> = (event: MouseEvent, node: NodeType, nodes: NodeType[]) => void
export type OnNodesChange<NodeType extends Node = Node> = (changes: NodeChange<NodeType>[]) => void
export type OnNodesDelete<NodeType extends Node = Node> = (nodes: NodeType[]) => void

