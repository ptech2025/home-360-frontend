import { InferUITools, UIMessage, ToolSet, TextPart } from "ai";
import { z } from "zod";

export enum EstimateLineItemUnitType {
  // GENERAL
  none,
  each,
  piece,
  set,

  // AREA
  square,
  square_foot,
  square_meter,
  acre,

  // LENGTH
  foot,
  linear_foot,
  inch,
  yard,
  meter,
  kilometer,
  mile,

  // VOLUME
  cubic_foot,
  cubic_meter,
  liter,
  gallon,
  barrel,
  bucket,

  // WEIGHT
  pound,
  kilogram,
  ton,
  ounce,
  gram,

  // SHEET/BOARD MATERIALS
  sheet,
  board_foot,
  panel,
  roll,

  // PACKAGED MATERIALS
  bag,
  bundle,
  box,
  carton,
  pack,

  // TIME
  man_hour,
  hour,
  day,
  week,
  month,
}

export enum EstimateLineItemCategory {
  material,
  labor,
  other,
}

type DataResponsePart = {
  type: "data-response";
  data: string;
};

type DataEstimatePart = {
  type: "data-estimate";
  data: MyDataParts["estimate"]; // <-- links to your Zod schema
};

// 1. Define a metadata schema with Zod
export const metadataSchema = z.object({
  sessionId: z.string().optional(),
  createdAt: z.date(),
  estimatedId: z.string().optional(),
  tokenUsage: z
    .object({
      inputTokens: z.number(),
      outputTokens: z.number(),
      totalTokens: z.number(),
    })
    .optional(),
  userLocation: z.string().optional(),
  confidence: z.enum(["low", "medium", "high"]).default("medium"),
});

export const dataPartSchema = z.object({
  response: z
    .string()
    .min(20, "Response must be at least 20 characters")
    .max(600, "Response must be less than 600 characters")
    .describe(
      "Conversational explanation of the request and the approach taken or friendly reply. Be helpful and friendly (2-5 sentences)."
    ),

  estimate: z
    .object({
      estimateTitle: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .describe(
          "Descriptive title of the estimate, e.g., 'Interior Painting - Two Bedrooms'"
        ),

      lineItems: z
        .array(
          z.object({
            name: z
              .string()
              .min(3, "Item name must be at least 3 characters")
              .describe("Specific name of the task or material"),
            quantity: z.number().positive().describe("Units, hours, or rooms"),
            cost: z
              .number()
              .nonnegative()
              .describe("Cost per unit in local currency"),
            total: z.number().nonnegative().describe("Quantity × Cost"),
            unitType: z
              .enum(EstimateLineItemUnitType)
              .describe("Unit of measure"),
            category: z
              .enum(EstimateLineItemCategory)
              .describe("Category type"),
          })
        )
        .min(1, "At least one line item is required"),

      totalEstimate: z
        .number()
        .nonnegative()
        .describe("Sum of all line item totals"),
    })
    .nullable(), // 👈 allow null when estimate can't be generated

  confidence: z
    .enum(["low", "medium", "high"])
    .default("medium")
    .describe("Confidence level in the estimate accuracy"),

  suggestions: z
    .array(z.string())
    .max(3)
    .optional()
    .describe(
      "3 example prompts the user could try next, only present when estimate is null"
    ),
});

export type MyDataParts = z.infer<typeof dataPartSchema>;

// 3. If you use tools, define them here
export const tools = {} satisfies ToolSet;
type MyTools = InferUITools<typeof tools>;

type MyMessagePart = TextPart | DataResponsePart | DataEstimatePart;
type MyMetadata = z.infer<typeof metadataSchema>;

// 4. Define  `UIMessage` type with all custom parts
export type MyUIMessage = UIMessage<MyMetadata, MyDataParts, MyTools> & {
  parts: MyMessagePart[];
};
