"use client";
import Link from "next/link";
import { Menu, Package2, Search, University } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchFilters from "@/components/SearchFilters";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filters, PublicationWithoutAffiliation } from "@/lib/types";
import { useState } from "react";

const countUniqueAuthors = (
  publications: PublicationWithoutAffiliation[]
): number => {
  const uniqueAuthors = new Set<string>();

  publications.forEach((publication) => {
    uniqueAuthors.add(publication.author);
  });

  return uniqueAuthors.size;
};

const MainPage = ({
  publicationsByAffiliation,
}: {
  publicationsByAffiliation: [string, PublicationWithoutAffiliation[]][];
}) => {
  const [filters, setFilters] = useState<Filters>({
    startYear: "1986",
    endYear: "2023",
    universityName: "",
    areasOfResearch: [],
  });

  const filteredPublicationsByAffiliation: [
    string,
    PublicationWithoutAffiliation[],
  ][] = publicationsByAffiliation
    .filter((pubByAff) => {
      const [affiliation, publications] = pubByAff;
      return affiliation.includes(filters.universityName);
    })
    .map((pubByAff) => {
      const [affiliation, publications] = pubByAff;
      let filteredPublications = publications.filter((pub) => {
        return (
          parseInt(pub.year) >= parseInt(filters.startYear) &&
          parseInt(pub.year) <= parseInt(filters.endYear) &&
          (filters.areasOfResearch.length === 0 || filters.areasOfResearch.some((area) => pub.FOR.includes(area)))
        );
      });

      return [affiliation, filteredPublications];
    });
  let sortedAndFilteredPublicationsByAffiliation =
    filteredPublicationsByAffiliation.sort((a, b) => b[1].length - a[1].length);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="h-">CS Rankings</span>
            </Link>
          </div>
          <div className="p-4">
            <SearchFilters setFilters={setFilters} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
              </nav>
              <div className="mt-5">
                <SearchFilters setFilters={setFilters} />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Universities..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      universityName: e.target.value,
                    });
                  }}
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Table>
            <TableCaption>
              Indian publications categorized by affiliations (universities)
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                {/* <TableHead>University</TableHead> */}
                <TableHead>University</TableHead>
                <TableHead className="text-right">Publications</TableHead>
                <TableHead className="text-right">Faculty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredPublicationsByAffiliation.map(
                (pubByAff, idx) => {
                  const [affiliation, publications] = pubByAff;

                  return (
                    /// wrong practice to use idx as key
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell>{affiliation}</TableCell>
                      <TableCell className="text-right">
                        {publications.length}
                      </TableCell>
                      <TableCell className="text-right">
                        {countUniqueAuthors(publications)}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
