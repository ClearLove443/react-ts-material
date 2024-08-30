import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

export default function DynamicTable({ rows }) {
  // 检查rows数组是否为空，如果是，则初始化columns为空数组
  const columns = React.useMemo(() => {
    if (rows.length === 0) return [];
    const keys = Object.keys(rows[0]);
    return keys.map((key) => ({ id: key, label: key, align: "right" }));
  }, [rows]);

  return (
    <div className="container">
      <div className="container-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="right">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id || row["id"]}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="right">
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
