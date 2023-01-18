type Person = {
    name: string;
    age: number;
    email: string;
  };

const personList:Person[] = [{name: "test1", age: 20, email: "test@test.com"}];

const obj = {personObj:personList};

const objStr:Person[] = obj.personObj;
let {personObj} : {personObj:Person[]} = obj;
