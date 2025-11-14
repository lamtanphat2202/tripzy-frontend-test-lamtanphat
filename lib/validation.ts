// app/lib/validators.ts
import { z } from "zod";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

// Đây là schema của bạn
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
                message: "Vui lòng chọn điểm đến.",
            }),
        departureDate: z
            .string()
            .nullable()
            .refine((val) => val, {
                message: "Vui lòng chọn ngày đi.",
            }),
        returnTrip: z.boolean(),
        returnDate: z.string().nullable(),
        passengers: z.number().min(1, "Tối thiểu 1 hành khách."),
    })
    .refine(
        (data) => {
            // Nếu là chuyến khứ hồi, ngày về là bắt buộc
            if (data.returnTrip && !data.returnDate) {
                return false;
            }
            return true;
        },
        {
            message: "Vui lòng chọn ngày về.",
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
            return true; // Bỏ qua nếu không phải khứ hồi
        },
        {
            message: "Ngày về phải sau hoặc bằng ngày đi.",
            path: ["returnDate"],
        }
    );

export type TSearchFormData = z.infer<typeof SearchFormSchema>;
