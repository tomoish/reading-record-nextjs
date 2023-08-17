import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RecordType } from "@/types/RecordType";

const RecordItem = ({ record }: { record: RecordType }) => {
  return (
    <div className="h-96 w-10/12 md:w-1/2 lg:w-2/5 mb-2 bg-white border-4 border-red-100 mx-auto grid grid-cols-1 ">
      <div className="">
        <Link
          href={`/record/${record.id}`}
          className="flex items-center justify-center text-center rounded-full mx-20 my-4 p-4 bg-red-100 hover:bg-red-300 text-black hover:text-white cursor-pointer"
        >
          {record.book_title}
        </Link>
      </div>
      <div className="grid grid-cols-2">
        <div className="mx-auto ">
          {record.thumbnail_url ? (
            <Image
              alt="thumbnail"
              className="thumbnail"
              src={`${record.thumbnail_url}`}
              height={220}
              width={149.66}
            />
          ) : (
            <div className=" h-48 w-28 md:h-52 md:w-36 bg-gray-200 flex justify-center items-center">
              <p className="text-black text-xl">No data</p>
            </div>
          )}
        </div>
        
        <div className="text-center p-2">
          <p>{record.date}</p>
          <p>
            {record.first_page}p - {record.final_page}p
          </p>
          <h3 className="">
            <br />
            {record.impression}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RecordItem;
