import { 
  SET_BLAZE_TREE, 
  TOGGLE_BLAZE_NODE_COLLAPSED, 
  CHANGE_BLAZE_NODE_SELECTION,
  CHANGE_BLAZE_NODE_HOVER
} from '../constants';
import _ from 'underscore';
import Bridge from '../../../common/bridge';

export function setBlazeTreeData(node) {
  // unwrap nodes into a list of components with
  // children and parent info

  if (!node) {
    Bridge.sendMessageToThePage({
      source: 'blaze-inspector',
      event: 'shutdown'
    });
    return { 
      type: SET_BLAZE_TREE,
      data: []
    }
  }

  let nodes = {};

  const unwrapNode = (node, parentId) => {
    const nodeId = node._id;
    nodes[nodeId] = {
      _id: nodeId,
      name: node.name,
      data: node.data,
      events: node.events,
      helpers: node.helpers,
      isExpanded: false,
      isSelected: false,
      isHovered: true,
      children: [],
      parentId: parentId
    };
    _.each(node.children, (node) => {
      var childId = unwrapNode(node, nodeId);
      nodes[nodeId].children.push(childId);
    });
    return nodeId;
  };

  unwrapNode(node);
  
  return { 
    type: SET_BLAZE_TREE,
    data: nodes
  }
}

export function toggleNodeCollapse(nodeId) {
  return {
    type: TOGGLE_BLAZE_NODE_COLLAPSED,
    nodeId
  }
}

export function changeBlazeNodeSelection(nodeId) {
  return {
    type: CHANGE_BLAZE_NODE_SELECTION,
    nodeId
  }
}

export function changeNodeHover(nodeId, isHovered) { 
  if (!isHovered) {
    Bridge.sendMessageToThePage({
      source: 'blaze-inspector',
      event: 'hide-highlight'
    });
  } else {
    Bridge.sendMessageToThePage({
      source: 'blaze-inspector',
      event: 'highlight',
      nodeId: nodeId
    });
  }

  return {
    type: CHANGE_BLAZE_NODE_HOVER,
    nodeId,
    isHovered
  }
}