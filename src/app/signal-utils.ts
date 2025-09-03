import { Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime } from "rxjs";

// This implements a debounce between two signals.
export function debouncedSignal<T>(
    signal: Signal<T>,
    debouncedDelay: number
) {
    const signalObs = toObservable(
        signal
    );

    // returning debouncedSignal
    return toSignal(
        signalObs.pipe(
            debounceTime(debouncedDelay)
        )
    )
}