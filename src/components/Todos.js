import Todo from './Todo';
import { useMyContext } from '../Context/MyProvider';

function Todos() {
  const { todoList } = useMyContext();
  // console.log(todoList);
  return (
    <div className="w-full  py-2 items-center mt-10 flex flex-col gap-2 ">
      <h2 className="font-bold underline text-xl">All todos</h2>
      {todoList?.length === 0 && (
        <h1 className="text-xl mt-10 text-center">
          You have not added a todo yet.
        </h1>
      )}
      {todoList?.length !== 0
        && todoList?.map((i, index) => (
          <Todo
            key={i.id}
            todo={i}
            index={index}
          />
        ))}
    </div>
  );
}

export default Todos;
