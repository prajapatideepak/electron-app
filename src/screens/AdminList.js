import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  useChangeByAdmin,
  useGetAllAdmin,
  useSetDefault,
} from "../hooks/usePost";
import { NasirContext } from "../NasirContext";

export default function AdminList() {
  const { admin } = React.useContext(NasirContext);
  const [click, setclick] = React.useState(false);
  const admins = useQuery(["admins", click], useGetAllAdmin);
  const changeAdmin = useChangeByAdmin();
  const setDefault = useSetDefault();

  function handleMakeAdmin(username) {
    changeAdmin.mutate({ username: username });
  }

  function handlesetDefault(username) {
    setDefault.mutate({ username: username });
  }

  React.useEffect(() => {
    if (changeAdmin.isSuccess) {
      setclick(!click);
      toast.success("Updated");
    }
    if (changeAdmin.isError) {
      toast.error(changeAdmin.error.response.data.error);
    }
  }, [changeAdmin.isSuccess, changeAdmin.isError]);

  React.useEffect(() => {
    if (setDefault.isSuccess) {
      toast.success("Updated");
    }
    if (setDefault.isError) {
      toast.error(setDefault.error.response.data.error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDefault.isSuccess, setDefault.isError]);
  return (
    <div className="px-12 py-8">
      <div className="">
        <h1 className="text-3xl  font-bold text-darkblue-500">Admins List</h1>
      </div>
      <div className="px-12 py-20">
        <h2 className="font-semibold text-red-500 pb-2">Note: Clicking on "Set Default" button will reset current password and the new password will be "admin"</h2>
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="bg-gray-200 h-16 w-full text-sm leading-none font-bold text-darkblue-500">
                <th className="font-bold text-left pl-10">Username</th>
                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                  Admin Name
                </th>
                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                  Super Admin
                </th>
                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                  Security PIN
                </th>

                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {!admins.isLoading ? (
                admins?.data.map((m) => {
                  if(admin._id != m._id)
                  return (
                    <tr className="h-20 text-sm leading-none bg-white text-gray-800 border-b border-gray-100">
                      <td className="pl-10">{m?.username}</td>
                      <td className="px-10 lg:px-6 xl:px-0">
                        <span className="font-bold capitalize">
                          {m?.staff_id?.basic_info_id?.full_name}{" "}
                        </span>
                      </td>
                      <td className=" px-10 lg:px-6 xl:px-0">
                        {m.is_super_admin ? "Yes" : "No"}
                      </td>
                      <td className="px-10 lg:px-6 xl:px-0">
                        <span className=""> {m.security_pin} </span>
                      </td>

                      <td className="">
                        <span className="">
                          <button
                            onClick={(e) => handleMakeAdmin(m.username)}
                            className={`rounded-lg px-7 font-bold py-2 w-2/4
                            ${
                              !m.is_super_admin
                                ? "bg-green-800 text-white hover:bg-green-500"
                                : "bg-red-800 text-white hover:bg-red-500"
                            }`}
                          >
                            {m.is_super_admin
                              ? "Remove Super Admin"
                              : "Make Super Admin"}
                          </button>

                          <button
                            onClick={(e) => handlesetDefault(m.username)}
                            className=" bg-darkblue-500 mx-2 rounded-lg hover:bg-blue-900  duration-200 transition text-white px-7 font-bold py-2"
                          >
                            Set Default
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className=" leading-none text-xl text-gray-800 border-b w-full border-gray-100">
                  Loading .........
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
