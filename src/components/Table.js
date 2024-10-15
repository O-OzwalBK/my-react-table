import { useMemo, useState } from "react"
import { useTable, useSortBy, usePagination } from "react-table"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal } from "./Modal"
import { COLUMNS } from "./columns"
import { formatDate } from "../utils/DateFormat"
import MOCK_DATA from '../data/MOCK_DATA.json'
import { faAnglesLeft, faAnglesRight, faCircleChevronDown, faCircleChevronUp } from "@fortawesome/free-solid-svg-icons"

export const Table = () => {
   // to ensure that the data isn't recreated on every render which saves a lot of calculation
   const columns = useMemo(() => COLUMNS, [])
   const data = useMemo(() => MOCK_DATA, [])
   const [isModalOpen, setModalOpen] = useState(false)
   const [modalContent, setModalContent] = useState('')
   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })

   const handleRemarkClick = (row) => {
      setModalContent(row.values.remark);
      const cell = document.getElementById(`remark-cell-${row.id}`);
      if (cell) {
         const rect = cell.getBoundingClientRect();
         setModalPosition({
            top: rect.top + window.scrollY, // Use window.scrollY for scrolling
            left: rect.left + window.scrollX, // Use window.scrollX for scrolling
         });
      }
      setModalOpen(true);
   }

   const {
      getTableBodyProps,
      getTableProps,
      headerGroups,
      page,
      setPageSize,
      nextPage,
      canNextPage,
      previousPage,
      canPreviousPage,
      pageOptions,
      state,
      gotoPage,
      pageCount,
      prepareRow,
      // array of all columns passed to the table
      allColumns,
      // method that shows or hides all columns at once
      getToggleHideAllColumnsProps
   } = useTable({
      columns: columns,
      data: data,
      // default page shown on load
      initialState: {
         pageIndex: 0
      }
   }, useSortBy, usePagination)

   const { pageIndex, pageSize } = state

   return (
      <div className="flex flex-col">
         <div className="overflow-x-auto flex-grow-1 w-full">
            <table {...getTableProps()} className="bg-white shadow-md w-full table-auto">
               <thead className="bg-[#181818] text-white sticky top-0">
                  {headerGroups.map((headerGroup) => (
                     <tr {...headerGroup.getFooterGroupProps()} className="hover:bg-[#000000]">
                        <th className="py-3 px-4 text-sm text-center font-semibold uppercase tracking-wider">S.N.</th>
                        {headerGroup.headers.map((column) => {
                           if (column.id === 'sn') return null;
                           return (
                              <th
                                 {...column.getHeaderProps(column.getSortByToggleProps())}
                                 className="py-3 px-4 text-sm text-center font-semibold uppercase tracking-wider cursor-pointer"
                              >
                                 {column.render('Header')}
                                 <span className="ml-2">
                                    {column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon={faCircleChevronDown} /> : <FontAwesomeIcon icon={faCircleChevronUp} />) : null}
                                 </span>
                              </th>
                           );
                        })}
                     </tr>
                  ))}
               </thead>
               <tbody {...getTableBodyProps()} className="bg-white">
                  {page.map((row, rowIndex) => {
                     prepareRow(row);
                     return (
                        <tr {...row.getRowProps()} className="odd:bg-gray-200 hover:bg-[#dbd1d0] transition duration-400">
                           <td className="py-3 px-3 border-b border-gray-200 text-sm text-black text-center">
                              {`${rowIndex + 1 + (pageIndex * pageSize)}.`}
                           </td>
                           {row.cells.map((cell) => {
                              if (cell.column.id === 'sn') return null;

                              const cellValue = cell.value;
                              const isSnColumn = cell.column.id === 'sn';
                              const isCompanyColumn = cell.column.id === 'company';
                              // const isDateColumn = cell.column.id === 'creation_date' || cell.column.id === 'updated_date';
                              // const displayValue = cell.value;

                              const statusClass =
                                 cellValue === 'open' ? 'bg-green-500 rounded-full' :
                                    cellValue === 'sold' ? 'bg-red-500 rounded-full' :
                                       cellValue === 'cancelled' ? 'bg-yellow-500 rounded-full' : 'text-black';

                              const remarkColumn = cell.column.id === 'remark' ? 'truncate max-h-24 max-w-64 overflow-hidden' : ''

                              return (
                                 <td
                                    {...cell.getCellProps()}
                                    id={`remark-cell-${row.id}`}
                                    onClick={cell.column.id === 'remark' ? () => handleRemarkClick(row) : null}
                                    className={`py-3 px-3 border-b border-gray-200 text-sm text-white text-center ${isCompanyColumn ? 'font-semibold' : ''} ${remarkColumn}`}
                                 >
                                    <span className={`inline-block px-2 py-2 ${statusClass}`}>
                                       {isSnColumn ? '' : cell.render('Cell')}
                                    </span>
                                 </td>
                              )
                           })}
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
         <div className="h-32">
            <div className="flex items-center justify-center mt-4 space-x-4">
               <span>
                  Go to page: {' '}
                  <input type="number" defaultValue={pageIndex + 1}
                     className="shadow border py-1 px-2"
                     onChange={(e) => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                     }} />
               </span>
               <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {canPreviousPage && <FontAwesomeIcon icon={faAnglesLeft} />}
               </button>
               <button onClick={() => previousPage()} disabled={!canPreviousPage}
                  className="p-1 shadow rounded-md bg-[#38414b] text-white cursor-pointer hover:bg-[#151e23]">Previous</button>
               <span>
                  Page{' '}
                  <strong>
                     {pageIndex + 1} of {pageOptions.length}
                  </strong>
               </span>
               <button onClick={() => nextPage()} disabled={!canNextPage}
                  className="p-1 shadow rounded-md bg-[#38414b] text-white cursor-pointer hover:bg-[#151e23]">Next</button>
               <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {canNextPage && <FontAwesomeIcon icon={faAnglesRight} />}
               </button>
            </div>
            <div className="flex items-center justify-center mt-4 w-full">
               <div className="flex max-w-md items-center justify-evenly mt-4 space-x-4 p-4">
                  Show
                  <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}
                     className="mx-2 p-1 rounded-md bg-[#38414b] text-white">
                     {[10, 15, 20, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                           {pageSize}
                        </option>
                     ))}
                  </select>
                  pages
               </div>
            </div>
         </div>
         <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} content={modalContent} position={modalPosition} />
      </div>
   )
}
