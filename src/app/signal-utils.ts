import { Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime } from "rxjs";

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