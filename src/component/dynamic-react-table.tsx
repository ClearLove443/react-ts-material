import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Box, Button, Typography } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query"; //Note: this is TanStack React Query V5
import { download, generateCsv, mkConfig } from "export-to-csv";
import {
  MaterialReactTable,
  MRT_Row,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_RowVirtualizer,
  type MRT_SortingState,
} from "material-react-table";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type UIEvent,
} from "react";

//Your API response shape will probably be different. Knowing a total row count is important though.
type UserApiResponse = {
  data: Array<User>;
  meta: {
    totalRowCount: number;
  };
};

type User = {
  firstName?: string;
  lastName?: string;
  address?: string;
  state?: string;
  phoneNumber?: string;
};

// const columns: MRT_ColumnDef<User>[] = [
//   {
//     accessorKey: "firstName",
//     header: "First Name",
//   },
//   {
//     accessorKey: "lastName",
//     header: "Last Name",
//   },
//   {
//     accessorKey: "address",
//     header: "Address",
//   },
//   {
//     accessorKey: "state",
//     header: "State",
//   },
//   {
//     accessorKey: "phoneNumber",
//     header: "Phone Number",
//   },
// ];

const fetchSize = 25;

const Example = ({ fields, fetchData }) => {
  // const [fetchData, setFetchData] = useState(false);

  const columns: MRT_ColumnDef<User>[] = fields;

  const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState<string>();
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const queryFn = async ({ pageParam }) => {
    const url = new URL("/remote/api/data", window.location.origin);
    url.searchParams.set("start", `${(pageParam as number) * fetchSize}`);
    url.searchParams.set("size", `${fetchSize}`);
    url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
    url.searchParams.set("globalFilter", globalFilter ?? "");
    url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

    const response = await fetch(url.href);
    const json = (await response.json()) as UserApiResponse;
    return json;
  };

  const { data, fetchNextPage, isError, isFetching, isLoading } =
    useInfiniteQuery<UserApiResponse>({
      queryKey: fetchData
        ? ["table-data", columnFilters, globalFilter, sorting]
        : [],
      queryFn: queryFn,
      initialPageParam: 0,
      getNextPageParam: (_lastGroup, groups) => groups.length,
      refetchOnWindowFocus: false,
      enabled: fetchData,
    });

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  //scroll to top of table when sorting or filters change
  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting, columnFilters, globalFilter]);

  //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data: flatData,
    enableColumnOrdering: true,
    enableFilters: false,
    enableColumnFilters: false,
    enableSorting: true,
    enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            padding: "8px",
            flexWrap: "wrap",
          }}
        >
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Page Rows
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Selected Rows
          </Button>
        </Box>
      </>
    ),
    enablePagination: false,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    manualFiltering: false,
    manualSorting: false,
    muiTableContainerProps: {
      ref: tableContainerRef, //get access to the table container element
      sx: { maxHeight: "600px" }, //give the table a max height
      onScroll: (event: UIEvent<HTMLDivElement>) =>
        fetchMoreOnBottomReached(event.target as HTMLDivElement), //add an event listener to the table container element
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    renderBottomToolbarCustomActions: () => (
      <Typography>
        Fetched {totalFetched} of {totalDBRowCount} total rows.
      </Typography>
    ),
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
    rowVirtualizerInstanceRef, //get access to the virtualizer instance
    rowVirtualizerOptions: { overscan: 4 },
  });

  return (
    <>
      {/* <div className="container">
        <Button variant="contained" onClick={() => setFetchData(true)}>
          Search
        </Button>
      </div> */}
      <MaterialReactTable table={table} />
    </>
  );
};

const queryClient = new QueryClient();

const DynamicReactTable = ({ fields, fetchData }) => (
  <>
    <QueryClientProvider client={queryClient}>
      {/* <div>{`value: ${fields !== null ? `'${fields}'` : "null"}`}</div> */}
      <Example fields={fields} fetchData={fetchData} />
    </QueryClientProvider>
  </>
);

export default DynamicReactTable;
