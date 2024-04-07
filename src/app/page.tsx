"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import {
  PublicationWithoutAffiliation,
  PublicationsByAffiliation,
  PublicationsByYear,
} from "@/lib/types";

function countPublications(publications: PublicationsByYear): number {
  let totalCount = 0;
  for (const pubs of Object.values(publications)) {
    // Soometimes pubs is not an array, I encountered a value "true" for some reason. 
    // Hence I added this check to make sure it is an array before iterating over it.
    if (pubs.length != undefined) {
      totalCount += pubs.length;
    }
  }
  return totalCount;
}

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

const Home = () => {
  return (
    <div>
      <Link href="/home" className={buttonVariants({})}>
        Go to Main Page
      </Link>
      <Button
        onClick={async () => {
          const response = await axios.get("/api/ranking-data");
          const data = response.data as PublicationsByYear;
          console.log("data = ", data["2020"][0]);
          const publicationsByAffiliation =
            convertToPublicationsByAffiliation(data);
          console.log(
            "publicationsByAffiliation = ",
            publicationsByAffiliation
          );
        }}
      >
        Fetch Data
      </Button>
    </div>
  );
};

export default Home;
