import { getRoutingAreas } from "@/api/routing-areas";
import { DataTable } from "@/components/atoms/DataTable";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import type { RoutingArea } from "@/types/routing-areas";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

export const columns: ColumnDef<RoutingArea>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorFn: (row) => row?.deliver.fName + " " + row.deliver.lName,
    id: "deliverName", // flat id for filtering and access
    header: "Deliver Name",
    cell: ({ row }) => <div>{row.getValue("deliverName") ?? "—"}</div>,
  },
  {
    accessorKey: "area",
    header: "Area",
  },
];

const RoutingAreaPage = () => {
  const { data, loading } = useFetch<{ routingAreas: RoutingArea[] }>(
    getRoutingAreas
  );
  const routingAreas = Array.isArray(data) ? data : data?.routingAreas || [];

  if (loading) {
    return (
      <main className="container mx-auto mt-4 p-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-center text-lg font-medium mb-4">
            Loading Routing Areas...
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto mt-4 p-4 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Routing Areas Lists</h1>
        <div className="w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center mb-4"></div>
      </div>

      <div className="flex items-center justify-end">
        <Button className="text-sm w-50 h-10" onClick={() => {}}>
          Add New Routing Area <Plus size={14} />
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={routingAreas}
        filterKeys={["id", "deliverName", "area"]}
        filterPlaceholder="Search Routing Areas..."
      />
    </main>
  );
};

export default RoutingAreaPage;
