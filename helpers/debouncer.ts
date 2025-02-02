export function debouncer(fn: any) {
  let counterId: NodeJS.Timeout;
  return function(){
    clearTimeout(counterId);
  counterId = setTimeout(() => fn(...arguments), 500);
  }
}
