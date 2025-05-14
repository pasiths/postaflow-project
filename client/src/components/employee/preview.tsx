import { deleteEmployee } from "@/api/employee";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import type { Employee } from "@/types/employee";
import { toast } from "react-toastify";
import { useState } from "react";

const EmployeePreview = ({ employee }: { employee: Employee }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    await deleteEmployee(employee.id.toString());

    toast.success("Employee deleted successfully");
    setDeleteLoading(false);
    window.location.reload();
  };

  return (
    <>
      <div className=" overflow-y-auto max-h-[calc(100vh-8rem)] p-4">
        <h1 className="text-xl font-bold">Employee Details</h1>

        <Separator className="mb-2" />

        <div className="space-y-2 mt-4">
          <div className="px-2 space-y-4 mb-8">
            <div className="flex gap-2">
              <p className="w-full text-sm text-muted-foreground font-semibold">
                ID: <span className="text-foreground">{employee.id}</span>
              </p>
              <p className="w-full text-sm text-muted-foreground font-semibold">
                Username:{" "}
                <span className="text-foreground">{employee.username}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <p className="w-full text-sm text-muted-foreground font-semibold">
                First Name:{" "}
                <span className="text-foreground">{employee.fName}</span>
              </p>
              <p className="w-full text-sm text-muted-foreground font-semibold">
                Last Name:{" "}
                <span className="text-foreground">{employee.lName}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <p className="w-full text-sm text-muted-foreground font-semibold">
                Email: <span className="text-foreground">{employee.email}</span>
              </p>
              <p className="w-full text-sm text-muted-foreground font-semibold">
                Phone Number:{" "}
                <span className="text-foreground">{employee.phoneNum}</span>
              </p>
            </div>
            <p className="w-full text-sm text-muted-foreground font-semibold">
              Address:{" "}
              <span className="text-foreground">{employee.address}</span>
            </p>
            <div className="flex gap-2">
              <p className="w-full text-sm text-muted-foreground font-semibold">
                User Role:{" "}
                <span className="text-foreground">{employee.role}</span>
              </p>
              <p className="w-full text-sm text-muted-foreground font-semibold">
                Status:{" "}
                <span className="text-foreground">{employee.status}</span>
              </p>
            </div>

            <div className="flex justify-end">
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  className="w-25 mt-4"
                  onClick={() => {}}
                  disabled={deleteLoading}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="w-25 mt-4"
                  onClick={handleDelete}
                  disabled={deleteLoading || employee.status === "INACTIVE"}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeePreview;
