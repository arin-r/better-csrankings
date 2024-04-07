"use client";

import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Filters, areas } from "@/lib/types";



const SearchFilters = ({
  setFilters,
  setSheetIsOpen,
  filters
}: {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setSheetIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: Filters;
}) => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [startYear, setStartYear] = useState(filters.startYear);
  const [endYear, setEndYear] = useState(filters.endYear);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(filters.areasOfResearch); // [1
  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartYear(e.target.value);
  };
  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndYear(e.target.value);
  };


  console.log(startYear);
  return (
    <div className="">
      <Card
        x-chunk="dashboard-02-chunk-0"
        className="pl-2 py-1 md:pl-0 md:py-0 mb-5"
      >
        <CardHeader className="p-2 pt-2 md:p-4">
          <CardTitle>Areas</CardTitle>
          <CardDescription>
            Select the areas you want to search for.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <div className="space-y-3 h-[10rem] md:h-[10rem] overflow-scroll">
            {areas.map((area) => {
              return (
                <div key={area.value} className="flex items-center space-x-2">
                  <Checkbox id={area.value} checked={selectedAreas.includes(area.value)} onClick={() => {
                    // remove area.value from selectedAreas if it is already present
                    if (selectedAreas.includes(area.value)) {
                      setSelectedAreas(selectedAreas.filter(a => a !== area.value));
                    } else {
                      setSelectedAreas([...selectedAreas, area.value]);
                    }
                  }}/>
                  <label
                    htmlFor={area.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {area.label}
                  </label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card
        x-chunk="dashboard-02-chunk-0"
        className="pl-2 py-1 md:pl-0 md:py-0"
      >
        <CardHeader className="p-2 pt-2 md:p-4">
          <CardTitle>Years</CardTitle>
          <CardDescription>
            Search by range of years in which the publications were made.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="email">From</Label>
            <Input
              type="number"
              id="start_year"
              placeholder="from..."
              value={startYear}
              onChange={handleStartYearChange}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">To</Label>
            <Input
              type="number"
              id="end_year"
              placeholder="Email"
              value={endYear}
              onChange={handleEndYearChange}
            />
          </div>

          <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
            <AlertDialogTrigger asChild></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Invalid Input</AlertDialogTitle>
                <AlertDialogDescription>
                  Make sure the start year is less than the end year. And valid
                  number input is provided.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
      <Button
        className="w-full mt-4"
        onClick={() => {
          const yearRegex = /^[1-9]\d*$/;
          if (startYear == "") {
            setEndYear("1986");
          }
          if (endYear == "") {
            setEndYear("2023");
          }
          const isValid =
            yearRegex.test(startYear) &&
            yearRegex.test(endYear) &&
            parseInt(startYear) < parseInt(endYear);
          if (!isValid) {
            setOpenAlertDialog(true);
          } else {
            setFilters((prev) => ({
              ...prev,
              startYear,
              endYear,
              areasOfResearch: selectedAreas,
            }));
            setSheetIsOpen(false);
          }
        }}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default SearchFilters;
