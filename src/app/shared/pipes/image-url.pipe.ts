import { Inject, Pipe, PipeTransform } from '@angular/core';
import { APP_ENVIRONMENT, AppEnvironment } from '../../app.config';

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  constructor(@Inject(APP_ENVIRONMENT) private appEnvironment: AppEnvironment) {}

  transform(imageName: string | null | undefined): string {
    if (imageName) {
      const url = new URL(imageName, this.appEnvironment.baseImageUrl);
      url.searchParams.set('alt', 'media');
      url.searchParams.set('token', this.appEnvironment.imageUrlToken);
      return url.toString();
    }

    return '';
  }
}
