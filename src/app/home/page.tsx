import MainPage from "@/components/MainPage";
import {
  PublicationWithoutAffiliation,
  PublicationsByAffiliation,
  PublicationsByYear,
} from "@/lib/types";

import { promises as fs } from "fs";
import path from "path";

function convertToPublicationsByAffiliation(
  publicationsByYear: PublicationsByYear
): PublicationsByAffiliation {
  const publicationsByAffiliation: PublicationsByAffiliation = {};

  for (const [year, pubs] of Object.entries(publicationsByYear)) {
    // Soometimes pubs is not an array, I encountered a value "true" for some reason.
    // Hence I added this check to make sure it is an array before iterating over it.
    if (pubs.length != undefined) {
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

const Dashboard = async () => {
  const publicationsByAffiliation = await getData();
  console.log("publicationsByAffiliation", publicationsByAffiliation[15][1]);
  return (
    <MainPage publicationsByAffiliation={publicationsByAffiliation}/>
  );
};

export default Dashboard;
