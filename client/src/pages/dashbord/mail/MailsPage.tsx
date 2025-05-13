import { getMails } from "@/api/mail";
import { DataTable } from "@/components/atoms/DataTable";
import MailEditor from "@/components/mail/editor";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import type { Mail } from "@/types/mail";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";

export const columns: ColumnDef<Mail>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorFn: (row) => row.sender?.fName + " " + row.sender?.lName,
    id: "senderName", // flat id for filtering and access
    header: "Sender Name",
    cell: ({ row }) => <div>{row.getValue("senderName") ?? "—"}</div>,
  },
  {
    accessorKey: "sender.address",
    header: "Sender Address",
  },
  {
    accessorFn: (row) => row.receiver?.fName + " " + row.receiver?.lName,
    id: "receiverName",
    header: "Receiver Name",
    cell: ({ row }) => <div>{row.getValue("receiverName") ?? "—"}</div>,
  },
  {
    accessorKey: "receiver.address",
    header: "Reciver Address",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "direction",
    header: "Direction",
  },
  {
    id: "routingArea.deliver.fullName",
    header: "Deliver Name",
    accessorFn: (row) => {
      const fName = row.routingArea?.deliver?.fName ?? "";
      const lName = row.routingArea?.deliver?.lName ?? "";
      return `${fName} ${lName}`.trim() || "—";
    },
    cell: ({ row }) => (
      <div>{row.getValue("routingArea.deliver.fullName")}</div>
    ),
  },
  {
    accessorFn: (row) => row.routingArea?.area,
    id: "area", // use a flat ID, not nested key
    header: "Area",
    cell: ({ row }) => <div>{row.getValue("area") ?? "—"}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const MailsPage = () => {
  const { data, loading } = useFetch<{ mails: Mail[] }>(getMails);
  const mails = Array.isArray(data) ? data : data?.mails || [];

  const [editorBox, setEditorBox] = useState(false);

  if (loading) {
    return (
      <main className="container mx-auto mt-4 p-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-center text-lg font-medium mb-4">
            Loading Mails...
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto mt-4 p-4 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Mail Lists</h1>
        <div className="w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center mb-4"></div>
      </div>

      <div className="flex items-center justify-end">
        <Button
          className="text-sm w-50 h-10"
          onClick={() => setEditorBox(true)}
        >
          Add New Mail <Plus size={14} />
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={mails}
        filterKeys={[
          "id",
          "senderName",
          // "sender.address",
          "receiverName",
          "receiverAddress",
          "type",
          "direction",
          // "routingArea.deliver.fullName",
          // "routingArea.area",
          "status",
        ]}
        filterPlaceholder="Search mails..."
      />

      {editorBox && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setEditorBox(false)}
            >
              ✕
            </button>
            <MailEditor />
          </div>
        </div>
      )}
    </main>
  );
};

export default MailsPage;
