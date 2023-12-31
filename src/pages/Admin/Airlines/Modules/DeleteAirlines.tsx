import { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteAirline, getAirlines } from "@/utils/apis/airlines";
import useAdminStore from "@/utils/store/admin";

interface IProps {
  id: string;
  airlane_name: string;
  children: ReactNode;
}

const DeleteAirlines = (props: IProps) => {
  const setAirlineData = useAdminStore((state) => state.setAirlines);
  const { id, airlane_name, children } = props;
  const { toast } = useToast();

  const deleteAirlineHandler = async () => {
    try {
      const res = await deleteAirline(id);
      const fetchAirline = await getAirlines();

      setAirlineData(fetchAirline!.data);

      toast({
        description: <p className="capitalize">{res?.message}</p>,
        title: "Success",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium text-red-500">{airlane_name}</span> and
            remove{" "}
            <span className="font-medium text-red-500">{airlane_name}</span>{" "}
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteAirlineHandler}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAirlines;
