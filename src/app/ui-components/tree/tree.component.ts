import { Component, OnInit, Input } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

const actionMapping: IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) {
        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      }

    },
    click: (tree, node, $event) => {
      if (node.hasChildren) {
        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      }

      // $event.shiftKey
      //   ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
      //   : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => console.log(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() nodes: any[];
  customTemplateStringOptions: ITreeOptions = {
    // displayField: 'subTitle',
    actionMapping,
    animateSpeed: 1,
  };
  // nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 2, name: 'child1' },
  //       { id: 3, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       { id: 5, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  constructor() { console.log('1'); }

  ngOnInit() {
  }
}
