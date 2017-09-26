import {ExplorerController} from './explorer-controller';

export const ExplorerComponent = {
  bindings: {
    apiBase: '@apiUrl',
    imageDir: '@imageDir',
    name: '@project'
  },
  template: `
    <div class="ping-explorer">
      <ping-error error="$ctrl.error"></ping-error>
      <div ng-show="$ctrl.initialized">
        <div class="container">
          <aside>
            <nav>
              <select 
                ng-options="dir as dir.name for dir in $ctrl.project.directories track by dir.name" 
                ng-model="$ctrl.project.directory">
              </select>
              <a 
                ng-href="{{ $ctrl.upload.url }}" 
                title="Upload file" 
                target="_blank">
                <img ng-src="{{$ctrl.uploadGif}}" alt="upload" />
              </a>
              <a 
                ng-show="{{ $ctrl.ie }}"
                ng-href="{{ $ctrl.listView.path }}" 
                title="Browser folder" 
                target="_blank">
                <img ng-src="{{$ctrl.folderGif}}" alt="folder" />
              </a>
            </nav>
            <ul>
              <li
                  ng-class="{ selected: $ctrl.treeView.directory === dir }"
                  ng-click="$ctrl.selectTreeViewItem(dir)"
                  ng-repeat="dir in $ctrl.treeView.directories">
                  {{ ::dir.name }}
              </li>
            </ul>
          </aside>
          <table>
            <thead>
              <tr>
                <th colspan="2">Name</th>
                <th>Modified date</th>
                <th>Type</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                ng-if="$ctrl.listView.parent"
                ng-click="$ctrl.selectListViewItem($ctrl.listView.parent)">
                <td>
                    <img ng-src="{{$ctrl.folderGif}}" alt="folder" />
                </td>
                <td>[ Parent directory ]</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr 
                ng-repeat="dir in $ctrl.listView.directory.directories | orderBy : 'name'"
                ng-click="$ctrl.selectListViewItem(dir)">
                <td>
                    <img ng-src="{{$ctrl.folderGif}}" alt="folder" />
                </td>
                <td>{{ ::dir.name }}</td>
                <td>{{ ::dir.lastModifiedDateTime }}</td>
                <td>File folder</td>
                <td></td>
              </tr>
              <tr ng-repeat="file in $ctrl.listView.directory.files | orderBy : 'name'">
                <td>
                    <img ng-src="{{ ::file.fileType.image }}" alt="{{ ::file.fileType.name }}" />
                </td>
                <td>
                    <a ng-href="{{ ::file.url }}" target="_blank">{{ ::file.name }}</a>
                </td>
                <td>{{ ::file.lastModifiedDateTime }}</td>
                <td>{{ ::file.fileType.name }}</td>
                <td>{{ ::file.fileSize }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="unc-path" ng-show="$ctrl.listView.path">
            {{ $ctrl.listView.path }}
        </div>
      </div>
      <ping-loading ng-hide="$ctrl.initialized"></ping-loading>
    </div>
  `,
  controller: ExplorerController
};
