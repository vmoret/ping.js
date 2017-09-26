import {ExplorerStore} from './explorer-store';
import {imageDir} from '../../config';

export const ExplorerController = [
  '$scope', '$timeout',
  function $ExplorerController($scope, $timeout) {
    const $ctrl = this;
    Object.setPrototypeOf($ctrl, ExplorerStore);
    
    $ctrl.folderGif = `${$ctrl.imageDir || imageDir}/folder.gif`;
    $ctrl.uploadGif = `${$ctrl.imageDir || imageDir}/upload.gif`;

    $ctrl.$onInit = () => {
      $scope.$watch(
        '$ctrl.project.directory',
        (newVal, oldVal) => {
          if (newVal === oldVal) return;
          try {
            $ctrl.updateTreeView(newVal);
          } catch (err) {
            $ctrl.error = err;
          }
        }
      );
      $ctrl.init().then(() => $scope.$apply());
    };
  }
];
