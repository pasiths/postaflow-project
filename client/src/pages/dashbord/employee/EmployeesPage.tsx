import { getEmployees } from "@/api/employee";
import { DataTable } from "@/components/atoms/DataTable";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import type { Employee } from "@/types/employee";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorFn: (row) => row?.fName + " " + row.lName,
    id: "employeeName", // flat id for filtering and access
    header: "Employee Name",
    cell: ({ row }) => <div>{row.getValue("employeeName") ?? "—"}</div>,
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNum",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "role",
    header: "User Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const EmployeesPage = () => {
  const fetchEmployees = useCallback(()=> getEmployees({ role: "", status: "" }), []);
  const { data, loading } = useFetch(fetchEmployees);
  // const { data, loading } = useFetch<{ employees: Employee[] }>(getEmployees);
  const employees = Array.isArray(data) ? data : data?.employees || [];


  if (loading) {
    return (
      <main className="container mx-auto mt-4 p-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-center text-lg font-medium mb-4">
            Loading employees...
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto mt-4 p-4 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Employees Lists</h1>
        <div className="w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center mb-4"></div>
      </div>

      <div className="flex items-center justify-end">
        <Button
          className="text-sm w-50 h-10"
          onClick={() => {}}
        >
          Add New Employee <Plus size={14} />
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        filterKeys={["id", "customerName", "email", "contactNum", "address"]}
        filterPlaceholder="Search employees..."
      />

      
    </main>
  );
};

export default EmployeesPage;
