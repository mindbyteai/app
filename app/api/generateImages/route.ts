import Together from "together-ai";
import { z } from "zod";

export async function POST(req: Request) {
  let json = await req.json();
  let { prompt, iterativeMode, style } = z
    .object({
      prompt: z.string(),
      iterativeMode: z.boolean(),
      style: z.string().optional(),
    })
    .parse(json);

  if (style) {
    prompt += `. Use a ${style} style for the image.`;
  }

  const client = new Together({
    apiKey: "",
  });

  let response;
  try {
    response = await client.images.create({
      prompt,
      model: "black-forest-labs/FLUX.1-schnell",
      width: 1024,
      height: 768,
      seed: iterativeMode ? 123 : undefined,
      steps: 3,
      // @ts-expect-error - this is not typed in the API
      response_format: "base64",
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return Response.json(
      { error: errorMessage },
      {
        status: 500,
      },
    );
  }

  return Response.json(response.data[0]);
}

export const runtime = "edge";
