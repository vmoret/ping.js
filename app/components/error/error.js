export const ErrorComponent = {
  bindings: {
    error: '<error'
  },
  template: `
    <div class="error" ng-show="$ctrl.error">
      {{ $ctrl.error.message || $ctrl.error }}
    </div>
  `
};