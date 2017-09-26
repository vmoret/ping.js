import {ProjectService} from '../../services/project';
import {DirectoryService} from '../../services/directory';
import {DateService} from '../../services/date';
import {decorateDirectory} from './directory-decorator';
import {ExplorerState, cache} from './explorer-state';
import {detectIE} from '../../common/browser';
import {imageDir as defImageDir, uploadUrl} from '../../config';

const assign = Object.assign;
const parents = Symbol();

// I confirm that we're browsing up or not.
const areBrowsingUp = (state, newDirectory) =>
  typeof state.listView === 'undefined' || (
    newDirectory === state.listView.parent
    || newDirectory === state.treeView.directory
  );

// I build the `file://` navigation link from UNC path.
const buildFileNavLink = path => `file:${path.replace(/\\/g, '/')}`;

// I reduce `newdDirectory` into `state`.
const reduceListViewItems = (state, newDirectory) => {
  const listView = assign({ [parents]: [] }, state.listView);
  // If we're browsing up we pop() the last parent from our queue else
  // we push the current listView or treeView directory to the queue.
  (areBrowsingUp(state, newDirectory))
    ? listView[parents].pop()
    : listView[parents].push(
      state.listView.directory || state.treeView.directory
    );
  // If the hidden `parents` list contains at least one item, the current
  // `parent` is the last item.
  listView.parent = listView[parents].length
    ? listView[parents].slice(-1)[0]
    : undefined;
  // Store current directory & update the path.
  listView.directory = newDirectory;
  listView.path = buildFileNavLink(newDirectory.fullName);
  return assign({}, state, { listView });
};

// I reduce the new treeView directory into `state`.
const reduceTreeViewItems = (state, newDirectory) => {
  const directories = newDirectory.directories;
  const directory = directories[0] || newDirectory;
  const treeView = assign({}, state.treeView, { directories, directory });
  return reduceListViewItems(
    assign({}, state, { treeView }),
    treeView.directory
  );
};

// I reduce the new project `directories` into `state`
const reduceProject = (state, {directories}) => {
  const directory = directories.find(d => d.name === 'Support')
    || directories[0];
  const project = { directories, directory };
  return assign({}, state, { project });
};

const onerror = Symbol();

// I maintain ExplorerController state.
export const ExplorerStore = {
  // I initialize the store.
  init() {
    const $store = this;
    $store.ie = detectIE();
    $store.upload.url = `${uploadUrl}?project=${$store.name}`;
    return ProjectService
      .find($store.name, $store.apiBase)
      .then(project => DirectoryService.find(project, [], $store.apiBase))
      .then(directory => $store[cache].directory = directory)
      .then(directory => decorateDirectory(directory, $store.imageDir || defImageDir))
      .then(directory => reduceProject($store, directory))
      .then(state => assign($store, state))
      .then(() => $store.initialized = true)
      .catch(error => $store.error = error);
  },
  // I'm called from the UI when user selects a new treeView directory.
  selectTreeViewItem(directory) {
    const $store = this;
    try {
      const treeView = assign($store.treeView, { directory });
      assign($store, { treeView }, reduceListViewItems($store, directory));
    } catch (error) {
      $store[onerror](error);
    }
  },
  // I'm called from the UI when user selects a new listView directory.
  selectListViewItem(directory) {
    const $store = this;
    try {
      assign($store, reduceListViewItems($store, directory));
    } catch (error) {
      $store[onerror](error);
    }
  },
  // I'm called from the Controller when the selected project directory
  // changed.
  updateTreeView(parent) {
    const $store = this;
    try {
      assign($store, reduceTreeViewItems($store, parent));
    } catch (error) {
      $store[onerror](error);
    }
  },
  // I am a convience method to set the error state.
  [onerror](error) {
    this.error = error;
  }
};

Object.setPrototypeOf(ExplorerStore, ExplorerState);