import { useState } from 'react';
import {
  HiBadgeCheck,
  HiCheck,
  HiPencilAlt,
  HiTrash,
} from 'react-icons/hi';
import { AiOutlineUndo } from 'react-icons/ai';
import { format } from 'timeago.js';
import { useMyContext } from '../Context/MyProvider';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
// import "../custom.css"

function Todo({ todo, _id }) {
  const { handleTodoEdit, handleTodoDelete, handleTodoCompleted } = useMyContext();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(todo?.title);
  const submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes, really',
          onClick: () => handleTodoDelete(todo._id),
        },
        {
          label: 'No',
          // onClick: () => alert("Click No")
        },
      ],
    });
  }; 
  return (
    <div className="w-full py-1 gap-2 pb-5 border-emerald-500 px-2 border rounded-md grid grid-cols-10">
      <div  className="col-span-9 py-1 ">
        {edit ? (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="outline-none border-2 border-blue-600 h-full w-full rounded-md px-2 font-bold"
          />
        ) : (
          <p style={{ borderColor: 'blue',borderStyle: 'solid',borderWidth: '1px',borderRadius:"10px"}} className="font-bold px-2 py-2">{value}</p>
        )}
      </div>
      <button
        type="button"
        className="col-span-1 py-1 text-red-700 h-[1.5cm] rounded-md hover:bg-red-100 flex justify-center items-center text-2xl"
        onClick={() => submit()}
      >
        <HiTrash />
      </button>
      <button
        type="button"
        className={`mt-2 col-span-5 py-1 ${
          !todo.completed
            ? 'text-emerald-700 bg-emerald-100 '
            : 'text-blue-700 bg-blue-100'
        }  h-[1cm] rounded-md flex justify-center items-center  gap-2`}
        onClick={() => handleTodoCompleted(todo._id)}
      >
        {todo.completed ? (
          <AiOutlineUndo className="text-2xl" />
        ) : (
          <HiBadgeCheck className="text-2xl" />
        )}

        <span className="font-bold text-[16px]">
          {` ${todo.completed ? 'Mark as undone' : 'Mark as done'} `}
        </span>
      </button>
      {edit? (
        <button
          type="button"
          className="mt-2 float-right col-span-5 py-1 text-blue-700 h-[1cm] rounded-md bg-blue-100 flex justify-center items-center gap-2"
          onClick={() => {
            handleTodoEdit(todo._id, value);
            setEdit(false);
          }}
        >
          <HiCheck className="text-2xl" />
          <span className="font-bold text-[18px]">Done editing</span>
        </button>
      ) : (
        <button
          type="button"
          className="mt-2 float-right col-span-5 py-1 text-blue-700 h-[1cm] rounded-md bg-blue-100 flex justify-center items-center gap-2"
          onClick={() => setEdit(true)}
        >
          <HiPencilAlt className="text-2xl" />
          <span className="font-bold text-[18px]">Edit</span>
        </button>
      )}
      <p className="col-span-7 py-1  font-bold mt-2 flex flex-row gap-2 items-center">
        <span className="text-xl">Status:</span>
        <span
          className={todo.completed ? 'text-emerald-600' : 'text-blue-600'}
        >
          {todo.completed ? 'completed' : 'pending'}
        </span>
      </p>
      <p className="col-span-3 py-1 text-[11px] md:text-[14px] font-bold text-gray-600 mt-2 text-right">
        {`Updated ${format(todo.updatedAt)}`}
      </p>
    </div>
  );
}

export default Todo;
