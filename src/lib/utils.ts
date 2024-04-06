import { $Enums } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
 * BAD CODE BELOW. NEEDS MAJOR REFACTORING.
 */
type DegreeMSCEnum = $Enums.DegreeMSC;
export const getMscBranchFromBranchCode: (
  degreeMSC: DegreeMSCEnum
) => string = (degreeMSC) => {
  if (degreeMSC == "B1") {
    return "M.Sc. Biology";
  } else if (degreeMSC == "B2") {
    return "M.Sc. Chemistry";
  } else if (degreeMSC == "B3") {
    return "M.Sc. Economics";
  } else if (degreeMSC == "B4") {
    return "M.Sc. Math";
  } else if (degreeMSC == "B5") {
    return "M.Sc. Physics";
  } else {
    throw new Error("Invalid degreeMSC");
  }
};

export const MSC_DEGREES = [
  "Biology",
  "Chemistry",
  "Economics",
  "Math",
  "Physics",
];
export const getMscBranchCodeFromBranch: (
  degreeMSC: string
) => DegreeMSCEnum = (degreeMSC) => {
  if (degreeMSC == "Biology") {
    return "B1";
  } else if (degreeMSC == "Chemistry") {
    return "B2";
  } else if (degreeMSC == "Economics") {
    return "B3";
  } else if (degreeMSC == "Math") {
    return "B4";
  } else if (degreeMSC == "Physics") {
    return "B5";
  } else {
    throw new Error("Invalid degreeMSC");
  }
};

type DegreeBEEnum = $Enums.DegreeBE;
export const getBEBranchFromBranchCode: (degreeBE: DegreeBEEnum) => string = (
  degreeBE
) => {
  if (degreeBE == "A1") {
    return "B.E. Chemical";
  } else if (degreeBE == "A3") {
    return "B.E. EEE";
  } else if (degreeBE == "A4") {
    return "B.E. Mechanical";
  } else if (degreeBE == "A7") {
    return "B.E. Computer Science";
  } else if (degreeBE == "A8") {
    return "B.E. ENI";
  } else if (degreeBE == "AA") {
    return "B.E. ECE";
  } else {
    throw new Error("Invalid degreeBE");
  }
};

export const BE_DEGREES = ["Chem", "EEE", "Mech", "C.S.", "ENI", "ECE"];
export const getBEBranchCodeFromBranch: (degreeBE: string) => DegreeBEEnum = (
  degreeBE
) => {
  if (degreeBE == "Chem") {
    return "A1";
  } else if (degreeBE == "EEE") {
    return "A3";
  } else if (degreeBE == "Mech") {
    return "A4";
  } else if (degreeBE == "C.S.") {
    return "A7";
  } else if (degreeBE == "ENI") {
    return "A8";
  } else if (degreeBE == "ECE") {
    return "AA";
  } else {
    throw new Error("Invalid degreeBE");
  }
};
