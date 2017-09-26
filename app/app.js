import angular from 'angular';

import {LoadingComponent} from './components/loading/loading';
import {ErrorComponent} from './components/error/error';

import {ExplorerComponent} from './components/explorer/explorer';


angular.module('app', [])
  .component('pingLoading', LoadingComponent)
  .component('pingError', ErrorComponent)
  .component('pingExplorer', ExplorerComponent);

angular.element(document).ready(
  () => {
    angular.bootstrap(document, ['app']);
  }
);