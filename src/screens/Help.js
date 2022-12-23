import React from 'react'
import { IoIosCall, IoIosMail } from "react-icons/io"
import { GiWorld } from "react-icons/gi"
import { Tooltip } from "@material-tailwind/react";

const Help = () => {

  return (
    <div className="flex justify-center items-center">
      <div className='bg-white flex justify-center items-center shadow-xl md:mx-10 2xl:mx-32 my-8 p-5'>
        <div>
          <div className='flex justify-between items-center mx-5'>
            <div className=''>
              <img src="images/wellbenix.png" alt="" className="w-40" />
            </div>
            <div className='flex justify-center items-center  space-x-5'>
              <div className='space-y-1'>
                <div className='flex justify-center items-center w-5'>
                  <Tooltip
                    content="@wellbenix"
                    placement="bottom"
                    className="text-white bg-[#FFAB4C] rounded px-2 py-1"
                  >
                    <img src="images/instagram.png" alt="" className="w-5 cursor-pointer" />
                  </Tooltip>
                </div>
              </div>
              <div className='space-y-1'>
                <div className='flex justify-center items-center w-5'>
                  <Tooltip
                    content="Wellbenix"
                    placement="bottom"
                    className="text-white bg-[#0077B5] rounded px-2 py-1"
                  >
                    <img src="images/linkedin.png" alt="" className="w-5 cursor-pointer" />
                  </Tooltip>
                </div>
              </div>
              <div className='space-y-1'>
                <div className='flex justify-center items-center w-5'>
                  <Tooltip
                    content="Wellbenix"
                    placement="bottom"
                    className="text-white bg-[#F61C0D] rounded px-2 py-1"
                  >
                    <img src="images/youtube.png" alt="" className="w-5 cursor-pointer" />
                  </Tooltip>
                </div>
              </div>

            </div>
          </div>
          <div className='2xl:mx-48 mx-32 space-y-2'>
            <div className='flex justify-center items-center py-2'>
              <img src="images/help2.jpg" alt="" className="w-2/4" />
            </div>
            <div className=' space-y-2  '>
              <h1 className='text-center text-2xl font-bold'>Are you facing any problem ?</h1>
              <p className='text-center text-sm 2xl:text-base font-medium text-gray-500'>Thank you for your interest in our services. If you have any problem or inquiry so please contact on below given contact details and we
                will get back to you as soon as possible regarding your request.
              </p>
              <div className='flex justify-center items-center py-8'>
                <div className='space-y-5'>
                  <div className='flex justify-between items-center space-x-10'>
                    <div className='space-y-3'>
                      <div className='flex justify-center items-center'>
                        <IoIosMail className='text-2xl' />
                      </div>
                      <p className='font-semibold text-gray-500'>wellbenix@gmail.com</p>
                    </div>
                    <div className='space-y-3'>
                      <div className='flex justify-center items-center '>
                        <IoIosCall className='text-2xl' />
                      </div>
                      <p className='font-semibold text-gray-500'>(+91) 7284855130</p>
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex items-center justify-center'>
                        <GiWorld className='text-[22px]' />
                      </div>
                      <a href="https://www.wellbenix.com" target="_blank" className='font-semibold text-gray-500 mt-2'>www.wellbenix.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
