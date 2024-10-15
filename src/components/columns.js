import { format } from "date-fns"

export const COLUMNS = [
   {
      Header: 'S.N.',
      // accessor is defined for react-table to identify which data from the json to display under which column
      accessor: 'sn',
   },
   {
      Header: 'Company',
      accessor: 'company',
   },
   {
      Header: 'Quantity',
      accessor: 'quantity',
   },
   {
      Header: 'Price',
      accessor: 'price',
   },
   {
      Header: 'Status',
      accessor: 'status',
   },
   {
      Header: 'Created',
      accessor: 'creation_date',
      Cell: ({ value }) => { return format(new Date(value), 'yyyy/dd/MM') }
   },
   {
      Header: 'Last Updated',
      accessor: 'updated_date',
      Cell: ({ value }) => { return format(new Date(value), 'yyyy/dd/MM') }
   },
   {
      Header: 'Remark',
      accessor: 'remark',
   },
]