export const DateInputDecorator = [
  () => ({
    restrict: 'A',
    compile(tElement) {
      const element = tElement[0];
      if (element.type === 'date') {
        return;
      }
      console.log(`${element.id}: input[date] isn't support with this browser`);
      element.disabled = true;
    }
  })
];