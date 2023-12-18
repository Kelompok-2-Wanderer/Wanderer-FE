import { ICreateTour, createTourSchema } from "@/utils/apis/tour";

import { differenceInDays, format } from "date-fns";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select as SelectShad,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { locationData } from "./location-data";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/utils/utils";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";

const animatedComponents = makeAnimated();

const AddTour = () => {
  const form = useForm<ICreateTour>({
    resolver: zodResolver(createTourSchema),
    defaultValues: {
      title: "",
      location_id: "",
      description: "",
      price: "",
      discount: "",
      admin_fee: "",
      start: undefined,
      finish: undefined,
      quota: "",
      thumbnail: "",
      airline_id: "",
      include_facility: [""],
      itinerary: [{ location: "", description: "" }],
    },
  });

  useEffect(() => {
    const formSubscribe = form.watch((value) => {
      setTourDuration(differenceInDays(value.finish!, value.start!) + 1);
    });

    return () => formSubscribe.unsubscribe();
  }, [form]);

  const [tourDuration, setTourDuration] = useState(0);

  const submitTourHandler = async (data: ICreateTour) => {
    console.log(data);
  };

  return (
    <div className="mt-5 w-full">
      <p className="mb-3 text-[22px] font-semibold">Add Tour</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitTourHandler)}>
          <div className="mb-3 flex w-full gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Location</FormLabel>
                  <SelectShad
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Japan</SelectItem>
                      <SelectItem value="2">Korea</SelectItem>
                      <SelectItem value="3">Bangkok</SelectItem>
                    </SelectContent>
                  </SelectShad>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-3 w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-3 flex gap-3">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-[400px]">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="w-[300px]">
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Discount"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="admin_fee"
              render={({ field }) => (
                <FormItem className="w-[300px]">
                  <FormLabel>Admin fee</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Admin Fee"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-3 flex w-[800px] gap-3">
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Departure Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="finish"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Finish Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="include_facility"
            render={({ field: { onChange, onBlur, name, ref, value } }) => (
              <FormItem className="mb-3 w-full">
                <FormLabel>Facility</FormLabel>
                <FormControl>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={locationData}
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    value={locationData.filter((c) => value.includes(c.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="airline_id"
            render={({ field }) => (
              <FormItem className="mb-3 w-[300px]">
                <FormLabel>Airline</FormLabel>
                <SelectShad
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Airline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Lion Air</SelectItem>
                    <SelectItem value="2">Garuda Indonesia</SelectItem>
                    <SelectItem value="3">Air Asia</SelectItem>
                  </SelectContent>
                </SelectShad>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quota"
            render={({ field }) => (
              <FormItem className="mb-3 w-[300px]">
                <FormLabel>Total Pax</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Total Pax"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={() => (
              <FormItem className="mb-3 w-[300px]">
                <FormLabel>Thumbnail Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    {...form.register("thumbnail")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itinerary"
            render={() => (
              <>
                {Array.from({ length: tourDuration }, (v, k) => (
                  <>
                    <FormItem className="mb-3 w-[300px]">
                      <FormLabel>Day {k + 1} Location</FormLabel>
                      <FormControl>
                        <Input
                          key={k}
                          placeholder="Location"
                          className="w-full"
                          {...form.register(`itinerary.${k}.location`, {
                            shouldUnregister: false,
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem className="mb-3 w-[300px]">
                      <FormLabel>Day {k + 1} Description</FormLabel>
                      <FormControl>
                        <Input
                          key={k}
                          placeholder="Description"
                          className="w-full"
                          {...form.register(`itinerary.${k}.description`, {
                            shouldUnregister: false,
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                ))}
              </>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTour;
