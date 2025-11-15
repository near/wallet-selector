import { actionCreators } from "@near-js/transactions"
import { najActionToInternal, internalActionToNaj } from "./transform-action"

describe("transform-action FunctionCall args handling", () => {
  test("najActionToInternal preserves Uint8Array (non-JSON) args", () => {
    // Bytes that are not valid JSON when decoded as UTF-8
    const borshBytes = new Uint8Array([0, 159, 255, 1, 2, 3, 4, 5])
    const naj = actionCreators.functionCall(
      "test_method",
      borshBytes,
      BigInt(0),
      BigInt(0),
    )

    const internal = najActionToInternal(naj)
    expect(internal.type).toBe("FunctionCall")

    // Should preserve the raw bytes, not parse to object
    const args = (internal as any).params.args as Uint8Array
    expect(args).toBeInstanceOf(Uint8Array)
    expect(Array.from(args)).toEqual(Array.from(borshBytes))
  })

  test("najActionToInternal parses JSON args to object", () => {
    const jsonArgs = { foo: "bar", n: 42 }
    const naj = actionCreators.functionCall(
      "test_json",
      jsonArgs,
      BigInt(0),
      BigInt(0),
    )

    const internal = najActionToInternal(naj)
    expect(internal.type).toBe("FunctionCall")

    const args = (internal as any).params.args as Record<string, unknown>
    expect(typeof args).toBe("object")
    expect(args).toEqual(jsonArgs)
  })

  test("internalActionToNaj forwards Uint8Array args", () => {
    const borshBytes = new Uint8Array([9, 8, 7, 6, 5])
    const internal = {
      type: "FunctionCall" as const,
      params: {
        methodName: "bytes_forward",
        args: borshBytes,
        gas: "0",
        deposit: "0",
      },
    }

    const naj = internalActionToNaj(internal)
    // NAJ action should still contain bytes in functionCall.args
    const fn = (naj as any).functionCall
    expect(fn).toBeTruthy()
    expect(fn.args).toBeInstanceOf(Uint8Array)
    expect(Array.from(fn.args as Uint8Array)).toEqual(Array.from(borshBytes))
  })
})
