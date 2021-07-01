import { isTypeGuard } from './is-type-guard';
import { StorageObject } from './storage-object';

export class LocalStorageService {
  constructor(private bucketName: string) {}

  store<ValueType>(key: string, value: ValueType): void {
    const keyWithBucketName = this.createKeyWithBucketName(key);
    const storageObject: StorageObject<ValueType> = {
      props: Object.keys(value),
      value: value
    };
    localStorage.setItem(keyWithBucketName, JSON.stringify(value));
  }

  get<ValueType>(
    key: string,
    typeGuard: (props: string[]) => boolean
  ): ValueType | undefined {
    const keyWithBucketName = this.createKeyWithBucketName(key);
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

  clear(): void {
    let keysToDelete = [];
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(this.bucketName)) {
        keysToDelete.push(k);
      }
    });
    keysToDelete.forEach(k => localStorage.removeItem(k));
  }

  private createKeyWithBucketName(key: string): string {
    return `${this.bucketName}_${key}`;
  }
}
