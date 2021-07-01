import { LocalStorageService } from './local-storage-service';

interface Person {
  name: string;
  age: number;
}

const bucket1 = new LocalStorageService('bucket1');
bucket1.store<Person>('person', { name: 'Diana', age: 60 });

const valueInBucket1 = bucket1.get<Person>('person', (props: string[]) =>
  props.includes('name')
);
console.log(valueInBucket1);

const bucket2 = new LocalStorageService('bucket2');
bucket2.store<Person>('person', { name: 'Gargamel', age: 99 });

const valueInBucket2 = bucket1.get<Person>('person', (props: string[]) =>
  props.includes('name')
);
console.log(valueInBucket2);


