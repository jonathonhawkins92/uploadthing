import type {
  UnsetMarker,
  UploadBuilder,
  UploadBuilderDef,
  Uploader,
} from "./types";

export function createBuilder<TRuntime extends "app" | "pages" = "app">(
  initDef: Partial<UploadBuilderDef<TRuntime>> = {}
): UploadBuilder<{
  _metadata: UnsetMarker;
  _runtime: TRuntime;
}> {
  const _def: UploadBuilderDef<TRuntime> = {
    fileTypes: ["image"],
    maxSize: "1MB",
    middleware: async () => ({}),
    ...initDef,
  };

  return {
    fileTypes(types) {
      return createBuilder({
        ..._def,
        fileTypes: types,
      });
    },
    maxSize(size) {
      return createBuilder({
        ..._def,
        maxSize: size,
      });
    },
    middleware(resolver) {
      return createBuilder({
        ..._def,
        middleware: resolver,
      }) as UploadBuilder<{ _metadata: any; _runtime: TRuntime }>;
    },
    onUploadComplete(resolver) {
      return {
        _def,
        resolver,
      } as Uploader<{ _metadata: any; _runtime: TRuntime }>;
    },
  };
}