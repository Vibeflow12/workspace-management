import { z } from "zod";

export const stringToNumberSchema =
   z.coerce
    .number()
    .int({ message: "Workspace ID must be an integer" })
    .positive({ message: "Invalid workspace ID" })
