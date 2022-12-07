import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiFolderUserFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { BiFolderPlus } from "react-icons/bi";
import { IoMdInformationCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import {
  AddClass,
  updateClass,
  deleteClass,
  getAllClasses,
  getAllClassesByYear,
} from "../hooks/usePost";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { NasirContext } from "../NasirContext";
import Loader from "../Componant/Loader";

const Myclass = () => {
  const { section } = React.useContext(NasirContext);

  //----------------------------
  //----------API Work----------
  //----------------------------
  const notify = () => toast.success("Class created successfully");
  const updateNotify = () => toast.success("Class update successfully");
  const deleteNotify = () => toast.success("Class delete successfully");

  const [classes, setClasses] = React.useState([]);
  const [classesByYear, setClassesByYear] = React.useState([]);
  const [fetchData, setFetchData] = React.useState([]);
  const [call, setCall] = React.useState(false);
  const [allClasses, setAllClasses] = React.useState([])
  const [selectYear, setSelectYear] = React.useState(0);
  const [medium, setMedium] = React.useState("");
  const [stream, setStream] = React.useState("");
  const [model, setModel] = React.useState(false);
  const [editClassModel, setEditClassModel] = React.useState(false);
  const [edit_class_id, setEdit_class_id] = React.useState();
  const bgColors = [
    "#ffd6d6",
    "#bfdbfe",
    "#c1d1d8",
    "#ffedd5",
    "#f4d5ff",
    "#fbc8bd",
    "#ccfbf1",
    "#d8bbbc",
    "#fef9c3",
  ];
  const headingBgColor = [
    "#f3797e",
    "#3b82f6",
    "#2f667e",
    "#9a4947",
    "#e08aff",
    "#f24822",
    "#14b8a6",
    "#7e1b1f",
    "#ca8a04",
  ];
  const [isHoverEdit, setIsHoverEdit] = React.useState(false);
  const [isHoverDelete, setIsHoverDelete] = React.useState(false);
  const [isAddingClass, setIsAddingClass] = React.useState(false);
  const [isCurrentYearSelected, setIsCurrentYearSelected] =
    React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleMouseEnterEdit = () => {
    setIsHoverEdit(true);
  };

  const handleMouseLeaveEdit = () => {
    setIsHoverEdit(false);
  };

  const handleMouseEnterDelete = () => {
    setIsHoverDelete(true);
  };

  const handleMouseLeaveDelete = () => {
    setIsHoverDelete(false);
  };

  let is_primary = section == "primary" ? 1 : 0;

  async function fetchClassesByYear() {
    const res = await getAllClassesByYear();
    setIsLoading(false);
    if(!res.data || res?.data?.length == 0){
      return;
    }
    const sortedClasses = res.data?.sort((a, b) =>
        a._id.batch_start_year < b._id.batch_start_year
          ? 1
          : a._id.batch_start_year > b._id.batch_start_year
          ? -1
          : 0
      )
    setSelectYear(sortedClasses[0]?._id?.batch_start_year)
    setClassesByYear(sortedClasses);
  }

  async function fetchClasses() {
    const res = await getAllClasses();
    await fetchClassesByYear();
    setClasses(() =>
      res?.data?.filter((data) => {
        return data.is_active == 1 && data.is_primary == is_primary;
      })
    );

    setAllClasses(()=>
      res?.data?.filter((data) => {
        return data.is_active == 1;
      })
    )

    setFetchData(() =>
      res?.data?.filter((data) => {
        return data.is_primary == is_primary;
      })
    );
  }

  useEffect(() => {
    fetchClasses();
  }, [call]);

  const handleYearChange = (e) => {
    setSelectYear(e.target.value);
    let flag = 0;
    classesByYear.map((value, index) => {
      if (value._id.batch_start_year == e.target.value && index == 0) {
        flag = 1;
        return;
      }
    });

    if (flag) {
      setIsCurrentYearSelected(true);
    } else {
      setIsCurrentYearSelected(false);
    }

    setClasses(() =>
      fetchData.filter((data) => {
        return (
          data.batch_start_year == e.target.value &&
          (stream != "" ? data.stream == stream : true) &&
          (medium != "" ? data.medium == medium : true)
        );
      })
    );
  };

  const handleMediumChange = (e) => {
    setMedium(e.target.value);
    setClasses(() =>
      fetchData?.filter((data) => {
        return (
          data.batch_start_year == selectYear &&
          (stream != "" ? data.stream == stream : true) &&
          (e.target.value != "" ? data.medium == e.target.value : true)
        );
      })
    );
  };

  const handleStreamChange = (e) => {
    setStream(e.target.value);
    setClasses(() =>
      fetchData?.filter((data) => {
        return (
          data.batch_start_year == selectYear &&
          (e.target.value != "" ? data.stream == e.target.value : true) &&
          (medium != "" ? data.medium == medium : true)
        );
      })
    );
  };

  const handleEditClass = (class_id) => {
    setEditClassModel(true);
    setEdit_class_id(class_id);
  };

  const handleDeleteClass = async (class_id) => {
    Swal.fire({
      title: "Are you sure to delete class?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteClassResponse = await deleteClass(class_id);
        if (deleteClassResponse) {
          setCall(() => !call);
          return deleteNotify();
        }
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    resetField,
  } = useForm();

  const onSubmit = async (data) => {
    setIsAddingClass(true)
    const response = await AddClass(data);
    setIsAddingClass(false)
    if (response.data.success) {
      fetchClasses();
      setModel(false);
      reset();
      return notify();
    }
    else{
      toast.error('Something went wrong')
    }
  };

  const onEditSubmit = async (data) => {
    const editClassResponse = await updateClass(edit_class_id, data);
    if (editClassResponse) {
      setCall(() => !call);
      setEditClassModel(false);
      reset();
      return updateNotify();
    }
  };

  const handleClick = () => {
    resetField("batch_start_year");
    resetField("batch_end_year");
    resetField("class_name");
    resetField("medium");
    resetField("is_primary");
    resetField("fees");
    resetField("stream");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative p-5">
      {/* Add New Class Model */}
      {model && (
        <div className="absolute w-full h-full  z-30 ">
          <div className="flex justify-center opacity-100 ">
            <div className="h-2/3 mx-auto  opacity-100 shadow-2xl rounded mt-10 2xl:mt-24  bg-white w-3/4 z-50">
              <div className="">
                <div className="flex justify-end ">
                  <button
                    onClick={(e) => {
                      setModel(!model);
                      handleClick();
                    }}
                    className="absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700"
                  >
                    <AiFillCloseCircle />
                  </button>
                </div>
                <div className="mt-7">
                  <h1 className="text-2xl font-bold text-darkblue-500 px-6 ">
                    Add New Class
                  </h1>
                  <div>
                    <form
                      className="flex justify-center items-center "
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className=" w-full grid grid-cols-1 rounded-lg  truncate  pb-5 pt-10 bg-white ">
                        <div className=" flex flex-col items-center gap-4">
                          <div className="flex lg:flex-row md:flex-col gap-4 ">
                            <div className="class_name">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Class
                                </span>

                                <input
                                  type="text"
                                  placeholder="Enter class name"
                                  className={`w-full 2xl:w-60 mt-1 block  px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
                                    ${errors.class_name && "border-red-600"}
                                  `}
                                  {...register("class_name", {
                                    required: "Class name is required",
                                  })}
                                  onKeyUp={() => {
                                    trigger("class_name");
                                  }}
                                />

                                {errors.class_name && (
                                  <small className="text-red-700">
                                    {errors.class_name.message}
                                  </small>
                                )}
                              </label>
                            </div>
                            <div className="Batch">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Batch (Starting Year)
                                </span>
                                <div className=" mt-1 ">
                                  <div className="input flex items-center space-x-4">
                                    <div className="">
                                      <input
                                        type="text"
                                        placeholder="Starting year"
                                        className={`w-36 2xl:w-44  block  px-3 py-2 bg-white rounded-md text-sm shadow-sm placeholder-slate-400 border border-slate-300 outline-none
                                       ${
                                         errors.batch_start_year &&
                                         "border-red-600"
                                       }`}
                                        {...register("batch_start_year", {
                                          required: "Starting year",
                                          pattern: {
                                            value: /^[0-9]*$/,
                                            message:
                                              "Please enter only numbers",
                                          },
                                          minLength: {
                                            value: 4,
                                            message:
                                              "Please enter four digits only",
                                          },
                                          maxLength: {
                                            value: 4,
                                            message:
                                              "Please enter four digits only",
                                          },
                                        })}
                                        onKeyUp={() => {
                                          trigger("batch_start_year");
                                        }}
                                      />
                                      {errors.batch_start_year && (
                                        <small className="text-red-700">
                                          {errors.batch_start_year.message}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </label>
                            </div>
                            <div className="Batch">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Batch (Ending Year)
                                </span>
                                <div className=" mt-1 ">
                                  <div className="input flex items-center space-x-4">
                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Ending year"
                                        className={`w-36 2xl:w-44 block  px-3 py-2 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400 border border-slate-300 outline-none
                                       ${
                                         errors.batch_end_year &&
                                         "border-red-600"
                                       }`}
                                        {...register("batch_end_year", {
                                          required: "End year ",
                                          pattern: {
                                            value: /^[0-9]*$/,
                                            message:
                                              "Please enter only numbers",
                                          },
                                          minLength: {
                                            value: 4,
                                            message:
                                              "Please enter four digits only",
                                          },
                                          maxLength: {
                                            value: 4,
                                            message:
                                              "Please enter four digits only",
                                          },
                                        })}
                                        onKeyUp={() => {
                                          trigger("batch_end_year");
                                        }}
                                      />
                                      {errors.batch_end_year && (
                                        <small className="text-red-700">
                                          {errors.batch_end_year.message}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </label>
                            </div>
                            <div className="Medium">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Medium
                                </span>
                                <select
                                  className={`2xl:w-[240px] w-[180px] mt-1 block  px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none 
                                    ${errors.medium && "border-red-600"}
                                  `}
                                  {...register("medium", {
                                    required: "Medium is required",
                                  })}
                                  onKeyUp={() => {
                                    trigger("medium");
                                  }}
                                >
                                  <option value="">Select</option>
                                  <option value="english">English</option>
                                  <option value="gujarati">Gujarati</option>
                                  <option value="hindi">Hindi</option>
                                </select>
                                {errors.medium && (
                                  <small className="text-red-700">
                                    {errors.medium.message}
                                  </small>
                                )}
                              </label>
                            </div>
                          </div>
                          <div className="flex lg:flex-row md:flex-col gap-4 items-center">
                            <div className="Class">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Section
                                </span>
                                <select
                                  className={`2xl:w-[240px] w-[180px]  mt-1 block  px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                                    errors.is_primary && "border-red-600"
                                  }`}
                                  {...register("is_primary", {
                                    required: "Section is required",
                                  })}
                                  onKeyUp={() => {
                                    trigger("is_primary");
                                  }}
                                >
                                  <option value="">Select</option>
                                  <option value={1}>Primary</option>
                                  <option value={0}>Secondary</option>
                                </select>
                                {errors.is_primary && (
                                  <small className="text-red-700">
                                    {errors.is_primary.message}
                                  </small>
                                )}
                              </label>
                            </div>
                            <div className="Stream">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Stream
                                </span>
                                <select
                                  className={`2xl:w-[240px] w-[180px]  mt-1 block px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                                    errors.stream && "border-red-600"
                                  }`}
                                  {...register("stream", {
                                    required: "Stream is required",
                                  })}
                                  onKeyUp={() => {
                                    trigger("stream");
                                  }}
                                >
                                  <option value="">Select</option>
                                  <option value="none">None</option>
                                  <option value="commerce">Commerce</option>
                                  <option value="science">Science</option>
                                  <option value="arts">Arts</option>
                                </select>
                                {errors.stream && (
                                  <small className="text-red-700">
                                    {errors.stream.message}
                                  </small>
                                )}
                              </label>
                            </div>
                            <div className="Fees">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Fees
                                </span>
                                <input
                                  type="text"
                                  placeholder="Enter fees"
                                  className={`2xl:w-[240px] w-[180px]  mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                                    errors.fees && "border-red-600"
                                  }`}
                                  {...register("fees", {
                                    required: "Fees is required",
                                    pattern: {
                                      value: /^[0-9]*$/,
                                      message: "Please enter only numbers",
                                    },
                                  })}
                                  onKeyUp={() => {
                                    trigger("fees");
                                  }}
                                />
                                {errors.fees && (
                                  <small className="text-red-700">
                                    {errors.fees.message}
                                  </small>
                                )}
                              </label>
                            </div>
                          </div>
                          <div className="flex lg:flex-row md:flex-col gap-4">
                            <div className="btn mt-5 flex justify-center w-60 space-x-3">
                              <button
                                type="button"
                                onClick={handleClick}
                                className="bg-darkblue-500 uppercase  hover:bg-white  border-2 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium h-11 w-28 rounded-md tracking-wider"
                              >
                                Clear
                              </button>
                              <button
                                type="submit"
                                disabled={isAddingClass}
                                className={` ${isAddingClass ? 'bg-darkblue-300' : 'bg-darkblue-500'} uppercase  hover:bg-white border-2 flex justify-center items-center  hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium h-11 w-28 rounded-md tracking-wider`}
                              >
                                <h1 className="">{isAddingClass ? 'Loading...' : 'SUBMIT'}</h1>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Class Model */}
      {editClassModel && (
        <div className="absolute w-full h-full  z-30 ">
          <div className="flex justify-center opacity-100 ">
            <div className="h-2/3 mx-auto  opacity-100 shadow-2xl rounded mt-24 bg-white w-2/3 z-50">
              {classes.map((item, index) => {
                if (edit_class_id == item._id)
                  return (
                    <div key={index} className="">
                      <div className="flex justify-end ">
                        <button
                          onClick={(e) => {
                            setEditClassModel(!editClassModel);
                            reset();
                          }}
                          className="absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700"
                        >
                          <AiFillCloseCircle />
                        </button>
                      </div>
                      <div className="mt-7">
                        <h1 className="text-2xl font-bold text-darkblue-500 px-6 ">
                          {`Edit Class ${item.class_name}`}
                        </h1>
                        <div>
                          <form
                            className="flex justify-center items-center "
                            onSubmit={handleSubmit(onEditSubmit)}
                          >
                            <div className=" w-full grid grid-cols-1 rounded-lg drop-shadow-md truncate bg-white pb-5 pt-10 ">
                              <div className=" flex flex-col items-center gap-4">
                                <div className="flex lg:flex-row md:flex-col gap-4 ">
                                  <div className="class_name">
                                    <label className="block">
                                      <span className="block text-sm font-medium text-slate-700">
                                        Class
                                      </span>

                                      <input
                                        defaultValue={item.class_name}
                                        type="text"
                                        placeholder="Enter class name"
                                        className="xl:w-52 2xl:w-60 mt-1 block  px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none"
                                        {...register("class_name", {
                                          required: "Classname is required",
                                        })}
                                        onKeyUp={() => {
                                          trigger("class_name");
                                        }}
                                      />

                                      {errors.class_name && (
                                        <small className="text-red-700">
                                          {errors.class_name.message}
                                        </small>
                                      )}
                                    </label>
                                  </div>
                                  <div className="Batch">
                                    <label className="block">
                                      <span className="block text-sm font-medium text-slate-700">
                                        Batch
                                      </span>
                                      <div className=" mt-1">
                                        <div className="input flex items-center border border-slate-300 rounded-md">
                                          <input
                                            defaultValue={item.batch_start_year}
                                            type="text"
                                            disabled={true}
                                            placeholder="Starting year"
                                            className={`xl:w-24 2xl:w-28  block  px-3 py-2 bg-white rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                                              errors.batch_start_year &&
                                              "border-red-600"
                                            }`}
                                            {...register(
                                              "batch_start_year_edit",
                                              {
                                                pattern: {
                                                  value: /^[0-9]*$/,
                                                  message:
                                                    "Please enter only numbers",
                                                },
                                                minLength: {
                                                  value: 4,
                                                  message:
                                                    "Please enter four digits only",
                                                },
                                                maxLength: {
                                                  value: 4,
                                                  message:
                                                    "Please enter four digits only",
                                                },
                                              }
                                            )}
                                            onKeyUp={() => {
                                              trigger("batch_start_year");
                                            }}
                                          />
                                          <div className="w-0.5 bg-slate-500  rounded-md">
                                            554
                                          </div>
                                          <input
                                            defaultValue={item.batch_end_year}
                                            type="text"
                                            disabled={true}
                                            placeholder="Ending year"
                                            className={`xl:w-28 2xl:w-32 block  px-3 py-2 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                                              errors.batch_end_year &&
                                              "border-red-600"
                                            }`}
                                            {...register(
                                              "batch_end_year_edit",
                                              {
                                                pattern: {
                                                  value: /^[0-9]*$/,
                                                  message:
                                                    "Please enter only numbers",
                                                },
                                                minLength: {
                                                  value: 4,
                                                  message:
                                                    "Please enter four digits only",
                                                },
                                                maxLength: {
                                                  value: 4,
                                                  message:
                                                    "Please enter four digits only",
                                                },
                                              }
                                            )}
                                            onKeyUp={() => {
                                              trigger("batch_end_year");
                                            }}
                                          />
                                        </div>
                                        <div className="msg flex items-center mt-1 ml-1 ">
                                          {errors.batch_start_year && (
                                            <small className="text-red-700">
                                              {errors.batch_start_year.message}
                                            </small>
                                          )}
                                          <div className="ml-14">
                                            {errors.batch_end_year && (
                                              <small className="text-red-700">
                                                {errors.batch_end_year.message}
                                              </small>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                  <div className="Medium">
                                    <label className="block">
                                      <span className="block text-sm font-medium text-slate-700">
                                        Medium
                                      </span>
                                      <select
                                        className="xl:w-52 2xl:w-60 mt-1 block  px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none"
                                        {...register("medium", {
                                          required: "Medium is required",
                                        })}
                                        onKeyUp={() => {
                                          trigger("medium");
                                        }}
                                      >
                                        <option
                                          value="english"
                                          selected={
                                            item.medium == "english"
                                              ? true
                                              : false
                                          }
                                        >
                                          English
                                        </option>
                                        <option
                                          value="gujarati"
                                          selected={
                                            item.medium == "gujarati"
                                              ? true
                                              : false
                                          }
                                        >
                                          Gujarati
                                        </option>
                                        <option
                                          value="hindi"
                                          selected={
                                            item.medium == "hindi"
                                              ? true
                                              : false
                                          }
                                        >
                                          Hindi
                                        </option>
                                      </select>
                                      {errors.medium && (
                                        <small className="text-red-700">
                                          {errors.medium.message}
                                        </small>
                                      )}
                                    </label>
                                  </div>
                                </div>
                                <div className="flex lg:flex-row md:flex-col gap-4 items-center">
                                  <div className="Class">
                                    <label className="block">
                                      <span className="block text-sm font-medium text-slate-700">
                                        Section
                                      </span>
                                      <select
                                        className={`xl:w-52 2xl:w-60  mt-1 block  px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                                          errors.is_primary && "border-red-600"
                                        }`}
                                        {...register("is_primary", {
                                          required: "Section is required",
                                        })}
                                        onKeyUp={() => {
                                          trigger("is_primary");
                                        }}
                                      >
                                        <option
                                          value={0}
                                          selected={
                                            item.is_primary == 0 ? true : false
                                          }
                                        >
                                          Primary
                                        </option>
                                        <option
                                          value={1}
                                          selected={
                                            item.is_primary == 1 ? true : false
                                          }
                                        >
                                          Secondary
                                        </option>
                                      </select>
                                      {errors.is_primary && (
                                        <small className="text-red-700">
                                          {errors.is_primary.message}
                                        </small>
                                      )}
                                    </label>
                                  </div>
                                  <div className="Stream">
                                    <label className="block">
                                      <span className="block text-sm font-medium text-slate-700">
                                        Stream
                                      </span>
                                      <select
                                        className={`xl:w-52 2xl:w-60  mt-1 block px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                                          errors.stream && "border-red-600"
                                        }`}
                                        {...register("stream", {
                                          required: "Stream is required",
                                        })}
                                        onKeyUp={() => {
                                          trigger("stream");
                                        }}
                                      >
                                        <option
                                          value="none"
                                          selected={
                                            item.stream == "none" ? true : false
                                          }
                                        >
                                          None
                                        </option>
                                        <option
                                          value="commerce"
                                          selected={
                                            item.stream == "commerce"
                                              ? true
                                              : false
                                          }
                                        >
                                          Commerce
                                        </option>
                                        <option
                                          value="science"
                                          selected={
                                            item.stream == "science"
                                              ? true
                                              : false
                                          }
                                        >
                                          Science
                                        </option>
                                        <option
                                          value="arts"
                                          defaultValue={
                                            item.stream == "arts" ? true : false
                                          }
                                        >
                                          Arts
                                        </option>
                                      </select>
                                      {errors.stream && (
                                        <small className="text-red-700">
                                          {errors.stream.message}
                                        </small>
                                      )}
                                    </label>
                                  </div>

                                  <div className="Fees">
                                    <label className="block">
                                      <span className="block text-sm font-medium text-slate-700">
                                        Fees
                                      </span>
                                      <input
                                        defaultValue={item.fees}
                                        type="text"
                                        placeholder="Enter fees"
                                        className={`xl:w-52 2xl:w-60  mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                                          errors.fees && "border-red-600"
                                        }`}
                                        {...register("fees", {
                                          required: "Fees is required",
                                          pattern: {
                                            value: /^[0-9]*$/,
                                            message:
                                              "Please enter only numbers",
                                          },
                                        })}
                                        onKeyUp={() => {
                                          trigger("fees");
                                        }}
                                      />
                                      {errors.fees && (
                                        <small className="text-red-700">
                                          {errors.fees.message}
                                        </small>
                                      )}
                                    </label>
                                  </div>
                                </div>
                                <div className="flex lg:flex-row md:flex-col gap-4">
                                  <div className="btn mt-5 flex justify-center w-60 space-x-3">
                                    {/* <button
                                type="button"
                                onClick={handleClick}
                                className="bg-blue-900 hover:bg-white text-lg border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                              >
                                Clear
                              </button> */}
                                    <button
                                      type="submit"
                                      className="bg-blue-900 hover:bg-white border-2 flex justify-center items-center  hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                                    >
                                      <h1 className=" text-lg">Update</h1>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      )}

      <div
        className={`bg-slate-100 ${model && "opacity-20"} ${
          editClassModel && "opacity-20"
        }`}
      >
        <div className="md:p-7 md:pt-3 xl:p-5 xl:pt-1 bg-[#f5f7ff]">
          <div className="flex justify-between items-center">
            <div className="left flex justify-center items-center space-x-5">
              <div className="slect-year ">
                <label
                  htmlFor="change Year"
                  className="text-darkblue-500 font-semibold ml-1"
                >
                  Select Year
                </label>
                <button className=" flex items-center border bg-white p-2 md:p-2 md:py-1 rounded-lg  space-x-1 ">
                  <select
                    name=""
                    id="selectYear"
                    value={selectYear}
                    onChange={handleYearChange}
                    className="cursor-pointer text-darkblue-500  text-base outline-none"
                  >
                    {
                      classesByYear && classesByYear[0] ? (
                        classesByYear.map((item, index) => {
                          return (
                            <option
                              key={index}
                              idx={index}
                              value={item._id.batch_start_year}
                            >
                              {index == 0
                                ? "Current Year"
                                : `${item._id.batch_start_year}-${item._id.batch_end_year}`}
                            </option>
                          );
                        })
                      ) : (
                        <option value="">Select</option>
                      )
                      //null
                    }
                  </select>
                </button>
              </div>
              <div className="medium ">
                <label
                  htmlFor="medium"
                  className="text-darkblue-500 font-semibold ml-1"
                >
                  Medium
                </label>
                <button className=" flex items-center border bg-white p-2 md:p-2 md:py-1 rounded-lg  space-x-1 ">
                  <select
                    name=""
                    id="medium"
                    value={medium}
                    onChange={handleMediumChange}
                    className="cursor-pointer text-darkblue-500 text-base outline-none"
                  >
                    <option value="">Select</option>
                    <option value="english">English</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </button>
              </div>
              <div className="stream">
                <label
                  htmlFor="stream"
                  className="text-darkblue-500 font-semibold ml-1"
                >
                  Stream
                </label>
                <button className=" flex items-center border bg-white p-2 md:p-2 md:py-1 rounded-lg space-x-1 ">
                  <select
                    name=""
                    id="stream"
                    value={stream}
                    onChange={handleStreamChange}
                    className="cursor-pointer text-darkblue-500 text-base outline-none"
                  >
                    <option value="">Select</option>
                    <option value="none">None</option>
                    <option value="science">Science</option>
                    <option value="arts">Arts</option>
                    <option value="commerce">Commerce</option>
                  </select>
                </button>
              </div>
            </div>
            <div className="right">
              <div className="wrapper flex items-center space-x-3">
                <Tooltip
                  content="Add New Class"
                  placement="bottom-end"
                  className="text-white bg-black rounded p-2"
                >
                  <div
                    onClick={(e) => setModel(true)}
                    className="btn cursor-pointer  h-12 w-12 rounded-full bg-white text-left border  overflow-hidden "
                    id="btn"
                  >
                    <div
                      className="icons  h-12 w-40 flex ml-3 items-center "
                      id="icons"
                    >
                      <BiFolderPlus className="text-2xl text-darkblue-500  " />
                    </div>
                  </div>
                </Tooltip>
                {allClasses && allClasses?.length > 0 ? (
                  <button
                    className="btn cursor-pointer  h-11 w-40 rounded-full bg-white text-left border  overflow-hidden"
                    id="btn"
                  >
                    <NavLink
                      className="nav-link"
                      to="class/ChangeYear"
                      state={{ allClasses }}
                    >
                      <div
                        className="icons  h-11 w-40 flex ml-3 items-center"
                        id="icons"
                      >
                        <FaArrowRight className="text-xl text-darkblue-500  " />
                        <span className="ml-2 text-lg text-darkblue-500 font-semibold">
                          Change Year
                        </span>
                      </div>
                    </NavLink>
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className={`mt-5 h-1/5 rounded-lg bg-white pt-5 ${
              classes?.length > 0 ? "pb-10" : "pb-5"
            } flex justify-center items-center`}
          >
            <ul className="justify-between grid grid-custom gap-10 p-10 pb-0 pt-0">
              {classes?.length > 0 ? (
                classes?.map((item, index) => {
                  return (
                    <li
                      className="rounded-md h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer"
                      key={index}
                    >
                      <div
                        className="class_card drop-shadow-lg rounded-lg p-2 pr-0 h-40"
                        style={{
                          backgroundColor: bgColors[index % bgColors.length],
                        }}
                      >
                        <div className=" h-6  flex justify-end items-center space-x-2 mr-2 ">
                          {isCurrentYearSelected ? (
                            <>
                              <div
                                className="edit_delete_btns px-1 py-1 rounded-md"
                                style={{
                                  color: isHoverEdit
                                    ? "#fff"
                                    : headingBgColor[
                                        index % headingBgColor.length
                                      ],
                                  backgroundColor: isHoverEdit
                                    ? headingBgColor[
                                        index % headingBgColor.length
                                      ]
                                    : "#fff",
                                }}
                                onMouseEnter={handleMouseEnterEdit}
                                onMouseLeave={handleMouseLeaveEdit}
                                onClick={() => handleEditClass(item._id)}
                              >
                                <MdModeEdit />
                              </div>

                              <div
                                className="edit_delete_btns px-1 py-1 rounded-md"
                                style={{
                                  color: isHoverDelete
                                    ? "#fff"
                                    : headingBgColor[
                                        index % headingBgColor.length
                                      ],
                                  backgroundColor: isHoverDelete
                                    ? headingBgColor[
                                        index % headingBgColor.length
                                      ]
                                    : "#fff",
                                }}
                                onMouseEnter={handleMouseEnterDelete}
                                onMouseLeave={handleMouseLeaveDelete}
                                onClick={() => handleDeleteClass(item._id)}
                              >
                                <MdDelete />
                              </div>
                            </>
                          ) : null}
                        </div>
                        <NavLink className="nav-link" to={`class/${item._id}`}>
                          <div className="flex  space-x-2 items-center ml-3 ">
                            <div
                              className="rounded-md"
                              style={{
                                backgroundColor:
                                  headingBgColor[index % headingBgColor.length],
                              }}
                            >
                              <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                            </div>
                            <div className="flex flex-1 justify-center items-center">
                              <h1
                                style={{
                                  color:
                                    headingBgColor[
                                      index % headingBgColor.length
                                    ],
                                }}
                                className={`text-xl font-bold ${
                                  item.class_name.length < 8 && "text-4xl"
                                }  ${
                                  item.class_name.length <= 2 && "text-7xl"
                                }   `}
                              >
                                {item.class_name}
                              </h1>
                            </div>
                          </div>
                          <div
                            className="total w-60 h-8 ml-1 rounded-md  flex  justify-center items-center mt-4 "
                            style={{
                              backgroundColor:
                                headingBgColor[index % headingBgColor.length],
                            }}
                          >
                            <p className="  text-white    ">
                              Total Student : {item.total_student}
                            </p>
                          </div>
                        </NavLink>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="bg-red-200 font-bold flex justify-center items-center p-2 rounded mx-3 space-x-2">
                  <IoMdInformationCircle className="text-xl text-red-600" />
                  <h1 className="text-red-800">Classes not found </h1>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myclass;
