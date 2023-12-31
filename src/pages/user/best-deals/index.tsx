import { Trip, getTrip } from "@/utils/apis/trip";
import { useEffect, useState } from "react";

import Layout from "@/components/user/layout";
import Loading from "@/components/Loading";
import TripCard from "@/components/user/trip-card";
import { useToast } from "@/components/ui/use-toast";

const BestDeals = () => {
  const { toast } = useToast();
  const [trip, setTrip] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTour();
  }, []);

  const fetchTour = async () => {
    try {
      setIsLoading(true);
      const result = await getTrip("", 0, 0, "discount");

      setTrip(result.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-8 px-10 pt-10">
          <div className="flex flex-col items-center justify-center gap-6">
            <label className="text-3xl font-semibold">Best Deals</label>
          </div>
          <div className="grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trip &&
              trip.map((item, index) => <TripCard data={item} key={index} />)}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BestDeals;
