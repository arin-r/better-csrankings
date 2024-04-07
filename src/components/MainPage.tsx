import Link from "next/link";
import { Menu, Package2, Search } from "lucide-react";

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
import { PublicationWithoutAffiliation } from "@/lib/types";

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
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">CS Rankings</span>
            </Link>
          </div>
          <div className="p-4">
            <SearchFilters />
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
                <SearchFilters />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
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
              {publicationsByAffiliation.map((pubByAff, idx) => {
                const [affiliation, publications] = pubByAff;
                console.log("publications = ", publications);
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
              })}
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
