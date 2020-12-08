import { ObjectService } from ".";
import { InterpolatorService, StorageService } from "../../models";

/**
 * A ObjectService which has an InterpolatorService. The ObjectService uses the
 * InterpolatorService to interpolate objects.
 */
export class InterpolatedObjectService<T> extends ObjectService<T> {
  private interpolatorService: InterpolatorService;

  /**
   * Creates an InterpolatedObjectService.
   *
   * @param {StorageService} storageService The storage service backing.
   * @param {InterpolatorService} interpolatorService The interpolator service
   * backing.
   *
   * @returns {InterpolatedObjectService} An instance of an
   * InterpolatedObjectService.
   */
  public constructor(storageService: StorageService, interpolatorService: InterpolatorService) {
    super(storageService);
    this.interpolatorService = interpolatorService;
  }

  protected interpolate(content: string): string {
    return this.interpolatorService.interpolate(content);
  }
}
