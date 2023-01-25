import produce from "immer";

export type Person = {
  name: string;
  age: number;
  email: string;
};

const ADD_PERSON = "PersonList/ADD" as const;

export const addPerson = (person:Person) => ({
  type: ADD_PERSON,
  payload: person
});

type PersonAction = ReturnType<typeof addPerson>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type PersonState = {
  personList: Array<Person>;
};

// 초기상태 선언
const initialPerson: PersonState = {
  personList: [{ name: "test1", age: 20, email: "test@test.com" }],
};

function person(
  state: PersonState = initialPerson,
  action: PersonAction
): PersonState {
  switch (action.type) {
    case ADD_PERSON:
        let person:Person = action.payload;
        console.log("person", person);
      
      //const newPersonList:Array<Person> = [...state.personList, person];
       const newPersonList:Array<Person> = produce(state.personList, draft => {  // immer 활용
        draft.push(person);
      });
      return {personList : newPersonList};
    default:
      return state;
  }
}

export default person;
