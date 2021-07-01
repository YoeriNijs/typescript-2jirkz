import { LocalStorageService } from './local-storage-service';

interface Person {
  name: string;
  age: number;
}

const service = new LocalStorageService('my-localstorage-prefix');
service.store<Person>('person', { name: 'Diana', age: 60 });

const storedValue: Person = service.get<Person>('person', (props: string[]) =>
  props.includes('name')
);

console.log('storedValue', storedValue);
