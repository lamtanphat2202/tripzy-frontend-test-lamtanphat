import { z } from "zod";

import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

export const SearchFormSchema = z
    .object({
        from: z
            .string()
            .nullable()
            .refine((val) => val !== null && val !== "", {
                message: "Please select departure location",
            }),
        to: z
            .string()
            .nullable()
            .refine((val) => val, {
                message: "Please select a destination.",
            }),
        departureDate: z
            .string()
            .nullable()
            .refine((val) => val, {
                message: "Please select a departure date.",
            }),
        returnTrip: z.boolean(),
        returnDate: z.string().nullable(),
        passengers: z.number().min(1, "Minimum 1 passenger."),
    })
    .refine(
        (data) => {
            // If it's a round trip, return date is required
            if (data.returnTrip && !data.returnDate) {
                return false;
            }
            return true;
        },
        {
            message: "Please select a return date.",
            path: ["returnDate"],
        }
    )
    .refine(
        (data) => {
            if (data.returnTrip && data.returnDate && data.departureDate) {
                return dayjs(data.returnDate).isSameOrAfter(
                    dayjs(data.departureDate),
                    "day"
                );
            }
            return true; // Skip if not a round trip
        },
        {
            message: "Return date must be on or after the departure date.",
            path: ["returnDate"],
        }
    );

export type TSearchFormData = z.infer<typeof SearchFormSchema>;
