import { isTypeGuard } from './is-type-guard';
import { StorageObject } from './storage-object';

export class LocalStorageService {
  constructor(private localStoragePrefix: string) {}

  store<ValueType>(key: string, value: ValueType): void {
    const keyWithPrefix = this.createKeyWithPrefix(key);
    const storageObject: StorageObject<ValueType> = {
      props: Object.keys(value),
      value: value
    };
    localStorage.setItem(keyWithPrefix, JSON.stringify(value));
  }

  get<ValueType>(
    key: string,
    typeGuard: (props: string[]) => boolean
  ): ValueType | undefined {
    const keyWithPrefix = this.createKeyWithPrefix(key);
    const value = localStorage.getItem(key);
    if (!value) {
      return undefined;
    }

    const storageObject = JSON.parse(value);
    if (isTypeGuard<StorageObject<ValueType>>(storageObject, typeGuard)) {
      return storageObject.value;
    } else {
      return undefined;
    }
  }

  private createKeyWithPrefix(key: string): string {
    return `${this.localStoragePrefix}_${key}`;
  }
}
