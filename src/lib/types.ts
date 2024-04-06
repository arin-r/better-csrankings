import { $Enums } from "@prisma/client";

export type StudentQuery = {
  nameOrIdOrRoom: string;
  hostels: string[];
  beDegrees: $Enums.DegreeBE[];
  mscDegrees: $Enums.DegreeMSC[];
  years: string[];
};

export const defaultStudentQuery: StudentQuery = {
  beDegrees: [],
  mscDegrees: [],
  hostels: [],
  years: [],
  nameOrIdOrRoom: "",
};
