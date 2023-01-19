import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  private static DEFAULT_LIMIT = 50;

  static addEllipsis(value: string, limit = EllipsisPipe.DEFAULT_LIMIT): string {
    return value.length <= limit ? value : `${value.slice(0, limit)}...`;
  }

  transform(value: string | null | undefined, limit = EllipsisPipe.DEFAULT_LIMIT): string {
    if (value) {
      return EllipsisPipe.addEllipsis(value, limit);
    }
    return '';
  }
}
