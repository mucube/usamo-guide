import * as React from 'react';
import { TOCHeading } from '../../../models/module';
import genLinksFromTOCHeadings from './genLinksFromTOCHeadings';

const TableOfContentsBlock = ({
  tableOfContents,
}: {
  tableOfContents: TOCHeading[];
}) => {
  const links = genLinksFromTOCHeadings(
    tableOfContents,
    _ =>
      'block mb-1 text-sm transition text-gray-300 hover:underline hover:text-blue-300'
  );

  if (tableOfContents.length <= 1) {
    return null;
  }

  return (
    <aside className="mb-6 rounded-2xl border border-gray-700 bg-[#121212] p-5 shadow-sm lg:float-right lg:ml-6 lg:mb-4 lg:w-72">
      <h2 className="mb-4 text-sm font-bold tracking-wider text-gray-400 uppercase">
        Table of Contents
      </h2>
      {links}
    </aside>
  );
};

export default TableOfContentsBlock;
