import Link from "next/link";
import { Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchFilters from "@/components/SearchFilters";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import {
  PublicationWithoutAffiliation,
  PublicationsByAffiliation,
  PublicationsByYear,
} from "@/lib/types";

import { promises as fs } from "fs";
import path from "path";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

function convertToPublicationsByAffiliation(
  publicationsByYear: PublicationsByYear
): PublicationsByAffiliation {
  const publicationsByAffiliation: PublicationsByAffiliation = {};

  for (const [year, pubs] of Object.entries(publicationsByYear)) {
    // Soometimes pubs is not an array, I encountered a value "true" for some reason.
    // Hence I added this check to make sure it is an array before iterating over it.
    if (pubs.length != undefined) {
      // console.log("pubs = ", pubs);
      pubs.forEach((pub) => {
        const { author, affiliation, points, FOR } = pub;
        const publicationWithoutAffiliation: PublicationWithoutAffiliation = {
          author,
          points,
          FOR,
          year,
        };

        if (!publicationsByAffiliation[affiliation]) {
          publicationsByAffiliation[affiliation] = [
            publicationWithoutAffiliation,
          ];
        } else {
          publicationsByAffiliation[affiliation].push(
            publicationWithoutAffiliation
          );
        }
      });
    }
  }

  return publicationsByAffiliation;
}

function sortPublicationsByAffiliation(
  publicationsByAffiliation: PublicationsByAffiliation
): [string, PublicationWithoutAffiliation[]][] {
  const sortedPublicationsByAffiliation: PublicationsByAffiliation = {};

  // Create an array of arrays [affiliation, publications] for sorting
  const sortedArray = Object.entries(publicationsByAffiliation).sort(
    (a, b) => b[1].length - a[1].length
  ); // Sort by number of publications, descending
  return sortedArray;
}

const getData = async () => {
  const fileData = await fs.readFile(
    path.join(process.cwd(), "public", "data.json"),
    "utf8"
  );
  const jsonData = JSON.parse(fileData);
  const data = jsonData as PublicationsByYear;
  const publicationsByAffiliation = convertToPublicationsByAffiliation(data);
  const sortedPublicationsByAffiliation = sortPublicationsByAffiliation(
    publicationsByAffiliation
  );

  return sortedPublicationsByAffiliation;
};

function countUniqueAuthors(publications: PublicationWithoutAffiliation[]): number {
    const uniqueAuthors = new Set<string>();

    publications.forEach(publication => {
        uniqueAuthors.add(publication.author);
    });

    return uniqueAuthors.size;
}


const Dashboard = async () => {
  const publicationsByAffiliation = await getData();
  console.log;
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
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Areas</CardTitle>
                <CardDescription>
                  Select the areas you want to search for.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <SearchFilters />
              </CardContent>
            </Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Areas</CardTitle>
                    <CardDescription>
                      Select the areas you want to search for.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SearchFilters />
                  </CardContent>
                </Card>
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
                    <TableCell className="font-medium">{idx+1}</TableCell>
                    <TableCell>{affiliation}</TableCell>
                    <TableCell className="text-right">{publications.length}</TableCell>
                    <TableCell className="text-right">{countUniqueAuthors(publications)}</TableCell>
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

export default Dashboard;
