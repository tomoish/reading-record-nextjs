import React from "react";
import Image from "next/image";
import Link from "next/link";

const RecordItem = ({ record }: {record: any}) => {
  return (
    <div className="record_list">
      <div className="button004">
        <Link href={`/record/${record.id}`}>{record.book_title}</Link>
      </div>
      <div className="record_detail">
        {record.thumbnail_url ? (
          <Image alt="thumbnail" className="thumbnail" src={`${record.thumbnail_url}`} height={220} width={149.66}/>
        ) : (
          <div className="thumbnail gray_thumbnail">
            <p className="thumbnail-none">No data</p>
          </div>
        )}

        <p className="posted_at">{record.date}</p>
        <p className="pages">
          {record.first_page}p - {record.final_page}p
        </p>
        <h3 className="impression">
          <br />
          {record.impression}
        </h3>
      </div>
    </div>
  );
};

export default RecordItem;
