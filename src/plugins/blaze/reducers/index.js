import { 
  SET_BLAZE_TREE,
  TOGGLE_BLAZE_NODE_COLLAPSED,
  CHANGE_BLAZE_NODE_SELECTION,
  CHANGE_BLAZE_NODE_HOVER
} from '../constants'
import Immutable from 'immutable'

export default {
  blazeTree (state = Immutable.fromJS({}), action) {
    switch(action.type){
      case SET_BLAZE_TREE:
        console.error('setting state with immutable', action.data);
        return Immutable.fromJS(action.data);
      case TOGGLE_BLAZE_NODE_COLLAPSED:
        console.error('toggling collapse for', action.nodeId);
        return state.updateIn([action.nodeId, 'isExpanded'], ie => !ie);
      case CHANGE_BLAZE_NODE_SELECTION:
        // get currently selected blaze node
        let currentlySelectedNode = null;
        state.forEach((node, nodeId) => {
          if (node.get('isSelected')) {
            currentlySelectedNode = node;
          }
        });

        console.error('currently selected node', currentlySelectedNode);
        console.error('toggling selection for', action.nodeId);
        return state.withMutations((nodes) => {
          if (currentlySelectedNode) {
            nodes.updateIn([currentlySelectedNode.get('_id'), 'isSelected'],
              selected => false);
          }
          nodes.updateIn([action.nodeId, 'isSelected'],
              selected => true);
        });
      case CHANGE_BLAZE_NODE_HOVER:
        return state.updateIn([action.nodeId,'isHovered'], ih => action.isHovered); 
      default:
        return state;
    }
  }
};