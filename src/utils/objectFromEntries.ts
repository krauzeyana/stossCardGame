// Data Types
type EntriesType = [PropertyKey, unknown][] | ReadonlyArray<readonly [PropertyKey, unknown]>;

// Utils
type DeepWritable<OBJ_T> = { -readonly [P in keyof OBJ_T]: DeepWritable<OBJ_T[P]> };
type UnionToIntersection<UNION_T> = (UNION_T extends any ? (k: UNION_T) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;
type UnionObjectFromArrayOfPairs<ARR_T extends EntriesType> =
    DeepWritable<ARR_T> extends (infer R)[]
        ? R extends [infer key, infer val]
            ? { [prop in key & PropertyKey]: val }
            : never
        : never;
type MergeIntersectingObjects<ObjT> = { [key in keyof ObjT]: ObjT[key] };
type EntriesToObject<ARR_T extends EntriesType> = MergeIntersectingObjects<
    UnionToIntersection<UnionObjectFromArrayOfPairs<ARR_T>>
>;

// Typed Functions
export function createTypedObjectFromEntries<ARR_T extends EntriesType>(
    arr: ARR_T
): EntriesToObject<ARR_T> {
    return Object.fromEntries(arr) as EntriesToObject<ARR_T>;
}
