import { MdLink } from 'react-icons/md';
import { IoDuplicateOutline, IoTrashOutline } from 'react-icons/io5';
import { BiEditAlt } from 'react-icons/bi';

export default function DropDownList({ dropDownFlag }) {
  return (
    <div
      className="z-10 absolute bottom-auto text-sm shadow-2xl m-2 w-36 rounded-sm bg-white"
      onMouseLeave={() => {
        dropDownFlag(-1);
      }}>
      <div className="group flex cursor-pointer text-black flex mt-2 mb-0.5 p-0.5 hover:bg-blue-600">
        <span className="group-hover:text-white mx-2 p-1 text-lg my-auto">
          <IoTrashOutline />
        </span>
        <p className="group-hover:text-white my-auto"> Delete </p>
      </div>
      <div className="group cursor-pointer text-black flex my-0.5 p-0.5 hover:bg-blue-600">
        <span className="group-hover:text-white mx-2 p-1 text-base my-auto">
          <IoDuplicateOutline />
        </span>
        <p className="group-hover:text-white my-auto">Duplicate</p>
      </div>
      <div className="group cursor-pointer text-black flex my-0.5 p-0.5 hover:bg-blue-600">
        <span className="group-hover:text-white mx-2 p-1 text-base my-auto">
          <MdLink />
        </span>
        <p className="group-hover:text-white my-auto">Copy Link</p>
      </div>
      <div className="group cursor-pointer text-black mb-2 flex mt-0.5 p-0.5 hover:bg-blue-600">
        <span className="group-hover:text-white mx-2 p-1 text-base my-auto">
          <BiEditAlt />
        </span>
        <p className="group-hover:text-white my-auto">Rename</p>
      </div>
    </div>
  );
}
