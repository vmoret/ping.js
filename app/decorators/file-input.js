export const FileInputDecorator = [
  '$parse',
  ($parse) => ({
    restrict: 'A',
    link(scope, tElement, tAttrs) {
      const model = $parse(tAttrs.pingFileInput);
      const modelSetter = model.assign;
      
      tElement.bind('change', () => {
        scope.$apply(() =>
          modelSetter(scope, tAttrs.multiple
            ? tElement[0].files
            : tElement[0].files[0]
          )
        );
      });
    }
  })
];