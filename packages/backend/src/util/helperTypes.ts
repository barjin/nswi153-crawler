import type { paths } from "@nswi153-crawler/openapi-spec";

export type ResponseType<
  Path extends keyof paths,
  // @ts-ignore
  Method extends keyof paths[Path] = "get",
  // @ts-ignore
  Status extends keyof paths[Path][Method]["responses"] = "200",
  // @ts-ignore
> = paths[Path][Method]["responses"][Status]["content"]["application/json"];

export type QueryParamsType<
  Path extends keyof paths,
  // @ts-ignore
  Method extends keyof paths[Path] = "get",
  // @ts-ignore
> = paths[Path][Method]["parameters"]["query"];
